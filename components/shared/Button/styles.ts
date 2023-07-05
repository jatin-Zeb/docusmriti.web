import { css } from "@emotion/react";
import { typography, colors, utils } from "../../../styles1";

export const general = css({
  cursor: "pointer",
});

export const linkButton = css({
  padding: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "none",
  outline: "none",
  ...typography.B4_14_semibold,
  color: colors.Docu_Solid_Light_Grey,
  "&.small": {
    ...typography.C4_12,
    color: colors.Zeb_Solid_Bright_Blue,
  },
});

export const primaryButton = css({
  background: colors.Docu_Solid_Purple,
  borderRadius: utils.remConverter(5),
  boxShadow: "none",
  border: "none",
  outline: "none",
  whiteSpace: "nowrap",
  ...typography.B4_14_semibold,
  "&.small": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
    ...typography.B4_14_semibold,
  },
  "&.medium": {
    padding: `${utils.remConverter(10)} ${utils.remConverter(20)}`,
    ...typography.B4_14_semibold,
  },
  "&.large": {
    padding: `${utils.remConverter(12)} ${utils.remConverter(24)}`,
    ...typography.B4_14_semibold,
  },
  "&.full-width": {
    padding: `${utils.remConverter(8)} 0`,
    width: "100%",
  },
  "&:disabled": {
    background: colors.Zeb_Solid_Grey,
  },
});

export const secondaryButton = css({
  padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
  background: colors.Zeb_Solid_White,
  border: `1px solid ${colors.Zeb_Soild_LightGrey}`,
  borderRadius: "15px",
  ...typography.C2_16,
  color: colors.Zeb_Solid_Dark,
  "&.small": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
    ...typography.C4_12,
  },
  "&.medium": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
    ...typography.C4_12,
  },
  "&.large": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
    ...typography.C2_16,
  },
  "&.full-width": {
    padding: `${utils.remConverter(8)} 0`,
  },
  "&:disabled": {
    borderColor: colors.Zeb_Solid_Grey,
  },
});

export const specialButton = css({
  padding: `${utils.remConverter(6)} 0`,
  background: colors.Zeb_Gradient_Blue_01,
  boxShadow: "none",
  border: "none",
  outline: "none",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&.small": {
    width: "100%",
    padding: `${utils.remConverter(8)} 0`,
  },
  "&.large": { width: "100%" },
  "&.full-width": { width: "100%" },
  "&.medium": { width: "100%" },
});

export const specialButtonText = css({
  marginLeft: utils.remConverter(8),
  ...typography.C3_14,
});

export const specialButtonSmText = css({
  display: "none",
});

export const tertiaryButton = css({
  padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
  background: colors.Zeb_Transparent_4,
  boxShadow: "none",
  border: `1px solid ${colors.Zeb_Solid_Bright_Blue}`,
  outline: "none",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&.large": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
  },
  "&.small": {
    padding: utils.remConverter(4),
  },
  "&.full-width": { width: "100%" },
});

export const tertiaryButtonText = css({
  marginLeft: utils.remConverter(4),
  ...typography.C4_12,
});

export const tabButton = css({
  border: `0.5px solid ${colors.Zeb_Solid_Light_Blue}`,
  borderRadius: "4px",
  padding: `${utils.remConverter(4)} ${utils.remConverter(8)}`,
  ...typography.B5_12_semibold,
  color: colors.Zeb_Solid_Light_Blue,
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
  cursor: "pointer",
  "&.active": {
    background: colors.Zeb_Solid_Dark_Blue,
    borderColor: colors.Zeb_Solid_Bright_Blue,
    ...typography.C4_12,
  },
});

export const disabledButton = css({
  cursor: "not-allowed",
});

export const blueText = css({
  color: colors.Docu_Solid_Blue,
});
export const blueButton = css({
  background: "#3878D9",
  borderRadius: utils.remConverter(8),
  boxShadow: "none",
  border: "none",
  outline: "none",
  whiteSpace: "nowrap",
  ...typography.C4_12,
  "&.small": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
    ...typography.C4_12,
  },
  "&.medium": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
    ...typography.C4_12,
  },
  "&.large": {
    padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
    ...typography.C2_16,
  },
  "&.full-width": {
    padding: `${utils.remConverter(8)} 0`,
    width: "100%",
  },
  "&:disabled": {
    background: "#d3d3d3",
  },
});
