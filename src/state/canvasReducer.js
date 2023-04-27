export const INITIAL_STATE = {
  canvas: null,
  color: "",
};

export const CANVAS_ACTIONS = {
  INIT: "INIT",
  SELECT_OBJECTS: "SELECT_OBJECTS",
  CHOOSE_ERASER: "CHOOSE_ERASER",
  DELETE_OBJECT: "DELETE_OBJECT",
  DOWNLOAD_CANVAS: "DOWNLOAD_CANVAS",
  CHOOSE_COLOR: "CHOOSE_COLOR",
};

export const canvasReducer = (state, action) => {
  switch (action.type) {
    case CANVAS_ACTIONS.INIT:
      return {
        ...state,
        canvas: action.canvas,
        color: action.color,
      };
    case CANVAS_ACTIONS.SELECT_OBJECTS:
      if (!state.canvas) {
        return state;
      }
      state.canvas.isDrawingMode = false;
      return { ...state };

    case CANVAS_ACTIONS.CHOOSE_COLOR:
      if (!state.canvas) {
        return state;
      }
      const { color } = action;
      state.color = color;
      state.canvas.freeDrawingBrush.color = color;
      state.canvas.freeDrawingBrush.width = 35;
      state.canvas.freeDrawingBrush.color = action.color;
      state.canvas.isDrawingMode = true;
      return { ...state };

    case CANVAS_ACTIONS.CHOOSE_ERASER:
      if (!state.canvas) {
        return state;
      }
      state.canvas.freeDrawingBrush = new fabric.PencilBrush(state.canvas);
      state.canvas.freeDrawingBrush.width = 20;
      state.canvas.freeDrawingBrush.color = "grey";
      state.canvas.isDrawingMode = true;
      return { ...state };

    case CANVAS_ACTIONS.DELETE_OBJECT:
      if (!state.canvas) {
        return state;
      }
      state.canvas.isDrawingMode = false;
      var selection = state.canvas.getActiveObject();
      if (selection?.type === "activeSelection") {
        selection.forEachObject(function (element) {
          state.canvas.remove(element);
        });
      } else {
        state.canvas.remove(selection);
      }
      state.canvas.discardActiveObject();
      state.canvas.requestRenderAll();
      return { ...state };

    case CANVAS_ACTIONS.DOWNLOAD_CANVAS:
      if (!state.canvas) {
        return state;
      }
      const a = document.createElement("a");
      const uri = state.canvas.toDataURL({ format: "png", multiplier: 4 });
      a.href = uri;
      a.download = "Online_Drawer.png";
      a.click();
      return { ...state };

    default:
      return { ...state };
  }
};
