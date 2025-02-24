import Materials from "./Materials";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const { wallMaterial, boxGeometry } = Materials();
export default function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          castShadow
          position={[2, 0.7, -(length * 2) + 2]}
          scale={[0.3, 1.15, 4 * length]}
          geometry={boxGeometry}
          material={wallMaterial}
        ></mesh>

        <mesh
          receiveShadow
          position={[-2, 0.7, -(length * 2) + 2]}
          scale={[0.3, 1.15, 4 * length]}
          geometry={boxGeometry}
          material={wallMaterial}
        ></mesh>

        <mesh
          receiveShadow
          rotation-y={Math.PI * 0.5}
          position={[0, 0.7, -(length * 4) + 2]}
          scale={[0.3, 1.15, 4]}
          geometry={boxGeometry}
          material={wallMaterial}
        ></mesh>
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, 0, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}
