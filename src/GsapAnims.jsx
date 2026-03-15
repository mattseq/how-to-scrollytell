import gsap from "gsap";
import {
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  Flip,
} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(Flip);

export default function GsapAnims() {
  // --------------------------------------------------------------------------
  // Scene 1: Sticky intro reveal
  // --------------------------------------------------------------------------
  gsap.fromTo(
    "#sticky-object-1",
    { opacity: 0, x: -500, scale: 0.5 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#sticky-object-1",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    },
  );

  // --------------------------------------------------------------------------
  // Scene 2: Zoom + pin
  // --------------------------------------------------------------------------
  gsap.to("#sticky-object-2", {
    scale: 8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#sticky-object-2",
      start: "top 50%",
      end: "top -100%",
      scrub: true,
      pin: true,
    },
  });

  // Scene 2: SplitText reveal
  SplitText.create("#title", {
    type: "words, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        scrollTrigger: {
          trigger: "#title",
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        y: 100,
        autoAlpha: 0,
        stagger: 0.25,
      });
    },
  });

  // --------------------------------------------------------------------------
  // Scene 3: DrawSVG
  // --------------------------------------------------------------------------
  gsap.fromTo(
    "#draw-svg path",
    { drawSVG: "0%" },
    {
      scrollTrigger: {
        trigger: "#draw-svg",
        start: "top 100%",
        end: "top -100%",
        scrub: true,
      },
      drawSVG: "100%",
    },
  );

  // --------------------------------------------------------------------------
  // Scene 4: Parallax layers
  // --------------------------------------------------------------------------
  gsap.utils.toArray(".parallax").forEach((parallaxObject, i) => {
    gsap.to(parallaxObject, {
      y: (i + 1) * -300,
      ease: "none",
      scrollTrigger: {
        trigger: "#scene-container-4",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // --------------------------------------------------------------------------
  // Scene 5: Curved cover transition
  // --------------------------------------------------------------------------
  gsap.to("#curved-cover", {
    borderRadius: "0%",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#curved-cover",
      start: "top 50%",
      end: "top top",
      scrub: true,
    },
  });

  // Scene 5: Card stack timeline + scramble + slide-in handoff
  gsap.utils.toArray("#card-stack .card").forEach((card, i, arr) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#card-stack",
        start: "top top",
        end: "top -300%",
        scrub: true,
      },
    });
    tl.fromTo(
      card,
      { x: 1500, scale: 0 },
      {
        x: 0,
        scale: 1,
        ease: "power3.out",
      },
    );
    tl.to(card, {
      x: -280 * i,
      y: 20 * i,
      scale: 0.5,
      ease: "power3.inOut",
      delay: 0.5,
    });
    tl.to("#appear-text", {
      scrambleText: "Scroll can scrub animations like a timeline.",
      delay: 0.5,
    });
    tl.fromTo(
      "#scene-container-6",
      { yPercent: 100 },
      {
        yPercent: 0,
        borderRadius: "0%",
        ease: "power1.inOut",
        delay: 1,
      },
    );
    card;
  });

  // --------------------------------------------------------------------------
  // Scene 8: Scroll-scrubbed video playback
  // --------------------------------------------------------------------------
  const video = document.getElementById("video");
  if (video) {
    video.addEventListener("loadedmetadata", () => {
      gsap.to(video, {
        ease: "none",
        scrollTrigger: {
          trigger: video,
          start: "top 50%",
          end: "bottom 0%",
          scrub: true,
          onUpdate: (self) => {
            video.currentTime = self.progress * video.duration;
          },
        },
      });
      // Fade out at the end
      gsap.to(video, {
        opacity: 0,
        scrollTrigger: {
          trigger: video,
          start: "bottom 10%",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // --------------------------------------------------------------------------
  // Scene 9: Pin 3D section while scroll progresses
  // --------------------------------------------------------------------------

  gsap.to("#scene-container-9", {
    scrollTrigger: {
      trigger: "#scene-container-9",
      start: "top top",
      end: "top -200%",
      pin: true,
      scrub: true,
    },
  });

  // --------------------------------------------------------------------------
  // Scene 10+: FLIP sequence across destination containers
  // --------------------------------------------------------------------------
  const flipAnim = gsap.timeline();
  flipAnim.addLabel("first");

  flipAnim.add(
    Flip.fit("#flip-box", "#flip-container-2", {
      duration: 1,
      ease: "power1.inOut",
    }),
  );

  flipAnim.addLabel("second");

  flipAnim.add(
    Flip.fit("#flip-box", "#flip-container-3", {
      duration: 1,
      ease: "power1.inOut",
    }),
  );

  flipAnim.addLabel("third");

  flipAnim.add(
    Flip.fit("#flip-box", "#scene-container-11", {
      borderRadius: "0%",
      duration: 1,
      ease: "power1.out",
    }),
  );

  flipAnim.add(
    gsap.fromTo(
      "#flip-box-contents",
      { opacity: 0 },
      { opacity: 1, delay: 0.5, duration: 0.5, ease: "power1.inOut" },
    ),
    "<",
  );

  flipAnim.addLabel("zoom");

  // Drive FLIP timeline with scroll + label snapping.
  ScrollTrigger.create({
    trigger: "#scene-container-10",
    animation: flipAnim,
    scrub: true,
    start: "top top",
    end: "top -300%",
    snap: { snapTo: "labels", duration: { min: 0.2, max: 0.3 }, delay: 0.1 },
  });
}
