'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

const TARGET_DATE = new Date('2026-03-21T08:00:00')

export default function Page() {
  const supabaseError = getSupabaseConfigError()
  const [time, setTime] = useState(() => getTime(TARGET_DATE))
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [tab, setTab] = useState<'counter' | 'questions'>('counter')
  const [isLoadingAuth, setIsLoadingAuth] = useState(() => !supabaseError)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setTime(getTime(TARGET_DATE))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    if (supabaseError) {
      return
    }

    let isMounted = true

    const loadSession = async () => {
      const client = getSupabaseClient()

      const { data, error } = await client.auth.getSession()

      if (!isMounted) {
        return
      }

      if (error) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(Boolean(data.session))
      }

      setIsLoadingAuth(false)
    }

    loadSession()

    const subscription = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return
      }

      setIsAuthenticated(Boolean(session))
      setIsLoadingAuth(false)
    }).data.subscription

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabaseError])

  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex items-center justify-center text-white relative bg-[#050507] py-16">
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[150px] opacity-40"
        style={{
          background: 'rgba(255,170,190,0.5)',
          left: mouse.x - 250,
          top: mouse.y - 250
        }}
      />

      <div className="absolute inset-0 opacity-40">
        <div className="absolute w-[600px] h-[600px] bg-pink-500 blur-[220px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500 blur-[220px] bottom-[-200px] right-[-200px]" />
      </div>

      <div className="relative text-center px-6 max-w-[1400px] w-full">
        <div className="absolute top-0 right-6">
          {isAuthenticated ? (
            <button
              onClick={async () => {
                await getSupabaseClient().auth.signOut()
                setTab('counter')
              }}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          ) : null}
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button onClick={() => setTab('counter')} className={`px-4 py-2 rounded-xl ${tab === 'counter' ? 'bg-white text-black' : 'bg-white/10'}`}>
            Counter
          </button>
          <button onClick={() => setTab('questions')} className={`px-4 py-2 rounded-xl ${tab === 'questions' ? 'bg-white text-black' : 'bg-white/10'}`}>
            Questions
          </button>
        </div>

        {tab === 'counter' && (
          <>
            <h1 className="text-4xl md:text-6xl mb-10 font-medium tracking-wide">
              Until We&apos;re Together
            </h1>

            <p className="text-white/40 mb-16 text-sm md:text-base">
              counting the moments
            </p>

            <div className="mt-24 flex justify-center mb-20">
              <div className="group flex items-end relative">

                <img src="/m4.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-10deg] z-10 group-hover:translate-x-[-140px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50" alt="" />

                <img src="/mi.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-7deg] z-20 group-hover:translate-x-[-105px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50" alt="" />

                <img src="/m2.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-4deg] z-30 group-hover:translate-x-[-70px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50" alt="" />

                <img src="/m3.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-2deg] z-40 group-hover:translate-x-[-35px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50" alt="" />

                <img src="/lift_ept.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[0deg] z-50 hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]" alt="" />

                <img src="/m5.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[2deg] z-40 group-hover:translate-x-[35px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]" alt="" />

                <img src="/m6.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[4deg] z-30 group-hover:translate-x-[70px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]" alt="" />

                <img src="/m7.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[7deg] z-20 group-hover:translate-x-[105px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]" alt="" />

                <img src="/m8.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl rotate-[10deg] z-10 group-hover:translate-x-[140px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]" alt="" />

              </div>
            </div>

            <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-4">
              <Box value={time.days} label="DAYS" />
              <Box value={time.hours} label="HOURS" />
              <Box value={time.minutes} label="MIN" />
              <Box value={time.seconds} label="SEC" />
            </div>
          </>
        )}

        {tab === 'questions' && (
          <QuestionsGate
            isLoadingAuth={isLoadingAuth}
            isAuthenticated={isAuthenticated}
            supabaseError={supabaseError}
          />
        )}
      </div>
    </main>
  )
}

function getTime(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  const safeDiff = diff > 0 ? diff : 0

  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((safeDiff / (1000 * 60)) % 60)
  const seconds = Math.floor((safeDiff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function getSupabaseConfigError() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return 'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  }

  return ''
}

function Box({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 blur-3xl opacity-30 bg-pink-400 rounded-3xl" />
        <div
          className="relative bg-[#0a0a0f]/80 border border-white/10 rounded-3xl px-10 py-8 md:px-16 md:py-12 text-[12vw] md:text-[8vw] font-semibold text-white shadow-xl"
          style={{
            textShadow: '0 0 25px rgba(255,200,220,0.15)',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="mt-3 text-white/50 tracking-[0.3em] text-xs md:text-sm">
        {label}
      </div>
    </div>
  )
}

function LoginCard({ supabaseError }: { supabaseError: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    let error: { message: string } | null = null

    try {
      const result = await getSupabaseClient().auth.signInWithPassword({
        email,
        password,
      })
      error = result.error
    } catch (clientError) {
      error = {
        message: clientError instanceof Error ? clientError.message : 'Supabase is not configured.',
      }
    }

    if (error) {
      setErrorMessage(error.message)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-md mx-auto text-left">
      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-4">
          Private access
        </p>

        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Sign in to open the questions
        </h1>

        <p className="text-white/55 mb-8">
          Enter your email and password from Supabase Auth.
        </p>

        {supabaseError ? (
          <p className="text-sm text-amber-200 mb-4">{supabaseError}</p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-pink-300/60"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-pink-300/60"
            placeholder="Password"
            autoComplete="current-password"
            required
          />

          {errorMessage ? (
            <p className="text-sm text-red-300">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-2xl bg-white text-black font-medium transition disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

function QuestionsGate({
  isLoadingAuth,
  isAuthenticated,
  supabaseError,
}: {
  isLoadingAuth: boolean
  isAuthenticated: boolean
  supabaseError: string
}) {
  if (isLoadingAuth) {
    return (
      <div className="min-h-[420px] flex items-center justify-center text-white/60 text-sm tracking-[0.3em] uppercase">
        Проверяем сессию...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginCard supabaseError={supabaseError} />
  }

  return <Question />
}

function Question() {
  const questions = [
    "Когда тебе со мной спокойно?",
    "Что тебе нравится в нас?",
    "Когда ты скучаешь по мне?",
    "Что ты хочешь от нас дальше?"
  ]

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const next = (value: string) => {
    setAnswers(prev => [...prev, value])
    setStep(s => s + 1)
  }

  if (step >= questions.length) {
    return (
      <div className="text-center">
        <h3 className="mb-4">Готово</h3>
        <pre className="text-white/60 text-sm">
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto text-left">
      <div className="mb-6 text-lg">{questions[step]}</div>

      <input
        className="w-full p-3 rounded-xl bg-white/10 border border-white/10 mb-4"
        placeholder="Твой ответ..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            next((e.target as HTMLInputElement).value)
            ;(e.target as HTMLInputElement).value = ''
          }
        }}
      />

      <button onClick={() => next('')} className="px-4 py-2 bg-white text-black rounded-xl">
        Далее
      </button>
    </div>
  )
}
