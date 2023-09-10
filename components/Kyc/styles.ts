import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const kycMainPage = css({
  background: colors.Zeb_Dark_Background,
  padding: utils.remConverter(40),
  height: "94vh",
  width: "85vw",
});

export const kycMainData = css({
  padding: utils.remConverter(40),
  background: colors.Zeb_Card_Background_Dark,
  border: `1px solid ${colors.Zeb_Divider_Purple}`,
  borderRadius: utils.remConverter(10),
  display: "flex",
  gap: utils.remConverter(86),
  alignItems: "center",
});

export const kycStatusBox = css({
  borderRadius: `${utils.remConverter(10)} 0rem 0rem ${utils.remConverter(10)}`,
  background: colors.Zeb_Primary_Purple,
  padding: `${utils.remConverter(129)} ${utils.remConverter(59)}`,
  ".ant-steps-item-icon": {
    background: `${colors.Zeb_Solid_White} !important`,
    color: "black !important",
  },
  width: "50%",
});

export const kycHeading = css({
  ...typography.H2_Title_35,
  marginBottom: utils.remConverter(30),
});

export const kycSub = css({
  ...typography.Paragraph_16,
  marginBottom: utils.remConverter(40),
});

export const stepper = css({
  ...typography.Paragraph_16,
  color: colors.Zeb_Solid_White,
});
export const addKyc = css({
  boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
  padding: "1px 40px 36px 40px",
  borderRadius: "12px",
  border: `1px solid ${colors.Zeb_Soild_LightGrey}`,
  minHeight: "80%",
});

export const kycStep = css({});

export const kycComplete = css({
  background: colors.Zeb_Solid_White,
  padding: "15%",
  paddingBottom: "20px",
  textAlign: "center",
  display: "grid",
  justifyItems: "center",
  borderRadius: "8px",
  ...typography.B4_14_semibold,
});
export const heading = css({
  ...typography.H6_16_bold,
  marginRight: "10px",
  width: "15%",
});
