import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { setLoading } from "../../../services/three";
import { Cloud, OrbitControls } from "@react-three/drei";
import { fragmentShader, vertexShader } from "../shaders";

const Rig = (props) => {
  const state = useSelector((state) => state.three);
  const ref = useRef();
  const three = useThree();
  return <group ref={ref} {...props} ś />;
};

const Scene = ({ randoms }) => {
  const curr1 = useSelector((state) => state.three.curr1);
  // const state1 = useSelector((state) => state.model);
  //   const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch(setLoading(false));
  //   });

  const uniforms = {
    time: { type: "f", value: 0.0 },
    distortCenter: { type: "f", value: 0.1 },
    roadWidth: { type: "f", value: 0.5 },
    pallete: { type: "t", value: null },
    speed: { type: "f", value: 0.5 },
    maxHeight: { type: "f", value: 10.0 },
    color: new THREE.Color(1, 1, 1),
  };
  return (
    <>
      <color
        attach="background"
        // args={[pages[0].back]}
        args={["#444"]}
      />
      <OrbitControls maxPolarAngle={Math.PI / 2} target={[0, 5, 0]} />
      {/* <Effects /> */}
      <ambientLight intensity={1} color={"#fff"} />
      <mesh>
        <planeBufferGeometry args={[100, 400, 400, 400]} />
        <shaderMaterial
          uniforms={uniforms}
          wireframe={true}
          fog={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <Cloud />
      <Rig></Rig>
    </>
  );
};

export default React.memo(Scene);
