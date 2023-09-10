/** @jsxImportSource @emotion/react */
import React from "react";
import * as styles from "./styles";
import profile from "../../public/images/profile.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { StoreState } from "@reducers/index";
import { UserState } from "@reducers/userInfo";
const UserProfile: React.FC = () => {
  const { googleData } = useSelector<StoreState, UserState>(
    (state) => state.user
  );

  return (
    <div css={styles.docs}>
      <div css={styles.card}>
        <Image src={profile} alt="profile" />

        <div css={styles.cardData}>
          <p css={styles.txt}>
            {`${googleData?.given_name} ${googleData?.family_name}`}{" "}
          </p>
          <p css={styles.txt2}>DOB: 03/08/1996</p>
          <p css={styles.txt2}>Aadhaar No.: xxxx xxxx 864</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
