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

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("my_canvas", {
      height: 400,
      width: 540,
      backgroundColor: "grey",
    });

  useEffect(() => {
    if (!canvas) {
      return;
    }

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
      <canvas id="my_canvas" height="400" width="400">
        Go Canvas!
      </canvas>
    </div>
  );
};
