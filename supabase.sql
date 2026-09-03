-- ARİJ OYUNU - Supabase database setup
-- Run this whole script once in Supabase SQL Editor.
-- Then create your teacher/admin account in Authentication > Users.
-- Finally insert that user's UUID into public.admins (see bottom).

create extension if not exists pgcrypto;

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('1','2','3','4','5','6','7','8','9')),
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.student_games (
  student_id uuid not null references public.students(id) on delete cascade,
  game_id text not null,
  created_at timestamptz not null default now(),
  primary key (student_id, game_id)
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists students_code_idx on public.students(code);
create index if not exists student_games_student_id_idx on public.student_games(student_id);

alter table public.students enable row level security;
alter table public.student_games enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_arij_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins
    where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_arij_admin() from public;
grant execute on function public.is_arij_admin() to authenticated;

-- Admin policies
 drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
for select to authenticated
using (user_id = auth.uid());

 drop policy if exists "admins manage students" on public.students;
create policy "admins manage students" on public.students
for all to authenticated
using (public.is_arij_admin())
with check (public.is_arij_admin());

 drop policy if exists "admins manage student games" on public.student_games;
create policy "admins manage student games" on public.student_games
for all to authenticated
using (public.is_arij_admin())
with check (public.is_arij_admin());

-- Student login RPC: only returns the student's name and assigned game IDs.
-- It does NOT return the student table or code.
create or replace function public.get_student_access(p_code text)
returns table(student_name text, game_id text)
language sql
security definer
set search_path = public
stable
as $$
  select s.name, sg.game_id
  from public.students s
  left join public.student_games sg on sg.student_id = s.id
  where upper(s.code) = upper(trim(p_code))
    and s.active = true;
$$;

revoke execute on function public.get_student_access(text) from public;
grant execute on function public.get_student_access(text) to anon, authenticated;

-- Least-privilege Data API grants.
revoke all on table public.students from anon, authenticated;
revoke all on table public.student_games from anon, authenticated;
revoke all on table public.admins from anon, authenticated;
grant select, insert, update, delete on table public.students to authenticated;
grant select, insert, update, delete on table public.student_games to authenticated;
grant select on table public.admins to authenticated;

-- OPTIONAL: after creating your teacher account in Auth, run:
-- insert into public.admins(user_id) values ('PASTE-YOUR-AUTH-USER-UUID-HERE');

-- Öğrenci numaraları 1–9 arasında olmalıdır. Her numara tek bir öğrenciye aittir.
-- Örnek: insert into public.students(code,name) values ('1','Ahmet');


-- If the students table already existed before this version, run these statements once:
-- alter table public.students drop constraint if exists students_code_check;
-- alter table public.students add constraint students_code_check check (code in ('1','2','3','4','5','6','7','8','9'));
-- Delete old demo codes (ARIJ01 etc.) before using numbers 1–9.
