'use client'

import { useEffect, useRef, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

const TARGET_DATE = new Date('2026-03-21T08:00:00')

const QUESTION_RULES: Record<number, QuestionRule> = {
  1: { kind: 'text' },
  2: { kind: 'drawing' },
  3: { kind: 'text' },
  4: { kind: 'photo' },
  5: { kind: 'info' },
  6: { kind: 'drawing' },
  7: { kind: 'text' },
  8: { kind: 'number-choice', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
  9: { kind: 'voice' },
  10: { kind: 'single-choice', options: ['поцеловать', 'обнять', 'укусить'] },
  12: { kind: 'single-choice', options: ['такое', 'под рево пойдет', 'пиздец как'] },
}

type QuestionKind = 'text' | 'drawing' | 'photo' | 'info' | 'number-choice' | 'voice' | 'single-choice'

type QuestionRule = {
  kind: QuestionKind
  options?: string[]
}

type QuestionRecord = {
  id: number
  question: string
}

type AnswerDraft = {
  text?: string
  choice?: string
  number?: number
  file?: File
  blob?: Blob
  previewUrl?: string
}

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
              Выйти
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

                <img src="/m4.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-10deg] z-10 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[-140px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/mi.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-7deg] z-20 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[-105px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m2.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-4deg] z-30 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[-70px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m3.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[-2deg] z-40 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[-35px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/lift_ept.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[0deg] z-50 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m5.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[2deg] z-40 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[35px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m6.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[4deg] z-30 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[70px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m7.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl -mr-16 rotate-[7deg] z-20 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[105px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

                <img src="/m8.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl rotate-[10deg] z-10 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:translate-x-[140px] hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]" alt="" />

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
      setErrorMessage(getAuthErrorMessage(error.message))
    }

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-md mx-auto text-left">
      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-4">
          Доступ
        </p>

        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Войди, чтобы открыть вопросы
        </h1>

        <p className="text-white/55 mb-8">
          Введи email и пароль пользователя из Supabase Auth.
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
            placeholder="Пароль"
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
            {isSubmitting ? 'Входим...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

function getAuthErrorMessage(message: string) {
  if (message.toLowerCase().includes('invalid login credentials')) {
    return 'Неверный email или пароль.'
  }

  if (message.toLowerCase().includes('email not confirmed')) {
    return 'Email еще не подтвержден в Supabase.'
  }

  if (message.toLowerCase().includes('missing supabase env vars')) {
    return 'Не настроены переменные окружения Supabase.'
  }

  return message
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
  const [questions, setQuestions] = useState<QuestionRecord[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const [questionsError, setQuestionsError] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerDraft>>({})

  useEffect(() => {
    let isMounted = true

    const loadQuestions = async () => {
      const { data, error } = await getSupabaseClient()
        .from('Questions')
        .select('id, question')
        .order('id', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        setQuestionsError(getQuestionsErrorMessage(error.message))
        setIsLoadingQuestions(false)
        return
      }

      const loadedQuestions = (data ?? [])
        .filter((item) => QUESTION_RULES[item.id])
        .map((item) => ({
          id: item.id,
          question: item.question?.trim() ?? '',
        }))
        .filter((item) => Boolean(item.question))

      setQuestions(loadedQuestions)
      setQuestionsError('')
      setIsLoadingQuestions(false)
    }

    loadQuestions()

    return () => {
      isMounted = false
    }
  }, [])

  const currentQuestion = questions[step]
  const currentRule = currentQuestion ? QUESTION_RULES[currentQuestion.id] : null
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const isLastStep = step === questions.length - 1

  if (isLoadingQuestions) {
    return (
      <div className="text-center text-white/60">
        Загружаем вопросы...
      </div>
    )
  }

  if (questionsError) {
    return (
      <div className="max-w-xl mx-auto text-left rounded-3xl border border-red-300/20 bg-red-400/10 p-6 text-red-100">
        {questionsError}
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-white/60">
        В таблице `Questions` пока нет вопросов.
      </div>
    )
  }

  if (!currentQuestion || !currentRule) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-10">
          <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-4">
            Готово
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Все ответы заполнены
          </h2>

          <p className="text-white/60 text-base md:text-lg">
            Дальше здесь будет красивый экран отправки ответов в Supabase.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto text-left">
      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-8">
        {currentRule.kind === 'info' ? (
          <div className="py-10 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight whitespace-pre-line">
              {currentQuestion.question}
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-4xl font-medium mb-8">
              {currentQuestion.question}
            </h2>

            <QuestionInput
              rule={currentRule}
              answer={currentAnswer}
              onChange={(draft) => {
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: draft,
                }))
              }}
            />
          </>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10"
            >
              Назад
            </button>
          ) : null}

          <button
            onClick={() => {
              if (!canContinueQuestion(currentRule.kind, currentAnswer)) {
                return
              }

              if (isLastStep) {
                setStep(questions.length)
                return
              }

              setStep((prev) => prev + 1)
            }}
            disabled={!canContinueQuestion(currentRule.kind, currentAnswer)}
            className="px-5 py-3 rounded-2xl bg-white text-black font-medium disabled:opacity-50"
          >
            {isLastStep ? 'Готово' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  )
}

