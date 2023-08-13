import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";
export const topBar = css({
  height: "4vw",
  width: "85vw",
  borderBottom: `1px solid ${colors.Zeb_Divider_Purple}`,
  textAlign: "center",

  background: colors.Zeb_Card_Background_Dark,
  display: "flex",
  justifyContent: "space-between",
  padding: `${utils.remConverter(20)} ${utils.remConverter(40)}`,
});

export const text = css({
  ...typography.Paragraph_16,
  alignSelf: "center",
  marginRight: utils.remConverter(15),
});
export const profile = css({
  display: "flex",
  alignItems: "center",
});
