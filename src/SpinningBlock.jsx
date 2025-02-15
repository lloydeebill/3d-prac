import Materials from "./Materials";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const { floor2Material, obstacleMaterial, boxGeometry } = Materials();

export default function SpinningBlock({ position = [0, 0, 0] }) {
  const obstacleSpin = useRef();

  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    if (obstacleSpin.current) {
      const time = state.clock.getElapsedTime();
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
      obstacleSpin.current.setNextKinematicRotation(rotation);
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
        ref={obstacleSpin}
      >
        <mesh
          scale={[3.5, 0.3, 0.3]}
          position={[0, 0.5, 0]}
          geometry={boxGeometry}
          material={obstacleMaterial}
          receiveShadow
          castShadow
        ></mesh>
      </RigidBody>
    </group>
  );
}
