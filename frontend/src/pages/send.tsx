import { useNameserviceStore } from "../context/NameserviceContextProvider";
import React, { useState } from "react";
import { useWalletStore } from "../context/WalletContextProvider";
import { denomAmountFromChainDenomAmountToFixed } from "@injectivelabs/sdk-ts";

function Send() {
  const [inputSendToName, setInputSendToName] = useState("");
  const [sendToAmount, setSendToAmount] = useState(0);
  const [validationError, setValidationError] = useState("");
  const [pickedDenom, setPickedDenom] = useState("inj");
  const [pickedDenomDecimals, setPickedDenomDecimals] = useState(18);

  const { allBalances } = useWalletStore();

  const { error, sendToName } = useNameserviceStore();

  function handleSendToName() {
    sendToName(inputSendToName, sendToAmount, pickedDenom, pickedDenomDecimals);
  }

  return (
    <div className="pt-20" style={{ width: "40%" }}>
      <div className="bg-gray-800 text-gray-100 rounded-lg p-5 text-center">
        <div>
          <h1 className="text-xl mb-3 underline">Send to Name</h1>
        </div>
        <div>
          <div className="my-2 flex flex-col gap-2">
            <div className="mt-2 flex flex-col gap-1">
              <label className="mb-2 flex gap-1">Name: </label>
              <input
                type="text"
                value={inputSendToName}
                placeholder="<name>.inj"
                onChange={(e) => setInputSendToName(e.target.value)}
                className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label className="mb-2 flex gap-1">Amount: </label>
              <input
                type="number"
                value={sendToAmount}
                step={1}
                placeholder="<name>.inj"
                onChange={(e) => setSendToAmount(parseFloat(e.target.value))}
                className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleSendToName}
                className="btn mt-2"
                disabled={!inputSendToName && !sendToAmount && !pickedDenom}
              >
                Send to Name
              </button>
            </div>
          </div>
          <p className="text-red-400 my-2">{error}</p>
          <p className="text-red-400 my-2">{validationError}</p>
        </div>
        <h1 className="text-xl mt-6 mb-2">Balances: </h1>
        <div className="flex flex-col gap-2">
          {allBalances?.map((balance, index) => (
            <div key={index}>
              <button
                className={`w-full ${
                  pickedDenom === balance.denom
                    ? "bg-teal-500"
                    : "bg-transparent"
                } border-2 border-teal-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-teal-500 transition-all duration-200`}
                onClick={() => {
                  setPickedDenom(balance.denom);
                  setPickedDenomDecimals(
                    balance.denom.startsWith("factory/") ||
                      balance.denom.startsWith("peggy0x87")
                      ? 6
                      : 18
                  );
                }}
              >
                {`${denomAmountFromChainDenomAmountToFixed({
                  value: balance.amount,
                  decimals:
                    balance.denom.startsWith("factory/") ||
                    balance.denom.startsWith("peggy0x87")
                      ? 6
                      : 18,
                })} ${
                  balance.denom.startsWith("factory")
                    ? balance.denom.split("/")[2]
                    : balance.denom ===
                      "peggy0x44C21afAaF20c270EBbF5914Cfc3b5022173FEB7"
                    ? "Ape Coin"
                    : balance.denom ===
                      "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5"
                    ? "Tether"
                    : balance.denom
                }`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Send;
