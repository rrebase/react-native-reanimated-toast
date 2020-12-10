import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useToastContext from "../hooks/useToastContext";
import type { SvgProps } from "../types";

export function ErrorIcon({ color, size = 24 }: SvgProps): React.ReactElement {
  const { colors } = useToastContext();
  const fillColor = color ?? colors.error;

  return (
    <Svg viewBox="0 0 512 512" height={`${size}pt`} width={`${size}pt`}>
      <Path
        fill={fillColor}
        d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"
      />
      <Path
        fill={fillColor}
        d="M176.813 351.188c-4.098 0-8.196-1.555-11.31-4.692-6.25-6.25-6.25-16.383 0-22.633l158.4-158.402c6.253-6.25 16.386-6.25 22.636 0s6.25 16.383 0 22.637L188.137 346.496a16.016 16.016 0 01-11.325 4.692zm0 0"
      />
      <Path
        fill={fillColor}
        d="M335.188 351.188c-4.094 0-8.192-1.555-11.305-4.692L165.484 188.117c-6.254-6.25-6.254-16.383 0-22.633 6.25-6.254 16.383-6.254 22.633 0l158.399 158.399c6.254 6.25 6.254 16.383 0 22.633a16.007 16.007 0 01-11.329 4.672zm0 0"
      />
    </Svg>
  );
}
