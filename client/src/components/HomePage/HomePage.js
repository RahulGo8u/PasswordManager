import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import Expirence from "./Expirence";
import "../../styles/HomePage.css";
import { Leva } from "leva";
import ContributorSection from "./ContributorSection";
import HomeSection from "./HomeSection";
import { Suspense } from "react";
import { LoadingSpinnerForCanvas } from "./LoadingSpinnerForCanvas";

export const HomePage = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={<LoadingSpinnerForCanvas />}>
          <Environment preset="apartment" />
          <Expirence />
        </Suspense>
      </Canvas>

      <HomeSection />
      <ContributorSection />
      <Leva />
    </>
  );
};
