import * as THREE from "three";
import BlockStart from "./BlockStart.jsx";
import SpinningBlock from "./SpinningBlock.jsx";
import LimboBlock from "./LimboBlock.jsx";
import WallBlock from "./WallBlock.jsx";
import BlockEnd from "./BlockEnd.jsx";
import Bounds from "./Bounds.jsx";
import { useMemo } from "react";

export default function Level({
  count = 5,
  types = [SpinningBlock, WallBlock, LimboBlock],
}) {
  THREE.ColorManagement.legacyMode = false;

  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0.2, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
