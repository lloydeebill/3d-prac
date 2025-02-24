import Materials from "./Materials";
import { useGLTF, Float, Text } from "@react-three/drei";
import { RigidBody, CylinderCollider } from "@react-three/rapier";

const { floor1Material, boxGeometry } = Materials();

export default function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0, 2.25, 2]}
          rotation-y={-0.25}
        >
          FINISH
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
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
