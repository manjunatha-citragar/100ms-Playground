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

  const onMouseDown = (event, canvas) => {
    console.log("OnMouseDown:", event);
    const { pointer } = canvas.getPointer(event);
    const payload = { onMouseDown: true, pointer, event };
    setSessionMetadata(JSON.stringify(payload));
  };

  const onMouseUp = (event, canvas) => {
    console.log("OnMouseUp", event);
    const { pointer } = canvas.getPointer(event);
    const payload = { onMouseUp: true, pointer, event };
    setSessionMetadata(JSON.stringify(payload));
  };

  const drawRealTime = (event, canvas) => {
    console.log("Draw real time:", event, pointer);
    const pointer = canvas.getPointer(event);
    const payload = { drawPointer: true, pointer, event };
    setSessionMetadata(JSON.stringify(payload));
  };

  // Init Canvas
  useEffect(() => {
    let canvas = new fabric.Canvas("my_canvas", {
      backgroundColor: "grey",
    });
    canvas.setWidth(containerRef.current.offsetWidth);
    canvas.setHeight(containerRef.current.offsetHeight);

    dispatch({ type: CANVAS_ACTIONS.INIT, canvas: canvas, color: "#000" });
    setSessionMetadata({});

    let isDrawing = false;

    canvas
      .on("mouse:down", (event) => {
        isDrawing = true;
        onMouseDown(event, canvas);
      })
      .on("mouse:up", (event) => {
        isDrawing = false;
        onMouseUp(event, canvas);
      })
      .on("mouse:move", (event) => {
        if (isDrawing) {
          drawRealTime(event, canvas);
        }
      });

    return () => {
      if (canvas) {
        canvas.dispose();
        canvas = null;
      }
    };
  }, []);

  // Draw on Canvas by reading session metadata
  useEffect(() => {
    if (!canvasMetadata || typeof canvasMetadata !== "string") return;
    console.log("Canvas metadata:", canvasMetadata);
    const { canvas } = state;
    const {
      pointer,
      event,
      onMouseDown = false,
      onMouseUp = false,
      drawPointer = false,
    } = JSON.parse(canvasMetadata);
    if (pointer && onMouseDown) {
      canvas?.freeDrawingBrush?.onMouseDown(pointer, { e: event, pointer });
    } else if (pointer && drawPointer) {
      canvas?.freeDrawingBrush?.onMouseMove(pointer, { e: event, pointer });
    } else if (pointer && onMouseUp) {
      canvas?.freeDrawingBrush?.onMouseUp(pointer, { e: event, pointer });
    }
  }, [canvasMetadata]);

  return (
    <div className="canvas-container" ref={containerRef}>
      <h2 className="text-center my-1">Drawing Board</h2>
      <canvas id="my_canvas">Go Canvas!</canvas>
      <ToolBox />
    </div>
  );
};
