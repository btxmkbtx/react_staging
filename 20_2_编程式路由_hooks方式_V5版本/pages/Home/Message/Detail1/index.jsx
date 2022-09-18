import React from "react";
import { useParams } from "react-router-dom";

export default function Detail1() {
  // 取query参数
  const { id, title } = useParams();

  return (
    <ul>
      <li>接收参数ID:{id}</li>
      <li>接收参数Title:{title}</li>
    </ul>
  );
}
