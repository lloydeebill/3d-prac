import Materials from "./Materials";

const { floor1Material, boxGeometry } = Materials();
import { Float, Text } from "@react-three/drei";

export default function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        receiveShadow
      ></mesh>
    </group>
  );
}
