import { useEffect } from "react";
import "./background.scss";

function Background({ status }) {
  let filterState = "filter mask-off";
  let anim;

  if (status === "notConnected") {
    filterState = "filter mask-off";
  } else if (status === "connecting") {
    filterState = "filter mask-connecting";
  }
  if (status === "connected") {
    filterState = "filter mask-connected";
    anim = true;
  }

  return (
    <>
      <div className="background">
        <div className="background-container"></div>
        <div className={filterState}></div>
      </div>
    </>
  );
}

export default Background;
