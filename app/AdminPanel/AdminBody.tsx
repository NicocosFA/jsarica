"use client";
import { useEffect, useState } from "react";
import LoginAdmin from "./LoginAdmin";
import PanelAdmin from "./PanelAdmin";

export default function AdminBody() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("admin-auth") === "1") setAuth(true);
  }, []);

  if (!auth) return <LoginAdmin onAuth={() => setAuth(true)} />;

  return <PanelAdmin />;
}
