import { useState, useEffect } from "react";
import "./sessionBox.scss";
import { Loader } from "../loader";
import { DonorSection } from "../DonorSection";
import { ResearcherSection } from "../ResearcherSection";
import { FaArrowLeft } from "react-icons/fa";
import { Londrina_Solid } from "@next/font/google";
import Figure1 from "../../../../public/images/figure.png";
import Figure2 from "../../../../public/images/flipfigure.png";
import Image from "next/image";
const londrina = Londrina_Solid({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

function SessionBox() {
  const [passLoading, setPassloading] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [showMintSection, setShowMintSection] = useState(false);
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
                      onClick={() => {
                        showMintSection
                          ? setShowMintSection(false)
                          : setShowSection(false);
                      }}
                      className="text-white absolute left-0 ml-10"
                    />
                    <h1
                      className={`text-3xl text-white font-semibold ${londrina.className}`}
                    >
                      {showMintSection ? <>Donate USDC</> : <>Donor</>}
                    </h1>
                  </div>
                  <DonorSection
                    showMintSection={showMintSection}
                    setShowMintSection={setShowMintSection}
                  />
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
                    <h1
                      className={`text-4xl font-semibold mr-5 ${londrina.className}`}
                    >
                      Donor
                    </h1>
                    <Image src={Figure1} alt="" />
                  </div>
                  <div
                    className="role-container"
                    onClick={handleResearcherClick}
                  >
                    <Image src={Figure2} alt="" />
                    <h1
                      className={` text-4xl font-semibold ml-5 ${londrina.className}`}
                    >
                      Scientist
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
