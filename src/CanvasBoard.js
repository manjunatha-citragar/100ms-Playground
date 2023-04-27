import { selectSessionMetadata, useHMSStore } from "@100mslive/react-sdk";
import { fabric } from "fabric";
import { useEffect, useRef, useContext } from "react";
import { CanvasContext } from "./App";
import { useSetSessionMetadata } from "./hooks/useSetSessionMetadata";
import { CANVAS_ACTIONS } from "./state/canvasReducer";
import "./styles.css";
import { ToolBox } from "./ToolBox";

const insertItem = (itemType, canvas) => {
  switch (itemType) {
    case "RECT":
      canvas.add(
        new fabric.Rect({
          top: 100,
          left: 100,
          width: 50,
          height: 50,
          fill: "#f55",
        })
      );
      break;
    case "CIRCLE":
      canvas.add(
        new fabric.Circle({ top: 140, left: 230, radius: 75, fill: "green" })
      );
      break;
    case "TRIANGLE":
      canvas.add(
        new fabric.Triangle({
          top: 250,
          left: 110,
          width: 100,
          height: 100,
          fill: "blue",
        })
      );
      break;
    case "IMG":
      fabric.Image.fromURL(
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sad-pug.jpg",
        function (img) {
          img.set({ left: 400, top: 250, angle: 20 });
          img.scaleToHeight(100);
          img.scaleToWidth(200);
          canvas.add(img);
        }
      );
      break;
    default:
      break;
  }
  canvas.renderAll();
};

export const CanvasBoard = () => {
  const containerRef = useRef(null);
  const { setSessionMetadata } = useSetSessionMetadata();
  const canvasMetadata = useHMSStore(selectSessionMetadata);
  const { state, dispatch } = useContext(CanvasContext);

  useEffect(() => {
    let canvas = new fabric.Canvas("my_canvas", {
      backgroundColor: "grey",
    });
    canvas.setWidth(containerRef.current.offsetWidth);
    canvas.setHeight(containerRef.current.offsetHeight);

    dispatch({ type: CANVAS_ACTIONS.INIT, canvas: canvas, color: "#000" });

    canvas.on("path:created", (options) => {
      console.log("Setting SessionMetadata", JSON.stringify(options?.path));
      setSessionMetadata(JSON.stringify(options?.path));
    });

    return () => {
      canvas.off("path:created");
      if (canvas) {
        canvas.dispose();
        canvas = null;
      }
    };
  }, []);

  return (
    <div className="canvas-container" ref={containerRef}>
      <h2 className="text-center my-1">Drawing Board</h2>
      <canvas id="my_canvas">Go Canvas!</canvas>
      <ToolBox />
    </div>
  );
};
