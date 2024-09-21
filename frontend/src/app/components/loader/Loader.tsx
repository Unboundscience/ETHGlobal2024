import React from "react";

import "./loader.scss";

import { AiOutlineLoading } from "react-icons/ai";

function Loader({ loadingMessage, min }) {
  return (
    <div className={`loader-container ${min ? `min-container` : null}`}>
      <AiOutlineLoading />
      {loadingMessage ? <h1>{loadingMessage}</h1> : null}
    </div>
  );
}

export default Loader;
