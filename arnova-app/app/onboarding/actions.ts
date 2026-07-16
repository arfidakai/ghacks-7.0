"use server";

import { redirect } from "next/navigation";
import { createAssessment } from "@/lib/data/assessments";

export async function submitAssessment(answers: {
  sleep_quality: number;
  stress_level: number;
  productivity: number;
}) {
  await createAssessment(answers);
  redirect("/home");
}
