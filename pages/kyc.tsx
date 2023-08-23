/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";;
import TopBar from "../components/TopBar";
import KycHome from "@components/Kyc";

const Kyc: NextPage = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

    useEffect(()=>{
        //call user api to check if logged in
        //call api for stored document when user is successful

    })
  return (
    <div style={{ background:"#F5F5F5",display:"flex"}}>
    
        <SideBar   selected="kyc"/>
        <div>
        <TopBar selected="Kyc" />
    <KycHome />
        </div>
    




    </div>
  );
};

export default Kyc;
