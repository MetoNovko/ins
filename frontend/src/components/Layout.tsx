import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Head>
        <title>INS</title>
      </Head>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <aside className="basis-1 lg:basis-1/6 h-full lg:min-h-[90vh]">
          <Sidebar />
        </aside>
        <main className="basis-1 lg:basis-5/6 flex justify-center">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
