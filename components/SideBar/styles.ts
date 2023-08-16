import { css } from "@emotion/react";
import { colors, utils } from "../../styles1";
export const sideBar = css({
  width: "15vw",
  borderRight: `1px solid ${colors.Zeb_Divider_Purple}`,
  textAlign: "center",
  position: "relative",
  minHeight: "100vh",
  background: colors.Zeb_Card_Background_Dark,
});

export const image = css({
  marginTop: utils.remConverter(14),
});
export const iconSpace = css({
  display: "inline-grid",
  marginTop: "26px",
});

export const optionSpace = css({
  display: "inline-grid",
});

export const optionIcon = css({
  fontSize: "18px",
  color: "#000000",
  margin: "30px 0px",
  cursor: "pointer",
});
export const gap = css({
  marginBottom: "80px",
  marginTop: "0px",
});

export const expandMenu = css({
  position: "absolute",
  color: "black",
  left: "calc(110%)",
  top: "150px",
  transition: "0.2s all linear",
});
export const hide = css({
  opacity: 0,
  left: 0,
});

export const button = css({
  textAlign: "left",
  borderRadius: utils.remConverter(5),
  padding: `${utils.remConverter(15)} ${utils.remConverter(26)}`,
  cursor: "pointer",
  margin: `${utils.remConverter(0)} ${utils.remConverter(
    14
  )} ${utils.remConverter(10)} ${utils.remConverter(14)}`,
});
export const disabled = css({
  pointerEvents: "none",
  opacity: 0.8,
});
export const selected = css({
  background: colors.Zeb_Primary_Gradient,
});
