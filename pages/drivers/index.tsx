import Header from "components/Header";
import Container from "components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  loadBooking,
  updateBooking,
} from "store/reducers/booking";
import { selectDrivers, loadDrivers } from "store/reducers/drivers";
import { useEffect, useState } from "react";
import swal from "@sweetalert/with-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";

let val = "";
const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(selectBookings);
  const { data } = useSelector(selectDrivers);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(loadBooking());
    dispatch(loadDrivers());
  }, [loadBooking, dispatch, loadDrivers]);

  const showShipmentDetails = (q) => {
    const contentHtml = ReactDOMServer.renderToString(
      <div style={{ textAlign: "left" }}>
        <div>
          <b>Shipper's Name:</b> {q.shippersName}
        </div>
        <div>Shipper's Address: {q.shippersAddress}</div>
        <div>Shippers Contact Number: {q.shippersContactNumber}</div>
        <hr />
        <div>
          <b>Receiver's Name:</b> {q.receiversName}
        </div>
        <div>Receiver's Contact Number: {q.receiversContactNumber}</div>
        <div>Receiver's Address: {q.receiversAddress}</div>
        <hr />
        <div>Shipment Type: {q.shipmentType}</div>
        <div>Mode of Service: {q.modeOfService}</div>
        <div>Payment Mode: {q.paymentMode}</div>
      </div>
    );

    Swal.fire({
      title: "Shipment Details",
      html: contentHtml,
      showLoaderOnConfirm: true,
      showConfirmButton: false,
    });
  };

  const showDriverSelection = (data, q, dispatch, updateBooking) => {
    Swal.fire({
      title: "Select Driver",
      html: `
     
      <select id="driverSelect" style="padding: 10px; width: 100%;">
        <option value="" disabled selected>Please select driver</option>
        ${data
          .map(
            (d) =>
              `<option value="${d._id}">${d.fullName} (${d.driversLicense})</option>`
          )
          .join("")}
      </select>
      <div style="text-align: right; margin-top: 10px;">
        <button id="acceptBtn" style="background-color: #5CB85C; border: none; color: white; border-radius: 3; padding: 5px 10px; cursor: pointer;">
          Accept
        </button>
      </div>
    `,
      allowOutsideClick: false,
      // showCancelButton: true,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const selectElement = document.getElementById("driverSelect");
        const acceptButton = document.getElementById("acceptBtn");

        let selectedDriver = "";

        selectElement.addEventListener("change", (event) => {
          selectedDriver = event.target.value;
        });

        acceptButton.addEventListener("click", () => {
          if (!selectedDriver) {
            Swal.showValidationMessage("Please select a driver!");
            return;
          }

          dispatch(
            updateBooking({
              id: q._id,
              obj: {
                status: "ACCEPTED",
                acceptedBy: selectedDriver,
              },
            })
          );

          Swal.close();
        });
      },
    });
  };

  return (
    <Container>
      <Header title={`Job Listing (${jobs.length})`} />
      {!loading ? (
        <div style={{ width: "100%", overflowY: "auto", overflowX: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Shipper's Name</th>
                <th>Receiver's Name</th>
                <th>Receiver's Address</th>
                <th>Shipment Type</th>
                <th>Status</th>
                <th>Mode of Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((q: any, i: number) => (
                <tr key={i}>
                  <td>{q.shippersName}</td>
                  <td>{q.receiversName}</td>
                  <td>{q.receiversAddress}</td>
                  <td>{q.shipmentType}</td>
                  <td>
                    <span className="label label-warning">Pending</span>
                  </td>
                  <td>{q.paymentMode}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info btn-xs  mr-10 mb-3"
                      onClick={() => showShipmentDetails(q)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-xs  mr-10 mb-3"
                      onClick={() =>
                        showDriverSelection(data, q, dispatch, updateBooking)
                      }
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: 30 }} />
        </div>
      )}
    </Container>
  );
};
export default Jobs;
