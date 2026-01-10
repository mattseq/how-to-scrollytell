import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Observer } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export default function Model() {
    const model = useRef();

    const { scene, animations } = useGLTF('/Bogre.glb');
    const { actions } = useAnimations(animations, model);

    useEffect(() => {
        if (actions['roar']) {
            actions['roar'].play();
            actions['roar'].paused = true;
        }

        gsap.to(actions['roar'], {
            time: actions['roar'].getClip().duration,
            ease: "none",
            scrollTrigger: {
                trigger: "#canvas",
                start: "top 60%",
                end: "bottom top",
                scrub: true
            }
        })

        return () => {
            if (actions['roar']) actions['roar'].stop();
        }
    }, [actions]);

    return (
        <primitive object={scene} scale={0.5} rotation={[0, Math.PI, 0]} ref={model}/>
    )
}