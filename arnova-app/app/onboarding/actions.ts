"use server";

import { redirect } from "next/navigation";
import { createAssessment } from "@/lib/data/assessments";
import { ensureRecoveryPlanForOnboarding } from "@/lib/data/recoveryPlans";

export async function submitAssessment(answers: {
  sleep_quality: number;
  stress_level: number;
  productivity: number;
}) {
  const assessment = await createAssessment(answers);
  // Sinkron, bukan fire-and-forget: redirect() langsung memutus request, dan
  // Home tidak boleh cold-start tanpa plan (lihat ensureCurrentRecoveryPlan).
  await ensureRecoveryPlanForOnboarding(assessment);
  redirect("/home");
}
