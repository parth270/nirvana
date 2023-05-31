import * as THREE from 'three';
import { extend } from 'react-three-fiber';
import { shaderBackground } from '../shaders/background';

// Define the custom shader material
const BackgroundShaderMaterial = {
  uniforms: {
    iResolution: { value: new THREE.Vector3() },
    iTime: { value: 0 },
    iTimeDelta: { value: 0 },
    iFrameRate: { value: 0 },
    iFrame: { value: 0 },
    iChannelTime: { value: [0, 0, 0, 0] },
    iChannelResolution: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
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