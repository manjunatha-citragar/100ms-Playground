import { fabric } from "fabric";
import { useEffect } from "react";
import "./styles.css";

export const registerEvents = (canvas) => {
  console.log("registerEvents", canvas);
  canvas.on("object:added", function (options) {
    if (options.target) {
      var obj = options.target;
      if (obj.type === "rect") {
        console.log("You added a rectangle!", options.target.toJSON());
      }
    }
  });
};

const insertItem = (itemType, canvas) => {
  switch (itemType) {
    case "RECT":
      canvas.add(
        new fabric.Rect({
          top: 100,
          left: 100,
          width: 50,
          height: 50,
          fill: "#f55"
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
          top: 300,
          left: 210,
          width: 100,
          height: 100,
          fill: "blue"
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
  }
};

export const CanvasBoard = () => {
  let canvas = new fabric.Canvas("my_canvas");
  canvas.isDrawingMode = true;
  useEffect(() => {
    registerEvents(canvas);
  }, []);

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
