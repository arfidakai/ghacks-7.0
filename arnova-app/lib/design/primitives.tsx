import type { CSSProperties, ReactNode } from "react";
import { C, F } from "./tokens";

export function Tag({ color, text, bg }: { color: string; text: string; bg: string }) {
  return (
    <span
      style={{
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: "0.09em",
        fontWeight: 500,
        color,
        background: bg,
        padding: "3px 8px",
        borderRadius: 20,
        textTransform: "uppercase" as const,
      }}
    >
      {text}
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: F.mono,
        fontSize: 11,
        letterSpacing: "0.09em",
        color: C.inkLight,
        textTransform: "uppercase" as const,
        marginBottom: 8,
        fontWeight: 500,
      }}
    >
      {children}
    </p>
  );
}

export function Card({
  children,
  style = {},
  onClick,
}: {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        borderRadius: 18,
        border: `1.5px solid ${C.border}`,
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
