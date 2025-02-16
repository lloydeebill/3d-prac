import Materials from "./Materials";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CylinderCollider } from "@react-three/rapier";

const { floor1Material, boxGeometry } = Materials();

export default function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        friction={0}
      >
        <primitive castshadow object={hamburger.scene} scale={0.2}></primitive>
      </RigidBody>
      <mesh
        scale={[4, 0.1, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        receiveShadow
      ></mesh>
    </group>
  );
}
