import { useState, useEffect } from "react";
import "./sessionBox.scss";
import { Loader } from "../loader";

function SessionBox() {
  const [passLoading, setPassloading] = useState(false);

  return (
    <>
      <div className="session-box">
        <div className="session-container">
          {passLoading ? (
            <Loader loadingMessage={"Just be there in a moment"} min={2} />
          ) : (
            <>
              <div className="session-container flex flex-col items-center">
                <h1 className="text-3xl text-white mt-5 font-semibold">
                  Choose A Role
                </h1>
                <div className="flex flex-wrap gap-2 ">
                  <div className="role-container">
                    <h1>Donor</h1>
                  </div>
                  <div className="role-container">
                    <h1>Researcher</h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SessionBox;
