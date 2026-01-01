import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import GsapAnims from './GsapAnims'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)

    GsapAnims();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root options={{ smoothWheel: true }} ref={lenisRef} className='overflow-x-hidden'>
      <div id='scene-container-1' className='h-[300vh] p-[2rem]'>
        <h1>Basic Sticky Scene</h1>
        <div className='h-screen' />
        <div
          id='sticky-object-1'
          className='box w-[200px] h-[200px] bg-fuchsia-500 rounded-3xl mx-auto sticky top-[30%]'
        />
        <p
          id='non-sticky-object-1'
          className='text-left text-2xl ml-20'
        >
          Hello there.
        </p>
      </div>
      <div id='scene-container-2' className='h-[300vh] p-[2rem] mt-20 overflow-hidden'>
        <h1 id='title'>Text Effect and Zoom</h1>
        <div className='h-screen' />
        <div
          id='sticky-object-2'
          className='box w-[200px] h-[200px] bg-fuchsia-500 rounded-3xl mx-auto'
        />
      </div>
      <div id='scene-container-3' className='h-[300vh] p-[2rem] bg-fuchsia-500'>
        <h1 className='sticky top-10'>New Scene</h1>
      </div>
    </ReactLenis>
  )
}

export default App