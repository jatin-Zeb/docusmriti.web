import { css } from "@emotion/react";
import { colors, typography, utils } from "../../../styles1";

export const userDocuments = css({
  background: colors.Zeb_Dark_Background,
  height: "94vh",
  width: "85vw",
  padding: utils.remConverter(40),
});

export const contractCount = css({
  borderRadius: "10px",
  padding: "2px 7px",
  backgroundColor: "rgb(135, 206, 235, 0.5)",
});

export const participants = css({
  display: "grid",
});

export const truncate = css({
  width: "200px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});
export const addParticipant = css({
  ...typography.Paragraph_16,
  color: colors.Zeb_Secondary_Text,
  cursor: "pointer",
  marginBottom: utils.remConverter(30),
  padding: `${utils.remConverter(17)} ${utils.remConverter(20)}`,
  border: `1px solid ${colors.Zeb_Divider_Purple}`,
  background: colors.Zeb_Dark_Background,
  borderRadius: utils.remConverter(5),
  width: "fit-content",
});

export const participantInput = css({
  padding: utils.remConverter(10),
  borderRadius: utils.remConverter(8),
  position: "relative",
  // marginBottom: utils.remConverter(20),
});

export const cross = css({
  cursor: "pointer",
});

export const submitContainer = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: 8,
  button: {
    flex: 1,
  },
});

export const modalPayment = css({
  display: "flex",
  justifyContent: "space-around",
});

export const loader = css({
  display: "flex",
  height: "350px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const emptyState = css({
  position: "relative",
  margin: utils.remConverter(100),
});

export const sadDoc = css({
  fontSize: utils.remConverter(20),
  position: "absolute",
  top: 20,
});

export const emptyText = css({
  ...typography.H3_Title_25,
  position: "absolute",
  color: colors.Zeb_Solid_White,
  bottom: 40,
});

export const headerStyle = css({
  ...typography.H3_Title_25,
  color: colors.Zeb_Solid_White,
  background: colors.Zeb_Card_Background_Dark,
});
