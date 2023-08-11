/** @jsxImportSource @emotion/react */
import * as styles from "../components/LandingPage/styles";

import Image from "next/image";
import { NextPage } from "next";
import Button from "../components/shared/Button";
import { useRouter } from "next/router";
import { StoreState } from "../reducers";
import { KYCDocs, KYC_STATUS } from "../reducers/kyc";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/userInfo";
import Docu_logo from "public/Docu_logo.svg";
import Main_Image from "public/images/mainImage.svg";
import Bg_Image from "public/images/bgImg1.svg";
import lockImg from "public/icons/lock.svg";
import ownerImg from "public/icons/owner.svg";
import rocketImg from "public/icons/rocket.svg";
import securityImg from "public/icons/security.svg";
import individualImg from "public/icons/individual.svg";
import institutionImg from "public/icons/institution.svg";
import tickImg from "public/icons/tick.svg";
import social from "public/icons/social.svg";
import arrowUp from "public/icons/arrowUp.svg";
import cross from "public/icons/crossIcon.svg";
import google from "public/icons/google.svg";
import facebook from "public/icons/facebook.svg";
import twitter from "public/icons/twitter.svg";
import { useEffect, useState } from "react";
import { getLoginDetails, setGoogleLoginData, setIsLoggedIn, setUserAddress } from "../actions/user";
import { useGoogleLogin, TokenResponse, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { fetchKycData, setKycStatus } from "../actions/kyc";

// @ts-nocheck
const Home: NextPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;
  const [defaultAccount, setDefaultAccount] = useState("");
  const [signoutVisible, setSignOutVisible] = useState(false);
  const userState = useSelector<StoreState, UserState>((state) => state.user);
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  const [openModal, setOpenModal] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const profile = userState.googleData;
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("google_token");
    if (sessionToken) {
      setGoogleToken(sessionToken);
    }
  }, []);

  useEffect(() => {
    if (userState.loginData) {
      setIsLoggedIn(true);
    }
  }, [googleToken, userState.loginData]);

  useEffect(() => {
    if (
      userState.isLoggedIn &&
      userState.loginData?.kyc_status === KYC_STATUS.VERIFIED
    ) {
      fetchKycData(googleToken);
    }
  }, [userState.isLoggedIn]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setShowPopup(false)
      sessionStorage.setItem("google_token", codeResponse.access_token);
      setGoogleToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();
    setGoogleLoginData(null);
    getLoginDetails("");
    setKycStatus(0);
  };

  useEffect(() => {
    if (googleToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`,
          {
            headers: {
              Authorization: `Bearer ${googleToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          getLoginDetails(googleToken).then(() => {
            setGoogleLoginData(res.data);
          });
        })
        .catch((err) => {
          sessionStorage.removeItem("google_token");
        });
    }
  }, [googleToken]);

  const accountChangedHandler = (newAccount: any) => {
    if (newAccount) {
      setDefaultAccount(String(newAccount));
      setUserAddress(String(newAccount));
      setIsLoggedIn(true);
    } else sessionStorage.clear();
  };
  useEffect(() => {
    if (defaultAccount !== "") {
      setOpenModal(false);
    }
  }, [userState, defaultAccount]);
  useEffect(() => {
    if (!userState.isLoggedIn) {
      if (pathName !== "/" && pathName !== "/aboutUs") {
        // router.push("/");
      }
    }

    if (userState.address) {
      setDefaultAccount(userState.address);
    } else {
      setDefaultAccount("");
    }
  }, [pathName, router, userState]);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    }
  };

  const onChainChangedHandler = () => {
    window.location.reload();
  };
  if (typeof window !== "undefined") {
    //@ts-ignore
    if (window.ethereum && window.ethereum.on)
      window.ethereum.on("accountsChanged", accountChangedHandler);
    //@ts-ignore
    if (window.ethereum && window.ethereum.on)
      window.ethereum.on("chainChanged", onChainChangedHandler);
  }

  return (
    <div css={styles.landingPageContainer}>
      <div css={styles.header}>
        <Image src={Docu_logo} alt="" />
        <div css={styles.menuContainer}>
          <div css={styles.menuItem}>
            How it works
          </div>
          <div css={styles.menuItem}>
            Features
          </div>
          <div css={styles.menuItem}>
            Solutions
          </div>
          <div css={styles.menuItem}>
            Pricing
          </div>
        </div>
        {userState.isLoggedIn ? <>
          <div css={styles.profileContainer}>
            <div css={styles.name}>{profile?.name}</div>
            <div style={{height: 36}}><Image style={{borderRadius: "50%"}} width={36} height={36} src={profile?.picture || ""} alt="" /></div>
          </div>
        </> : <>
          {showPopup &&
            <div css={styles.overlay} onClick={() => setShowPopup(false)} />}
          <div css={styles.loginButton}>
            <Button type="purple" onClick={() => setShowPopup(true)}>Login</Button>
            {showPopup &&
              <div css={styles.loginContainer}>
                <Image css={styles.polygon} src={arrowUp} alt="" />
                <div css={styles.loginHeader}>
                  <div>LOGIN</div>
                  <Image style={{ cursor: "pointer" }} onClick={() => setShowPopup(false)} src={cross} alt="" />
                </div>
                <div css={styles.loginOptions}>
                  <div css={styles.option} onClick={() => login()}>
                    <Image src={google} alt="" />
                    Sign in with Google
                  </div>
                  <div css={styles.option}>
                    <Image src={facebook} alt="" />
                    Sign in with Facebook
                  </div>
                  <div css={styles.option}>
                    <Image src={twitter} alt="" />
                    Sign in with Twitter
                  </div>
                </div>
              </div>
            }
          </div>
        </>}
      </div>
      <div css={styles.outer}>
        <div css={styles.container1}>
          <div css={styles.mainText}>
            <div css={styles.bigText}>Secure critical documents on the block</div>
            <div css={styles.smallText}>Store, sign, access and share verified documents on the Ethereum blockchain</div>
            <Button style={styles.startButton} onClick={()=>{}} type="purple">Get Started for Free</Button>
          </div>
          <div css={styles.mainImage}>
            <Image src={Main_Image} alt="" />
          </div>
        </div>
        <Image css={styles.bgImg1} src={Bg_Image} alt="" />
      </div>
      <div css={styles.container2}>
        <div>How it works</div>
        <div css={styles.videoContainer}>
          video player
        </div>
        <div css={styles.circle}></div>
      </div>
      <div css={styles.container3}>
        <div css={styles.whyTitle}>Why choose Documsmriti?</div>
        <div css={styles.whyContent}>
          <div css={styles.row}>
            <div css={styles.content1}>
              <Image src={lockImg} alt="" />
              <div css={styles.textContent}>
                <div css={styles.contentTitle}>Immutability</div>
                <div>Documents uploaded are on the blockchain forever. They cannot be tampered with.</div>
              </div>
            </div>
            <div css={styles.content1}>
              <Image src={rocketImg} alt="" />
              <div css={styles.textContent}>
                <div css={styles.contentTitle}>Performance & Speed</div>
                <div>Instantly upload, sign and use documents on the go.</div>
              </div>
            </div>
          </div>
          <div css={styles.row}>
            <div css={styles.content1}>
              <Image src={ownerImg} alt="" />
              <div css={styles.textContent}>
                <div css={styles.contentTitle}>Complete ownership of your data</div>
                <div>What you upload on the blockchain is yours. No questions asked.</div>
              </div>
            </div>
            <div css={styles.content1}>
              <Image src={securityImg} alt="" />
              <div css={styles.textContent}>
                <div css={styles.contentTitle}>Security</div>
                <div>Government-Approved KYC systems in place to ensure compliance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div css={styles.content4}>
        <div css={styles.title4}>Solutions</div>
        <div css={styles.cardContainer}>
          <div css={styles.textContainer4}>
            <Image src={individualImg} alt="" />
            <div>
              <div css={styles.textTitle4}>Individuals</div>
              <div css={styles.text4}>
                Upload any doc and securely share it with anyone you want to.
                Whether it is a marks sheet or a legal agreement, make your document access hassle-free and secure.
              </div>
              <div css={styles.underline}></div>
            </div>
          </div>
          <div css={styles.textContainer4}>
            <Image src={institutionImg} alt="" />
            <div>
              <div css={styles.textTitle4}>Institutions</div>
              <div css={styles.text4}>
                Bulk upload your documents and securely store them.
                Whether it is employee data or any process documents, the data stored is fully owned by you
              </div>
              <div css={styles.underline}></div>
            </div>
          </div>
        </div>
        <div css={styles.title42}>Pricing</div>
        <div css={styles.subtitle}>It is a long established fact that a reader will be distracted by the readable content of a page.</div>
        <div css={styles.priceContainer}>
          <div css={styles.priceCard}>
            <div css={styles.div1}>
              <div css={styles.feeTitle}>Free</div>
              <div>It is a long established fact that a reader will be distracted.</div>
              <div css={styles.feeContainer}>
                <span css={styles.fees}>$0.00</span> / Month
              </div>
            </div>
            <div css={styles.div2}>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Upto 3 persons
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                10 GB Cloud storage
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Unlimited file upload
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Free access to server
              </div>
              <Button
                style={styles.feeButton}
                type="white"
                onClick={() => { }}
              >
                Get started
              </Button>
            </div>
          </div>
          <div css={styles.priceCard}>
            <div css={styles.div1}>
              <div css={styles.feeTitle}>Individuals</div>
              <div>It is a long established fact that a reader will be distracted.</div>
              <div css={styles.feeContainer}>
                <span css={styles.fees}>$12.99</span> / Month
              </div>
            </div>
            <div css={styles.div2}>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Upto 3 persons
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                10 GB Cloud storage
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Unlimited file upload
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Free access to server
              </div>
              <Button
                style={styles.feeButton}
                type="white"
                onClick={() => { }}
              >
                Get started
              </Button>
            </div>
          </div>
          <div css={styles.priceCard}>
            <div css={styles.div1}>
              <div css={styles.feeTitle}>Institutions</div>
              <div>It is a long established fact that a reader will be distracted.</div>
              <div css={styles.feeContainer}>
                <span css={styles.fees}>$24.99</span> / Month
              </div>
            </div>
            <div css={styles.div2}>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Upto 3 persons
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                10 GB Cloud storage
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Unlimited file upload
              </div>
              <div css={styles.feeRow}>
                <Image src={tickImg} alt="" />
                Free access to server
              </div>
              <Button
                style={styles.feeButton}
                type="white"
                onClick={() => { }}
              >
                Get started
              </Button>
            </div>
          </div> 
        </div>
        <Image src={Bg_Image} css={styles.bgImg1} alt="" />
        <div css={styles.circle2}></div>
        <div css={styles.circle}></div>
      </div>
      <div css={styles.footer}>
        <div css={styles.foot1}>
          <Image src={Docu_logo} alt="" />
          <Image src={social} alt="" />
        </div>
        <div>
          <div css={styles.foothead}>
            PRODUCTS
          </div>
          <div css={styles.footText}>
            <div>Features</div>
            <div>Personal License</div>
            <div>Business License</div>
            <div>Pricing Options</div>
          </div>
        </div>
        <div>
          <div css={styles.foothead}>
            COMPANY
          </div>
          <div css={styles.footText}>
            <div>About</div>
            <div>Careers</div>
            <div>Blog</div>
            <div>Contact</div>
          </div>
        </div>
        <div>
          <div css={styles.foothead}>
            SUPPORT
          </div>
          <div css={styles.footText}>
            <div>Support Center</div>
            <div>Help Desk</div>
            <div>FAQ</div>
          </div>
        </div>
      </div>
      <div css={styles.finalFooter}>
        <div>Copyright ©2023 Docusmriti. All rights reserved.</div>
        <div>Sitemap  |  Legal & Privacy  |  Terms of Use</div>
      </div>
    </div>
  );
};

export default Home;
