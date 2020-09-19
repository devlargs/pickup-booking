import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "components/Header";
import Container from "components/Container";
import Input from "components/Input";
import Portlet from "components/Portlet";
import enums from "constants/enums";
import { addBooking, selectBookings } from "store/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import { faCogs, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, reset, watch } = useForm();
  const [clicked, setClicked] = useState(false);
  const { loading } = useSelector(selectBookings);

  const isValid = (e) => {
    return clicked && watch([e])[e] === "";
  };

  const validateForm = (): Boolean => {
    const {
      receiversAddress,
      receiversContactNumber,
      receiversName,
      shippersAddress,
      shippersContactNumber,
      shippersEmailAddress,
      shippersName,
    } = getValues();

    return Boolean(
      receiversAddress &&
        receiversContactNumber &&
        receiversName &&
        shippersAddress &&
        shippersContactNumber &&
        shippersEmailAddress &&
        shippersName
    );
  };

  const submit = (e: any) => {
    setClicked(true);
    if (validateForm()) {
      dispatch(addBooking(getValues()));
      reset();
      setClicked(false);
    }
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Header title="Book A Pick Up" />
        <form onSubmit={handleSubmit(submit)}>
          <div className="row">
            <div className="col-xs-6">
              <Portlet title="Shippers Information" icon={faTruck}>
                <Input
                  name="shippersName"
                  label="Full Name"
                  register={register({
                    required: true,
                  })}
                  error={isValid("shippersName")}
                />
                <Input
                  name="shippersContactNumber"
                  label="Contact Number"
                  register={register}
                  error={isValid("shippersContactNumber")}
                />
                <Input
                  name="shippersAddress"
                  label="Address"
                  register={register}
                  error={isValid("shippersAddress")}
                />
                <Input
                  name="shippersEmailAddress"
                  label="Email Address"
                  register={register}
                  error={isValid("shippersEmailAddress")}
                />
              </Portlet>
            </div>

            <div className="col-xs-6">
              <Portlet title="Receivers Information" icon={faUser}>
                <Input
                  name="receiversName"
                  label="Full Name"
                  register={register}
                  error={isValid("receiversName")}
                />

                <Input
                  name="receiversContactNumber"
                  label="Contact Number"
                  register={register}
                  error={isValid("receiversContactNumber")}
                />

                <Input
                  name="receiversAddress"
                  label="Address"
                  register={register}
                  error={isValid("receiversAddress")}
                />
              </Portlet>
            </div>
          </div>

          <Portlet title="Miscellaneous" icon={faCogs}>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label htmlFor="select-input">Shipment Type</label>
                  <select
                    id="select-input"
                    className="form-control"
                    ref={register}
                    name="shipmentType"
                  >
                    {enums.shipmentType.map((q: string, i: number) => (
                      <option value={q} key={i}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label htmlFor="select-input">Mode of Payment</label>
                  <select
                    id="select-input"
                    className="form-control"
                    ref={register}
                    name="paymentMode"
                  >
                    {enums.paymentMode.map((q) => (
                      <option value={q} key={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label htmlFor="select-input">Mode of Service</label>
                  <select
                    id="select-input"
                    className="form-control"
                    ref={register}
                    name="modeOfService"
                  >
                    {enums.modeOfService.map((q) => (
                      <option value={q} key={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Portlet>

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              className="btn btn-success"
              onClick={submit}
              disabled={loading}
              id="booking-submit-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </Container>
      <div style={{ height: 20 }} />
    </>
  );
};

export default App;
