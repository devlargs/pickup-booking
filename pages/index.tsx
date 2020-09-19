import { useForm } from "react-hook-form";
import Header from "components/Header";
import Container from "components/Container";
import Input from "components/Input";
import Footer from "components/Footer";
import Portlet from "components/Portlet";
import enums from "constants/enums";

const App = () => {
  const { register } = useForm();

  const submit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <Container>
        <Header title="Book A Pick Up" />
        <form onSubmit={submit}>
          <div className="row">
            <div className="col-xs-6">
              <Portlet title="Shippers Information" icon="truck">
                <Input
                  name="shippersName"
                  label="Full Name"
                  register={register}
                />
                <Input
                  name="shippersContactNumber"
                  label="Contact Number"
                  register={register}
                />
                <Input
                  name="shippersAddress"
                  label="Address"
                  register={register}
                />
                <Input
                  name="shippersEmailAddress"
                  label="Email Address"
                  register={register}
                />
              </Portlet>
            </div>

            <div className="col-xs-6">
              <Portlet title="Receivers Information" icon="user">
                <Input
                  name="receiversName"
                  label="Full Name"
                  register={register}
                />

                <Input
                  name="receiversContactNumber"
                  label="Contact Number"
                  register={register}
                />

                <Input
                  name="receiversAddress"
                  label="Address"
                  register={register}
                />
              </Portlet>
            </div>
          </div>

          <Portlet title="Miscellaneous" icon="gear">
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label htmlFor="select-input">Shipment Type</label>
                  <select id="select-input" className="form-control">
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
                  <select id="select-input" className="form-control">
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
                  <select id="select-input" className="form-control">
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
            <button type="button" className="btn btn-success" onClick={submit}>
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
