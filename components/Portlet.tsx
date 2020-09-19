import { PropsWithChildren } from "react";

type Props = {
  title: string;
  icon: string;
};

const Portlet = ({ title, children, icon }: PropsWithChildren<Props>) => (
  <div className="portlet">
    <div className="portlet-header">
      <h3 style={{ fontSize: 19 }}>
        <i className={`fa fa-${icon}`} />
        {title}
      </h3>
    </div>
    <div className="portlet-content">{children}</div>
  </div>
);

export default Portlet;
