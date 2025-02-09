import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCar,
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
              <>
                <li>
                  <Link href="/drivers" legacyBehavior>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faPeopleCarry} />
                      </i>
                      Job Listing
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/drivers/listing" legacyBehavior>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faCar} />
                      </i>
                      Drivers
                    </a>
                  </Link>
                </li>
              </>
            )}
            {currentUser === "customers" && (
              <>
                <li id="book-a-pick-up">
                  <Link href="/customers" legacyBehavior>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </i>
                      Book a Pick Up
                    </a>
                  </Link>
                </li>
                <li id="booking-list">
                  <Link href="/customers/deliveries" legacyBehavior>
                    <a>
                      <>
                        <i>
                          <FontAwesomeIcon icon={faTruck} />
                        </i>
                        Booking List
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
