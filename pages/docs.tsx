/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserDocuments from "../components/UserHome/UserDocuments";
import TopBar from "../components/TopBar";

const Docs: NextPage = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

    useEffect(()=>{
        //call user api to check if logged in
        //call api for stored document when user is successful

    })
  return (
    <div style={{ background:"#F5F5F5"}}>
      <TopBar selected="docs" />
        <SideBar   selected="docs"/>
        
        {/* <Header />
        <div css={{display:"flex"}}>
        <div css={{width:openSideDrawer? "90%":"95%",justifyContent:"end", transition:"0.2s all ease-in",marginLeft:"auto"}}>        
            <div css={{ display: "flex",   padding: "10px 40px",   justifyContent: "space-between"}}>
              <UserDocuments/>
            </div>
        </div>
        </div>
        <Footer /> */}
    </div>
  );
};

export default Docs;
