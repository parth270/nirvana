import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import Scene from './Scene/Scene'
const Scene = React.lazy(() => import("./Scene/Scene.jsx"));

const CanvasContainer = ({ curr1 }) => {
  const [devicePixelRatio, setDevicePixelRatio] = React.useState();

  React.useEffect(() => {
    const pixel = window.devicePixelRatio;
    setDevicePixelRatio(pixel);
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, -10],
        fov: 60,
        near: 0.1,
        far: 10000,
      }}
      dpr={devicePixelRatio}
      gl={{
        antialias: false,
      }}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default CanvasContainer;
