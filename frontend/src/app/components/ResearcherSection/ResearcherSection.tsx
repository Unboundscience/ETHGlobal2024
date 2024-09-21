"use client";

import { useState } from "react";
import { ProposalBlock } from "../proposalBlock";
import { providerHandler, propose } from "@/app/config/contractInteraction";
import { useAccount } from "wagmi/dist/types/exports";

function ResearcherSection() {
  const [inputFund, setInputFund] = useState(0);
  const handlePropose = async () => {
    await providerHandler();
    await propose(inputFund);
  };

  return (
    <>
      <div className="w-[30rem]">
        <div>
          <form action="">
            <div>
              <h1 className={`text-xl font-bold text-white `}>Fund</h1>

              <input
                type="number"
                id="fund"
                value={inputFund}
                onChange={(e: any) => {
                  setInputFund(e.target.value);
                }}
                className="border w-full rounded p-2"
              />
            </div>
          </form>
          <button
            className="w-full p-2 bg-cyan-600 rounded-lg mt-4 mb-2"
            onClick={() => handlePropose()}
          >
            <span className="text-white">Submit</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ResearcherSection;
