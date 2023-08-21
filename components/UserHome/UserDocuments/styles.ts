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
  ...typography.B6_12_semibold,
  color: colors.Zeb_Solid_Bright_Blue,
  cursor: "pointer",
});

export const participantInput = css({
  background: colors.Zeb_Transparent_4,
  padding: "10px",
  borderRadius: "8px",
  position: "relative",
  marginBottom: "20px",
});

export const cross = css({
  position: "absolute",
  right: 10,
  top: 10,
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
