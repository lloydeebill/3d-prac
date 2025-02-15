export default function Lights() {
  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-top={15}
        shadow-camera-right={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
