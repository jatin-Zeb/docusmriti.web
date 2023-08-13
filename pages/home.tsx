/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import HomePage from "../components/HomePage";

const Home: NextPage = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

    useEffect(()=>{
        //call user api to check if logged in
        //call api for stored document when user is successful

    })
  return (
    <div style={{ display:"flex"}}>
      <SideBar   selected="home"/>
      <div>
      <TopBar selected="home" />
        <HomePage />
        </div>
       
    </div>
  );
};

export default Home;
