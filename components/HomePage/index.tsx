/** @jsxImportSource @emotion/react */
import React from "react";
import * as styles from "./styles";
import blockchain from "../../public/images/blockchain.png";
import Image from "next/image";
import { utils } from "../../styles1";

const HomePage: React.FC = () => {
  return (
    <div css={styles.home}>
      <div css={[styles.card, styles.kyc]}></div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: utils.remConverter(20),
        }}
      >
        <div css={[styles.card, styles.dataCard]}></div>
        <div css={[styles.card, styles.dataCard]}></div>
        <div css={[styles.card, styles.dataCard]}></div>
      </div>
    </div>
  );
};

export default HomePage;
