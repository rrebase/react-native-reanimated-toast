import React, { ComponentProps } from "react";
import { SuccessIcon } from "../svgs";
import useToastContext from "../hooks/useToastContext";
import BaseToast from "./BaseToast";

export const SuccessToast: React.FC<
  ComponentProps<typeof BaseToast>
> = props => {
  const { colors } = useToastContext();
  return (
    <BaseToast
      {...props}
      color={colors.success}
      iconElement={<SuccessIcon />}
    />
  );
};
