import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Scene from "./Scene";
import { useThree } from "@react-three/fiber";
import Meteor from "./Meteor";
import { NodeToyTick } from "@nodetoy/react-nodetoy";
import Beams from "./Beams";

export default function App() {
  const state = useThree();
  const [exposure, setExposure] = useState(5); // Dynamic exposure control

  useEffect(() => {
    state.gl.toneMappingExposure = exposure;
  }, [exposure, state.gl]);

  return (
    <>
      {/* Environment Maps */}
      <Environment background="only" files="/Textures/envmap_blur.hdr" ground={{ height: 100, radius: 300 }} />
      <Environment background="false" files="/Textures/envmap.hdr" />

      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Scene Background */}
      <color attach="background" args={["#fff"]} />

      {/* Camera Setup */}
      <PerspectiveCamera makeDefault fov={33} position={[-0.07, 16.41, -24.1]} />
      <OrbitControls target={[0.02, 0.806, 0.427]} maxPolarAngle={Math.PI * 0.45} />

      {/* Tick Effects */}
      <NodeToyTick />

      {/* Suspense for Lazy Loading */}
      <Suspense fallback={null}>
        <Scene />
        <Meteor />
        <Beams />
      </Suspense>
    </>
  );
}
