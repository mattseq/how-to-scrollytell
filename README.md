# How To Scrollytell

## Disclaimer

I am not an expert in scrollytelling - I'm learning alongside you. The purpose of these notes is not to prescribe the “correct” way, but to quickly introduce you to key scrollytelling concepts (like sticky positioning and scroll-based animation) that I’ve discovered through my own research. The techniques shown here reflect my current understanding and are intended as helpful recommendations, not definitive best practices.

---

## What is "Scrollytelling"?

Scrollytelling is a storytelling technique used by websites where content changes and animates in response to the user's scroll actions. As you scroll, a story unfolds, revealing new information, triggering animations, and smoothly transitioning between scenes - creating an interactive, immersive, narrative experience.
Some websites that implement this art form extremely well include:
- [Lenis](https://lenis.darkroom.engineering/)
- [GTA VI](https://www.rockstargames.com/VI)
- [Getty](https://gehry.getty.edu/)

---

## Main Libraries and Frameworks

The necessary libraries and frameworks generally include:
- An animation framework such as Framer Motion or GSAP
- A smooth scroll library such as Lenis

In these notes, we're going to use **GSAP + Lenis** on top of **React**.

---

## Why Use Lenis?

- Lenis makes scrolling buttery smooth while allowing for regular CSS transforms, unlike many other smooth scrolling solutions.
- The most important difference is that it preserves the ability to use `position: sticky` in CSS, which results in an amazing scrolling experience.
	- Many of the elements you see on Lenis’s own website use `position: sticky`.
- A good alternative for Lenis would be using GSAP's ScrollSmoother plugin because it makes things like parallax effects so much easier.
	- "Sticky positioning" will not work if you use ScrollSmoother instead of Lenis and you will have to rely on GSAP's "pin" property.
	- Lenis also makes the scrollbar appear completely smooth as well, which ScrollSmoother fails to do.
	- You can find the docs on ScrollSmoother [here](https://gsap.com/docs/v3/Plugins/ScrollSmoother/).

---

## Why Use GSAP?

- GSAP is a comprehensive animation framework with lots of support for a variety of different animations, from basic animations to animating text and SVGs.
- GSAP includes a plugin called ScrollTrigger that provides a way to control animations based on scroll progress.
- It also includes a property called `scrub` which allows animations to play forward and backward with scroll, instead of just happening once.
	- Framer Motion does not include `scrub`, which lets users replay animations like it's a cinematic.
- I would highly recommend taking a look at GSAP's docs, especially the [cheatsheet](https://gsap.com/cheatsheet).

---

## Using GSAP with the ScrollTrigger Plugin

The ScrollTrigger plugin allows you to make amazing scroll-based animations and is obviously a necessity for scrollytelling.

```jsx
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

---

## Sync Lenis's Animation Frame Looping with GSAP's

You should sync Lenis’s animation frame loop with GSAP’s ticker so that animations and scroll smoothing happen on the same timing, on the same loop. This is the recommended way by Lenis.

```jsx
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])
  
  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
  )
}
```

- **RAF** stands for **requestAnimationFrame**
- This syncs Lenis updates with GSAP’s ticker
- `ReactLenis` options provide other capabilities as well:
	- Vertical and horizontal scrolling
	- Overscroll behavior
	- `allowNestedScroll` (nest Lenis instances)
- Combining these features can allow for more advanced scrolling animations.

---

## Example of a GSAP Animation

```jsx
gsap.fromTo(
  '.box',
  { opacity: 0, x: -500, scale: 0.5 },
  {
	opacity: 1,
	x: 0,
	scale: 1,
	ease: 'power3.out',
	scrollTrigger: {
	  trigger: '.box',
	  start: 'top 80%',
	  end: 'top 30%',
	  scrub: true,
	},
  }
)
```

### Key points:
- **Class selectors** can be used instead of refs -> cleaner code
- First {brackets} = **initial state**
- Second {brackets} = **animated state**
- `start` and `end` define when the animation runs
- `scrub` allows animations to play **forward and backward** with scroll

---
## Separating GSAP Animations from Main Code

Because animations rely only on class selectors, they can live in a separate file.

```jsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GsapAnims() {
	gsap.fromTo(
	  '.box',
	  { opacity: 0, x: -500, scale: 0.5 },
	  {
		opacity: 1,
		x: 0,
		scale: 1,
		ease: 'power3.out',
		scrollTrigger: {
		  trigger: '.box',
		  start: 'top 80%',
		  end: 'top 30%',
		  scrub: true,
		},
	  }
	)
}
```

- Keeps your main component clean
- Makes animations easier to scale and maintain

---

## Using `position: sticky`

```jsx
<div
  className='box'
  style={{
	width: 200,
	height: 200,
	background: 'hotpink',
	borderRadius: 24,
	margin: '0 auto',
	position: 'sticky',
	top: '30%',
  }}
