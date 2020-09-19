import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  title: string;
  icon: IconDefinition;
};

const Portlet = ({ title, children, icon }: PropsWithChildren<Props>) => (
  <div className="portlet">
    <div className="portlet-header">
      <h3 style={{ fontSize: 19 }}>
        <i>
          <FontAwesomeIcon icon={icon} />
        </i>
        {title}
      </h3>
    </div>
    <div className="portlet-content">{children}</div>
  </div>
);

export default Portlet;
