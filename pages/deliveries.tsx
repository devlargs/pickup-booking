import Header from "components/Header";
import Container from "components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  loadBooking,
  updateBooking,
} from "store/reducers/booking";
import { useEffect } from "react";
import swal from "sweetalert";

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

  return (
    <Container>
      <Header title="Deliveries" />
      {/* {loading ? (
        <>loading table..</>
      ) : ( */}
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
          {data.map((q) => (
            <tr>
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
                <button type="button" className="btn btn-info btn-xs">
                  View
                </button>
                {q.status !== "CANCELLED" && q.status !== "DELIVERED" && (
                  <button
                    type="button"
                    className="btn btn-danger btn-xs ml-10"
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

                {q.status === "PENDING" && (
                  <button
                    type="button"
                    className="btn btn-success btn-xs ml-10"
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
                )}

                {q.status === "PROCESSING" && (
                  <button
                    type="button"
                    className="btn btn-success btn-xs ml-10"
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
                    className="btn btn-info btn-xs ml-10"
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
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* )} */}
    </Container>
  );
};
export default Deliveries;
