import { ColorValue } from "react-native";
import { Color as SvgColor } from "react-native-svg";

export interface ToastProps {
  /**
   * Use predefined types for standard colors/icons, or configure your own types on the provider and use them here. Defaults to 'info'
   */
  type?: "info" | "success" | "error" | "warning" | string; // TODO: type-safe the custom config values with generics. (this is hard)

  /**
   * Where to show the toasts. Defaults to 'top'
   */
  position?: "top" | "bottom";

  /**
   * Bolded top line of text
   */
  title?: string;

  /**
   * Bottom line of text
   */
  message?: string;

  /**
   * Number of milliseconds to wait before automatically calling `onHide`.
   * Set autoHideDuration to `null` to prevent the toast from automatically hiding.
   *
   * Default: `5000`
   */
  autoHideDuration?: number;

  /**
   * Duration of transition in milliseconds. Enter and exit durations can be specified.
   *
   * Default: `{ enter: 250, exit: 100 }`
   */
  transitionDuration?: { enter: number; exit: number };

  /**
   * Height of the toast component. Defaults to 60
   */
  height?: number;

  /**
   * Points from the top of the screen (when position='top'). Defaults to 40
   */
  topOffset?: number;

  /**
   * Points from the bottom of the screen (when position='bottom'). Defaults to 40
   */
  bottomOffset?: number;

  /**
   * Callback when a toast is shown
   */
  onShow?: (toast: ToastProps) => void;

  /**
   * Callback when a toast is queued
   */
  onQueue?: (toast: ToastProps) => void;

  /**
   * Callback when a toast is hidden (automatically or by the user)
   */
  onHide?: (toast: ToastProps) => void;

  /**
   * Callback when a toast is pressed (prevents onHide from firing)
   */
  onPress?: (toast: ToastProps) => void;
}

export interface ToastProviderProps {
  /**
   * Optionally provide defaults for all toasts (settings here can be overridden when showing or queueing a toast)
   */
  defaults?: ToastProps;
  /**
   * Optionally override default colors
   */
  colors?: ToastColors;
  /**
   * Configure your own toast components to render. Object keys maps to the `ToastProps` `type` prop while the values are render functions to render the toast.
   */
  customToasts?: ToastComponentsConfig;
  /**
   * The Toaster will be rendered for you by default unless you set this to false.
   * If you need to render it in a place other than where the provider is placed the useToast hook will give you the Toaster you need to render.
   * react-navigation is known to interfere with the rendering of the toasts. Place the Toaster just before your </NavigationContainer> to fix it.
   */
  renderToaster?: boolean;
}

export interface UseToastHook {
  /**
   * Pops up a toast (jumps to the front of the queue and hides the existing toast if there is one)
   */
  showToast: (props: ToastProps) => void;
  /**
   * Queues up a toast (or shows it instantly if there are no toasts showing and in the queue)
   */
  queueToast: (props: ToastProps) => void;
  /**
   * Hides the current toast, which will show the next toast in the queue if there is one
   */
  hideToast: () => void;
  /**
   * Purges the toast queue (but does not hide the one being shown)
   */
  clearToastQueue: () => void;
}

export interface IToastContext extends ToastContextSettings, UseToastHook {
  toasts: Readonly<ToastProps[]>;
  activeToast?: ToastProps | null;
}

type OptionalSettings = Pick<
  ToastProps,
  "title" | "message" | "onShow" | "onQueue" | "onHide" | "onPress"
>;

interface ToastContextSettings {
  colors: Required<ToastColors>;
  customToasts?: ToastComponentsConfig;
  defaults: Required<Omit<ToastProps, keyof OptionalSettings>> &
    OptionalSettings;
}

export type Color = ColorValue & SvgColor;
export interface ToastColors {
  /**
   * Defaults to #fff
   */
  background?: Color;
  /**
   * Defaults to #221D23
   */
  title?: Color;
  /**
   * Defaults to #221D23
   */
  message?: Color;
  /**
   * Defaults to #221D23
   */
  closeIcon?: Color;
  /**
   * Accent color for the info toast type. Defaults to #00c9ff
   */
  info?: Color;
  /**
   * Accent color for the error toast type. Defaults to #fe3618
   */
  error?: Color;
  /**
   * Accent color for the warning toast type. Defaults to #fcc603
   */
  warning?: Color;
  /**
   * Accent color for the success toast type. Defaults to #00ac31
   */
  success?: Color;
}

export interface ToastComponentsConfig {
  [x: string]: (toast: BaseToastProps) => React.ReactElement;
}

export interface SvgProps {
  color?: Color;
  size?: number;
}

export interface BaseToastProps extends ToastProps {
  /**
   * Color of the left accent and icon
   */
  color?: Color;
  /**
   * Icon to show for the toast. This library does not include any of the icon libraries but has SVG defaults for info, success, warning, error, and close.
   * You can use an SVG component like this library does or provide an icon from any library you wish (make sure to size and color it properly).
   */
  iconElement?: React.ReactNode;
  /**
   * The close button should fire this to hide the toast.
   */
  onClose: () => void;
  /**
   * Optional render function to render the icon (and its wrapper).
   */
  renderIcon?: (toast: BaseToastProps) => React.ReactNode;
  /**
   * Optional render function to render the title.
   */
  renderTitle?: (toast: BaseToastProps) => React.ReactNode;
  /**
   * Optional render function to render the message.
   */
  renderMessage?: (toast: BaseToastProps) => React.ReactNode;
  /**
   * Optional render function to render the close button.
   */
  renderCloseButton?: (toast: BaseToastProps) => React.ReactNode;
}

export type Toaster = React.FC;
