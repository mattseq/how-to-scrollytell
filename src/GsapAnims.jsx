import gsap from 'gsap'
import { ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, ScrambleTextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(MorphSVGPlugin) 
gsap.registerPlugin(ScrambleTextPlugin);

export default function GsapAnims() {

  // Scene 1: Basic Sticky Scene Animation
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

  // Scene 2: Zoom Animation
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

  // Scene 2: Text Animation
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

  // Scene 3: SVG Draw Animation
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

  // Scene 4: Parallax Effect
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

  // Scene 5: Curved Cover Transition
  gsap.to("#curved-cover", {
    borderRadius: "0%",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#curved-cover",
      start: "top 50%",
      end: "top top",
      scrub: true,
    }
  });
  
  // Scene 5: Parallax Text
  gsap.to("#parallax-header", {
    y: -50,
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
      trigger: "#scene-container-5",
      start: "top 70%",
      end: "bottom top",
      scrub: true,
    }
  });
  gsap.to("#parallax-text-1", {
    y: -75,
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
      trigger: "#scene-container-5",
      start: "top 50%",
      end: "bottom top",
      scrub: true,
    }
  });
  gsap.to("#parallax-text-2", {
    y: -100,
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
      trigger: "#scene-container-5",
      start: "top 30%",
      end: "bottom top",
      scrub: true,
    }
  });

  // Scene 5: Card Stack, Text Scramble, and Slide-in Scene Timeline
  gsap.utils.toArray('#card-stack .card').forEach((card, i, arr) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#card-stack',
        start: 'top top',
        end: 'top -300%',
        scrub: true,
      }
    });
    tl.fromTo(card, 
      { x: 1500, scale: 0 },
      {
        x: 0,
        scale: 1,
        ease: 'power3.out',
      }
    );
    tl.to(card,
      {
        x: -280*i,
        y: 20*i,
        scale: 0.5,
        ease: 'power3.inOut',
        delay: 0.5
      }
    );
    tl.to(
      '#appear-text',
      {
        scrambleText: "I use Arch btw.",
        delay: 0.5
      }
    );
    tl.fromTo(
      '#scene-container-6',
      { xPercent: 100, yPercent: -100 },
      { 
        xPercent: 0,
        yPercent: 0,
        borderRadius: '0%',
        ease: 'expo.out',
      }
    );
    card
  });

  
  const video = document.getElementById('video');
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      gsap.to(video,
        {
          ease: 'none',
          scrollTrigger: {
            trigger: video,
            start: 'top 50%',
            end: 'bottom 0%',
            scrub: true,
            onUpdate: self => {
              video.currentTime = self.progress * video.duration;
            }
          }
        }
      );
      // Fade out at the end
      gsap.to(video, {
        opacity: 0,
        scrollTrigger: {
          trigger: video,
          start: 'bottom 10%',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }
}