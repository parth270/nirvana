import React from "react";
import CanvasContainer from "../components/three";

const ShaderLayout = ({ children }) => {
  return (
    <div className=" relative w-[100%] h-[100vh] ">
      <div className="absolute w-[100%] overflow-hidden h-[100vh]">
        <iframe
          width="100%"
          height="100%"
          style={{
            scale:"1.1"
          }}
          frameborder="0"
          src="https://www.shadertoy.com/embed/ds2XRt?gui=true&t=10&paused=false&muted=false"
        //   src="https://www.shadertoy.com/embed/stBcW1?gui=true&t=10&paused=false&muted=false"
          allowfullscreen
        ></iframe>
      </div>
      <CanvasContainer />
      {children}
    </div>
  );
};

export default ShaderLayout;
