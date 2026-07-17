"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Home, BookOpen, Heart, BarChart2, User } from "lucide-react";
import { F } from "./tokens";

const NAV = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/refleksi", label: "Refleksi", Icon: BookOpen },
  { href: "/pulih", label: "Pulih", Icon: Heart },
  { href: "/insight", label: "Insight", Icon: BarChart2 },
  { href: "/profil", label: "Profil", Icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="sticky bottom-0 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_25px_rgba(0,0,0,0.04)] pt-2 px-6 flex justify-between items-center z-50 w-full"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      {NAV.map(({ href, label, Icon }) => {
        // Cek halaman sedang aktif
        const on = pathname === href || (href !== "/" && pathname.startsWith(href));
        
        // Logika khusus untuk tombol tengah
        const isCenter = href === "/pulih";

        return (
          <Link
            key={href}
            href={href}
            // min-w memastikan semua tab punya lebar area yang seimbang
            className="flex flex-col items-center justify-between min-w-[54px] gap-1"
          >
            {isCenter ? (
              // TOMBOL TENGAH MENGAMBANG
              // Container h-[28px] ini bertindak sebagai penahan agar layout teks tidak hancur
              <div className="h-[28px] flex items-center justify-center">
                <div
                  className={`w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-md transition-all duration-300 -translate-y-3.5 ${
                    on
                      ? "bg-[#ECF4FF] border border-[#BFDBFE] text-[#3A86F4] scale-105"
                      : "bg-white border border-[#E2E8F0] text-[#94A3B8] hover:text-[#3A86F4] hover:scale-105"
                  }`}
                >
                  <Icon size={24} strokeWidth={on ? 2.5 : 2} className={on ? "mt-0.5" : ""} />
                </div>
              </div>
            ) : (
              // TAB NORMAL (Kapsul biru muda)
              <motion.div animate={{ y: on ? -2 : 0 }} transition={{ duration: 0.2 }}>
                <div 
                  className={`h-[28px] px-4 flex items-center justify-center transition-all duration-300 ${
                    on ? "rounded-full bg-[#E3F2FD]" : ""
                  }`}
                >
                  <Icon 
                    size={on ? 18 : 22} 
                    strokeWidth={on ? 2.5 : 2} 
                    className={on ? "text-[#3A86F4]" : "text-[#94A3B8]"} 
                  />
                </div>
              </motion.div>
            )}

            {/* TEKS LABEL DI BAWAH (Dijamin sejajar) */}
            <span
              className={`text-[11px] font-bold tracking-wide ${
                on ? "text-[#3A86F4]" : "text-[#94A3B8]"
              }`}
              style={{ fontFamily: F.body }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}