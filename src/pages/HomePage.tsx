import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { LeadershipSection } from '../components/sections/LeadershipSection'
import { MediaSection } from '../components/sections/MediaSection'
import { InitiativesSection } from '../components/sections/InitiativesSection'
import { MoreSection } from '../components/sections/MoreSection'
import { ContactSection } from '../components/sections/ContactSection'
import { useRef, useEffect } from 'react'
import { InteractiveFlag } from '../components/three/InteractiveFlag'

export function HomePage() {
    const flagContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Global Scroll Trigger for Flag - Blur and move to center
        const onScroll = () => {
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight

            // Progress from 0 to 1 over first 50% of viewport scroll
            const progress = Math.min(scrollY / (viewportHeight * 0.5), 1)

            if (flagContainerRef.current) {
                const blur = progress * 4 // Max 4px blur
                const opacity = 1 - (progress * 0.4) // Fade slightly
                const translateX = progress * 40 // Move 40vw to the right (toward center)
                const translateY = progress * 15 // Move 15vh down

                flagContainerRef.current.style.filter = `blur(${blur}px)`
                flagContainerRef.current.style.opacity = `${opacity}`
                flagContainerRef.current.style.transform = `translate(${translateX}vw, ${translateY}vh)`
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            {/* Global Fixed Flag Background - Only on Home */}
            <div
                ref={flagContainerRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2, // Above gradient
                    pointerEvents: 'none',
                    transition: 'filter 0.2s ease-out, opacity 0.2s ease-out, transform 0.3s ease-out',
                    willChange: 'filter, opacity, transform'
                }}
            >
                <InteractiveFlag />
            </div>

            {/* Global Blurred Gradient - Right Side - Extended */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'radial-gradient(ellipse 120% 100% at 100% 50%, rgba(232, 40, 40, 0.7) 0%, rgba(232, 40, 40, 0.4) 30%, rgba(232, 40, 40, 0.15) 55%, transparent 85%)',
                    zIndex: 1, // Below flag
                    pointerEvents: 'none',
                }}
            />

            <HeroSection />
            <AboutSection />
            <InitiativesSection />
            <MediaSection />
            <LeadershipSection />
            <MoreSection />
            <ContactSection />
        </>
    )
}
