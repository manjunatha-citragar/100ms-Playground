import { useEffect } from "react";
import JoinRoom from "./JoinRoom";
import "./styles.css";

import {
  selectIsConnectedToRoom,
  selectSessionMetadata,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";
import Conference from "./Conference";
import Footer from "./Footer";
import Confetti from "./Confetti";
import { useRefreshSessionMetadata } from "./hooks/useRefreshSessionMetadata";
import { CanvasBoard } from "./CanvasBoard";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  useRefreshSessionMetadata();
  const pinnedMessage = useHMSStore(selectSessionMetadata);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions]);

  return (
    <div className="App">
      {/* <Header /> */}
      {isConnected ? (
        <div className="container">
          <CanvasBoard />
          <Conference />
          <Confetti />
          <span>{JSON.stringify(pinnedMessage || "")}</span>
          <Footer />
        </div>
      ) : (
        <JoinRoom />
      )}
    </div>
  );
}

export default App;
