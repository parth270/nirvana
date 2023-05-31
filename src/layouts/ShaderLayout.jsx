import React from "react";
import CanvasContainer from "../components/three";

const ShaderLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#000]">
      <CanvasContainer />
      {children}
    </div>
  );
};

export default ShaderLayout;
