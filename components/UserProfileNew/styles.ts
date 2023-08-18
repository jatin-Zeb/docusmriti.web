import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const docs = css({
  background: colors.Zeb_Dark_Background,
  height: "94vh",
  width: "85vw",
  padding: utils.remConverter(40),
});

export const card = css({
  background: colors.Zeb_Card_Background_Dark,
  border: `1px solid ${colors.Zeb_Divider_Purple}`,
  borderRadius: utils.remConverter(10),
  padding: `${utils.remConverter(31)} ${utils.remConverter(30)}`,
  display: "flex",
  alignItems: "center",
});

export const icon1 = css({
  marginRight: utils.remConverter(20),
  fontSize: utils.remConverter(46),
});

export const cardData = css({
  color: colors.Docu_Seondary_Text,
  marginLeft: utils.remConverter(33),
  gap: utils.remConverter(15),
  display: "inline-grid",
});

export const txt = css({
  ...typography.H3_Title_25,
  color: colors.Zeb_Solid_White,
  textAlign: "left",
  width: "100%",
});

export const txt2 = css({
  ...typography.Paragraph_16,
  textAlign: "left",
  width: "100%",
});
