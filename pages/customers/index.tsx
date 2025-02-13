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
import casual from "casual-browserify";

const App = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, setValue, reset, watch } =
    useForm();
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
      shippersName,
    } = getValues();

    return Boolean(
      receiversAddress &&
        receiversContactNumber &&
        receiversName &&
        shippersAddress &&
        shippersContactNumber &&
        shippersName
    );
  };

  const randomize = () => {
    setValue("shippersName", casual.full_name);
    setValue("shippersContactNumber", casual.phone);
    setValue("shippersAddress", casual.address1);
    setValue("receiversName", casual.full_name);
    setValue("receiversContactNumber", casual.phone);
    setValue("receiversAddress", casual.address1);
    setValue("shipmentType", casual.random_element(enums.shipmentType));
    setValue("paymentMode", casual.random_element(enums.paymentMode));
    setValue("modeOfService", casual.random_element(enums.modeOfService));
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
            <div className="col-lg-6">
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
              </Portlet>
            </div>

            <div className="col-lg-6">
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
              className="btn btn-danger"
              style={{ marginRight: 10 }}
              onClick={() => {
                reset();
                setClicked(false);
              }}
              type="button"
            >
              Reset
            </button>

            <button
              className="btn btn-info"
              style={{ marginRight: 10 }}
              onClick={randomize}
              type="button"
            >
              Fill Up Randomly
            </button>

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
