/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserDetails from "../components/UserProfile/UserDetails";

const Profile: NextPage = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

    useEffect(()=>{
        //call user api to check if logged in
        //call api for stored document when user is successful  
    })
  return (
    <div style={{ background:"#F5F5F5"}}>
      <Header />
      <div css={{display:"flex"}}>
        <SideBar expand={openSideDrawer} toggleExpand={()=>{setOpenSideDrawer(prev=>!prev)}} selected="profile"/>
        <div css={{width:openSideDrawer? "90%":"95%",justifyContent:"end", transition:"0.2s all ease-in",marginLeft:"auto"}}>
          <div css={{ display: "flex",padding: "10px 46px",justifyContent: "space-between"}}>
          <UserDetails />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;