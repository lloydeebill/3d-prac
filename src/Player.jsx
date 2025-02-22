import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame.jsx";

export default function Player() {
  const start = useGame((state) => {
    return state.start;
  });

  const end = useGame((state) => {
    return state.end;
  });

  const restart = useGame((state) => {
    return state.restart;
  });

  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const playerBall = useRef();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    const origin = playerBall.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      playerBall.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    console.log("reset");
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    /*controls*/
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

    /* 
    Camera
    */

    const playerBallPosition = playerBall.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerBallPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerBallPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    //Phases
    if (playerBallPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    if (playerBallPosition.y < -4) {
      restart();
    }
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
