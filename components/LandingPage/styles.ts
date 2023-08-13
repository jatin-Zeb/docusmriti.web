import { colors, utils, typography, mixins } from "../../styles1";
import { css } from "@emotion/react";

// export const landingContainer = css({
//   height: "100%",
//   background: "rgb(248,248,248)",
// });

// export const body = css({
//   display: "flex",
//   padding: `${utils.remConverter(20)} ${utils.remConverter(100)}`,
// });

// export const getStarted = css({
//   flex: 1,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//   gap: utils.remConverter(20),
// });

// export const getStartedButton = css({
//   textTransform: "none",
//   padding: `${utils.remConverter(8)} ${utils.remConverter(40)}`,
//   backgroundColor: "white",
//   color: "#444444",
//   borderRadius: utils.remConverter(8),
//   textDecoration: "underline",
// });

// export const getStartedText = css({
//   fontSize: utils.remConverter(36),
//   maxWidth: utils.remConverter(480),
//   fontStyle: "italic",
//   textAlign: "center",
// });

// export const icon = css({
//   flex: 1,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   img: {
//     maxWidth: utils.remConverter(300),
//     maxHeight: utils.remConverter(300),
//   },
// });

// export const feature = css({
//   ...typography.H5_20_regular,
//   color: colors.Zeb_Solid_Dark,

//   display: "contents",
//   flexDirection: "row",
//   margin: "0px 10px",
//   "::after": {
//     content: `""`,
//     flex: "1 1",
//     borderBottom: "1px solid",
//     margin: "auto",
//     marginLeft: "10px",
//   },
//   "::before": {
//     content: `""`,
//     flex: "1 1",
//     borderBottom: "1px solid",
//     margin: "auto",
//     marginRight: "10px",
//   },
// });

// export const heading = css({
//   ...typography.H1_56_bold,
//   width: "60%",
//   color: colors.Zeb_Solid_Dark,
// });

// export const subHeading = css({
//   ...typography.H5_20_semibold,
//   color: colors.Zeb_Solid_Dark_Grey,
// });

// export const main = css({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   // background: "#52B58812",
//   margin: "0px -100px",
//   padding: `${utils.remConverter(0)} ${utils.remConverter(100)}`,
//   paddingBottom: "56px",
// });

// export const subContent = css({
//   // background: "white",
//   margin: "0px -100px",
//   padding: `${utils.remConverter(50)} ${utils.remConverter(100)}`,

//   background: "#8bdbf22b",
// });

// export const subscribe = css({
//   textAlign: "center",
//   justifyContent: "space-between",
//   // background: "#52B58812",
//   margin: "0px -100px",
//   padding: `${utils.remConverter(30)} ${utils.remConverter(100)}`,
// });

// export const subContentHeading = css({
//   ...typography.H2_44_bold,
//   color: colors.Zeb_Solid_Dark,
// });

// export const featureHeading = css({
//   ...typography.H5_20_bold,
//   color: colors.Zeb_Solid_Dark,
// });

// export const featureSubHeading = css({
//   ...typography.B3_16_semibold,
//   color: colors.Zeb_Solid_Dark_Grey,
// });

// export const benefitHeading = css({
//   ...typography.H4_28_bold,
//   color: colors.Zeb_Solid_Dark,
// });

// export const ul = css({
//   color: colors.Zeb_Solid_Dark_Grey,
//   lineHeight: "25px",
// });

export const landingPageContainer = css({
  width: "100vw",
  minHeight: "100vh",
  background: colors.Zeb_Solid_BG_Dark_blue,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const header = css({
  maxWidth: utils.remConverter(1120),
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: utils.remConverter(24),
});

export const menuContainer = css({
  justifyContent: "center",
  alignItems: "center",
  gap: utils.remConverter(24),
  display: "flex",
});

export const menuItem = css({
  ...typography.Paragraph_16,
  color: colors.Zeb_Secondary_Text,
});

export const container1 = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: utils.remConverter(1120),
  padding: utils.remConverter(24),
  marginTop: utils.remConverter(120),
  overflowX: "hidden",
});

export const mainText = css({
  flex: 1,
  paddingRight: "15%",
});

export const bigText = css({
  ...typography.H1_Title_60,
});

export const smallText = css({
  marginTop: utils.remConverter(30),
  ...typography.H3_Title_25,
});

export const startButton = css({
  marginTop: utils.remConverter(30),
});

export const mainImage = css({
  flex: 1,
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
});

