import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.jsx";
import Effects from "./Effects.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  const blocksSeed = useGame((state) => {
    return state.blocksSeed;
  });

  return (
    <>
      <color args={["#252731"]} attach="background" />
      <OrbitControls makeDefault />
      <Physics>
        <Level count={blocksCount} seed={blocksSeed} />
        <Lights />
        <Player />
        <Effects />
      </Physics>
    </>
  );
}
