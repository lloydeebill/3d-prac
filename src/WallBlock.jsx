import Materials from "./Materials";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const { floor2Material, obstacleMaterial, boxGeometry } = Materials();

export default function WallBlock({ position = [0, 0, 0] }) {
  const obstacleWall = useRef();

  const [timeOffset] = useState(
    () => (Math.random() + 0.2) * (Math.random() * Math.PI * 2)
  );

  useFrame((state) => {
    if (obstacleWall.current) {
      const time = state.clock.getElapsedTime();
      const xTranslate = Math.sin(time + timeOffset) * 1.0;
      obstacleWall.current.setNextKinematicTranslation({
        x: position[0] + xTranslate,
        y: position[1] + 1,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <RigidBody
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
        ref={obstacleWall}
      >
        <mesh
          scale={[1.75, 1.75, 0.2]}
          geometry={boxGeometry}
          material={obstacleMaterial}
          castShadow
        ></mesh>
      </RigidBody>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
      ></mesh>
    </group>
  );
}
