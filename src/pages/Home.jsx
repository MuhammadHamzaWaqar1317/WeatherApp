import React from "react";
import Header from "../components/Header";
import MainCard from "../components/MainCard";
import SideCard from "../components/SideCard";
function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-12 ">
        <MainCard />
        <SideCard />
      </div>
    </>
  );
}

export default Home;
