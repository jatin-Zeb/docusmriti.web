import { css } from "@emotion/react";
import { colors, typography, utils } from "../../../styles1";

export const heading = css({
  ...typography.H5_Title_18,
  color: colors.Zeb_Solid_White,
  marginBottom: utils.remConverter(30),
  marginTop: utils.remConverter(80),
});

export const submitButton = css({
  display: "flex",
  justifyContent: "center",
});

export const participantHeading = css({
  width: "100%",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: "500",
  marginBottom: "10px",
});

export const participantDetails = css({
  display: "grid",
  marginBottom: "5px",
});

export const name = css({
  gridRow: "1/2",
});

export const status = css({
  gridRow: "1/2",
});
