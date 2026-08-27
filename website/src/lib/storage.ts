import fs from "fs/promises";
import path from "path";
import { ApplicationInput, StoredApplication } from "./schema";
import { supabase, isSupabaseConfigured } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

/**
 * Ensures the data directory and submissions file exist.
 */
async function ensureLocalStorageReady(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("[Storage] Failed to initialize local storage:", error);
  }
}

/**
 * Reads stored applications from Supabase if configured, otherwise local JSON.
 */
export async function getStoredApplications(): Promise<StoredApplication[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          fullName: row.full_name,
          email: row.email,
          school: row.school,
          grade: row.grade,
          age: row.age || "",
          location: row.location,
          currentWork: row.current_work,
          whyJoin: row.why_join,
          referral: row.referral,
          portfolioLink: row.portfolio_link || "",
          ipAddress: row.ip_address,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
      console.warn("[Storage] Supabase query returned error, falling back to local storage:", error);
    } catch (err) {
      console.error("[Storage] Supabase query failed:", err);
    }
  }

  await ensureLocalStorageReady();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredApplication[];
  } catch (error) {
    console.error("[Storage] Error reading local submissions:", error);
    return [];
  }
}

/**
 * Persists a new application to Supabase DB and local JSON backup.
 */
export async function saveApplication(
  data: ApplicationInput,
  ipAddress?: string,
  userId?: string
): Promise<StoredApplication> {
  const newEntry: StoredApplication = {
    ...data,
    id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    ipAddress: ipAddress || "unknown",
    status: "pending",
  };

  // 1. Persist to Supabase Database if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("applications").insert({
        id: newEntry.id,
        full_name: newEntry.fullName,
        email: newEntry.email,
        school: newEntry.school,
        grade: newEntry.grade,
        age: newEntry.age || null,
        location: newEntry.location,
        current_work: newEntry.currentWork,
        why_join: newEntry.whyJoin,
        referral: newEntry.referral,
        portfolio_link: newEntry.links && newEntry.links.length > 0 
          ? newEntry.links.filter(Boolean).join(", ") 
          : newEntry.portfolioLink || null,
        ip_address: newEntry.ipAddress,
        status: newEntry.status,
        created_at: newEntry.createdAt,
        user_id: userId || null,
      });

      if (error) {
        console.error("[Storage] Supabase insert failed:", error);
      } else {
        console.log(`[Storage] Saved application to Supabase DB for ${newEntry.fullName} (${newEntry.email}) [ID: ${newEntry.id}]`);
      }
    } catch (sbError) {
      console.error("[Storage] Error writing to Supabase DB:", sbError);
    }
  } else {
    console.log("[Storage] Supabase unconfigured. Saving to local JSON persistence.");
  }

  // 2. Persistent Local Backup
  await ensureLocalStorageReady();
  try {
    const list = await getStoredApplications();
    const isAlreadyPresent = list.some((item) => item.id === newEntry.id);
    if (!isAlreadyPresent) {
      list.unshift(newEntry);
      await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
    }
  } catch (localError) {
    console.error("[Storage] Failed to write local backup:", localError);
  }

  // 3. Optional: Forward to Webhook
  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
    } catch (webhookErr) {
      console.warn("[Storage] Webhook forward failed (non-blocking):", webhookErr);
    }
  }

  return newEntry;
}

/**
 * Get total application count for stats.
 */
export async function getApplicationCount(): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { count, error } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) {
        return count;
      }
    } catch (err) {
      console.warn("[Storage] Supabase count query failed:", err);
    }
  }

  const list = await getStoredApplications();
  return list.length;
}
