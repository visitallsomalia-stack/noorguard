-- Create solidarity_votes table
create table if not exists solidarity_votes (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('heart', 'hands', 'shield')),
  date date not null default current_date,
  created_at timestamptz default now()
);

-- Index for fast daily queries
create index if not exists idx_solidarity_date on solidarity_votes(date);

-- Enable RLS
alter table solidarity_votes enable row level security;

-- Allow anyone to insert (anonymous)
create policy "Anyone can vote" on solidarity_votes
  for insert with check (true);

-- Allow anyone to read counts
create policy "Anyone can read votes" on solidarity_votes
  for select using (true);