function QuestionInput({
  rule,
  answer,
  onChange,
}: {
  rule: QuestionRule
  answer?: AnswerDraft
  onChange: (draft: AnswerDraft) => void
}) {
  if (rule.kind === 'text') {
    return (
      <input
        value={answer?.text ?? ''}
        onChange={(event) => onChange({ text: event.target.value })}
        className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-pink-300/60"
        placeholder="Напиши ответ..."
      />
    )
  }

  if (rule.kind === 'photo') {
    return (
      <div className="space-y-4">
        <label className="flex items-center justify-center w-full min-h-[220px] rounded-3xl border border-dashed border-white/15 bg-white/5 cursor-pointer hover:bg-white/10 transition">
          <span className="text-white/65">Нажми, чтобы выбрать фото</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) {
                return
              }

              onChange({
                file,
                previewUrl: URL.createObjectURL(file),
              })
            }}
          />
        </label>

        {answer?.previewUrl ? (
          <img src={answer.previewUrl} alt="" className="max-h-[420px] rounded-2xl border border-white/10" />
        ) : null}
      </div>
    )
  }

  if (rule.kind === 'drawing') {
    return <DrawingInput answer={answer} onChange={onChange} />
  }

  if (rule.kind === 'number-choice' || rule.kind === 'single-choice') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {rule.options?.map((option) => {
          const isSelected = rule.kind === 'number-choice'
            ? answer?.number === Number(option)
            : answer?.choice === option

          return (
            <button
              key={option}
              onClick={() => onChange(rule.kind === 'number-choice' ? { number: Number(option) } : { choice: option })}
              className={`px-4 py-4 rounded-2xl border transition ${isSelected ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    )
  }

  if (rule.kind === 'voice') {
    return <VoiceInput answer={answer} onChange={onChange} />
  }

  return null
}

function DrawingInput({
  answer,
  onChange,
}: {
  answer?: AnswerDraft
  onChange: (draft: AnswerDraft) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = '#111'
    context.lineWidth = 4
    context.lineCap = 'round'
    context.lineJoin = 'round'

    if (answer?.previewUrl) {
      const image = new Image()
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
      }
      image.src = answer.previewUrl
    }
  }, [answer?.previewUrl])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return { x: 0, y: 0 }
    }

    const rect = canvas.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const saveCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        return
      }

      onChange({
        blob,
        previewUrl: canvas.toDataURL('image/png'),
      })
    }, 'image/png')
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={1000}
        height={700}
        className="w-full aspect-[10/7] rounded-3xl bg-white border border-white/10 touch-none"
        onPointerDown={(event) => {
          const context = canvasRef.current?.getContext('2d')
          if (!context) {
            return
          }

          const point = getPoint(event)
          isDrawingRef.current = true
          context.beginPath()
          context.moveTo(point.x, point.y)
        }}
        onPointerMove={(event) => {
          if (!isDrawingRef.current) {
            return
          }

          const context = canvasRef.current?.getContext('2d')
          if (!context) {
            return
          }

          const point = getPoint(event)
          context.lineTo(point.x, point.y)
          context.stroke()
        }}
        onPointerUp={() => {
          isDrawingRef.current = false
          saveCanvas()
        }}
        onPointerLeave={() => {
          if (isDrawingRef.current) {
            isDrawingRef.current = false
            saveCanvas()
          }
        }}
      />

      <button
        onClick={() => {
          const canvas = canvasRef.current
          const context = canvas?.getContext('2d')
          if (!canvas || !context) {
            return
          }

          context.fillStyle = '#fff'
          context.fillRect(0, 0, canvas.width, canvas.height)
          context.strokeStyle = '#111'
          onChange({})
        }}
        className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10"
      >
        Очистить
      </button>
    </div>
  )
}

function VoiceInput({
  answer,
  onChange,
}: {
  answer?: AnswerDraft
  onChange: (draft: AnswerDraft) => void
}) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        onChange({
          blob,
          previewUrl: URL.createObjectURL(blob),
        })

        stream.getTracks().forEach((track) => track.stop())
      }

      recorder.start()
      recorderRef.current = recorder
      setIsRecording(true)
      setRecordingError('')
    } catch (error) {
      setRecordingError(error instanceof Error ? error.message : 'Не удалось записать голос.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {!isRecording ? (
          <button
            onClick={() => void startRecording()}
            className="px-5 py-3 rounded-2xl bg-white text-black font-medium"
          >
            Записать голос
          </button>
        ) : (
          <button
            onClick={() => {
              recorderRef.current?.stop()
              setIsRecording(false)
            }}
            className="px-5 py-3 rounded-2xl bg-red-300 text-black font-medium"
          >
            Остановить запись
          </button>
        )}

        {answer?.previewUrl ? (
          <button
            onClick={() => onChange({})}
            className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10"
          >
            Очистить
          </button>
        ) : null}
      </div>

      {isRecording ? (
        <p className="text-white/60">Запись идет...</p>
      ) : null}

      {recordingError ? (
        <p className="text-red-300">{recordingError}</p>
      ) : null}

      {answer?.previewUrl ? (
        <audio controls className="w-full">
          <source src={answer.previewUrl} />
        </audio>
      ) : null}
    </div>
  )
}

function canContinueQuestion(kind: QuestionKind, answer?: AnswerDraft) {
  if (kind === 'info') {
    return true
  }

  if (kind === 'text') {
    return Boolean(answer?.text?.trim())
  }

  if (kind === 'drawing' || kind === 'voice') {
    return Boolean(answer?.blob)
  }

  if (kind === 'photo') {
    return Boolean(answer?.file)
  }

  if (kind === 'number-choice') {
    return typeof answer?.number === 'number'
  }

  if (kind === 'single-choice') {
    return Boolean(answer?.choice)
  }

  return false
}

function getQuestionsErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase()

  if (normalizedMessage.includes('permission denied') || normalizedMessage.includes('row-level security')) {
    return 'Нет доступа к таблице Questions. Проверь RLS policy на SELECT для авторизованных пользователей.'
  }

  if (normalizedMessage.includes('relation') && normalizedMessage.includes('does not exist')) {
    return 'Таблица Questions не найдена в Supabase.'
  }

  return `Не удалось загрузить вопросы: ${message}`
}
