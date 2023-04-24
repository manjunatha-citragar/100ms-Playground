import { useCallback } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

export const useSetSessionMetadata = () => {
  const hmsActions = useHMSActions();

  const setSessionMetadata = useCallback(
    async (data) => {
      await hmsActions.setSessionMetadata(data);
      await hmsActions.sendBroadcastMessage("refresh", "metadata");
    },
    [hmsActions]
  );

  return { setSessionMetadata };
};
