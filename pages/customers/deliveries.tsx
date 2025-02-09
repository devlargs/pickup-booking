import Header from "components/Header";
import Container from "components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  loadBooking,
  updateBooking,
} from "store/reducers/booking";
import { useEffect } from "react";
import swal from "@sweetalert/with-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";

const Deliveries = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectBookings);

  useEffect(() => {
    dispatch(loadBooking());
  }, [loadBooking, dispatch]);

  const updateStatus = async ({
    id,
    status,
    title = "Are you sure?",
    icon = "warning",
  }: {
    id: string;
    status: string;
    title?: string;
    icon?: string;
  }) => {
    const bool = await swal({
      title,
      icon,
    });

    if (bool) {
      dispatch(
        updateBooking({
          id,
          obj: { status },
        })
      );
    }
  };

  const showBookingDetails = (q) => {
    const contentHtml = ReactDOMServer.renderToString(
      <div style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>Booking Details</h1>
        <hr />
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
        <hr />
        {q.acceptedBy && (
          <div>
            <b>Accepted By:</b> {q.acceptedBy.fullName} (
            {q.acceptedBy.driversLicense})
          </div>
        )}
      </div>
    );

    Swal.fire({
      html: contentHtml,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#16A085",
      confirmButtonText: "Close",
    });
  };

  return (
    <Container>
      <Header title="Booking List" />
      {!loading ? (
        <div style={{ width: "100%", overflowX: "auto", overflowY: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Shipper's Name</th>
                <th>Receiver's Name</th>
                <th>Receiver's Address</th>
                <th>Shipment Type</th>
                <th>Status</th>
                <th>Accepted By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="deliveries-table">
              {data.map((q: any, i: number) => (
                <tr key={i}>
                  <td>{q.shippersName}</td>
                  <td>{q.receiversName}</td>
                  <td>{q.receiversAddress}</td>
                  <td>{q.shipmentType}</td>
                  <td>
                    {q.status === "PENDING" && (
                      <span className="label label-warning">Pending</span>
                    )}
                    {q.status === "ACCEPTED" && (
                      <span className="label label-success">Accepted</span>
                    )}
                    {q.status === "CANCELLED" && (
                      <span className="label label-default">Cancelled</span>
                    )}
                  </td>
                  <td>
                    {q.acceptedBy
                      ? `${q.acceptedBy.fullName} (${q.acceptedBy.driversLicense})`
                      : "-"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info btn-xs  mr-10 mb-3"
                      onClick={() => showBookingDetails(q)}
                    >
                      View
                    </button>
                    {q.status !== "CANCELLED" && q.status !== "DELIVERED" && (
                      <button
                        type="button"
                        className="btn btn-danger btn-xs mr-10 mb-3"
                        onClick={() =>
                          updateStatus({
                            id: q._id,
                            status: "CANCELLED",
                            title: "Cancel this transaction?",
                            icon: "warning",
                          })
                        }
                      >
                        Cancel
                      </button>
                    )}

                    {/* {q.status === "PENDING" && (
                      <button
                        type="button"
                        className="btn btn-success btn-xs mr-10 mb-3"
                        onClick={() =>
                          updateStatus({
                            id: q._id,
                            status: "PROCESSING",
                            title: "Accept Job?",
                          })
                        }
                      >
                        Accept
                      </button>
                    )} */}

                    {/* {q.status === "PROCESSING" && (
                      <button
                        type="button"
                        className="btn btn-success btn-xs mr-10 mb-3"
                        onClick={() =>
                          updateStatus({
                            id: q._id,
                            status: "DELIVERED",
                            title: "Finish Job?",
                          })
                        }
                      >
                        Complete
                      </button>
                    )}

                    {q.status === "CANCELLED" && (
                      <button
                        type="button"
                        className="btn btn-info btn-xs mr-10 mb-3"
                        onClick={() =>
                          updateStatus({
                            id: q._id,
                            status: "PROCESSING",
                            title: "Re-open?",
                          })
                        }
                      >
                        Re-open
                      </button>
                    )} */}
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
export default Deliveries;
