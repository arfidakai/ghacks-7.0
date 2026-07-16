import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getLatestAssessment } from "@/lib/data/assessments";

export const dynamic = "force-dynamic";

// Gerbang tunggal setelah splash atau login berhasil: belum login -> /login,
// sudah login tapi belum pernah screening -> /onboarding, selain itu -> /home.
export default async function EntryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const assessment = await getLatestAssessment();
  redirect(assessment ? "/home" : "/onboarding");
}
