import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const header = css({
  padding: `${utils.remConverter(30)} ${utils.remConverter(50)}`,
  boxShadow: "0px 2px 4px #1B252C",
  display: "flex",
  justifyContent: "space-between",
});

export const headerbuttonGroup = css({
  minWidth: "40%",
  display: "flex",
  justifyContent: "space-between",
});

export const buttonIcon = css({
  padding: utils.remConverter(10),
  background: colors.Docu_Solid_Grey,
  alignSelf: "center",
  borderRadius: utils.remConverter(5),
  color: "black",
  fontSize: "22px",
});
