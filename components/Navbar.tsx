import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";
import { selectAuth, updateUser } from "store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (): ReactElement => {
  const dispatch = useDispatch();

  const updateAuth = (currentUser: string) => {
    dispatch(updateUser(currentUser));
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <FontAwesomeIcon icon={faCogs} />
          </button>
        </div>

        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li onClick={() => updateAuth("customers")}>
              <a className="c-white">Customers</a>
            </li>
            <li onClick={() => updateAuth("drivers")}>
              <a className="c-white">Drivers</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
