import React, { ComponentProps } from "react";
import { WarningIcon } from "../svgs";
import useToastContext from "../hooks/useToastContext";
import BaseToast from "./BaseToast";

export const WarningToast: React.FC<
  ComponentProps<typeof BaseToast>
> = props => {
  const { colors } = useToastContext();
  return (
    <BaseToast
      {...props}
      color={colors.warning}
      iconElement={<WarningIcon />}
    />
  );
};
