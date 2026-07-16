"use server";

import { logRecoverySession } from "@/lib/data/recoveryLogs";

export async function logRecoverySessionAction(input: {
  session_type: "breathing" | "sound" | "guide";
  label?: string;
  duration_minutes?: number;
}) {
  await logRecoverySession(input);
}
