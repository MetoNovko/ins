import { useNameserviceStore } from "../context/NameserviceContextProvider";
import React, { useState } from "react";

function Resolver() {
  const [inputRegisterName, setInputRegisterName] = useState("");
  const [validationError, setValidationError] = useState("");

  const { config, isLoading, error, registerName } = useNameserviceStore();

  function handleRegisterName() {
    setValidationError("");
    if (inputRegisterName.length < 3 || inputRegisterName.length > 64) {
      setValidationError("Name should be 3-64 chars long");
      return;
    }
    if (inputRegisterName.match(/[^a-zA-Z\d\s:\_\.\-]/)) {
      setValidationError("Only alphanumeric values are allowed with (. - _)");
      return;
    }
    registerName(inputRegisterName.trim().toLowerCase());
  }

  return (
    <div className="pt-20" style={{ width: "40%" }}>
      <div className="bg-gray-800 text-gray-100 rounded-lg p-5 text-center">
        <div>
          <h1 className="text-xl mb-3 underline">Registrar</h1>
          <p className="my-1">
            Register price:{" "}
            {isLoading ? "loading..." : config.register_price ?? "0inj"}
          </p>
          <p className="my-1">
            Transfer price:{" "}
            {isLoading ? "loading..." : config.transfer_price ?? "0inj"}
          </p>
        </div>
        <div className="my-2 flex flex-col gap-2">
          <label className="mb-2 flex gap-1">Name To Register: </label>
          <input
            type="text"
            value={inputRegisterName}
            placeholder="<name>.inj"
            onChange={(e) => setInputRegisterName(e.target.value)}
            className="border rounded-lg p-2 text-gray-600 placeholder:text-gray-300"
          />
          <div className="flex flex-col items-center">
            <button
              onClick={handleRegisterName}
              className="btn mt-2"
              disabled={!inputRegisterName}
            >
              Register Name
            </button>
          </div>
        </div>
        <p className="text-red-400 my-2">{error}</p>
        <p className="text-red-400 my-2">{validationError}</p>
      </div>
    </div>
  );
}

export default Resolver;
