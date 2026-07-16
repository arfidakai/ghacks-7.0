import { getInsightViewModel } from "@/lib/data/insight";
import { InsightClient } from "./InsightClient";

export const dynamic = "force-dynamic";

export default async function InsightPage() {
  const data = await getInsightViewModel();
  return <InsightClient data={data} />;
}
