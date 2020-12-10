import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutChangeEvent } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  interpolate,
  default as Reanimated,
  withTiming,
} from "react-native-reanimated";

import { useInterval } from "../hooks";
import type {
  BaseToastProps,
  ToastProps,
  ToastComponentsConfig,
} from "../types";

import { SuccessToast } from "./SuccessToast";
import { WarningToast } from "./WarningToast";
import { ErrorToast } from "./ErrorToast";
import { InfoToast } from "./InfoToast";
import useToastContext from "../hooks/useToastContext";

const defaultComponentsConfig: ToastComponentsConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
  warning: (props: BaseToastProps) => <WarningToast {...props} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} />,
  info: (props: BaseToastProps) => <InfoToast {...props} />,
};

interface GestureContext {
  startY?: number;
}

const ToasterInternal: React.FC = () => {
  const { activeToast, defaults, customToasts, hideToast } = useToastContext();
  const translationY = useSharedValue(0);
  const [holding, setHolding] = useState(false);

  const toastTypes: ToastComponentsConfig = {
    ...defaultComponentsConfig,
    ...customToasts,
  };

  const [inProgress, setInProgress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onHide = useMemo(() => activeToast?.onHide ?? defaults.onHide, [
    activeToast?.onHide,
    defaults.onHide,
  ]);

  const onShow = useMemo(() => activeToast?.onShow ?? defaults.onShow, [
    activeToast?.onShow,
    defaults.onShow,
  ]);

  const prevHeightRef = useRef<number | null>();
  const heightRef = useRef<number | null>(
    activeToast?.height ?? defaults.height
  );
  const onLayout = useCallback((e: LayoutChangeEvent): void => {
    prevHeightRef.current = heightRef.current;
    heightRef.current = e.nativeEvent.layout.height;
  }, []);

  const topOffset = activeToast?.topOffset ?? defaults.topOffset;
  const height = heightRef.current ?? defaults.height;

  const hiddenY = -(height + 5);
  const openY = topOffset;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startY = translationY.value;
      setHolding(true);
    },
    onActive: (event, ctx: GestureContext) => {
      translationY.value = Math.min(ctx.startY! + event.translationY, openY);
    },
    onEnd: (event, ctx: GestureContext) => {
      const newY = ctx.startY! + event.translationY;
      if (newY > openY - 12) {
        translationY.value = withSpring(openY);
      } else {
        translationY.value = withTiming(hiddenY, {
          // hide the toast faster with higher velocity
          duration: interpolate(-event.velocityY, [0, 2000], [500, 0]),
        });
      }
      setHolding(false);
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      right: 0,
      top: 0,
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  });

  const prevToastRef = useRef<ToastProps | null>();

  const transitionDuration =
    activeToast?.transitionDuration ?? defaults.transitionDuration;

  useLayoutEffect(() => {
    // no toasts or correct one is already shown
    if (
      activeToast === prevToastRef.current ||
      (!activeToast && !prevToastRef.current)
    ) {
      return;
    }

    const hide = async (): Promise<void> => {
      setInProgress(true);

      // translationY.value = 0;
      translationY.value = withTiming(hiddenY, {
        duration: transitionDuration.exit,
      });
      setIsVisible(false);
      setInProgress(false);
      onHide?.(prevToastRef.current as ToastProps);
      prevToastRef.current = null;
    };

    const show = async (): Promise<void> => {
      if (inProgress || isVisible) {
        await hide();
      }
      setInProgress(true);

      // translationY.value = 1;
      translationY.value = withTiming(openY, {
        duration: transitionDuration.enter,
      });

      prevToastRef.current = activeToast;
      setIsVisible(true);
      setInProgress(false);
      onShow?.(activeToast as ToastProps);
    };

    // no toasts left but one is visible and not yet animating
    if (!activeToast && isVisible && !inProgress) {
      hide();
    }

    // we have a toast that isn't visible and not yet animating
    if (activeToast && !isVisible && !inProgress) {
      show();
    }

    // activeToast was replaced and the wrong one is showing
    if (activeToast && !inProgress && activeToast !== prevToastRef.current) {
      show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToast, hideToast, inProgress, isVisible, onHide, onShow]);

  // TODO: Can the default be specified in a different manner to avoid this ?? operator
  const autoHideDuration =
    activeToast?.autoHideDuration ?? defaults.autoHideDuration;

  // this will auto-cancel if inProgress flips to true or a toast is not visible
  useInterval(
    hideToast,
    isVisible && !inProgress && !holding ? autoHideDuration : null
  );

  const toastType = activeToast?.type ?? defaults.type;
  const onPress = activeToast?.onPress ?? defaults.onPress;
  const onPressCallback = useMemo(() => {
    if (!onPress) {
      return undefined;
    }

    return (toast: ToastProps) => {
      hideToast();
      onPress?.(toast);
    };
  }, [hideToast, onPress]);
  const renderContent = (): React.ReactElement | null => {
    const toastComponent = toastTypes[toastType];

    if (!toastComponent) {
      console.error(`Toast of type '${toastType}' does not exist.`);
      return null;
    }

    return toastComponent({
      ...defaults,
      ...activeToast,
      onClose: hideToast,
      onPress: onPressCallback,
    });
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Reanimated.View onLayout={onLayout} style={reanimatedStyle}>
        {renderContent()}
      </Reanimated.View>
    </PanGestureHandler>
  );
};

export const Toaster = React.memo(ToasterInternal);
