import { useState } from "react";

import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";

import "./styles.css";

const App = () => {
  // #region The Controlled Logic
  const [otpValues, setOtpValues] = useState([]);
  // #endregion

  // #region The Uncontrolled Logic
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    const { otp } = values;
    if (!otp || otp.includes(undefined) || otp.includes(""))
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."],
        },
      ]);

    console.log(`OTP: ${otp}`);
  };

  return (
    <main className="app">
      <section className="card">
        <h2>Uncontrolled</h2>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="otp"
            className="center-error-message"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <InputOTP autoFocus inputType="numeric" length={4} />
          </Form.Item>

          <Form.Item noStyle>
            <Button block htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </section>

      <section className="card">
        <h2>Controlled</h2>
        <InputOTP
          inputType="custom"
          // Regex below is for all input except numeric
          inputRegex="[^0-9]"
          onChange={setOtpValues}
          value={otpValues}
          inputClassName="input-classname"
          wrapperClassName="wrapper-classname"
        />
        <Button block type="primary" onClick={() => console.log(otpValues)}>
          Submit
        </Button>
      </section>
    </main>
  );
};

export default App;
