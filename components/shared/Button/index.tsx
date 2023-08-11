/** @jsxImportSource @emotion/react */
import { Loading } from "@web3uikit/core";
import * as React from "react";
import { colors } from "../../../styles1";
import * as styles from "./styles";
import {
  ButtonProps,
  ButtonSize,
  ButtonType,
  ButtonTypeAttribute,
} from "./typings";

function generateStyle(
  type: ButtonType,
  size: ButtonSize,
  typeAttribute: ButtonTypeAttribute
) {
  switch (type) {
    case "primary":
      return styles.primaryButton;
    case "secondary":
      return styles.secondaryButton;
    case "tertiary":
      return [styles.tertiaryButton, styles.tertiaryButtonText];
    case "link":
      return [styles.linkButton, typeAttribute === "active" && styles.blueText];
    case "tab": {
      if (size === "small") {
        return [styles.tabButton, styles.specialButtonSmText];
      }
      return styles.tabButton;
    }
    case "blue":
      return styles.blueButton;
    case "purple":
      return styles.purpleButton;
    case "white":
      return styles.whiteButton;
    case "special":
      return [styles.specialButton, styles.specialButtonText];
  }
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    size = "medium",
    onClick,
    disabled,
    style,
    children,
    loading,
    typeAttribute = "button",
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={size}
      type={typeAttribute !== "active" ? typeAttribute : undefined}
      css={[
        styles.general,
        generateStyle(type, size, typeAttribute),
        style,
        disabled && styles.disabledButton,
      ]}
    >
      {loading ? (
        <Loading
          size={18}
          spinnerColor={
            type === "primary"
              ? colors.Zeb_Soild_LightGrey
              : colors.Zeb_Solid_Dark
          }
          spinnerType="wave"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
