import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import React from "react";
import HomeSection from "./HomeSection";
import { LockModel } from "./LockModel";
import { useThree } from "@react-three/fiber";
const Expirence = () => {
  const isMobile = window.innerWidth < 768;

  const { viewport } = useThree();

  const { cameraControl, modelPosition, modelRotation } = useControls({
    cameraControl: {
      value: {
        x: -0.2,
        y: 0.2,
        z: 4.1,
      },
      step: 0.4,
    },
    modelPosition: {
      value: {
        x: 1.8,
        y: -0.8,
        z: -0.3,
      },
      step: 0.4,
    },
    modelRotation: {
      value: {
        x: 0,
        y: -0.8,
        z: 0,
      },
      step: 0.4,
    },
  });
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[cameraControl.x, cameraControl.y, cameraControl.z]}
      />
      <LockModel
        scale={[0.06, 0.06, 0.06]}
        position={[
          isMobile ? -0.2 : modelPosition.x,
          modelPosition.y,
          modelPosition.z,
        ]}
        rotation={[
          modelRotation.x,
          isMobile ? 0 : modelRotation.y,
          modelRotation.z,
        ]}
      />
    </>
  );
};

export default Expirence;
