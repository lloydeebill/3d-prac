import Materials from "./Materials";

const { floor1Material, boxGeometry } = Materials();

export default function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        receiveShadow
      ></mesh>
    </group>
  );
}
