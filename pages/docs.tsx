/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";;
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import UserDocuments from "../components/UserHome/UserDocuments";

const Docs: NextPage = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

    useEffect(()=>{
        //call user api to check if logged in
        //call api for stored document when user is successful

    })
  return (
    <div style={{ background:"#F5F5F5",display:"flex"}}>
    
        <SideBar   selected="docs"/>
        <div>
        <TopBar selected="docs" />
        <UserDocuments/>
        </div>
    




    </div>
  );
};

export default Docs;
