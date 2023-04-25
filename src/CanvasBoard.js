import { selectSessionMetadata, useHMSStore } from "@100mslive/react-sdk";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { useSetSessionMetadata } from "./hooks/useSetSessionMetadata";
import "./styles.css";

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
  const [canvas, setCanvas] = useState("");
  const { setSessionMetadata } = useSetSessionMetadata();
  const canvasMetadata = useHMSStore(selectSessionMetadata);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (!canvasMetadata) return;

    const metaData = JSON.parse(canvasMetadata);
    console.log("Received metadata", metaData);
    if (metaData?.type === "rect") {
      canvas.add(new fabric.Rect(metaData));
    } else if (metaData?.type === "circle") {
      canvas.add(new fabric.Circle(metaData));
    } else if (metaData?.type === "triangle") {
      canvas.add(new fabric.Triangle(metaData));
    } else if (metaData?.type === "image") {
      // Todo
    }
  }, [canvasMetadata]);

  const initCanvas = () =>
    new fabric.Canvas("my_canvas", {
      height: 400,
      width: 500,
      backgroundColor: "grey",
    });

  useEffect(() => {
    if (!canvas) {
      return;
    }
    // Todo enable drawing mode
    canvas.isDrawingMode = true;

    canvas.on("object:added", (options) => {
      setSessionMetadata(JSON.stringify(options.target));
    });

    return () => {
      canvas.off("object:added");
    };
  }, [canvas]);

  return (
    <div className="canvas-container">
      <div className="canvas-controls">
        <button
          className="btn btn-primary"
          onClick={() => insertItem("RECT", canvas)}
        >
          Insert Rect
        </button>
        <button
          className="btn btn-primary"
          onClick={() => insertItem("CIRCLE", canvas)}
        >
          Insert Circle
        </button>
        <button
          className="btn btn-primary"
          onClick={() => insertItem("TRIANGLE", canvas)}
        >
          Insert TRIANGLE
        </button>
        <button
          className="btn btn-primary"
          onClick={() => insertItem("IMG", canvas)}
        >
          Insert Image
        </button>
      </div>
      <canvas id="my_canvas">Go Canvas!</canvas>
    </div>
  );
};
