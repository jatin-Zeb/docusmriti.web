/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import Button from "../shared/Button";
import { BellOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div css={styles.header}>
      <div></div>
      <div css={styles.headerbuttonGroup}>
        <Button type="link" typeAttribute="active" onClick={() => {}}>
          Home
        </Button>
        <Button type="link" onClick={() => {}}>
          How it works?
        </Button>
        <Button type="link" onClick={() => {}}>
          Pricing
        </Button>
        <Button type="link" onClick={() => {}}>
          Blog
        </Button>
        <Button type="primary" size="large" onClick={() => {}}>
          Login
        </Button>
        <BellOutlined css={styles.buttonIcon} />
      </div>
    </div>
  );
};
export default Header;
