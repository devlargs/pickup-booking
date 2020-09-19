import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "components/Header";
import Container from "components/Container";
import Input from "components/Input";
import Footer from "components/Footer";
import Portlet from "components/Portlet";
import enums from "constants/enums";

const App = () => {
  const { register, errors, handleSubmit, getValues, reset, watch } = useForm();
  const [clicked, setClicked] = useState(false);

  const validate = (e) => {
    return clicked && watch([e])[e] === "";
  };

  const submit = (e: any) => {
    setClicked(true);
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
                  error={validate("shippersName")}
                />
                <Input
                  name="shippersContactNumber"
                  label="Contact Number"
                  register={register}
                  error={validate("shippersContactNumber")}
                />
                <Input
                  name="shippersAddress"
                  label="Address"
                  register={register}
                  error={validate("shippersAddress")}
                />
                <Input
                  name="shippersEmailAddress"
                  label="Email Address"
                  register={register}
                  error={validate("shippersEmailAddress")}
                />
              </Portlet>
            </div>

            <div className="col-xs-6">
              <Portlet title="Receivers Information" icon="user">
                <Input
                  name="receiversName"
                  label="Full Name"
                  register={register}
                  error={validate("receiversName")}
                />

                <Input
                  name="receiversContactNumber"
                  label="Contact Number"
                  register={register}
                  error={validate("receiversContactNumber")}
                />

                <Input
                  name="receiversAddress"
                  label="Address"
                  register={register}
                  error={validate("receiversAddress")}
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
            <button type="submit" className="btn btn-success" onClick={submit}>
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
