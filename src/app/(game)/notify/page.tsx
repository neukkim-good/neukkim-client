"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function NotifyPage() {
  const [resultArr, setResultArr] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking/notify`)
      .then((res) => res.json())
      .then((data) => setResultArr(data));
  });
  return <div>{resultArr}</div>;
}
