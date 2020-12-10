import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useToastContext from "../hooks/useToastContext";
import type { SvgProps } from "../types";

export function WarningIcon({
  color,
  size = 24,
}: SvgProps): React.ReactElement {
  const { colors } = useToastContext();
  const fillColor = color ?? colors.warning;

  return (
    <Svg viewBox="0 0 512 512" height={`${size}pt`} width={`${size}pt`}>
      <Path
        fill={fillColor}
        d="M277.332 384c0 11.781-9.55 21.332-21.332 21.332s-21.332-9.55-21.332-21.332 9.55-21.332 21.332-21.332 21.332 9.55 21.332 21.332zm0 0M256 320c-8.832 0-16-7.168-16-16V122.668c0-8.832 7.168-16 16-16s16 7.168 16 16V304c0 8.832-7.168 16-16 16zm0 0"
      />
      <Path
        fill={fillColor}
        d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"
      />
    </Svg>
  );
}
