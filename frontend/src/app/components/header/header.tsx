import React, { useEffect } from "react";
import "./header.scss";
// import sound from "../../../../public/audio/isSessionMusic.mp3";

import { MdOutlineErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

function Header({ setbackgroundState, status }) {
  //   const inSessionMusic = new Audio(sound);
  //   inSessionMusic.volume = 0.3;
  //   inSessionMusic.loop = false;

  const { open, close } = useAppKit();
  const { address } = useAccount();
  const connectWallet = () => {
    open();
  };

  return (
    <>
      <div className="header-container">
        <p className="font-5xl text-white">Unbound Science</p>
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
              status === "initializing" || status === "connecting"
                ? "connect-btn init"
                : status === "unavailable"
                ? "connect-btn unavailable"
                : "connect-btn"
            }
            onClick={status === "notConnected" ? connectWallet : () => {}}
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

            {status === "notConnected" ? <>Connect</> : null}
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
