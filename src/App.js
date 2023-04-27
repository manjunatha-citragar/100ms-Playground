import { useEffect, createContext, useReducer } from "react";
import JoinRoom from "./JoinRoom";
import "./styles.css";

import {
  selectIsConnectedToRoom,
  selectSessionMetadata,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Conference from "./Conference";
import Footer from "./Footer";
import Confetti from "./Confetti";
import { useRefreshSessionMetadata } from "./hooks/useRefreshSessionMetadata";
import { CanvasBoard } from "./CanvasBoard";
import { canvasReducer, INITIAL_STATE } from "./state/canvasReducer";

export const CanvasContext = createContext();
function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  useRefreshSessionMetadata();
  const canvasMetadata = useHMSStore(selectSessionMetadata);
  // console.log("canvasMetadata:", canvasMetadata);
  const [state, dispatch] = useReducer(canvasReducer, INITIAL_STATE);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions]);

  return (
    <div className="App">
      {isConnected ? (
        <CanvasContext.Provider value={{ state, dispatch }}>
          <div className="container">
            <CanvasBoard />
            <Conference />
            <Footer />
          </div>
        </CanvasContext.Provider>
      ) : (
        <JoinRoom />
      )}
    </div>
  );
}

export default App;
