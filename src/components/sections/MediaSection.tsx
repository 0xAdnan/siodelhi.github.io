import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'
import { SectionCard } from '../ui/SectionCard'

gsap.registerPlugin(ScrollTrigger)

const mediaCards = [
    {
        label: 'Press Release',
        title: 'LAUNCH',
        subtitle: 'EDUCATION',
        description: 'New Educational Initiative',
        date: 'Oct 15, 2025',
        color: '#e82828'
    },
    {
        label: 'Event',
        title: 'TECH',
        subtitle: 'CONFERENCE',
        description: 'Future Technologies',
        date: 'Sep 28, 2025',
        color: '#22c55e'
    },
    {
        label: 'Report',
        title: 'SERVICE',
        subtitle: 'DRIVE',
        description: 'Community Service',
        date: 'Aug 10, 2025',
        color: '#3b82f6'
    },
    {
        label: 'Announcement',
        title: 'SCHOLAR',
        subtitle: 'WINNERS',
        description: 'Scholarship Program',
        date: 'Jul 22, 2025',
        color: '#f59e0b'
    }
]

export function MediaSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerWrapperRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLHeadingElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const { isDark } = useTheme()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header wrapper starts HIDDEN
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

            // Show header wrapper when section reaches top
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
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

            // Header opacity fades in FAST
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

            // Header zooms in from center-bottom to left position
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

            // Header fades out as section ends
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
            id="media"
            ref={sectionRef}
            style={{
                minHeight: '250vh',
                position: 'relative',
                background: 'transparent',
            }}
        >
            {/* Fixed Header Container */}
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
                    pointerEvents: 'none',
                    opacity: 0,
                    visibility: 'hidden'
                }}
            >
                <h1
                    ref={headerRef}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 800,
                        color: isDark ? '#ffffff' : '#111111',
                        lineHeight: 1,
                        margin: 0,
                        textTransform: 'uppercase',
                        fontFamily: '"Geist", sans-serif',
                        letterSpacing: '-0.03em',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'auto'
                    }}
                >
                    <span style={{ color: '#ffffff' }}>MEDIA</span>
                    <br />
                    <span style={{ color: '#ff3333' }}>& NEWS</span>
                </h1>
            </div>

            {/* Right Side - Cards that scroll naturally */}
            <div
                ref={cardsContainerRef}
                style={{
                    marginLeft: '35%',
                    marginRight: '5%',
                    width: '55%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 280px)',
                    gap: '32px',
                    justifyContent: 'center',
                    padding: '150vh 0 20vh 0',
                    position: 'relative',
                    alignContent: 'start',
                    zIndex: 10
                }}
            >
                {mediaCards.map((card, index) => (
                    <div key={index} style={{ transform: index % 2 === 1 ? 'translateY(50px)' : 'none' }}>
                        <SectionCard
                            className="media-card"
                            label={card.label}
                            labelColor={card.color}
                            title={card.title}
                            subtitle={card.subtitle}
                            description={card.description}
                            startLabel="Date"
                            startValue={card.date}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
