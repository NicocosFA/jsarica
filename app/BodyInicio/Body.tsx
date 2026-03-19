import React from "react";
import Carrusel from "./Carrusel";
import Actividades from "./Actividades";
import QueHacemos from "./QueHacemos";
import Presidente from "./Presidente";

export default function Body({ children }: { children?: React.ReactNode }) {
  return (
    <div id="inicio">
      <Carrusel />
      {/* Fondo compartido con patrón de puños */}
      <div className="relative" style={{ backgroundColor: "white" }}>
        {/* Overlay blanco semitransparente para suavizar el patrón */}
        <div className="absolute inset-0 bg-white/90 pointer-events-none" />
        {/* Puños decorativos dispersos */}
        {[
          { top: "3%",  left: "2%",   size: 48,  rotate: 0   },
          { top: "8%",  left: "18%",  size: 80,  rotate: 15  },
          { top: "2%",  left: "38%",  size: 36,  rotate: -20 },
          { top: "5%",  left: "55%",  size: 64,  rotate: 30  },
          { top: "1%",  left: "72%",  size: 44,  rotate: -10 },
          { top: "3%",  left: "88%",  size: 72,  rotate: 20  },
          { top: "18%", left: "7%",   size: 60,  rotate: -30 },
          { top: "15%", left: "28%",  size: 40,  rotate: 10  },
          { top: "20%", left: "48%",  size: 88,  rotate: -15 },
          { top: "17%", left: "68%",  size: 52,  rotate: 25  },
          { top: "14%", left: "85%",  size: 36,  rotate: -5  },
          { top: "32%", left: "1%",   size: 76,  rotate: 12  },
          { top: "30%", left: "22%",  size: 44,  rotate: -25 },
          { top: "35%", left: "42%",  size: 56,  rotate: 18  },
          { top: "28%", left: "60%",  size: 80,  rotate: -8  },
          { top: "33%", left: "80%",  size: 40,  rotate: 35  },
          { top: "48%", left: "10%",  size: 52,  rotate: -18 },
          { top: "45%", left: "30%",  size: 68,  rotate: 5   },
          { top: "50%", left: "50%",  size: 36,  rotate: -30 },
          { top: "46%", left: "70%",  size: 60,  rotate: 22  },
          { top: "44%", left: "90%",  size: 48,  rotate: -12 },
          { top: "62%", left: "4%",   size: 40,  rotate: 28  },
          { top: "60%", left: "24%",  size: 84,  rotate: -6  },
          { top: "65%", left: "44%",  size: 48,  rotate: 15  },
          { top: "58%", left: "64%",  size: 72,  rotate: -22 },
          { top: "63%", left: "83%",  size: 36,  rotate: 8   },
          { top: "76%", left: "12%",  size: 56,  rotate: -14 },
          { top: "78%", left: "33%",  size: 44,  rotate: 32  },
          { top: "74%", left: "54%",  size: 80,  rotate: -3  },
          { top: "80%", left: "74%",  size: 52,  rotate: 18  },
          { top: "75%", left: "92%",  size: 64,  rotate: -28 },
          { top: "90%", left: "6%",   size: 72,  rotate: 10  },
          { top: "88%", left: "26%",  size: 40,  rotate: -20 },
          { top: "92%", left: "46%",  size: 56,  rotate: 25  },
          { top: "87%", left: "66%",  size: 44,  rotate: -8  },
          { top: "91%", left: "86%",  size: 68,  rotate: 15  },
          { top: "11%", left: "45%",  size: 58,  rotate: -40 },
          { top: "25%", left: "93%",  size: 42,  rotate: 17  },
          { top: "40%", left: "15%",  size: 90,  rotate: -22 },
          { top: "55%", left: "37%",  size: 46,  rotate: 33  },
          { top: "70%", left: "58%",  size: 62,  rotate: -16 },
          { top: "83%", left: "40%",  size: 38,  rotate: 27  },
          { top: "22%", left: "76%",  size: 54,  rotate: -35 },
          { top: "68%", left: "20%",  size: 44,  rotate: 12  },
          { top: "38%", left: "52%",  size: 76,  rotate: -9  },
        ].map((p, i) => (
          <img
            key={i}
            aria-hidden="true"
            src="/images/fondo/fist-fondo.svg"
            alt=""
            className="absolute pointer-events-none select-none opacity-10"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
        <div className="relative z-10">
          <Actividades />
          <QueHacemos />
        </div>
      </div>
      <Presidente />
      {children}
    </div>
  );
}
