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
    <ReactLenis root options={{ smoothWheel: true }} ref={lenisRef}>
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
      <div id='scene-container-3' className='h-[400vh] p-[2rem] bg-fuchsia-500 flex flex-row items-center'>
        <h1 className='sticky top-[50%]'>SVG Draw and Morph</h1>
        <svg id="draw-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 103 103" fill="none" strokeWidth="2.2" opacity="1" className='size-100 sticky top-40 ml-20'>
          <defs>
            <linearGradient id="grad-1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stopColor="rgb(255, 135, 9)"></stop>
              <stop offset="0.8" stopColor="rgb(247, 189, 248)"></stop>
            </linearGradient>
          </defs>
          <path stroke="url(#grad-1)" d="M50.5 50.5h50v50s-19.2 1.3-37.2-16.7S56 35.4 35.5 15.5C18.5-1 .5.5.5.5v50h50s25.6-.6 38-18 12-32 12-32h-50v100H.5S.2 80.7 11.8 68.2 40 49.7 50.5 50.5Z" />
        </svg>

        <button className='sticky size-20 top-100 ml-20'
          onClick={() =>
            gsap.to(
              '#initial-morph-svg',
              {
                ease: 'expo.inOut',
                morphSVG: '#final-morph-svg',
                duration: 1
              }
            )
          }
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='size-10'>
            <path id='initial-morph-svg' d="M22.7048 4.95406C22.3143 4.56353 21.6811 4.56353 21.2906 4.95406L8.72696 17.5177C8.33643 17.9082 7.70327 17.9082 7.31274 17.5177L2.714 12.919C2.32348 12.5284 1.69031 12.5284 1.29979 12.919C0.909266 13.3095 0.909265 13.9427 1.29979 14.3332L5.90392 18.9289C7.07575 20.0986 8.97367 20.0978 10.1445 18.9271L22.7048 6.36827C23.0953 5.97775 23.0953 5.34458 22.7048 4.95406Z" fill="#0F0F0F"/>
            <path className='hidden' id='final-morph-svg' d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>
          </svg>
        </button>
      </div>
      <div id='scene-container-4' className='h-[300vh] p-[2rem] bg-fuchsia-500'>
        <h1 className='mt-100'>Parallax</h1>
        <div className='parallax-container mt-100'>
          <div className='parallax w-[150px] h-[150px] bg-white rounded-3xl mx-auto mb-30' />
          <div className='parallax w-[100px] h-[100px] bg-gray-300 rounded-3xl mx-auto mb-30' />
          <div className='parallax w-[75px] h-[75px] bg-gray-500 rounded-3xl mx-auto mb-30' />
          <div className='parallax w-[50px] h-[50px] bg-gray-700 rounded-3xl mx-auto mb-30' />
        </div>
        <h1>Take a look at this curved transition!</h1>
      </div>
      <div id='scene-container-5' className='w-full h-[200vh] relative bg-black'>
        <div id='curved-cover' className='absolute -top-[20vh] w-full h-[25vh] bg-black rounded-t-[50%]'/>
        <div id='main-scene-5' className='h-[100vh] flex flex-col items-center justify-center'>
          <h1 id='parallax-header' className="text-4xl font-bold text-fuchsia-500 bg-linear-to-r from-fuchsia-500 via-orange-400 to-pink-300 bg-clip-text text-transparent">Next Scene</h1>
          <div className='w-[50%]'>
            <p id='parallax-text-1' className="mt-10 text-xl text-gray-700 font-medium">Here's some more parallax, but on text. I also added some scaling.</p>
            <p id='parallax-text-2' className="mt-5 text-xs text-gray-700 font-medium">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
          </div>
        </div>
      </div>
    </ReactLenis>
  )
}

export default App