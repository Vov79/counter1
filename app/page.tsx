'use client'

import { useEffect, useState } from 'react'

export default function Page(){

  const target = new Date('2026-03-21T08:00:00')

  const getTime = ()=>{
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return {days,hours,minutes,seconds}
  }

  const [time,setTime] = useState(getTime())
  const [mouse,setMouse] = useState({x:0,y:0})

  useEffect(()=>{
    const t = setInterval(()=>{
      setTime(getTime())
    },1000)

    return ()=>clearInterval(t)
  },[])

  useEffect(()=>{
    const move = (e:any)=>{
      setMouse({x:e.clientX,y:e.clientY})
    }

    window.addEventListener('mousemove',move)
    return ()=>window.removeEventListener('mousemove',move)
  },[])



  const Box = ({value,label}:any)=>(
    <div className="flex flex-col items-center">

      <div className="relative">

        <div className="absolute inset-0 blur-3xl opacity-30 bg-pink-400 rounded-3xl"></div>

        <div
          className="relative bg-[#0a0a0f]/80 border border-white/10 rounded-3xl px-10 py-8 md:px-16 md:py-12 text-[12vw] md:text-[8vw] font-semibold text-white shadow-xl"
          style={{
            textShadow:'0 0 25px rgba(255,200,220,0.15)',
            fontVariantNumeric:'tabular-nums'
          }}
        >
          {String(value).padStart(2,'0')}
        </div>

      </div>

      <div className="mt-3 text-white/50 tracking-[0.3em] text-xs md:text-sm">
        {label}
      </div>

    </div>
  )



  return(
    <main className="h-screen w-screen overflow-hidden flex items-center justify-center text-white relative bg-[#050507]">

      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[150px] opacity-40"
        style={{
          background:'rgba(255,170,190,0.5)',
          left:mouse.x - 250,
          top:mouse.y - 250
        }}
      />

      <div className="absolute inset-0 opacity-40">
        <div className="absolute w-[600px] h-[600px] bg-pink-500 blur-[220px] top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-500 blur-[220px] bottom-[-200px] right-[-200px]"></div>
      </div>

      <div className="relative text-center px-6 max-w-[1200px]">

        <h1 className="text-4xl md:text-6xl mb-10 font-medium tracking-wide">
          Until We're Together
        </h1>

        <p className="text-white/40 mb-16 text-sm md:text-base">
          counting the moments
        </p>

        <div className="flex gap-6 md:gap-14 justify-center flex-wrap">

          <Box value={time.days} label="DAYS"/>
          <Box value={time.hours} label="HOURS"/>
          <Box value={time.minutes} label="MIN"/>
          <Box value={time.seconds} label="SEC"/>

        </div>

      </div>

    </main>
  )
}