import Container from "components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Error = () => (
  <Container>
    <div className="row">
      <div className="col-md-12">
        <div className="error-container">
          <div className="error-code">404</div>

          <div className="error-details">
            <h4>There was a problem serving the requested page.</h4>
            <br />
            <p>
              <strong>What should I do:</strong>
            </p>

            <ul className="icons-list">
              <li>
                <i className="icon-li">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </i>
                you can try refreshing the page, the problem may be temporary
              </li>
              <li>
                <i className="icon-li">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </i>
                if you entered the url by hand, double check that it is correct
              </li>
              <li>
                <i className="icon-li">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </i>
                Nothing! we've been notified of the problem and will do our best
                to make sure it doesn't happen again!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default Error;
