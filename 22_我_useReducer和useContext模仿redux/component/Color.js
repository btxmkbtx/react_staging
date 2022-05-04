import React from "react";
import reducer from "./Reducer";

export const ColorContext = React.createContext();

const colorList = {
  blue: { color: "blue", desc: "蓝色" },
  red: { color: "red", desc: "红色" },
  green: { color: "green", desc: "绿色" },
};

const Color = (props) => {
  const [colorInfo, dispatch] = React.useReducer(reducer, colorList["blue"]);
  console.log(colorInfo.color);
  return (
    <div>
      <ColorContext.Provider value={{ colorInfo, colorList, dispatch }}>
        {props.children}
      </ColorContext.Provider>
    </div>
  );
};

export default Color;
