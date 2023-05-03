import { useNameserviceStore } from "../context/NameserviceContextProvider";
import React, { useState } from "react";

function Resolver() {
  const [inputName, setInputName] = useState("");
  const [inputAddr, setInputAddr] = useState("");

  const {
    isLoading,
    resolvedName,
    resolvedAddr,
    resolveRecord,
    inverseResolve,
  } = useNameserviceStore();

  function handleResolveName() {
    resolveRecord(inputName);
  }

  function handleResolveAddr() {
    inverseResolve(inputAddr);
  }

  return (
    <div className="pt-20" style={{ width: "40%" }}>
      <div className="bg-gray-800 text-gray-100 rounded-lg p-5 text-center">
        <h1 className="text-xl mb-3 underline">Resolver</h1>
        <div className="py-2 flex flex-col gap-2">
          <label className="mb-2 flex gap-1">Name To Resolve: </label>
          <input
            type="text"
            value={inputName}
            placeholder="<name>.inj"
            onChange={(e) => setInputName(e.target.value)}
            className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
          />
          <div className="flex flex-col items-center">
            <button
              onClick={handleResolveName}
              className="btn mt-2"
              disabled={isLoading}
            >
              Resolve Name
            </button>
          </div>
        </div>
        <p>{isLoading ? "loading..." : resolvedName}</p>
        <div className="py-2 flex flex-col gap-2 mt-2">
          <label className="mb-2 flex gap-1">Address To Resolve: </label>
          <input
            type="text"
            value={inputAddr}
            placeholder="inj..."
            onChange={(e) => setInputAddr(e.target.value)}
            className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
          />
          <div className="flex flex-col items-center">
            <button
              onClick={handleResolveAddr}
              className="btn mt-2"
              disabled={isLoading}
            >
              Resolve Address
            </button>
          </div>
        </div>
        <p>{isLoading ? "loading..." : resolvedAddr}</p>
      </div>
    </div>
  );
}

export default Resolver;
