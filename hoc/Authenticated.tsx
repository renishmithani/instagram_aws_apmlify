import React from "react";

const Authenticated = (Component) => {
  return (props) => <Component {...props} />;
};

export default Authenticated;
