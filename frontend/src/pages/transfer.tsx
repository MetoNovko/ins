import { useNameserviceStore } from "../context/NameserviceContextProvider";
import React, { useState } from "react";

function Transfer() {
  const [inputTransferName, setInputTransferName] = useState("");
  const [inputTransferNameTo, setInputTransferNameTo] = useState("");
  const [validationError, setValidationError] = useState("");

  const { config, isLoading, error, transferName } = useNameserviceStore();

  function handleTransferName() {
    transferName(inputTransferName, inputTransferNameTo);
  }

  return (
    <div className="pt-20" style={{ width: "40%" }}>
      <div className="bg-gray-800 text-gray-100 rounded-lg p-5 text-center">
        <div>
          <h1 className="text-xl mb-3 underline">Transfer Name</h1>
          <p className="my-1">
            Register price:{" "}
            {isLoading ? "loading..." : config.register_price ?? "0inj"}
          </p>
          <p className="my-1">
            Transfer price:{" "}
            {isLoading ? "loading..." : config.transfer_price ?? "0inj"}
          </p>
        </div>
        <div>
          <div className="my-2 flex flex-col gap-2">
            <div className="mt-2 flex flex-col gap-1">
              <label className="mb-2 flex gap-1">Name: </label>
              <input
                type="text"
                value={inputTransferName}
                placeholder="<name>.inj"
                onChange={(e) => setInputTransferName(e.target.value)}
                className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label className="mb-2 flex gap-1">To: </label>
              <input
                type="text"
                value={inputTransferNameTo}
                placeholder="inj1..."
                onChange={(e) => setInputTransferNameTo(e.target.value)}
                className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleTransferName}
                className="btn mt-2"
                disabled={!inputTransferName && !inputTransferNameTo}
              >
                Transfer Name
              </button>
            </div>
          </div>
          <p className="text-red-400 my-2">{error}</p>
          <p className="text-red-400 my-2">{validationError}</p>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
