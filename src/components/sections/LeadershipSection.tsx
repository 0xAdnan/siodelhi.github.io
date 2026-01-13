import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const leaders = [
    {
        name: 'Abdullah Azzam',
        role: 'State President',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Mohammed Bilal',
        role: 'General Secretary',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Zaid Khan',
        role: 'Joint Secretary',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Ahmed Ali',
        role: 'Coordinator',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Omar Farooq',
        role: 'Media Head',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Yusuf Ahmed',
        role: 'Campus Secretary',
        image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Ibrahim Khalid',
        role: 'Zone President',
        image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=600&fit=crop&q=80',
    },
    {
        name: 'Saleem Khan',
        role: 'Zone Secretary',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80',
    }
]

export function LeadershipSection() {
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
            id="leadership"
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
                    <span style={{ color: '#ffffff' }}>OUR</span>
                    <br />
                    <span style={{ color: '#ff3333' }}>LEADERS</span>
                </h1>
            </div>

            {/* Right Side - Cards that scroll naturally */}
            <div
                ref={cardsContainerRef}
                style={{
                    marginLeft: '20%',
                    marginRight: '5%',
                    width: '75%',
                    padding: '150vh 0 20vh 0',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                {/* First Row - 2 Leaders */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '32px',
                    marginBottom: '32px'
                }}>
                    {leaders.slice(0, 2).map((leader, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                width: '110px',
                                height: '110px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                marginBottom: '24px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }}>
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)'
                                    }}
                                />
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#ffffff',
                                marginBottom: '8px'
                            }}>
                                {leader.name}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {leader.role}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Second Row - Remaining 4 Leaders (can be 6 if you add more) */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '32px'
                }}>
                    {leaders.slice(2).map((leader, index) => (
                        <div
                            key={index + 2}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                width: '110px',
                                height: '110px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }}>
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)'
                                    }}
                                />
                            </div>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: '#ffffff',
                                marginBottom: '6px'
                            }}>
                                {leader.name}
                            </h3>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {leader.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
