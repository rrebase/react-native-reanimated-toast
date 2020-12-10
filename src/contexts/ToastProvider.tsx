import React, { useCallback, useMemo, useRef, useState } from "react";
import { Toaster } from "../components/Toaster";
import type { IToastContext, ToastProps, ToastProviderProps } from "../types";
import ToastContext from "./ToastContext";

const defaultContext: Partial<IToastContext> = {
  defaults: {
    position: "top",
    type: "info",
    autoHideDuration: 5000,
    transitionDuration: { enter: 250, exit: 100 },
    height: 60,
    topOffset: 40,
    bottomOffset: 40,
  },
  colors: {
    background: "#fff",
    title: "#221D23",
    message: "#221D23",
    closeIcon: "#221D23",
    info: "#00c9ff",
    error: "#fe3618",
    warning: "#fcc603",
    success: "#00ac31",
  },
};

const ToastProvider: React.FC<ToastProviderProps> = ({
  defaults,
  colors = defaultContext.colors,
  customToasts,
  renderToaster = true,
  children,
  ...rest
}) => {
  const toasts = useRef<ToastProps[]>([]);
  const [activeToast, setActiveToast] = useState<ToastProps | null>(null);

  const showToast = useCallback(toast => {
    toasts.current.shift();
    toasts.current.unshift(toast);
    setActiveToast(toast);
  }, []);

  const queueToast = useCallback(toast => {
    toasts.current.push(toast);
    if (toasts.current.length === 1) {
      setActiveToast(toast);
    }
  }, []);

  const hideToast = useCallback(() => {
    toasts.current.shift();
    setActiveToast(toasts.current?.[0] ?? null);
  }, []);

  const clearToastQueue = useCallback(() => {
    toasts.current.length = 0; // isn't javascript wonderful? /s
    setActiveToast(null);
  }, []);

  const value = useMemo(
    () => ({
      ...defaultContext,
      toasts: toasts.current,
      activeToast,
      showToast,
      queueToast,
      hideToast,
      clearToastQueue,
      defaults: {
        ...defaultContext.defaults,
        ...defaults,
      } as IToastContext["defaults"],
      colors: {
        ...defaultContext.colors,
        ...colors,
      } as IToastContext["colors"],
      customToasts,
    }),
    [
      activeToast,
      clearToastQueue,
      colors,
      customToasts,
      defaults,
      hideToast,
      queueToast,
      showToast,
    ]
  );

  return (
    <ToastContext.Provider value={value} {...rest}>
      {children}
      {renderToaster && <Toaster />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
