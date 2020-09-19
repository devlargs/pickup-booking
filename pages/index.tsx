import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "components/Header";
import Container from "components/Container";
import Input from "components/Input";
import Footer from "components/Footer";
import Portlet from "components/Portlet";
import enums from "constants/enums";
// import { toast } from "react-toastify";
// import toastOptions from "constants/toastOptions";
import { addBooking, selectBookings } from "store/reducers/booking";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, reset, watch } = useForm();
  const [clicked, setClicked] = useState(false);
  const { data, loading } = useSelector(selectBookings);

  // useEffect(() => {
  //   if (clicked && !loading) {
  //     toast.success("Successfully added booking", toastOptions);
  //     console.log(data);
  //     // reset();
  //     // setClicked(false);
  //   }
  // }, [clicked, loading, reset, setClicked]);

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
    console.log(getValues());
    console.log(
      Boolean(
        receiversAddress &&
          receiversContactNumber &&
          receiversName &&
          shippersAddress &&
          shippersContactNumber &&
          shippersEmailAddress &&
          shippersName
      )
    );

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
    console.log(validateForm(), "wtf");
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
              <Portlet title="Shippers Information" icon="truck">
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
              <Portlet title="Receivers Information" icon="user">
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

          <Portlet title="Miscellaneous" icon="gear">
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
            >
              Submit
            </button>
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default App;
