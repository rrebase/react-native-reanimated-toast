import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useToastContext from "../hooks/useToastContext";
import type { SvgProps } from "../types";

export function SuccessIcon({
  color,
  size = 24,
}: SvgProps): React.ReactElement {
  const { colors } = useToastContext();
  const fillColor = color ?? colors.success;

  return (
    <Svg viewBox="0 0 512 512" height={`${size}pt`} width={`${size}pt`}>
      <Path
        fill={fillColor}
        d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"
      />
      <Path
        fill={fillColor}
        d="M232 341.332c-4.098 0-8.191-1.555-11.309-4.691l-69.332-69.332c-6.25-6.254-6.25-16.387 0-22.637s16.383-6.25 22.637 0l58.024 58.027 127.363-127.36c6.25-6.25 16.383-6.25 22.633 0s6.25 16.384 0 22.634L243.348 336.64A16.03 16.03 0 01232 341.332zm0 0"
      />
    </Svg>
  );
}
