import Header from "components/Header";
import Container from "components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  loadBooking,
  updateBooking,
} from "store/reducers/booking";
import { selectDrivers, loadDrivers } from "store/reducers/drivers";
import { useEffect } from "react";
import swal from "@sweetalert/with-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(selectBookings);
  const { data } = useSelector(selectDrivers);

  useEffect(() => {
    dispatch(loadBooking());
    dispatch(loadDrivers());
  }, [loadBooking, dispatch, loadDrivers]);

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
                    {q.status === "PENDING" && (
                      <span className="label label-warning">Pending</span>
                    )}
                    {q.status === "PROCESSING" && (
                      <span className="label label-secondary">Processing</span>
                    )}
                    {q.status === "DELIVERED" && (
                      <span className="label label-success">Delivered</span>
                    )}
                    {q.status === "CANCELLED" && (
                      <span className="label label-default">Cancelled</span>
                    )}
                  </td>
                  <td>{q.paymentMode}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info btn-xs  mr-10 mb-3"
                      onClick={() =>
                        swal({
                          content: (
                            <div style={{ textAlign: "left" }}>
                              <div>
                                <b>Shipper's Name</b>: {q.shippersName}
                              </div>
                              <div>Shipper's Address: {q.shippersAddress}</div>
                              <div>
                                Shippers Contact Number:{" "}
                                {q.shippersContactNumber}
                              </div>
                              <hr />
                              <div>
                                <b>Receiver's Name</b>: {q.receiversName}
                              </div>
                              <div>
                                Receiver's Contact Number:{" "}
                                {q.receiversContactNumber}
                              </div>
                              <div>
                                Receiver's Address: {q.receiversAddress}
                              </div>
                              <hr />
                              <div>Shipment Type: {q.shipmentType}</div>
                              <div>Mode of Service: {q.modeOfService}</div>
                              <div>Payment Mode: {q.paymentMode}</div>
                            </div>
                          ),
                          buttons: {},
                        })
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-xs  mr-10 mb-3"
                      onClick={() =>
                        swal({
                          content: (
                            <div style={{ textAlign: "left" }}>
                              <h3>Please select driver</h3>
                              <select style={{ padding: 10, width: "100%" }}>
                                {data.map((q) => (
                                  <option key={q._id}>
                                    {q.fullName} ({q.driversLicense})
                                  </option>
                                ))}
                              </select>
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
