import { useContext } from "react";
import { CanvasContext } from "./App";
import { CANVAS_ACTIONS } from "./state/canvasReducer";

export const ToolBox = () => {
  const { state, dispatch } = useContext(CanvasContext);
  const { color } = state;

  return (
    <div className="flex tool-box my-1">
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch({ type: CANVAS_ACTIONS.SELECT_OBJECTS });
        }}
      >
        Object Select
      </button>

      <input
        type="color"
        value={color}
        className="color-chooser"
        onChange={(e) =>
          dispatch({ type: CANVAS_ACTIONS.CHOOSE_COLOR, color: e.target.value })
        }
      />
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: CANVAS_ACTIONS.CHOOSE_ERASER })}
      >
        Eraser
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: CANVAS_ACTIONS.DELETE_OBJECT })}
      >
        Delete
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: CANVAS_ACTIONS.DOWNLOAD_CANVAS })}
      >
        Download
      </button>
    </div>
  );
};
