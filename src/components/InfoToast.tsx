import React, { ComponentProps } from "react";
import { InfoIcon } from "../svgs";
import useToastContext from "../hooks/useToastContext";
import BaseToast from "./BaseToast";

export const InfoToast: React.FC<ComponentProps<typeof BaseToast>> = props => {
  const { colors } = useToastContext();
  return (
    <BaseToast {...props} color={colors.info} iconElement={<InfoIcon />} />
  );
};
