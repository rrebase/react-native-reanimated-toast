import { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import type { Color } from "../types";

interface BaseStyles {
  base: ViewStyle;
  iconContainer: ViewStyle;
  icon: ViewStyle;
  contentContainer: ViewStyle;
  closeButtonContainer: ViewStyle;
  closeIcon: ViewStyle;
  title: ViewStyle;
  message: ViewStyle;
}

export const useBaseStyles = (
  backgroundColor: Color,
  titleColor: Color,
  messageColor: Color
): StyleSheet.NamedStyles<BaseStyles> => {
  return useMemo(
    () =>
      StyleSheet.create({
        base: {
          flexDirection: "row",
          height: 80,
          width: "94%",
          borderRadius: 10,
          backgroundColor: backgroundColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 2,
          opacity: 0.95,
        },
        iconContainer: {
          paddingHorizontal: 14,
          justifyContent: "center",
          alignItems: "center",
        },
        icon: {
          width: 16,
          height: 16,
        },
        contentContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start", // in case of rtl the text will start from the right
        },
        closeButtonContainer: {
          paddingHorizontal: 18,
          alignItems: "center",
          justifyContent: "center",
          color: "#ccc",
        },
        closeIcon: {
          width: 9,
          height: 9,
        },
        title: {
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 3,
          color: titleColor,
        },
        message: {
          fontSize: 14,
          color: messageColor,
        },
      }),
    [messageColor, titleColor, backgroundColor]
  );
};
