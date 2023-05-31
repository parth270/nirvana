import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { shaderBackground } from "../shaders/background";
import { extend } from "@react-three/fiber";
// Define the custom shader material
const BackgroundShaderMaterial = {
  uniforms: {
    iResolution: { value: new THREE.Vector3() },
    iTime: { value: 0 },
    iTimeDelta: { value: 0 },
    iFrameRate: { value: 0 },
    iFrame: { value: 0 },
    iChannelTime: { value: [0, 0, 0, 0] },
    iChannelResolution: {
      value: [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ],
    },
    iMouse: { value: new THREE.Vector4() },
    iDate: { value: new THREE.Vector4() },
    iChannel0: { value: new THREE.Texture() },
    iChannel1: { value: new THREE.Texture() },
    iChannel2: { value: new THREE.Texture() },
    iChannel3: { value: new THREE.Texture() },
  },
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3      iResolution;
    uniform float     iTime;
    uniform float     iTimeDelta;
    uniform float     iFrameRate;
    uniform int       iFrame;
    uniform float     iChannelTime[4];
    uniform vec3      iChannelResolution[4];
    uniform vec4      iMouse;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    uniform sampler2D iChannel3;
    uniform vec4      iDate;

    // Shader Toy shader code
    ${shaderBackground}

    void main() {
      vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);

      vec3 color = vec3(0.0);
      mainImage(color, p);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// Extend the shader material
extend({ BackgroundShaderMaterial });

const Background = () => {
  const { size } = useThree();
  const materialRef = React.useRef();

  // Update the shader uniforms on each frame
//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       const time = clock.getElapsedTime();
//       const resolution = new THREE.Vector3(size.width, size.height, 1.0);
//       const channelResolution = [
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//       ];
//       const channelTextures = [null, null, null, null]; // Update with actual textures

//       materialRef.current.uniforms.iResolution.value.copy(resolution);
//       materialRef.current.uniforms.iTime.value = time;
//       materialRef.current.uniforms.iTimeDelta.value = clock.getDelta();
//       materialRef.current.uniforms.iFrameRate.value = 1.0 / clock.getDelta();
//       materialRef.current.uniforms.iFrame.value += 1;
//       materialRef.current.uniforms.iChannelTime.value[0] = time;
//       materialRef.current.uniforms.iChannelResolution.value[0].copy(resolution);
//       materialRef.current.uniforms.iChannel0.value = channelTextures[0];
//       materialRef.current.uniforms.iChannel1.value = channelTextures[1];
//       materialRef.current.uniforms.iChannel2.value = channelTextures[2];
//       materialRef.current.uniforms.iChannel3.value = channelTextures[3];
//       materialRef.current.uniforms.iDate.value.set(
//         new Date().getFullYear(),
//         new Date().getMonth() + 1,
//         new Date().getDate(),
//         time
//       );
//     }
//   });

  console.log(size);
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI, Math.PI / 2]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} args={[BackgroundShaderMaterial]} />
      {/* <meshBasicMaterial color={"#000"} /> */}
    </mesh>
  );
};

export default React.memo(Background);
