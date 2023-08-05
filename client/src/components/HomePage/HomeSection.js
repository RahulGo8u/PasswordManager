import React from "react";

const HomeSection = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        // width: "70%",
        position: "absolute",
        marginLeft: "100px",
        textShadow: "1px 1px white",
        top: 0,
      }}
    >
      <h1>FIX TODAY. PROTECT FOREVER.</h1>
      <p
        style={{
          width: "60%",
        }}
      >
        Protect yourself, your family, or your global workforce with simple
        security, easy collaboration, and actionable insights.
      </p>
    </div>
  );
};

export default HomeSection;
