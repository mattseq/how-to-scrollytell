import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(MorphSVGPlugin) 

export default function GsapAnims() {
  gsap.fromTo(
    '#sticky-object-1',
    { opacity: 0, x: -500, scale: 0.5 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#sticky-object-1',
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
    }
  )

  gsap.to(
    '#sticky-object-2',
    { 
      scale: 8, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#sticky-object-2',
        start: 'top 50%',
        end: 'top -100%',
        scrub: true,
        pin: true
      },
    },
  )

  SplitText.create("#title", {
    type: "words, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        scrollTrigger: {
          trigger: "#title",
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        },
        y: 100, 
        autoAlpha: 0, 
        stagger: 0.25
      });
    }
  });

  gsap.fromTo(
    '#draw-svg path',
    { drawSVG: '0%'},
    {
      scrollTrigger: {
        trigger: '#draw-svg',
        start: 'top 100%',
        end: 'top -100%',
        scrub: true,
      },
      drawSVG: '100%'
    }
  );

  gsap.utils.toArray('.parallax').forEach((parallaxObject, i) => {
    gsap.to(parallaxObject, {
      y: (i + 1) * -300,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-container-4',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
}