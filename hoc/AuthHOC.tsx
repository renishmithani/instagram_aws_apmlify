import { useEffect } from "react";

export default function AuthHOC(Component) {
  return (props) => <Component {...props} />;
}
