import React, { useEffect, useState } from "react";

function Home() {
  const [inputRegisterName, setInputRegisterName] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setValidationError("");
  }, [inputRegisterName]);

  return <></>;
}

export default Home;
