import { createContext } from "react";
import { IToastContext } from "../types";

const ToastContext = createContext<IToastContext>(undefined!);

ToastContext.displayName = "ToastContext";

export default ToastContext;
