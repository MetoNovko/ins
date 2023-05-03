import React from "react";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-gray-100">
      <div className="mx-auto flex justify-between items-center py-2">
        <div className="basis-1/6 flex justify-center">
          <Link
            href="/resolver"
            className="opacity-100 hover:opacity-90 transition-all duration-200"
          >
            <img src="INS.png" alt="INS-logo" height="70px" width="70px" />
          </Link>
        </div>
        <div className="basis-3/6">
        </div>
        <div className="basis-2/6 flex justify-end">
          <ConnectWallet />
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Navbar;
