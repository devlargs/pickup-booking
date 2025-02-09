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
      confirmButtonColor: "#16A085",
      confirmButtonText: "Close",
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
                        swal({
                          allowOutsideClick: false,
                          closeOnEscape: false,
                          content: (
                            <div style={{ textAlign: "left" }}>
                              <p>Please select driver to accept the job</p>
                              <select
                                defaultValue=""
                                style={{ padding: 10, width: "100%" }}
                                onChange={(e) => {
                                  val = e.target.value;
                                }}
                              >
                                <option value="" disabled>
                                  Please select driver
                                </option>
                                {data.map((q: any) => (
                                  <option key={q._id} value={q._id}>
                                    {q.fullName} ({q.driversLicense})
                                  </option>
                                ))}
                              </select>
                              <div
                                style={{ textAlign: "right", marginTop: 10 }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "#5CB85C",
                                    border: "none",
                                    color: "white",
                                    borderRadius: 3,
                                  }}
                                  onClick={() => {
                                    dispatch(
                                      updateBooking({
                                        id: q._id,
                                        obj: {
                                          status: "ACCEPTED",
                                          acceptedBy: val,
                                        },
                                      })
                                    );
                                    swal.close();
                                  }}
                                >
                                  Accept
                                </button>
                              </div>
                            </div>
                          ),
                          buttons: {},
                        })
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
