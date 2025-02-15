import Materials from "./Materials";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const { floor2Material, obstacleMaterial, boxGeometry } = Materials();

export default function SpinningBlock({ position = [0, 0, 0] }) {
  const obstacleLimbo = useRef();

  const [timeOffset] = useState(
    () => (Math.random() + 0.2) * (Math.random() * Math.PI * 2)
  );

  useFrame((state) => {
    if (obstacleLimbo.current) {
      const time = state.clock.getElapsedTime();
      const yTranslate = Math.sin(time + timeOffset) + 1.3;
      obstacleLimbo.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + yTranslate,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
      ></mesh>
      <RigidBody
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
        ref={obstacleLimbo}
      >
        <mesh
          scale={[3.5, 0.3, 0.3]}
          geometry={boxGeometry}
          material={obstacleMaterial}
          receiveShadow
          castShadow
        ></mesh>
      </RigidBody>
    </group>
  );
}
