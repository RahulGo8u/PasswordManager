import React, { useEffect, useState } from "react";
import axios from "axios";
const HomeSection = () => {
  const [repoData, setRepoData] = useState([]);
  const fetchGithubContributors = async () => {
    try {
      // REACT_APP_GITHUB_URL= https://api.github.com/repos/RahulGo8u/PasswordManager/contributors
      const { data } = await axios.get(process.env.REACT_APP_GITHUB_URL);
      console.log(data);
      setRepoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGithubContributors();
  }, []);
  return (
    <div
      style={{
        height: "70vh",
        marginTop: "60px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Working To Improve Security Daily.</h1>
      <h3>Our Contributors</h3>
      <div
        style={{
          minWidth: "60%",
          display: "flex",
          flexWrap: "wrap",
          padding: "0px 30px",
          justifyContent: "center",
        }}
      >
        {repoData?.map((r) => {
          return (
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "3px",
              }}
            >
              <img
                src={r.avatar_url}
                alt={r.login}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSection;
