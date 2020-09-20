import { useState } from "react";
import {
  faIdCard,
  faSpinner,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import Container from "components/Container";
import Header from "components/Header";
import Input from "components/Input";
import Portlet from "components/Portlet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addDriver, selectDrivers } from "store/reducers/drivers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Listing = () => {
  const dispatch = useDispatch();
  const { data, addLoading } = useSelector(selectDrivers);
  const { register, handleSubmit, getValues, reset, watch } = useForm();
  const [clicked, setClicked] = useState(false);

  const isValid = (e) => {
    return clicked && watch([e])[e] === "";
  };

  const validateForm = (): Boolean => {
    const { fullName, driversLicense } = getValues();
    return Boolean(fullName && driversLicense);
  };

  const submit = (e) => {
    setClicked(true);
    if (validateForm()) {
      dispatch(addDriver(getValues()));
      reset();
      setClicked(false);
    }
    e.preventDefault();
  };

  return (
    <Container>
      <Header title="Drivers" />

      <div className="row">
        <div className="col-md-6">
          <Portlet title="Add a Driver" icon={faIdCard}>
            <form onSubmit={handleSubmit(submit)}>
              <Input
                label="Full Name"
                register={register}
                name="fullName"
                error={isValid("fullName")}
              />
              <Input
                label="Driver's License"
                register={register}
                name="driversLicense"
                error={isValid("driversLicense")}
              />
              <div style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={submit}
                  disabled={addLoading}
                >
                  {addLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Add Driver"
                  )}
                </button>
              </div>
            </form>
          </Portlet>
        </div>
        <div className="col-md-6">
          <Portlet title="Lists" icon={faTable}>
            table
          </Portlet>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
