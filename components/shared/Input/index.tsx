/** @jsxImportSource @emotion/react */

import * as React from "react";
import { colors } from "../../../styles1";
import { ConfigProvider, Input, InputProps } from "antd";

const CustomInput: React.FC<InputProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: colors.Zeb_Card_Background_Dark,
          colorBorder: colors.Zeb_Divider_Purple,
          colorText: colors.Zeb_Solid_White,
          colorTextPlaceholder: colors.Docu_Secondary_Placeholder,
        },
      }}
    >
      <Input {...props} />
    </ConfigProvider>
  );
};

export default CustomInput;
