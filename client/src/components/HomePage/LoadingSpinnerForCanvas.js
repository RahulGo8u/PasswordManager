import { Html } from "@react-three/drei";
import Spinner from "react-bootstrap/Spinner";

export const LoadingSpinnerForCanvas = () => {
  return (
    <Html position={[2.8, 1.3, -0.3]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Html>
  );
};
