export type Profile = {
  id: string;
  full_name: string | null;
  occupation: string | null;
  city: string | null;
  avatar_url: string | null;
  streak_days: number;
  created_at: string;
};

export type Assessment = {
  id: string;
  user_id: string;
  sleep_quality: number;
  stress_level: number;
  productivity: number;
  energy_score: number;
  created_at: string;
};

export type ChecklistItem = { task: string; done: boolean };

export type MoodLog = {
  id: string;
  user_id: string;
  log_date: string;
  mood: string | null;
  energy_score: number | null;
  checklist: ChecklistItem[];
  created_at: string;
};

export type JournalScores = {
  regulasi_emosi: number;
  tekanan_kerja: number;
  resiliensi: number;
};

export type JournalEntry = {
  id: string;
  user_id: string;
  entry_date: string;
  kejadian: string | null;
  respons: string | null;
  tags: string[];
  ai_summary: string | null;
  ai_scores: JournalScores | null;
  created_at: string;
};

export type EmergencyContact = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relation: string | null;
  created_at: string;
};

// Task template that belongs to a Recovery Plan. Deliberately not ChecklistItem:
// "done" is a per-day concept that lives in MoodLog.checklist, not on the plan.
export type RecoveryTask = { task: string };

export type RecoveryPlanSource = "ai" | "rule_based";

export type RecoveryPlan = {
  id: string;
  user_id: string;
  created_at: string;
  source: RecoveryPlanSource;
  trigger_reason: string;
  baseline_energy_score: number | null;
  baseline_mood: string | null;
  focus_areas: string[];
  summary: string;
  checklist: RecoveryTask[];
};
