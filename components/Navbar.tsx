import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useEffect } from "react";
import { selectAuth, updateUser } from "store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Navbar = (): ReactElement => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectAuth);

  useEffect(() => {
    if (location) {
      const { pathname } = location;
      if (pathname.includes("drivers")) {
        dispatch(updateUser("drivers"));
      }
    }
  }, []);

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
            <li
              id="customers-main"
              onClick={() => updateAuth("customers")}
              className={`${currentUser === "customers" && "active"}`}
            >
              <Link href="/customers">
                <a className="c-white">Customers</a>
              </Link>
            </li>
            <li
              id="drivers-main"
              onClick={() => updateAuth("drivers")}
              className={`${currentUser === "drivers" && "active"}`}
            >
              <Link href="/drivers">
                <a className="c-white">Drivers</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
