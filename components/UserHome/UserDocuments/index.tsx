/** @jsxImportSource @emotion/react */
import { Table, Upload } from "@web3uikit/core";
import {
  Drawer,
  Form,
  Input,
  DatePicker,
  Tabs,
  Button as AntButton,
  Spin,
  Typography,
  message,
  Modal,
  Popover,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { colors, mixins, typography, utils } from "../../../styles1";
import { NFTStorage, File } from "nft.storage";
import * as styles from "./styles";
import { NFT_TOKEN } from "../../../constants/constants";
import { blobToSHA256 } from "file-to-sha256";
import { MoreOutlined, UploadOutlined } from "@ant-design/icons";
import { ContractContextType } from "./../Contract/context";
import { contractContext } from "./../Contract";
import Button from "../../Shared/Button";
import {
  acceptContract,
  addNewContract,
  setUserDocs,
} from "../../../actions/docs";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { NewDoc } from "../../../typings/docs";
import { MPC, UploadedDocsProps } from "../../../reducers/docs";
import { UserState } from "../../../reducers/userInfo";
import { KYCDocs, KYC_STATUS } from "../../../reducers/kyc";
import crossImg from "../../../public/icons/cross.png";
import Image from "next/image";
import VerifyDoc from "../VerifyDoc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssetsImg from "@public/index";

enum ModalType {
  VIEW_PARTICIPANTS = 1,
  APPROVE_CONTRACT,
}

const loadingComponent = (
  <div css={styles.loader}>
    <Spin />
    <div>Fetching Documents...</div>
  </div>
);

const UserDocuments = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { all, signed, pending } = useSelector<StoreState, UploadedDocsProps>(
    (state) => state.docs.uploadedDocs
  );
  const isDocsLoading = false;
  const [submitButton, setSubmitButton] = useState("");
  const { isLoggedIn, loginData } = useSelector<StoreState, UserState>(
    (state) => state.user
  );

  const [form] = Form.useForm();
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  const {
    addContract,
    getUserContracts,
    fetchWalletInfo,
    approveTransaction,
    getContractInfo,
  } = useContext(contractContext) as ContractContextType;
  const [participantsLength, setParticipantsLength] = useState(0);
  const [verifyDocOpen, setVerifyDocOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    emailsInvolved: string[];
    statuses: boolean[];
    sha: string;
  }>({
    emailsInvolved: [],
    statuses: [],
    sha: "",
  });

  const [modalType, setModalType] = useState(ModalType.VIEW_PARTICIPANTS);
  const connectToWallet = async () => {
    await fetchWalletInfo();
  };

  const contactHandler = useCallback(async () => {
    await getUserContracts();
  }, [getUserContracts]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserContracts();
    }
  }, [isLoggedIn, contactHandler]);

  const setModal = (
    EmailsInvolved: string[],
    statuses: boolean[],
    sha: string
  ) => {
    setModalData({
      emailsInvolved: EmailsInvolved,
      statuses: statuses,
      sha: sha,
    });
  };

  const populateUseDocuments = (documents: MPC[], tab: string) => {
    if (!documents.length) return [];
    const data = documents.map((data: MPC, idx: number) => {
      const document = data.contractDetails;
      return [
        <div key={1}>{idx + 1}</div>,
        <p key={3}>{document.Desc}</p>,
        <p key={4}>{document.Category}</p>,
        <p key={5}>{document.StartDate}</p>,
        <p key={6}>{document.EndDate}</p>,
        <div
          css={[
            mixins.flexJustifiedBetween,
            { gap: "10px", alignItems: "center" },
          ]}
          key={4}
        >
          {/* <Button type="link" onClick={() => {}}> */}
          <a href={document.IPFSURI} target="_blank" rel="noreferrer">
            View
          </a>
          {tab === "pending" && (
            <Tooltip
              title={
                loginData && loginData.kyc_status === KYC_STATUS.NOT_VERIFIED
                  ? "Please complete your kyc"
                  : ""
              }
            >
              <AntButton
                type="primary"
                shape="round"
                onClick={() => {
                  if (
                    loginData &&
                    loginData.kyc_status === KYC_STATUS.VERIFIED
                  ) {
                    setModalOpen(true);
                    setModal(data.EmailsInvolved, data.Statuses, data.sha);
                    setModalType(ModalType.APPROVE_CONTRACT);
                  }
                }}
              >
                Approve
              </AntButton>
            </Tooltip>
          )}
          <Popover
            content={
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModalOpen(true);
                  setModal(data.EmailsInvolved, data.Statuses, data.sha);
                  setModalType(ModalType.VIEW_PARTICIPANTS);
                }}
              >
                View Participants
              </div>
            }
          >
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Popover>
        </div>,
      ];
    });

    return data;
  };

  const onFinish = (values: any) => {
    setLoading(true);
    uploadDocToIPFS(values);
  };

  const onFinishFailed = (errorInfo: any) => {};

  async function getImageUrlFromMetaData(IPFSUri: string) {
    IPFSUri = IPFSUri.replace("ipfs://", "https://w3s.link/ipfs/");
    const response = await fetch(IPFSUri);
    const responseJSON = await response.json();
    return responseJSON["image"];
  }

  const uploadDocToIPFS = async (values: any) => {
    try {
      messageApi.info("Uploading");
      if (NFT_TOKEN) {
        //TODO : set loading state to be true here

        const client = new NFTStorage({
          token: NFT_TOKEN,
        });
        const metadata = await client.store({
          name: values.Name,
          description: values.Description,
          image: new File([uplodedDocument], uplodedDocument.name, {
            type: uplodedDocument.type,
          }),
        });
        const sha256 = await blobToSHA256(uplodedDocument);
        const currentTime = new Date();
        const emailArray: string[] = [];
        for (var i = 1; i <= participantsLength; i++) {
          emailArray.push(values["emailAddress" + String(i)]);
        }
        // const imageUrl = await getImageUrlFromMetaData(metadata.url)
        if (submitButton === "Fiat") {
          const uploadData: NewDoc = {
            category: values.Category,
            description: values.Description,
            name: values.Name,
            start_date: values.DateRange[0]["$d"].toLocaleString(),
            end_date: values.DateRange[1]["$d"].toLocaleString(),
            sha256: sha256,
            ipfsUrl: metadata.url,
            inviteEmails: emailArray,
          };
          const googleToken = sessionStorage.getItem("google_token");
          if (googleToken) {
            displayRazorPay(uploadData, setLoading, "ADD_CONTRACT");
          } else {
            alert("PLEASE LOG IN");
            setLoading(false);
          }
        } else {
          await addContract(
            values.Category || "",
            values.Description || "",
            values.Name || "",
            values.Email || "", // ADD GOOGLE EMAIL HERE @TODO
            values.DateRange[0]["$d"].toLocaleString() || "",
            values.DateRange[1]["$d"].toLocaleString() || "",
            currentTime.toLocaleString(),
            sha256,
            metadata.url,
            emailArray
          );
          setLoading(false);
        }

        // await loadMyDocuments();
        // await populateUseDocuments();

        //TODO: set loading state to be false here
        messageApi.success("Uploaded Successfully ");
        message.info("List will be updated in a few minutes");
        for (var i = 0; i < emailArray.length; i++) {
          await sendEmail(emailArray[i]);
        }
      }
    } catch (error) {
      setLoading(false);
      messageApi.error("Failed to Upload");
    }
  };
  async function sendEmail(email: string) {
    const content = {
      receiverEmail: email,
      subject: "Signature Needed in Contract",
    };
    const response = await fetch(
      "https://rose-ill-clownfish.cyclic.app/mail/send",
      {
        method: "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const displayRazorPay = async (
    data: NewDoc,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    type?: string
  ) => {
    const options = {
      key: "rzp_test_TF1xnKd4kEZOBk",
      currency: "INR",
      amount: 100 * 100,
      name: "Docusmriti",
      description: "Pay Online",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: async function(response: any) {
        const googleToken = sessionStorage.getItem("google_token");
        if (googleToken) {
          if (type === "ADD_CONTRACT") {
            const resp = await addNewContract(data, googleToken);
            if (resp) {
              setLoading(false);
              toast("Contract Uploaded Successfully");
            }
          } else {
            const resp = await acceptContract(modalData.sha, googleToken);
            if (resp) {
              setModalOpen(false);
              toast("Contract Approved");
            }
          }
        }
      },
      prefill: {
        name: "User Name",
        email: "email@gmail.com",
      },
      theme: {
        color: "rgba(48, 118, 224, 1)",
        backdrop: "#000000",
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "Pay via these methods",
              instruments: [
                {
                  method: "upi",
                },
                {
                  method: "card",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
    };
    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div css={styles.userDocuments}>
      {contextHolder}

      <div
        css={{
          position: "absolute",
          right: utils.remConverter(40),
          display: "flex",
          zIndex: 10,
        }}
      >
        <Button
          style={{ marginRight: "10px" }}
          type="tertiary"
          size="small"
          onClick={() => {
            setVerifyDocOpen(true);
          }}
          typeAttribute="button"
          disabled={!isLoggedIn}
        >
          Verify Document
        </Button>

        <Button
          type="purple"
          onClick={() => {
            setOpenDrawer(true);
          }}
          size="small"
          style={{ height: "fit-content" }}
          disabled={!isLoggedIn}
        >
          Upload +
        </Button>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <div css={{ color: colors.Zeb_Solid_White }}>
                ALL SIGNED <span css={styles.contractCount}>{all.length}</span>
              </div>
            ),
            children: isDocsLoading ? (
              loadingComponent
            ) : (
              <Table
                tableBackgroundColor={colors.Zeb_Card_Background_Dark}
                customTableBorder="border-top:1px"
                headerBgColor={colors.Zeb_Card_Background_Dark}
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(all, "allSigned")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
                customLoadingContent={<p>guygu</p>}
                customNoDataComponent={
                  <div css={styles.emptyState}>
                    <Image
                      src={AssetsImg.ic_sadDocument}
                      css={styles.sadDoc}
                      alt="sadDocument"
                    />
                    <Image src={AssetsImg.ic_halfMoon} alt="halfMoon" />
                    <p css={styles.emptyText}>No Data</p>
                  </div>
                }
              />
            ),
          },
          {
            key: "2",
            label: (
              <div css={{ color: colors.Zeb_Solid_White }}>
                SIGNED <span css={styles.contractCount}>{signed.length}</span>
              </div>
            ),
            children: isDocsLoading ? (
              loadingComponent
            ) : (
              <Table
                tableBackgroundColor={colors.Zeb_Card_Background_Dark}
                customTableBorder="border-top:1px"
                headerBgColor={colors.Zeb_Card_Background_Dark}
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(signed, "signed")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
                customNoDataComponent={
                  <div css={styles.emptyState}>
                    <Image
                      src={AssetsImg.ic_sadDocument}
                      css={styles.sadDoc}
                      alt="sadDocument"
                    />
                    <Image src={AssetsImg.ic_halfMoon} alt="halfMoon" />
                    <p css={styles.emptyText}>No Data</p>
                  </div>
                }
              />
            ),
          },
          {
            key: "3",
            label: (
              <div css={{ color: colors.Zeb_Solid_White }}>
                PENDING <span css={styles.contractCount}>{pending.length}</span>
              </div>
            ),
            children: isDocsLoading ? (
              loadingComponent
            ) : (
              <Table
                tableBackgroundColor={colors.Zeb_Card_Background_Dark}
                customTableBorder="border-top:1px"
                headerBgColor={colors.Zeb_Card_Background_Dark}
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(pending, "pending")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
                customNoDataComponent={
                  <div css={styles.emptyState}>
                    <Image
                      src={AssetsImg.ic_sadDocument}
                      css={styles.sadDoc}
                      alt="sadDocument"
                    />
                    <Image src={AssetsImg.ic_halfMoon} alt="halfMoon" />
                    <p css={styles.emptyText}>No Data</p>
                  </div>
                }
              />
            ),
          },
        ]}
        onChange={(value) => {}}
      />

      <Drawer
        open={verifyDocOpen}
        width={"30%"}
        onClose={() => setVerifyDocOpen(false)}
        title={<p css={styles.headerStyle}>Verify Document</p>}
        bodyStyle={{ background: colors.Zeb_Card_Background_Dark }}
        headerStyle={{
          background: colors.Zeb_Card_Background_Dark,
        }}
        closeIcon={false}
      >
        <VerifyDoc />
      </Drawer>

      <Drawer
        open={openDrawer}
        width={"30%"}
        onClose={() => {
          setOpenDrawer(false);
        }}
        title={<p css={styles.headerStyle}>Upload Document</p>}
        bodyStyle={{
          background: colors.Zeb_Card_Background_Dark,
        }}
        headerStyle={{
          background: colors.Zeb_Card_Background_Dark,
        }}
      >
        <div
          css={{
            label: {
              color: `${colors.Zeb_Secondary_Text} !important`,
            },
            input: {
              background: colors.Zeb_Card_Background_Dark,
              border: `1px solid ${colors.Zeb_Divider_Purple}`,
              color: colors.Zeb_Solid_White,
            },
            textarea: {
              background: colors.Zeb_Card_Background_Dark,
              border: `1px solid ${colors.Zeb_Divider_Purple}`,
              color: colors.Zeb_Solid_White,
            },
          }}
        >
          <Spin spinning={loading}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Document Title"
                name="Name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                preserve={true}
                initialValue={loginData?.email}
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  value={loginData?.email}
                  disabled
                  style={{
                    background: colors.Zeb_Card_Background_Dark,
                    border: `1px solid ${colors.Zeb_Divider_Purple}`,
                    color: colors.Zeb_Solid_White,
                  }}
                />
              </Form.Item>
              <Form.Item
                name="DateRange"
                label="Contract Validity Date"
                rules={[{ required: true, message: "Select date range!" }]}
              >
                <DatePicker.RangePicker
                  style={{
                    background: colors.Zeb_Card_Background_Dark,
                    border: `1px solid ${colors.Zeb_Divider_Purple}`,
                    color: colors.Zeb_Solid_White,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Category"
                name="Category"
                rules={[{ required: true, message: "Enter Category" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Description"
                label="Description"
                rules={[{ required: true, message: "Enter Description" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              {participantsLength < 5 && (
                <div
                  css={styles.addParticipant}
                  onClick={() => setParticipantsLength(participantsLength + 1)}
                >
                  Add Participant +
                </div>
              )}
              {[...Array(participantsLength)].map((val, key) => (
                <div key={key} css={styles.participantInput}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input Email!",
                        type: "email",
                      },
                    ]}
                    label={`Email Address ${key + 1}`}
                    name={`emailAddress${key + 1}`}
                  >
                    <Input
                      addonAfter={
                        <Image
                          css={styles.cross}
                          src={crossImg}
                          height={20}
                          width={25}
                          alt=""
                          onClick={() =>
                            setParticipantsLength(participantsLength - 1)
                          }
                        />
                      }
                    />
                  </Form.Item>
                </div>
              ))}

              <Form.Item
                name="UploadedFile"
                label="Upload a Document to Verify it on Blockchain"
              >
                <Upload
                  style={{
                    background: colors.Zeb_Card_Background_Dark,
                    border: `1px dashed ${colors.Zeb_Divider_Purple}`,
                    boxShadow: "-25px 0px 200px 0px rgba(255, 255, 255, 0.05)",
                  }}
                  descriptionText="Recommendation: minimum of 350px by 350px"
                  onChange={(file) => {
                    setUploadedDocument(file);
                  }}
                  theme="withIcon"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ flex: "auto" }}>
                <div css={styles.submitContainer}>
                  <Button
                    type="secondary"
                    typeAttribute="submit"
                    onClick={() => setSubmitButton("Fiat")}
                  >
                    Pay via FIAT
                  </Button>
                  <Button
                    type="primary"
                    typeAttribute="submit"
                    onClick={() => setSubmitButton("Metamask")}
                  >
                    Pay via Metamask
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </Drawer>
      <ToastContainer position="bottom-left" />
      <Modal
        width={400}
        title={
          modalType === ModalType.APPROVE_CONTRACT
            ? "Choose Payment type"
            : "Participants"
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {modalType === ModalType.VIEW_PARTICIPANTS ? (
          <div css={styles.participants}>
            <React.Fragment>
              <span
                style={{
                  gridRow: "1/2",
                  fontWeight: "700",
                  paddingBottom: "10px",
                }}
              >
                Email
              </span>
              <span style={{ gridRow: "1/2", fontWeight: "700" }}>Status</span>
            </React.Fragment>
            {modalData.emailsInvolved.map((val, key) => {
              return (
                <React.Fragment key={key}>
                  <span>{val}</span>
                  <span style={{ paddingBottom: "10px" }}>
                    <Tag color={modalData.statuses[key] ? "green" : "gold"}>
                      {modalData.statuses[key] ? "SIGNED" : "PENDING"}
                    </Tag>
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div css={styles.modalPayment}>
            <Button
              type="secondary"
              onClick={() => displayRazorPay({} as NewDoc, setLoading)}
            >
              Pay via Fiat
            </Button>
            <Button
              type="primary"
              onClick={() =>
                approveTransaction(loginData?.email ?? "", modalData.sha)
              }
            >
              Pay via Metamask
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDocuments;
