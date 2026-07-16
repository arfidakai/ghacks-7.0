"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";

export function SplashClient() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/entry"), 1600);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8ECBF5] via-[#4F93F0] to-[#1E56D6]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/logo-arnova-white.png"
          alt="Arnova Healthy.AI"
          width={1202}
          height={434}
          priority
          style={{ width: 190, height: "auto" }}
        />
      </motion.div>
    </div>
  );
}
