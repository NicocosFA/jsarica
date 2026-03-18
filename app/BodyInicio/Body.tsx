import React from "react";
import Carrusel from "./Carrusel";
import Actividades from "./Actividades";
import QueHacemos from "./QueHacemos";
import Presidente from "./Presidente";

export default function Body({ children }: { children?: React.ReactNode }) {
  return (
    <div id="inicio">
      <Carrusel />
      <Actividades />
      <QueHacemos />
      <Presidente />
      {children}
    </div>
  );
}
