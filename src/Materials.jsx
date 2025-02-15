import * as THREE from "three";

export default function Materials() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
  const floor2Material = new THREE.MeshStandardMaterial({
    color: "greenyellow",
  });
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: "orangered",
  });
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "slategrey",
  });

  return {
    floor1Material,
    floor2Material,
    obstacleMaterial,
    wallMaterial,
    boxGeometry,
  };
}
