"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";

const Home: React.FC = () => {
  const texts = [
    "A creator economy for scientists and inventors, powered by web3.",
    "Unlocking secret technologies and preserving/sharing them.",
    "Using blockchain to revolutionize the world since the industrial revolution.",
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (forward) {
          // Typing
          if (subIndex < texts[index].length) {
            setSubIndex(subIndex + 1);
          } else {
            // Pause before deleting
            setTimeout(() => setForward(false), 1000);
          }
        } else {
          // Deleting
          if (subIndex > 0) {
            setSubIndex(subIndex - 1);
          } else {
            setForward(true);
            setIndex((index + 1) % texts.length);
          }
        }
      },
      forward ? 100 : 50
    ); // Typing speed (100ms) and deleting speed (50ms)

    return () => clearTimeout(timeout);
  }, [subIndex, forward, index, texts]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center  text-white font-retro px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl mb-6 text-center">
          {texts[index].substring(0, subIndex)}
          <span className="blinking-cursor">|</span>
        </h1>
        <w3m-button />
      </div>
    </div>
  );
};

export default Home;
