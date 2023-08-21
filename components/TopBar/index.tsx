/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { TopBarProps } from "./typings";
import profile from "../../public/images/profile.png";
import { Image } from "antd";

const TopBar: React.FC<TopBarProps> = ({ selected }) => {
  return (
    <div css={styles.topBar}>
      <p css={styles.text}>{selected}</p>
      <div css={styles.profile}>
        <p css={styles.text}>Sam Moore</p>
        <Image src={profile} alt="miniProfile" />
      </div>
    </div>
  );
};
export default TopBar;
