"use client";
import {
  getProposals,
  providerHandler,
} from "@/app/config/contractInteraction";
import { BigNumber } from "ethers";
import { useEffect } from "react";

function DonorSection() {
  const handleMint = () => {
    console.log("Mint");
  };
  //   useEffect(() => {
  //     (async () => {
  //       await providerHandler();
  //       const proposals = await getProposals();
  //       const p = proposals.filter((v) => {
  //         const bn = BigNumber.from(v[0]._hex);
  //         const fund = bn.toNumber();
  //         return fund > 0;
  //       });
  //       console.log(p);
  //     })();
  //   }, []);

  return (
    <>
      <div className="w-[40rem] flex flex-col justify-center">
        <button
          className="p-2 bg-cyan-600 rounded-lg m-4 "
          onClick={handleMint}
        >
          <span className="text-white">Mint</span>
        </button>
      </div>
    </>
  );
}

export default DonorSection;
