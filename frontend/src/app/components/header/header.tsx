"use client";

import React, { useEffect } from "react";
import "./header.scss";
// import sound from "../../../../public/audio/isSessionMusic.mp3";

import { MdOutlineErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { Londrina_Solid } from "@next/font/google";

function Header({ setbackgroundState, status }) {
  //   const inSessionMusic = new Audio(sound);
  //   inSessionMusic.volume = 0.3;
  //   inSessionMusic.loop = false;

  const { open, close } = useAppKit();
  const { address } = useAccount();
  const connectWallet = () => {
    open();
  };

  useEffect(() => {
    console.log(status);
  }, []);
  return (
    <>
      <div className="header-container">
        <h1 className={`text-3xl text-white font-semibold`}>UBS</h1>
        {status === "connected" ? (
          <button onClick={connectWallet}>
            <div className="wallet-address">
              <p>
                {address
                  ? address.slice(0, 5) + "...." + address.slice(-4)
                  : "Not Connected"}
              </p>
            </div>
          </button>
        ) : (
          <button
            className={
              status === "initializing" ||
              status === "connecting" ||
              status === "reconnecting"
                ? "connect-btn init"
                : status === "unavailable"
                ? "connect-btn unavailable"
                : "connect-btn"
            }
            onClick={status === "notConnected" ? connectWallet : connectWallet}
          >
            {status === "initializing" || status === "connecting" ? (
              <>
                <AiOutlineLoading /> Initializing
              </>
            ) : null}
            {/* {status === "unavailable" ? (
              <>
                <MdOutlineErrorOutline /> Install Metamask
              </>
            ) : null} */}
            Connect
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
