import { useCallback } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

const throttle = (cb, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
};

const delay = 10;
export const useSetSessionMetadata = () => {
  const hmsActions = useHMSActions();

  const setSessionMetadata = throttle(
    useCallback(
      async (data) => {
        await hmsActions.setSessionMetadata(data);
        await hmsActions.sendBroadcastMessage("refresh", "metadata");
      },
      [hmsActions]
    ),
    delay
  );

  return { setSessionMetadata };
};
