import { useState, useEffect } from "react";
import "./sessionBox.scss";
import { Loader } from "../loader";
import { DonorSection } from "../DonorSection";
import { ResearcherSection } from "../ResearcherSection";
import { FaArrowLeft } from "react-icons/fa";
import { Londrina_Solid } from "@next/font/google";
const londrina = Londrina_Solid({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

function SessionBox() {
  const [passLoading, setPassloading] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [actor, setActor] = useState("None");

  const handleDonorClick = () => {
    setShowSection(true);
    setActor("DONOR");
  };

  const handleResearcherClick = () => {
    setShowSection(true);
    setActor("RESEARCHER");
  };

  return (
    <>
      <div className="session-box">
        <div className="session-container">
          {passLoading ? (
            <Loader loadingMessage={"Just be there in a moment"} min={2} />
          ) : showSection ? (
            <>
              {actor == "DONOR" ? (
                <div className="session-container flex flex-col items-center">
                  <div className="flex items-center">
                    <FaArrowLeft
                      onClick={() => setShowSection(false)}
                      className="text-white absolute left-0 ml-10"
                    />
                    <h1
                      className={`text-3xl text-white font-semibold ${londrina.className}`}
                    >
                      Donor
                    </h1>
                  </div>
                  <DonorSection />
                </div>
              ) : (
                <>
                  <div className="session-container flex flex-col items-center">
                    <div className="flex items-center">
                      <FaArrowLeft
                        onClick={() => setShowSection(false)}
                        className="text-white absolute left-0 ml-10"
                      />
                      <h1
                        className={`text-3xl text-white font-semibold ${londrina.className}`}
                      >
                        Researcher
                      </h1>
                    </div>
                    <ResearcherSection />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="session-container flex flex-col items-center">
                <h1
                  className={`text-3xl text-white font-semibold ${londrina.className}`}
                >
                  Choose A Role
                </h1>
                <div className="flex flex-wrap gap-2 ">
                  <div className="role-container" onClick={handleDonorClick}>
                    <h1 className={`font-semibold ${londrina.className}`}>
                      Donor
                    </h1>
                  </div>
                  <div
                    className="role-container"
                    onClick={handleResearcherClick}
                  >
                    <h1 className={` font-semibold ${londrina.className}`}>
                      Researcher
                    </h1>
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
