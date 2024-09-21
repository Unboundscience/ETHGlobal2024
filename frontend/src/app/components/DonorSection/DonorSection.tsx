"use client";
import { useState } from "react";
import {
  getProposals,
  providerHandler,
  mint,
} from "@/app/config/contractInteraction";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { ProposalBlock } from "../proposalBlock";

function DonorSection({ showMintSection, setShowMintSection }) {
  // update the USDC tokens if redeployed the contract.

  //anyone can call this function. but they have to hold some USDC. the one who get all USDC is the deployer.
  const handleMint = async (value: number) => {
    await providerHandler();
    await mint(value);
  };

  const [mintValue, setMintValue] = useState(0);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    (async () => {
      await providerHandler();
      const proposals = await getProposals();
      const p = proposals.filter((v) => {
        const bn = BigNumber.from(v[0]._hex);
        const fund = bn.toNumber();
        return fund > 0;
      });
      setProposals(p);
    })();
  }, []);

  return (
    <>
      <div className="w-[40rem] flex flex-col justify-center">
        {showMintSection ? (
          <>
            <div className="mt-5">
              <input
                type="number"
                id="fund"
                value={mintValue}
                onChange={(e: any) => {
                  setMintValue(e.target.value);
                }}
                className="border w-full rounded p-2"
              />

              <button
                className="w-full p-2 bg-cyan-600 rounded-lg mt-4 mb-2"
                onClick={() => handleMint(mintValue)}
              >
                <span className="text-white">Send!</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="m-3">
              {proposals.map((proposal, index) => (
                <ProposalBlock key={index} />
              ))}
            </div>

            <button
              className="p-2 bg-cyan-600 rounded-lg m-4 "
              onClick={() => setShowMintSection(true)}
            >
              <span className="text-white">Donate Funds</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default DonorSection;
