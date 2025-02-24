import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Footers from "./Footers";

const Layout = () => {
  return (
    <div>
      <Headers></Headers>
      <div className="min-h-svh">
        <Outlet></Outlet>
      </div>
      <Footers></Footers>
    </div>
  );
};

export default Layout;
