import { useMemo } from "react";
import { UseToastHook } from "../types";
import useToastContext from "./useToastContext";

const useToast = (): UseToastHook => {
  const context = useToastContext();
  return useMemo(
    () => ({
      showToast: context.showToast,
      queueToast: context.queueToast,
      hideToast: context.hideToast,
      clearToastQueue: context.clearToastQueue,
    }),
    [
      context.clearToastQueue,
      context.hideToast,
      context.queueToast,
      context.showToast,
    ]
  );
};

export default useToast;
