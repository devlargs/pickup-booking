import { ReactElement } from "react";

const Container = (props) => {
  return (
    <div className="container">
      <div className="content">
        <div className="content-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Container;
