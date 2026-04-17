import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://eyniouqpmmphhvkgnofq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bmlvdXFwbW1waGh2a2dub2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjgyMjQsImV4cCI6MjA5MTk0NDIyNH0.d66n_8fBK0VcnarH8Y2a83nDRwbpn5yknO2byUK3v1w'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Login (index.html) ──────────────────────────────────────────
const loginForm = document.querySelector('.auth-form')
if (loginForm && document.title.includes('Login')) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('username').value
    const password = document.getElementById('password').value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    window.location.href = 'policy.html'
  })
}

// ── Sign Up (signup.html) ───────────────────────────────────────
if (loginForm && document.title.includes('Sign Up')) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('new-email').value
    const password = document.getElementById('new-password').value
    const confirm = document.getElementById('confirm-password').value
    if (password !== confirm) return alert('Passwords do not match')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return alert(error.message)
    alert('Check your email to confirm your account!')
    window.location.href = 'index.html'
  })
}

// ── Protect policy.html & agent.html ───────────────────────────
const protectedPages = ['policy.html', 'agent.html']
if (protectedPages.some(p => window.location.pathname.includes(p))) {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) window.location.href = 'index.html'
  })
}