"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { providerHandler } from "./config/contractInteraction";
import { Londrina_Solid } from "@next/font/google";
import { useAccount } from "wagmi";

import { Background } from "./components/background";
import Header from "./components/header/header";
const londrina = Londrina_Solid({
  weight: ["300"], // Specify the weights you want
  subsets: ["latin"], // Specify the subsets
  display: "swap", // Optional: swap for better rendering
});

const Home: React.FC = () => {
  const texts = ["Unbound Science spreads technology globally."];
  const { status, address } = useAccount();

  const [backgroundState, setbackgroundState] = useState(0);
  // useEffect(() => {
  //   // governanceDecimals();
  //   const init = async () => {
  //     try {
  //       await providerHandler();

  //       // const usdc = await getUsdc();
  //       // console.log(usdc.address);
  //       // console.log(await governanceDecimals());
  //     } catch (error) {
  //       console.error("Some Error in init", error);
  //     }
  //   };

  //   init();
  // }, []);

  return (
    // <div>
    //   <Navbar />
    //   <div className="min-h-screen flex flex-col items-center justify-center font-bold text-white font-retro px-4">
    //     <h1
    //       className={`text-2xl md:text-4xl lg:text-5xl mb-6 text-center ${londrina.className}`}
    //     >
    //       {texts[index].substring(0, subIndex)}
    //     </h1>
    //     {/* <w3m-button /> */}
    //   </div>
    // </div>
    <>
      <Background status={status} />
      <Header setbackgroundState={setbackgroundState} status={status} />
    </>
  );
};

export default Home;
