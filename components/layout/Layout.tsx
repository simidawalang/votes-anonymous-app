import React, { ReactNode } from "react";
import Header from "./Header";

interface PropTypes {
  children: ReactNode;
}
const Layout = ({ children }: PropTypes) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