/>
```

### Sticky basics:
- `position: sticky` works by switching between `relative` and `fixed`
- You **must specify** `top`, `bottom`, `left`, or `right`, which defines where the element sticks in the viewport
### Stopping Sticky Positioning

Sticky positioning ends **only when the parent element leaves the viewport**.

```jsx
<div style={{ height: '100vh', position: 'relative' }}>
  <div
    style={{
      position: 'sticky',
      top: 30%, // sticks 30% from the top
      width: 200,
      height: 200,
      background: 'hotpink',
    }}
  />
</div>
```

- The pink box sticks **only within the 100vh container**
- A common mistake is using `position: sticky` for multiple objects and letting them collect on top of each other when the scene container starts to leave the viewport. A simple fix is to ensure that all the sticky objects are inside one singular sticky container if possible.

---

## A GSAP Alternative to `position: sticky`

There is actually a second way to make an object "sticky", this time using GSAP instead of basic CSS.

```jsx
gsap.to(
	'#pinned-object',
	{ 
		scale: 8, 
		ease: 'power3.out',
		scrollTrigger: {
			trigger: '#pinned-object',
			start: 'top 30%',
			end: 'top 0%',
			scrub: true,
			pin: true
		},
	},
)
```

- In this case, you can use `pin : true`
- `pin` pins the `trigger` object to the viewport
- the "pin" disengages after the object passes `end`
- This can be used to create the "zoom effect" described later

Obviously, this raises the question: should you use `position: sticky` with basic CSS or `pin: true` with GSAP?
- I would probably use sticky positioning for the most part because it's more rigid in where it sticks (only within its container), making it ideal for basic scenes.
- GSAP's `pin` is best used in advanced techniques if you need to define more specifically where the object should unpin. It's ideal for pinning objects between scenes, pinning multiple objects and unpinning them at different points, etc.
- Often it's just up to preference.

Also from now on, I will refer to elements using `position: sticky` as being "sticky" and elements using GSAP's `pin` as being "pinned".

--

## Creating "Scenes”

"Scenes" are the basic organizational element of scrollytelling.

A basic scene with a sticky object might look like this:
1. Create a **scene container** (controls sticky duration)
2. Add a **sticky object**
3. Add **non-sticky elements** that scroll past them
5. When the scene ends:
	- Sticky object releases because the scene container is out of the viewport
	- User transitions smoothly to the next scene

---

## Creating a Zoom-In Effect

This effect starts with a single object, which then scales up to fill the viewport, at which point you transition directly into the next scene.

1. Start with a single object in the scene container (this is object you're going to zoom in on)
2. Create a scale animation with GSAP and pin the object:
	```jsx
	gsap.to(
		'#pinned-object',
		{ 
			scale: 8, 
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '#pinned-object',
				start: 'top 30%',
				end: 'top -100%',
				scrub: true,
				pin: true
			},
		},
	)
	```
3. Setup the next scene container with a background color that matches that of the object that you're scaling
4. The `end` property should be set so that the object unpins once the new scene container is in place.
5. Apply `overflow-hidden` to the scene container to prevent the scrollbars from appearing because the scaled object overflows the viewport

---

## Creating a Text Effect

By "text effect" I mean an effect where the characters or words act as individual elements and animate separately. You can do this by using another GSAP plugin called "SplitText".
```jsx
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText);
```

Now you can use SplitText to split a paragraph of text into separate words or characters and animate them separately:
```jsx
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
```
- SplitText separates the words in `#title` and provides the array `self.words` for the `onSplit(self)` function
- `type` and `mask` define how to paragraph of text is going to be separated
- `onSplit` defines the animation to be played for each word
- `stagger` controls the delay between the animation of each word

There are also a few other GSAP plugins that help you manipulate text such as ScrambleText.

---

## Manipulating SVGs

You can use more GSAP plugins to manipulate SVGs: DrawSVG for animating drawing and MorphSVG for transitions between SVGs.

### DrawSVG

DrawSVG allows you to animate the drawing of an SVG.
The main limitation of DrawSVG is that it does not animate the fill of an SVG, it only affects strokes. Remember to keep this in mind when selecting or creating SVGs. Now, Here's a simple example:
```jsx
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
```

The id of `draw-svg` was applied to the `svg` tag itself. `#draw-svg path` selects the `path` tag inside it. DrawSVG must be applied to a `path` tag not an `svg` tag. The rest is pretty self-explanatory.

### MorphSVG

MorphSVG allows you to animate the transition between two SVGs. The most common use for this is when clicking a button.
Here's an example without using ScrollTrigger:
```jsx
gsap.to(
	'#initial-morph-svg',
	{
	ease: 'expo.inOut',
	morphSVG: '#final-morph-svg',
	duration: 1
	}
)
```
- `#initial-morph-svg` refers to the `path` tag of the initial shape
- `#final-morph-svg` refers to the `path` tag of the final shape
- You can put both `path` tags within the same SVG to keep things organized, but you need to keep the final shape hidden. You can do this by using `display: none`.

---

## Parallax

## GSAP Timeline

## Horizontal Scroll

## Scroll-Synced Video

## Scroll-Driven Audio

## 3D Models

## Animated Infographics