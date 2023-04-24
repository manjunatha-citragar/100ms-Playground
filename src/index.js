import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HMSRoomProvider } from "@100mslive/react-sdk";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </StrictMode>
);
