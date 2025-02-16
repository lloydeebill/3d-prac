import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const playerBall = useRef();

  const jump = () => {
    playerBall.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  };

  useEffect(() => {
    subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.5 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    playerBall.current.applyImpulse(impulse);
    playerBall.current.applyTorqueImpulse(torque);
  });

  return (
    <>
      <RigidBody
        ref={playerBall}
        colliders="ball"
        type="setKinematicPosition"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
