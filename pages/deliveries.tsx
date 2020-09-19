import Header from "components/Header";
import Container from "components/Container";
import { useDispatch, useSelector } from "react-redux";
import { selectBookings, loadBooking } from "store/reducers/booking";
import { useEffect } from "react";

const Deliveries = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectBookings);

  useEffect(() => {
    dispatch(loadBooking());
  }, [loadBooking, dispatch]);

  return (
    <Container>
      <Header title="Deliveries" />
      {loading ? (
        <>loading table..</>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Shipper's Name</th>
              <th>Receiver's Name</th>
              <th>Receiver's Address</th>
              <th>Shipment Type</th>
              <th>Mode of Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((q) => (
              <tr>
                <td>{q.shippersName}</td>
                <td>{q.receiversName}</td>
                <td>{q.receiversAddress}</td>
                <td>{q.shipmentType}</td>
                <td>{q.paymentMode}</td>
                <td>
                  {q.status === "PENDING" && (
                    <span className="label label-secondary">Pending</span>
                  )}
                  {q.status === "SUCCESS" && (
                    <span className="label label-success">Delivered</span>
                  )}
                  {q.status === "CANCELLED" && (
                    <span className="label label-default">Cancelled</span>
                  )}
                </td>
                <td>
                  <button type="button" className="btn btn-info btn-xs">
                    View
                  </button>

                  {q.status === "PENDING" && (
                    <button type="button" className="btn btn-info btn-xs ml-10">
                      Accept Job
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};
export default Deliveries;
