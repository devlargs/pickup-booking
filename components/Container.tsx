const Container = (props: any) => {
  return (
    <div className="container">
      <div className="content">
        <div className="content-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Container;
