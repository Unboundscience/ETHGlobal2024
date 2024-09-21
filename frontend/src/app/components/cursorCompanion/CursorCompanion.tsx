import { useState, useEffect } from "react";
import "./cursorCompanion.scss";

function CursorCompanion() {
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <div
      className="cursor-companion"
      style={{
        transform: `translate(calc(${globalCoords.x}px - 6px), calc(${globalCoords.y}px - 6px))`,
      }}
    ></div>
  );
}

export default CursorCompanion;
