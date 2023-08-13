/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { TopBarProps } from "./typings";

const TopBar: React.FC<TopBarProps> = ({ selected }) => {
  return (
    <div css={styles.topBar}>
      <p css={styles.text}>{selected}</p>
      <div css={styles.profile}>
        <p css={styles.text}>Sam Moore</p>
        <img src={"dawd.svg"} />
      </div>
    </div>
  );
};
export default TopBar;
