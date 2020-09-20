import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPencilAlt,
  faPeopleCarry,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { selectAuth } from "store/reducers/auth";
import { useSelector } from "react-redux";

const Mainbar = () => {
  const { currentUser } = useSelector(selectAuth);

  return (
    <div className="mainbar">
      <div className="container">
        <button
          type="button"
          className="btn mainbar-toggle"
          data-toggle="collapse"
          data-target=".mainbar-collapse"
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
        </button>
        <div className="mainbar-collapse collapse">
          <ul className="nav navbar-nav mainbar-nav">
            {currentUser === "drivers" && (
              <li>
                <Link href="/drivers">
                  <a>
                    <i>
                      <FontAwesomeIcon icon={faPeopleCarry} />
                    </i>
                    Job Listing
                  </a>
                </Link>
              </li>
            )}
            {currentUser === "customers" && (
              <>
                <li>
                  <Link href="/customers">
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </i>
                      Book a Pick Up
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/customers/deliveries">
                    <a>
                      <>
                        <i>
                          <FontAwesomeIcon icon={faTruck} />
                        </i>
                        Deliveries
                      </>
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
