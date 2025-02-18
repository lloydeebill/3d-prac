import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  console.log(blocksCount);
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Level />
        <Lights />
        <Player />
      </Physics>
    </>
  );
}
