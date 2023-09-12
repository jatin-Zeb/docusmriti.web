/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { useCallback, useState } from "react";
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Steps,
  Typography,
} from "antd";
import Button from "../Shared/Button";
import { colors, mixins, utils } from "../../styles1";
import UploadAadhar from "./UploadAadhar";
import AddSelfie from "./AddSelfie";
import Image from "next/image";
import verification_success from "../../public/icons/verification_success.png";
import { StoreState } from "../../reducers";
import { useSelector } from "react-redux";
import { KYCDocs } from "../../reducers/kyc";
import { UserState } from "../../reducers/userInfo";
import { KycReqData } from "../../typings/kycDocs";
import { uploadKycDetails } from "../../actions/kyc";
import { useRouter } from "next/router";
import AssetsImg from "@public/index";

import CustomInput from "@components/Shared/Input";
import FormItem from "@components/Shared/FormItem";

export enum KycPage {
  KycForm,
  UploadDocuments,
  VerificationResult,
}

export interface Aadhar {
  front: FileList;
  back: FileList;
}
export interface KycDetails {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  selfieURL: string;
  createDate: string;
}

const KycHome: React.FC = () => {
  const [step, setStep] = useState<number>(2);
  const [selfie, setSelfie] = useState("");
  const [loading, setLoading] = useState(false);
  const { kycData } = useSelector<StoreState, KYCDocs>((state) => state.kyc);
  const { isLoggedIn } = useSelector<StoreState, UserState>(
    (state) => state.user
  );
  const [isKycStarteed, setIsKycStarted] = useState(true);
  const router = useRouter();
  const [aadhar, setAadhar] = useState<Aadhar>({
    front: {} as FileList,
    back: {} as FileList,
  });

  const [kycDetails, setKycDetails] = useState<KycDetails>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    selfieURL: "",
    createDate: "",
  });

  const onFormSubmit = (values: any) => {
    setKycDetails({
      ...kycDetails,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob["$d"].toLocaleString(),
      gender: values.gender,
      aadhaarNumber: values.aadhaarNumber,
    });
    setStep(step + 1);
  };

  const onKYCDetailsSubmit = async () => {
    const addKYC = async () => {
      const googleToken = sessionStorage.getItem("google_token");
      const reqData: KycReqData = {
        first_name: kycDetails.firstName,
        last_name: kycDetails.lastName,
        dob: kycDetails.dob,
        gender: kycDetails.gender,
        aadhaar_number: kycDetails.aadhaarNumber,
        aadhaar_front_path: "FRONTURL",
        aadhaar_back_path: "BACKURL",
        selfie_path: "SELFIEURL",
      };
      if (googleToken) uploadKycDetails(googleToken, reqData);
    };
    addKYC().then(() => {
      setStep(step + 1);
    });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const initialValues = {
    firstName: kycDetails.firstName,
    lastName: kycDetails.lastName,
    gender: kycDetails.gender,
    aadhaarNumber: kycDetails.aadhaarNumber,
  };

  const stepperContent = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <div css={styles.kycStep}>
            <ConfigProvider theme={{}}>
              <Typography.Title
                level={2}
                style={{
                  color: colors.Zeb_Solid_White,
                  marginBottom: utils.remConverter(20),
                  marginTop: utils.remConverter(60),
                }}
              >
                Personal Details
              </Typography.Title>
            </ConfigProvider>
            <Typography.Paragraph
              style={{
                color: colors.Docu_Secondary_Text,
                marginBottom: utils.remConverter(20),
              }}
            >
              Fill out Your personal Details for to progress ahead
            </Typography.Paragraph>
            <Form
              name="basic"
              initialValues={initialValues}
              onFinish={onFormSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <div css={{ width: "100%" }}>
                <div css={mixins.flexJustifiedBetween}>
                  <FormItem
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your First Name!",
                      },
                    ]}
                    required
                    css={{ width: "33%", color: colors.Docu_Secondary_Text }}
                  >
                    <CustomInput placeholder="Enter First Name" />
                  </FormItem>

                  <FormItem
                    label="Last Name"
                    name="lastName"
                    css={{ width: "40%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your Last Name!",
                      },
                    ]}
                    required
                  >
                    <CustomInput placeholder="Enter Last Name" />
                    {/* <Input placeholder="Enter Last Name" /> */}
                  </FormItem>
                  <FormItem
                    name="gender"
                    label="Gender"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your Gender!",
                      },
                    ]}
                    css={{ width: "25%" }}
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorBgContainer: colors.Zeb_Card_Background_Dark,
                          colorBorder: colors.Zeb_Divider_Purple,
                          colorText: colors.Zeb_Solid_White,
                          colorBgElevated: colors.Zeb_Card_Background_Dark,
                          controlItemBgActive: colors.Docu_Secondary_Text,
                          controlItemBgHover: colors.Zeb_Divider_Purple,
                          colorTextPlaceholder:
                            colors.Docu_Secondary_Placeholder,
                        },
                      }}
                    >
                      <Select placeholder="Gender">
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                      </Select>
                    </ConfigProvider>
                  </FormItem>
                </div>
                <div css={mixins.flexJustifiedBetween}>
                  <FormItem
                    name="dob"
                    label="Date of Birth"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your Date of Birth!",
                      },
                    ]}
                    css={{ width: "35%" }}
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorBgContainer: colors.Zeb_Card_Background_Dark,
                          colorBorder: colors.Zeb_Divider_Purple,
                          colorText: colors.Zeb_Solid_White,
                          colorBgElevated: colors.Zeb_Card_Background_Dark,
                          colorTextPlaceholder:
                            colors.Docu_Secondary_Placeholder,
                        },
                      }}
                    >
                      <DatePicker
                        placeholder="Choose Date"
                        css={{ width: "100%" }}
                      />
                    </ConfigProvider>
                  </FormItem>
                  <FormItem
                    name="aadhaarNumber"
                    label="Aadhaar Number"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your Aadhar  Number!",
                      },
                    ]}
                    css={{ width: "62%" }}
                  >
                    <CustomInput
                      type="number"
                      placeholder="Enter Aadhar Number"
                    />
                  </FormItem>
                </div>
              </div>
              <FormItem
                style={{
                  // marginTop: "100px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button type="blue" onClick={() => {}} typeAttribute="submit">
                  Next
                </Button>
              </FormItem>
            </Form>
          </div>
        );
        break;
      case 1:
        return (
          <UploadAadhar
            step={step}
            setStep={setStep}
            aadhar={aadhar}
            setAadhar={setAadhar}
          />
        );
        break;
      case 2:
        return (
          <div css={{ textAlign: "center" }}>
            <p css={styles.otp}>Enter Otp</p>
            <Space wrap>
              <CustomInput
                type="number"
                size="large"
                min={0}
                max={9}
                // onChange={onChange}
              />
              <CustomInput
                type="number"
                size="large"
                min={0}
                max={9}

                // onChange={onChange}
              />
              <CustomInput
                type="number"
                size="large"
                min={0}
                max={9}
                // onChange={onChange}
              />
              <CustomInput
                type="number"
                size="large"
                min={0}
                max={9}
                // onChange={onChange}
              />
              <CustomInput
                type="number"
                size="large"
                min={0}
                max={9}
                width={40}
                height={40}
                // onChange={onChange}
              />
            </Space>
            <div
              css={{
                display: "flex",
                marginBottom: utils.remConverter(160),
                marginTop: utils.remConverter(30),
              }}
            >
              <p css={styles.otp}>Didn't recieve OTP?</p>
              <p css={styles.resend}>Resend</p>
            </div>
            <Button type="blue" onClick={() => {}} typeAttribute="submit">
              Next
            </Button>
          </div>
          // <AddSelfie
          //   step={step}
          //   setStep={setStep}
          //   selfie={selfie}
          //   setSelfie={setSelfie}
          //   onSubmit={onKYCDetailsSubmit}
          // />
        );
        break;
      case 3:
        return (
          <div css={styles.kycComplete}>
            <Image src={verification_success} alt={"success"} />
            <Typography.Paragraph>KYC Upload Successful</Typography.Paragraph>
            <div css={{ marginTop: "100px" }}>
              <Button
                type="secondary"
                onClick={() => {
                  router.push("/docs");
                }}
                typeAttribute="submit"
              >
                DONE
              </Button>
            </div>
          </div>
        );
        break;
    }
  }, [step, aadhar, selfie]);
  return (
    <div css={styles.kycMainPage}>
      {kycData && kycData.aadhaar_number.length ? (
        <div
          css={{
            background: colors.Zeb_BG_Light_Blue,
            marginTop: "40px",
            padding: "2%",
            borderRadius: "8px",
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>First Name:</div>{" "}
            <Typography.Text>{kycData.first_name}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>Last Name:</div>{" "}
            <Typography.Text>{kycData.last_name}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>D.O.B:</div>{" "}
            <Typography.Text>{kycData.dob}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>Aadhaar No : </div>{" "}
            <Typography.Text css={{ marginRight: "20px" }}>
              {kycData.aadhaar_number}{" "}
            </Typography.Text>
            {/* <Button type="link" size="small" onClick={() => {}}>
              View
            </Button> */}
          </div>
        </div>
      ) : (
        <div css={styles.kycMainData}>
          {isKycStarteed ? (
            <div css={{ width: "100%" }}>
              <ConfigProvider
                theme={{
                  token: {
                    colorText: colors.Zeb_Solid_White,
                    colorTextDescription: colors.Zeb_Solid_White,
                    colorPrimary: colors.Docu_Primary_Purple,
                    colorFillContent: colors.Zeb_Divider_Purple,
                    colorTextLabel: colors.Docu_Secondary_Text,
                    colorSplit: colors.Zeb_Divider_Purple,
                  },
                }}
              >
                <Steps
                  current={step}
                  items={[
                    {
                      title: "Personal Details",
                    },
                    {
                      title: "Upload Aadhar",
                    },
                    {
                      title: "Add Selfie",
                    },
                    {
                      title: "Done",
                    },
                  ]}
                />
              </ConfigProvider>
              <div css={{ marginTop: "20px" }}>{stepperContent()}</div>
            </div>
          ) : (
            <div>
              <div css={styles.kycStatusBox}>
                <p css={styles.kycHeading}>KYC Verification Pending</p>
                <p css={styles.kycSub}>
                  we kindly request you to verify your KYC information.
                  Completing the KYC verification process ensures a secure and
                  compliant environment for all users.
                </p>
                <Steps
                  direction="vertical"
                  current={step}
                  items={[
                    {
                      title: <span css={styles.stepper}>Personal Details</span>,
                    },
                    {
                      title: <span css={styles.stepper}>Upload Aadhar</span>,
                    },
                    {
                      title: <span css={styles.stepper}>Add Selfie</span>,
                    },
                    {
                      title: <span css={styles.stepper}>Done</span>,
                    },
                  ]}
                />
              </div>
              <Image src={AssetsImg.i_kycBanner} alt="kycBanner" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KycHome;
