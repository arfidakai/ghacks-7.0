import { listJournalEntries } from "@/lib/data/journal";
import { RefleksiClient } from "./RefleksiClient";

export const dynamic = "force-dynamic";

export default async function RefleksiPage() {
  const entries = await listJournalEntries(10);
  return <RefleksiClient initialEntries={entries} />;
}
