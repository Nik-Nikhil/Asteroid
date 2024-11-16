import { MeshTransmissionMaterial, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function Beams() {
  const { nodes } = useGLTF("/Models/beams.glb");

  const [beams_mask] = useTexture(
    ["Textures/beams_mask.png"],
    (texture) => texture,
    (err) => console.error("Texture failed to load:", err)
  );

  const beamsGeometries = useMemo(() => [
    nodes.beam0.geometry,
    nodes.beam1.geometry,
    nodes.beam2.geometry,
    nodes.beam3.geometry,
    nodes.beam4.geometry,
    nodes.beam5.geometry,
    nodes.beam6.geometry,
  ], [nodes]);

  return (
    <>
      {beamsGeometries.map((geometry, i) => (
        <Beam
          key={i}
          geometry={geometry}
          beams_mask={beams_mask}
          beams_index={i}
        />
      ))}
    </>
  );
}

function Beam({ geometry, beams_mask, beams_index }) {
  const { vectors, initialPositionAttribute } = useMemo(() => {
    const uniqueVectors = [];
    const initialPositionAttribute = geometry.clone().getAttribute("position");

    for (let i = 0; i < initialPositionAttribute.count; i++) {
      const vector = new THREE.Vector3();
      vector.fromBufferAttribute(initialPositionAttribute, i);

      const idx = uniqueVectors.findIndex(
        (v) => v.x === vector.x && v.y === vector.y && v.z === vector.z
      );

      if (idx === -1) {
        uniqueVectors.push(vector);
      }
    }

    uniqueVectors.sort((a, b) => a.y - b.y);
    return { vectors: uniqueVectors, initialPositionAttribute };
  }, [geometry]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const transformVector = new THREE.Vector3(0, 0, 1);
    transformVector.applyAxisAngle(
      new THREE.Vector3(1, 0, 0),
      elapsed * 0.25 + beams_index * 17.87975
    );
    transformVector.multiplyScalar(3.25);

    const currentPositionAttribute = geometry.getAttribute("position");

    for (let i = 0; i < currentPositionAttribute.count; i++) {
      const vector = new THREE.Vector3();
      vector.fromBufferAttribute(initialPositionAttribute, i);

      const isTopVertex =
        (vector.x === vectors[2].x &&
          vector.y === vectors[2].y &&
          vector.z === vectors[2].z) ||
        (vector.x === vectors[3].x &&
          vector.y === vectors[3].y &&
          vector.z === vectors[3].z);

      if (isTopVertex) {
        currentPositionAttribute.setXYZ(
          i,
          vector.x + transformVector.x,
          vector.y + transformVector.y,
          vector.z + transformVector.z
        );
      }
    }

    currentPositionAttribute.needsUpdate = true;
  });

  const isEven = beams_index % 2 === 0;
  const color = isEven ? "#fff7ed" : "#feedd7";
  const emissive = isEven ? [0.025, 0.011, 0.01] : [0.035, 0.0195, 0.01];

  return (
    <mesh geometry={geometry}>
      <MeshTransmissionMaterial
        alphaToCoverage
        transparent
        alphaMap={beams_mask}
        side={THREE.DoubleSide}
        envMapIntensity={0}
        roughness={0.2}
        ior={1.5}
        thickness={0.205}
        transmission={1}
        chromaticAberration={1}
        anisotropy={10}
        color={color}
        emissive={emissive}
      />
    </mesh>
  );
}
