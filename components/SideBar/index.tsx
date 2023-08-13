/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import {
  MenuOutlined,
  SettingFilled,
  FileTextOutlined,
  SettingOutlined,
  FileTextFilled,
  RobotOutlined,
  RobotFilled,
  HomeOutlined,
  FileProtectOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { SideBarProps } from "./typings";
import { Button, FloatButton } from "antd";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Docu_logo from "public/Docu_logo.svg";
import { utils } from "../../styles1";

const SideBar: React.FC<SideBarProps> = ({ selected }) => {
  const router = useRouter();

  const sideBarTabs = useMemo(() => {
    return [
      { content: "Home", id: "home", icon: <HomeOutlined /> },
      {
        content: "Documents",
        id: "docs",
        icon: <FileProtectOutlined />,
      },
      {
        content: "Profile",
        id: "profile",
        isDisabled: true,
        icon: <UserOutlined />,
      },
      { content: "KYC", id: "kyc", icon: <UserAddOutlined /> },
      {
        content: "Setting",
        id: "setting",
        isDisabled: true,
        icon: <SettingOutlined />,
      },
    ];
  }, []);
  return (
    <div css={styles.sideBar}>
      <Image src={Docu_logo} alt="" css={styles.image} />
      <div css={{ marginTop: utils.remConverter(63) }}>
        {sideBarTabs.map((buttonData) => {
          const isSelected = selected === buttonData.id;
          const isdisabled = !!buttonData.isDisabled;
          return (
            <div
              css={[
                styles.button,
                isdisabled && styles.disabled,
                isSelected && styles.selected,
              ]}
              key={buttonData.id}
              onClick={() => {
                router.push(buttonData.id);
              }}
            >
              {buttonData.icon}
              <p
                css={{ marginLeft: utils.remConverter(11), display: "inline" }}
              >
                {buttonData.content}
              </p>
            </div>
          );
        })}
      </div>
      {/* <div css={styles.expandMenu}>
        <FloatButton
          icon={<FileTextOutlined />}
          description="HELP"
          shape="square"
          style={{ left: "calc(100%)", top: "150px" }}
        />
        {sideBarTabs.map((buttonData) => {
          const isSelected = selected === buttonData.id;
          return (
            <Button
              type={"text"}
              css={[{ marginBottom: "44px" }, isSelected && styles.selected]}
              key={buttonData.id}
              onClick={() => {
                router.push(buttonData.id);
              }}
              disabled={!!buttonData.isDisabled}
            >
              {buttonData.content}
            </Button>
          );
        })}
      </div> */}
    </div>
  );
};
export default SideBar;
