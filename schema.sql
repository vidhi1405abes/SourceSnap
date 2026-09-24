-- Run this in Supabase Dashboard > SQL Editor (on a NEW project).
-- This recreates the "learnings" table that index.html and the extension
-- both expect. The old table (from the original SourceSnap project) never
-- got committed anywhere, so this is a fresh version of it.

create table if not exists public.learnings (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  topic_name text not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Row Level Security: since this is a personal single-user tool with no
-- login system, we allow the public "anon" key (the one you paste into
-- index.html and config.js) to read and insert rows. Do NOT use this table
-- for anything sensitive, since anyone with the anon key could read it.
alter table public.learnings enable row level security;

create policy "Allow anon read" on public.learnings
  for select
  to anon
  using (true);

create policy "Allow anon insert" on public.learnings
  for insert
  to anon
  with check (true);
