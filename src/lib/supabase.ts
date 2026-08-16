import { createClient } from "@supabase/supabase-js";

/**
 * Backend for the two registration forms. Project: "Quantum" (Supabase).
 *
 * The key here is the publishable/anon key — it is meant to be public and is
 * safe in client bundles. Every table it can reach is insert-only for the
 * public role (see the `create_registration_tables` migration), so a visitor
 * can submit a registration but can never read, edit or delete any row,
 * including their own. Organizers read submissions from the Supabase
 * dashboard, which uses the service role and bypasses RLS.
 *
 * Values come from env vars so the project can be swapped without touching
 * code; see .env.example for what to set locally, and netlify.toml for the
 * deployed values.
 */
const url = import.meta.env["VITE_SUPABASE_URL"];
const publishableKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

if (!url || !publishableKey) {
  // Fails loudly at build/dev time rather than silently no-op'ing every
  // registration submit.
  throw new Error(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. Copy .env.example to .env and fill them in.",
  );
}

export const supabase = createClient(url, publishableKey);

export type IndividualRegistration = {
  name: string;
  class: string;
  school: string;
  phone: string;
  email: string;
  event_slug: string;
  other_events: string | null;
};

export type SchoolRegistration = {
  school_name: string;
  teacher_in_charge: string;
  class: string;
  phone: string;
  email: string;
  event_slug: string;
  team_members: string | null;
};

export async function submitIndividualRegistration(row: IndividualRegistration) {
  const { error } = await supabase.from("individual_registrations").insert(row);
  if (error) throw error;
}

export async function submitSchoolRegistration(row: SchoolRegistration) {
  const { error } = await supabase.from("school_registrations").insert(row);
  if (error) throw error;
}
