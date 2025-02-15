import * as THREE from "three";
import Lights from "./Lights.jsx";
import BlockStart from "./BlockStart.jsx";
import SpinningBlock from "./SpinningBlock.jsx";
import LimboBlock from "./LimboBlock.jsx";
import WallBlock from "./WallBlock.jsx";
import BlockEnd from "./BlockEnd.jsx";

export default function Level() {
  THREE.ColorManagement.legacyMode = false;

  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <SpinningBlock position={[0, 0, 12]} />
      <LimboBlock position={[0, 0, 8]} />
      <WallBlock position={[0, 0, 4]} />
      <BlockEnd position={[0, 0.1, 0]} />
    </>
  );
}
