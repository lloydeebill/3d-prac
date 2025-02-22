import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { useRef } from "react";

export default function Inheritance() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => {
    return state.restart;
  });

  const phase = useGame((state) => {
    return state.phase;
  });

  return (
    <>
      <div className="interface">
        <div className="time">0.00</div>
        {phase === "ended" ? (
          <div className="restart" onClick={restart}>
            Restart
          </div>
        ) : null}

        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
