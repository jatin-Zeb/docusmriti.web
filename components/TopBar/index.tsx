/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { TopBarProps } from "./typings";
import profile from "../../public/images/profile.png";
import { Image } from "antd";
import { useSelector } from "react-redux";
import { StoreState } from "@reducers/index";
import { UserState } from "@reducers/userInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getLoginDetails,
  setGoogleLoginData,
  setIsLoggedIn,
} from "@actions/user";
import { useRouter } from "next/router";

const TopBar: React.FC<TopBarProps> = ({ selected }) => {
  const router = useRouter();
  const userState = useSelector<StoreState, UserState>((state) => state.user);
  const [googleToken, setGoogleToken] = useState("");
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("google_token");
    if (sessionToken) {
      setGoogleToken(sessionToken);
    }
  }, []);

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

            setIsLoggedIn(true);
          });
        })
        .catch((err) => {
          sessionStorage.removeItem("google_token");
          router.push("/");
        });
    }
  }, [googleToken, router]);
  console.log(userState);
  return (
    <div css={styles.topBar}>
      <div css={styles.text}>{selected}</div>
      <div css={styles.profile}>
        {userState.isLoggedIn ? (
          <>
            <div css={styles.profileContainer}>
              <div css={styles.name}>{userState.googleData?.name}</div>
              <div style={{ height: 36 }}>
                <Image
                  style={{ borderRadius: "50%" }}
                  width={36}
                  height={36}
                  src={userState.googleData?.picture || ""}
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p css={styles.text}>Sam Moore</p>
            <Image src={profile} alt="miniProfile" />
          </>
        )}
      </div>
    </div>
  );
};
export default TopBar;
