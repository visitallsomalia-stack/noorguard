import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Get today's date string
export function today() {
  return new Date().toISOString().split('T')[0]
}

// Submit solidarity vote
export async function submitVote(type) {
  const { error } = await supabase
    .from('solidarity_votes')
    .insert({ type, date: today() })
  return !error
}

// Get today's counts
export async function getTodayCounts() {
  const { data, error } = await supabase
    .from('solidarity_votes')
    .select('type')
    .eq('date', today())

  if (error || !data) return { heart: 0, hands: 0, shield: 0, total: 0 }

  const counts = { heart: 0, hands: 0, shield: 0 }
  data.forEach(row => { if (counts[row.type] !== undefined) counts[row.type]++ })
  counts.total = data.length
  return counts
}

// Get device ID (anonymous)
export function getDeviceId() {
  let id = localStorage.getItem('ng_device_id')
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substr(2, 12)
    localStorage.setItem('ng_device_id', id)
  }
  return id
}

// Track if voted today
export function hasVotedToday() {
  return localStorage.getItem('ng_voted') === today()
}

export function markVotedToday() {
  localStorage.setItem('ng_voted', today())
}