export const bgImg1 = css({
  position: "absolute",
  bottom: 0,
  backgroundImage: `url(/images/bgImg1.svg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "20%",
});

export const outer = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  overflowX: "hidden",
});

export const container2 = css({
  ...typography.H2_Title_35,
  marginTop: utils.remConverter(150),
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: `0 ${utils.remConverter(24)}`,
  position: "relative",
});

export const circle = css({
  height: utils.remConverter(400),
  width: utils.remConverter(400),
  position: "absolute",
  borderRadius: "50%",
  background: colors.Zeb_Primary_Gradient,
  opacity: 0.3,
  filter: "blur(92px)",
  left: 0,
  bottom: 0,
});

export const videoContainer = css({
  ...typography.H3_Title_25,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: utils.remConverter(60),
  width: "100%",
  maxWidth: utils.remConverter(1120),
  height: utils.remConverter(500),
  backgroundColor: colors.Zeb_Card_Background_Dark,
  border: `2px solid ${colors.Zeb_Divider_Purple}`,
  borderRadius: utils.remConverter(16),
  marginBottom: utils.remConverter(150),
  zIndex: 1,
});

export const container3 = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: colors.Zeb_Primary_Gradient,
});

export const whyTitle = css({
  ...typography.H2_Title_35,
  marginTop: utils.remConverter(94),
  marginBottom: utils.remConverter(100),
});

export const whyContent = css({
  display: "flex",
  flexDirection: "column",
  gap: utils.remConverter(60),
  marginBottom: utils.remConverter(100),
});

export const content1 = css({
  display: "flex",
  gap: utils.remConverter(20),
});

export const row = css({
  display: "flex",
  justifyContent: "space-around",
  maxWidth: utils.remConverter(900),
  gap: "5%",
  div: {
    flex: 1,
  },
});

export const contentTitle = css({
  ...typography.H5_Title_18,
  color: colors.Zeb_Solid_White,
});

export const textContent = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  div: {
    flex: 0,
  },
});

export const content4 = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
});

export const title4 = css({
  ...typography.H2_Title_35,
  marginTop: utils.remConverter(150),
  marginBottom: utils.remConverter(60),
});

export const textTitle4 = css({
  ...typography.H4_Title_18,
  marginBottom: utils.remConverter(19),
});

export const textContainer4 = css({
  display: "flex",
  gap: utils.remConverter(40),
  alignItems: "center",
});

export const cardContainer = css({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: utils.remConverter(100),
});

export const text4 = css({
  maxWidth: utils.remConverter(300),
});

export const underline = css({
  background: colors.Zeb_Primary_Gradient,
  height: "2px",
  marginTop: utils.remConverter(30),
});

export const title42 = css({
  ...typography.H2_Title_35,
  marginTop: utils.remConverter(150),
});

export const subtitle = css({
  ...typography.Paragraph_16,
  maxWidth: utils.remConverter(444),
  marginTop: utils.remConverter(30),
  textAlign: "center",
});

export const priceContainer = css({
  display: "flex",
  gap: utils.remConverter(20),
  marginTop: utils.remConverter(60),
  justifyContent: "space-around",
  flexWrap: "wrap",
  paddingBottom: utils.remConverter(100),
  overflow: "hidden",
});

export const priceCard = css({
  ...typography.Paragraph_16,
  width: utils.remConverter(360),
  background: colors.Zeb_Card_Background_Dark,
  borderRadius: utils.remConverter(16),
  zIndex: 1,
});

export const div1 = css({
  padding: utils.remConverter(50),
  paddingBottom: utils.remConverter(40),
  borderBottom: `1px solid ${colors.Zeb_Divider_Purple}`,
});

export const div2 = css({
  padding: utils.remConverter(50),
});

export const feeRow = css({
  display: "flex",
  gap: utils.remConverter(10),
  alignItems: "center",
  marginBottom: utils.remConverter(16),
});

export const feeButton = css({
  marginTop: utils.remConverter(40),
});

export const feeTitle = css({
  ...typography.H3_Title_25,
  marginBottom: utils.remConverter(19),
});

export const fees = css({
  ...typography.H2_Title_35,
});

export const feeContainer = css({
  marginTop: utils.remConverter(30),
});

export const circle2 = css({
  height: utils.remConverter(400),
  width: utils.remConverter(400),
  position: "absolute",
  borderRadius: "50%",
  background: colors.Zeb_Primary_Gradient,
  opacity: 0.3,
  filter: "blur(92px)",
  top: utils.remConverter(250),
  right: 0,
});

export const footer = css({
  padding: utils.remConverter(24),
  paddingTop: utils.remConverter(100),
  paddingBottom: utils.remConverter(40),
  backgroundColor: colors.Zeb_Card_Background_Dark,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: utils.remConverter(150),
  flexWrap: "wrap",
  "@media screen and (max-width: 1050px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: utils.remConverter(50),
    textAlign: "center",
  },
});

export const foot1 = css({
  display: "flex",
  flexDirection: "column",
  gap: utils.remConverter(30),
});

export const foothead = css({
  ...typography.H1_Title_20,
});

export const footText = css({
  ...typography.H1_Text_16,
  color: colors.Zeb_Secondary_Text,
});

export const finalFooter = css({
  ...typography.Sub_Paragraph_14,
  padding: utils.remConverter(40),
  paddingTop: 0,
  backgroundColor: colors.Zeb_Card_Background_Dark,
  color: colors.Zeb_Secondary_Text,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  "@media screen and (max-width: 1050px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: utils.remConverter(20),
    textAlign: "center",
  },
});

export const loginContainer = css({
  padding: utils.remConverter(30),
  position: "absolute",
  backgroundColor: colors.Zeb_Card_Background_Dark,
  borderRadius: utils.remConverter(16),
  border: `2px solid ${colors.Zeb_Divider_Purple}`,
  top: utils.remConverter(68),
  right: 0,
  zIndex: 3,
});

export const loginButton = css({
  position: "relative",
});

export const polygon = css({
  position: "absolute",
  top: -10,
  right: 20,
});

export const loginHeader = css({
  ...typography.H3_Title_25,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: utils.remConverter(30),
});

export const loginOptions = css({
  display: "flex",
  flexDirection: "column",
  gap: utils.remConverter(20),
});

export const option = css({
  border: `1px solid ${colors.Zeb_Divider_Purple}`,
  borderRadius: utils.remConverter(5),
  width: utils.remConverter(240),
  height: utils.remConverter(45),
  padding: `${utils.remConverter(10)} ${utils.remConverter(20)}`,
  display: "flex",
  gap: utils.remConverter(10),
  alignItems: "center",
  cursor: "pointer",
});

export const overlay = css({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
});

export const profileContainer = css({
  display: "flex",
  gap: utils.remConverter(15),
  alignItems: "center",
});

export const name = css({
  ...typography.Paragraph_16,
});
