import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import Expirence from "./Expirence";
import "../../styles/HomePage.css";
import { Leva } from "leva";
import ContributorSection from "./ContributorSection";
import HomeSection from "./HomeSection";
import { Suspense } from "react";

export const HomePage = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={"<h1>Loading ...</h1>"}>
          <Environment preset="apartment" />
          <ambientLight intensity={2} />
          <Expirence />
        </Suspense>
      </Canvas>

      <div>
        <HomeSection />
        <ContributorSection />
      </div>
      <Leva />
    </>
  );
};
