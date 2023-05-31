import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { setLoading } from "../../../services/three";
import { Cloud, OrbitControls, Sky, useTexture } from "@react-three/drei";
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
  const [mouse, setMouse] = useState({ x: 0, y: 0, xDamped: 0, yDamped: 0 });

  const texture = useTexture("/shaderpng.png");

  const uniforms = useMemo(
    () => ({
      time: { type: "f", value: 0.0 },
      distortCenter: { type: "f", value: 0.1 },
      roadWidth: { type: "f", value: 0.5 },
      pallete: { type: "t", value: null },
      speed: { type: "f", value: 0.5 },
      maxHeight: { type: "f", value: 10.0 },
      color: new THREE.Color(1, 1, 1),
      pallete: {
        value: texture,
      },
    }),
    []
  );

  function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  const ref = useRef();
  useFrame(() => {
    setMouse({
      ...mouse,
      xDamped: lerp(mouse.xDamped, mouse.x, 0.1),
      yDamped: lerp(mouse.yDamped, mouse.y, 0.1),
    });
    const time = performance.now() * 0.001;
    console.log(time);
    ref.current.material.uniforms.time.value = time;
    ref.current.material.uniforms.distortCenter.value = map(
      mouse.xDamped,
      0,
      window.innerWidth,
      -0.1,
      0.1
    );
    ref.current.material.uniforms.roadWidth.value = map(
      mouse.yDamped,
      0,
      window.innerHeight,
      -0.5,
      2.5
    );
    // setUniforms({
    //   ...uniforms,
    //   time: { ...uniforms.time, value: time },
    //   distortCenter: {
    //     ...uniforms.distortCenter,
    //     value: map(mouse.xDamped, 0, window.innerWidth, -0.1, 0.1),
    //   },
    //   roadWidth: {
    //     ...uniforms.roadWidth,
    //     value: map(mouse.yDamped, 0, window.innerHeight, -0.5, 2.5),
    //   },
    // });

    // terrain.material.uniforms.time.value = time;
    // terrain.material.uniforms.distortCenter.value = map(
    //   mouse.xDamped,
    //   0,
    //   width,
    //   -0.1,
    //   0.1
    // );
    // terrain.material.uniforms.roadWidth.value = map(
    //   mouse.yDamped,
    //   0,
    //   height,
    //   -0.5,
    //   2.5
    // );
  });

  function onInputMove(e) {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    mouse.x = x;
    mouse.y = y;

    setMouse({
      ...mouse,
      x: mouse.x,
      y: mouse.y,
    });
  }

  console.log(mouse);

  useEffect(() => {
    document.addEventListener("mousemove", onInputMove, false);
    return () => {
      document.removeEventListener("mousemove", onInputMove, false);
    };
  });
  const theta = Math.PI * -0.02;
  const phi = 2 * Math.PI * -0.25;

  //   const sunSphere = {

  //     x: 0,
  //     y: 0,
  //     z: 0,
  //   };
  //   sunSphere.position.x = 400000 * Math.cos(phi);
  //   sunSphere.position.y = 400000 * Math.sin(phi) * Math.sin(theta);
  //   sunSphere.position.z = 400000 * Math.sin(phi) * Math.cos(theta);

  return (
    <>
      <color
        attach="background"
        // args={[pages[0].back]}
        args={["#444"]}
      />
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} target={[0, 5, 0]} /> */}
      {/* <Effects /> */}
      <ambientLight intensity={1} color={"#fff"} />
      <mesh position={[0, -4, 0]} rotation={[Math.PI / 2, Math.PI, 0]} ref={ref}>
        <planeBufferGeometry args={[100, 400, 400, 400]} />
        <shaderMaterial
          uniforms={uniforms}
          wireframe={false}
          fog={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh
        visibl={false}
        position={[
          400000 * Math.cos(phi),
          400000 * Math.sin(phi) * Math.sin(theta),
          400000 * Math.sin(phi) * Math.cos(theta),
        ]}
      >
        <sphereGeometry args={[20000, 16, 8]} />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh>
      <Sky
        scale={[45000, 45000, 45000]}
        turbidity={20}
        rayleigh={0}
        mieCoefficient={0.01}
        mieDirectionalG={0.8}
        sunPosition={[
          400000 * Math.cos(phi),
          400000 * Math.sin(phi) * Math.sin(theta),
          400000 * Math.sin(phi) * Math.cos(theta),
        ]}
      />
      <Cloud position={[0,10,0]}  />
      <Rig></Rig>
    </>
  );
};

export default React.memo(Scene);
