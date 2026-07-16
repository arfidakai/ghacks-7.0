import { motion } from "motion/react";
import { F } from "@/lib/design/tokens";

export function BreathingBlob({ score, breathLabel }: { score: number; breathLabel: string }) {
  return (
    <div style={{ position: "relative", width: 210, height: 210, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        style={{ position: "absolute", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)", width: 210, height: 210 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.15, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 55%)", width: 170, height: 170 }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0.2, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 148,
          height: 148,
          background: "linear-gradient(140deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 100%)",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.45)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          borderRadius: [
            "62% 38% 54% 46% / 46% 54% 38% 62%",
            "50% 50% 47% 53% / 53% 47% 50% 50%",
            "44% 56% 62% 38% / 38% 62% 56% 44%",
            "53% 47% 50% 50% / 50% 50% 47% 53%",
            "62% 38% 54% 46% / 46% 54% 38% 62%",
          ],
          scale: [1, 1.07, 1.03, 1.07, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span style={{ fontFamily: F.mono, fontSize: 46, fontWeight: 500, color: "#fff", lineHeight: 1 }}>{score}</span>
        <span
          style={{
            fontFamily: F.body,
            fontSize: 11.5,
            color: "rgba(255,255,255,0.78)",
            marginTop: 4,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
          }}
        >
          Energi Mental
        </span>
        <span style={{ fontFamily: F.body, fontSize: 10.5, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{breathLabel}</span>
      </motion.div>
    </div>
  );
}
