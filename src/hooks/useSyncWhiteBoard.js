import { useEffect, useRef } from "react";

export const useSyncWhiteBoard = (duration, callback) => {
  let timerRef = useRef(null);

  useEffect(() => {
    timerRef = setInterval(() => {
      callback();
    }, duration);

    return () => {
      clearInterval(timerRef);
    };
  }, [duration]);
};
