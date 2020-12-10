import React, { ComponentProps } from "react";
import { ErrorIcon } from "../svgs";
import useToastContext from "../hooks/useToastContext";
import BaseToast from "./BaseToast";

export const ErrorToast: React.FC<ComponentProps<typeof BaseToast>> = props => {
  const { colors } = useToastContext();
  return (
    <BaseToast {...props} color={colors.error} iconElement={<ErrorIcon />} />
  );
};
