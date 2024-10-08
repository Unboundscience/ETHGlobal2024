"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { providerHandler } from "./config/contractInteraction";

import { useAccount } from "wagmi";

import { Background } from "./components/background";
import SessionBox from "./components/sessionBox/SessionBox";
import Header from "./components/header/header";
import { CursorCompanion } from "./components/cursorCompanion";

const Home: React.FC = () => {
  const texts = ["Unbound Science spreads technology globally."];
  const { status, address } = useAccount();

  const [backgroundState, setbackgroundState] = useState(0);

  return (
    <>
      <Background status={status} />
      <Header setbackgroundState={setbackgroundState} status={status} />
      {status === "connected" ? <SessionBox /> : <></>}
      <CursorCompanion />
    </>
  );
};

export default Home;
