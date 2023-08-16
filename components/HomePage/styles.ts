import { css } from "@emotion/react";
import { colors, utils } from "../../styles1";

export const home = css({
  background: colors.Zeb_Dark_Background,
  height: "94vh",
  width: "85vw",
  padding: utils.remConverter(40),
});

export const card = css({
  background: colors.Zeb_Card_Background_Dark,
  border: `1px solid ${colors.Zeb_Divider_Purple}`,
  borderRadius: utils.remConverter(10),
});

export const kyc = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(30)}`,
});

export const dataCard = css({
  padding: `${utils.remConverter(31)} ${utils.remConverter(30)}`,
});
