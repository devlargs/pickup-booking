import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPencilAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
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
          <li>
            <Link href="/">
              <a>
                <i>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </i>
                Book a Pick Up
              </a>
            </Link>
          </li>
          <li>
            <Link href="/deliveries">
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
        </ul>
      </div>
    </div>
  </div>
);

export default Navbar;
