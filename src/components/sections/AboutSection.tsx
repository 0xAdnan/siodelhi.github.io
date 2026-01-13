import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'
import { SectionCard } from '../ui/SectionCard'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLHeadingElement>(null)
    const headerWrapperRef = useRef<HTMLDivElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const { isDark } = useTheme()

    const cards = [
        {
            label: 'Organization',
            title: 'ABOUT',
            subtitle: 'SIO',
            type: 'Student Movement',
            startLabel: 'Est.',
            startValue: '1982',
            endLabel: 'Network',
            endValue: 'Pan India',
            color: '#ef4444'
        },
        {
            label: 'Ideology',
            title: 'SIO',
            subtitle: 'AIMS',
            type: 'Education & Reality',
            startLabel: 'Focus',
            startValue: 'Students',
            endLabel: 'Approach',
            endValue: 'Holistic',
            color: '#eab308'
        },
        {
            label: 'Impact',
            title: 'SIO',
            subtitle: 'WORKS',
            type: 'Constructive & Peaceful',
            startLabel: 'Method',
            startValue: 'Grassroots',
            endLabel: 'Reach',
            endValue: 'National',
            color: '#3b82f6'
        },
        {
            label: 'Network',
            title: 'PAN',
            subtitle: 'INDIA',
            type: 'Coast to Coast',
            startLabel: 'From',
            startValue: 'Punjab',
            endLabel: 'To',
            endValue: 'Kerala',
            color: '#10b981'
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header wrapper starts HIDDEN - only shows when scrolled into section
            gsap.set(headerWrapperRef.current, {
                opacity: 0,
                visibility: 'hidden'
            })

            // Initial state: Header starts large, centered, and INVISIBLE
            gsap.set(headerRef.current, {
                scale: 5,
                y: '60vh',
                x: '50vw',
                transformOrigin: 'center center',
                opacity: 0
            })

            // Show header wrapper when section reaches top (same as animation start)
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top', // Match animation start
                end: 'bottom top',
                onEnter: () => {
                    gsap.set(headerWrapperRef.current, { opacity: 1, visibility: 'visible' })
                },
                onLeave: () => {
                    gsap.set(headerWrapperRef.current, { opacity: 0, visibility: 'hidden' })
                },
                onEnterBack: () => {
                    gsap.set(headerWrapperRef.current, { opacity: 1, visibility: 'visible' })
                },
                onLeaveBack: () => {
                    gsap.set(headerWrapperRef.current, { opacity: 0, visibility: 'hidden' })
                }
            })

            // Header opacity fades in FAST on entry
            gsap.fromTo(headerRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=300',
                        scrub: 0.5
                    }
                }
            )

            // Header zooms in from center-bottom to left position (slower)
            gsap.fromTo(headerRef.current,
                {
                    scale: 5,
                    y: '60vh',
                    x: '50vw'
                },
                {
                    scale: 1,
                    y: 0,
                    x: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=800',
                        scrub: 1
                    }
                }
            )

            // Header fades out as section ends (no scale change)
            gsap.fromTo(headerRef.current,
                { opacity: 1 },
                {
                    opacity: 0,
                    ease: 'power2.in',
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: 'bottom 80%',
                        end: 'bottom 30%',
                        scrub: 1
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                minHeight: '250vh',
                position: 'relative',
                background: 'transparent',
                marginTop: '-20vh',
            }}
        >
            {/* Fixed Header Container - Uses position:fixed via wrapper */}
            <div
                ref={headerWrapperRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '35%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '10%',
                    paddingRight: '40px',
                    paddingBottom: '24vh',
                    zIndex: 5,
                    pointerEvents: 'none' // Allow clicks through to content behind
                }}
            >
                <h1
                    ref={headerRef}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 800,
                        color: isDark ? '#ffffff' : '#000000',
                        lineHeight: 1,
                        margin: 0,
                        textTransform: 'uppercase',
                        fontFamily: '"Geist", sans-serif',
                        letterSpacing: '-0.03em',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'auto'
                    }}
                >
                    <span style={{ color: '#ffffff' }}>ABOUT</span>
                    <br />
                    <span style={{ color: '#ff3333' }}>US</span>
                </h1>
            </div>

            {/* Right Side - Cards that scroll naturally */}
            <div
                ref={cardsContainerRef}
                className="cards-grid"
                style={{
                    marginLeft: '35%',
                    marginRight: '5%',
                    width: '55%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 280px)',
                    gap: '32px',
                    justifyContent: 'center',
                    padding: '180vh 0 20vh 0',
                    position: 'relative',
                    alignContent: 'start',
                    zIndex: 10
                }}
            >
                {cards.map((card, index) => (
                    <div key={index} style={{ transform: index % 2 === 1 ? 'translateY(50px)' : 'none' }}>
                        <SectionCard
                            className="about-card"
                            label={card.label}
                            labelColor={card.color}
                            title={card.title}
                            subtitle={card.subtitle}
                            description={card.type}
                            startLabel={card.startLabel}
                            startValue={card.startValue}
                            endLabel={card.endLabel}
                            endValue={card.endValue}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
