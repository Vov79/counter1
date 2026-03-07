'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const target = new Date('2026-03-21T08:00:00')

  const getTime = () => {
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    const safeDiff = diff > 0 ? diff : 0

    const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((safeDiff / (1000 * 60)) % 60)
    const seconds = Math.floor((safeDiff / 1000) % 60)

    return { days, hours, minutes, seconds }
  }

  const [time, setTime] = useState(getTime())
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setInterval(() => {
      setTime(getTime())
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

  const Box = ({ value, label }: { value: number; label: string }) => (
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
        <h1 className="text-4xl md:text-6xl mb-10 font-medium tracking-wide">
          Until We&apos;re Together
        </h1>

        <p className="text-white/40 mb-16 text-sm md:text-base">
          counting the moments
        </p>
<div className="mt-24 flex justify-center mb-20">

  <div className="group flex items-end relative">

    <img src="/m4.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[-10deg] z-10
    group-hover:translate-x-[-140px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50"/>

    <img src="/mi.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[-7deg] z-20
    group-hover:translate-x-[-105px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50"/>

    <img src="/m2.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[-4deg] z-30
    group-hover:translate-x-[-70px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50"/>

    <img src="/m3.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[-2deg] z-40
    group-hover:translate-x-[-35px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-50"/>

    <img src="/lift_ept.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[0deg] z-50
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]"/>

    <img src="/m5.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[2deg] z-40
    group-hover:translate-x-[35px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]"/>

    <img src="/m6.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[4deg] z-30
    group-hover:translate-x-[70px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]"/>

    <img src="/m7.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    -mr-16 rotate-[7deg] z-20
    group-hover:translate-x-[105px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]"/>

    <img src="/m8.jpg" className="w-[210px] h-[270px] object-cover rounded-2xl shadow-2xl
    transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
    rotate-[10deg] z-10
    group-hover:translate-x-[140px]
    hover:scale-[1.35] hover:-translate-y-14 hover:rotate-0 hover:z-[100]"/>

  </div>

</div>

<div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-4">
  <Box value={time.days} label="DAYS" />
  <Box value={time.hours} label="HOURS" />
  <Box value={time.minutes} label="MIN" />
  <Box value={time.seconds} label="SEC" />
</div>

        

        
      </div>
    </main>
  )
}