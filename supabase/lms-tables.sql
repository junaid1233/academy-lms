-- Run this in Supabase: SQL Editor → New query → Run
-- Then check Table Editor: lms_student_courses and lms_teacher_courses

create table if not exists public.lms_student_courses (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  name text,
  email text not null,
  course_id text not null,
  course_title text,
  selected_at timestamptz default now(),
  unique (email, course_id)
);

create table if not exists public.lms_teacher_courses (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  name text,
  email text not null,
  course_id text not null,
  course_title text,
  headline text,
  course_category text,
  course_level text,
  course_desc text,
  course_outcomes text,
  course_hours integer,
  course_lectures integer,
  is_custom boolean default true,
  provided_at timestamptz default now(),
  unique (email, course_id)
);

alter table public.lms_student_courses enable row level security;
alter table public.lms_teacher_courses enable row level security;

drop policy if exists "lms_student_courses_all" on public.lms_student_courses;
create policy "lms_student_courses_all"
  on public.lms_student_courses for all
  using (true) with check (true);

drop policy if exists "lms_teacher_courses_all" on public.lms_teacher_courses;
create policy "lms_teacher_courses_all"
  on public.lms_teacher_courses for all
  using (true) with check (true);

create table if not exists public.lms_profiles (
  email text primary key,
  user_id text,
  name text,
  role text,
  teach_status text,
  updated_at timestamptz default now()
);

alter table public.lms_profiles enable row level security;
drop policy if exists "lms_profiles_all" on public.lms_profiles;
create policy "lms_profiles_all"
  on public.lms_profiles for all
  using (true) with check (true);
grant all on public.lms_profiles to anon, authenticated;

