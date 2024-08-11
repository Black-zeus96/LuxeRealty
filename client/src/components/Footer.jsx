import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="footer p-32 bg-black">
      <div className="flex lg:flex-row flex-col">
        <div className="text-center my-2">
          <p className="text-white text-2xl font-semibold">LuxeRealty</p>
        </div>
        <div className="flex lg:flex-row flex-col lg:ml-auto gap-3 text-center">
          <span>
            <Link className="text-white" to="/">
              Home
            </Link>
          </span>
          <span>
            <Link className="text-white" to="/About">
              About
            </Link>
          </span>
          <span>
            <Link
              className="text-white"
              target="_blank"
              to="https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/"
            >
              Mortgage Calculator
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
