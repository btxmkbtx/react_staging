import React from "react";
import { ColorContext } from "./Color";

const Buttons = () => {
  const { colorInfo, colorList, dispatch } = React.useContext(ColorContext);

  const changeColor = (color) => {
    return dispatch({
      type: "color",
      payload: colorList[color],
    });
  };

  return (
    <div>
      {Reflect.ownKeys(colorList).map((item) => {
        return (
          <button
            key={item}
            style={{ color: colorInfo.color, margin: "4px 8px" }}
            onClick={() => {
              changeColor(item);
            }}
          >
            {colorList[item].desc}
          </button>
        );
      })}
    </div>
  );
};
export default Buttons;
