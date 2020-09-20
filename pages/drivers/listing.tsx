import { useEffect, useState } from "react";
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
import { addDriver, selectDrivers, loadDrivers } from "store/reducers/drivers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import casual from "casual-browserify";

const Listing = () => {
  const dispatch = useDispatch();
  const { data, addLoading, loading } = useSelector(selectDrivers);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
  } = useForm();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch(loadDrivers());
  }, []);

  const randomize = () => {
    setValue("fullName", casual.full_name);
    setValue(
      "driversLicense",
      `${casual.word.substr(0, 3).toUpperCase()}-${casual
        .array_of_digits(10)
        .join("")}`
    );
  };

  const isValid = (e: any) => {
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
        <div className="col-md-5">
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
                  type="button"
                  className="btn btn-info"
                  style={{ marginRight: 10 }}
                  onClick={randomize}
                >
                  Fill up randomly
                </button>
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
        <div className="col-md-7">
          <Portlet title="Lists" icon={faTable}>
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <div
                style={{ width: "100%", overflowY: "auto", overflowX: "auto" }}
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>License Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((q) => (
                      <tr>
                        <td>{q.fullName}</td>
                        <td>{q.driversLicense}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Portlet>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
