import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail2() {
  const location = useLocation();
  const myParams = new URLSearchParams(location.search);

  return (
    <ul>
      <li>接收参数ID:{myParams.get("id")}</li>
      <li>接收参数Title:{myParams.get("title")}</li>
    </ul>
  );
}
