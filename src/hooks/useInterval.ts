// h/t Dan Abramov - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay?: number | null): void {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
