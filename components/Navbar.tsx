import Link from "next/link";

const Navbar = () => (
  <div className="mainbar">
    <div className="container">
      <button
        type="button"
        className="btn mainbar-toggle"
        data-toggle="collapse"
        data-target=".mainbar-collapse"
      >
        <i className="fa fa-bars"></i>
      </button>
      <div className="mainbar-collapse collapse">
        <ul className="nav navbar-nav mainbar-nav">
          <li>
            <Link href="/">
              <a>
                <i className="fa fa-pencil"></i>
                Book a Pick Up
              </a>
            </Link>
          </li>
          <li>
            <Link href="/deliveries">
              <a>
                <>
                  <i className="fa fa-truck"></i>
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
