/** @jsxImportSource @emotion/react */
import { ConfigProvider, Form } from "antd";
import { FormItems } from "./typings";
import { colors } from "../../../styles1";

const FormItem: React.FC<FormItems> = (formItemProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: colors.Docu_Secondary_Text,
        },
        components: {},
      }}
    >
      <Form.Item
        css={{
          ".ant-form-item-label": {
            textAlign: "start",
          },
        }}
        {...formItemProps}
      >
        {formItemProps.children}
      </Form.Item>
    </ConfigProvider>
  );
};

export default FormItem;
