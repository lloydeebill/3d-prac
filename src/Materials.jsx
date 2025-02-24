import * as THREE from "three";

export default function Materials() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const floor1Material = new THREE.MeshStandardMaterial({
    color: "#111111",
    metalness: 0,
    roughness: 0,
  });
  const floor2Material = new THREE.MeshStandardMaterial({
    color: "#222222",
    metalness: 0,
    roughness: 0,
  });
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: "#ff0000",
    metalness: 0,
    roughness: 1,
  });
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#887777",
    metalness: 0,
    roughness: 0,
  });

  return {
    floor1Material,
    floor2Material,
    obstacleMaterial,
    wallMaterial,
    boxGeometry,
  };
}
