/** @jsxImportSource @emotion/react */
import React from "react";
import * as styles from "./styles";
import { utils } from "../../styles1";
import {
  FieldTimeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const HomePage: React.FC = () => {
  return (
    <div css={styles.home}>
      <div css={[styles.card, styles.kyc]}>
        <UserAddOutlined css={styles.icon} />
        Please Verify Your KYC. (Lorem ipsum doler sit amet)
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: utils.remConverter(20),
        }}
      >
        <div css={[styles.card, styles.dataCard]}>
          <FileTextOutlined css={styles.icon1} />
          <div css={styles.cardData}>
            <span css={styles.txt}>23</span> All signed documents
          </div>
        </div>
        <div css={[styles.card, styles.dataCard]}>
          <FileDoneOutlined css={styles.icon1} />
          <div css={styles.cardData}>
            <span css={styles.txt}>12</span> Signed documents
          </div>
        </div>
        <div css={[styles.card, styles.dataCard]}>
          <FieldTimeOutlined css={styles.icon1} />
          <div css={styles.cardData}>
            <span css={styles.txt}>11</span> Pending documents
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
