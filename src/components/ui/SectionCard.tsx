

interface SectionCardProps {
    label: string
    labelColor: string
    title: string
    subtitle: string
    description: string
    startLabel?: string
    startValue?: string
    endLabel?: string
    endValue?: string
    linkText?: string
    onClick?: () => void
    className?: string
}

export function SectionCard({
    label,
    labelColor,
    title,
    subtitle,
    description,
    startLabel,
    startValue,
    endLabel,
    endValue,
    linkText = 'READ MORE',
    onClick,
    className
}: SectionCardProps) {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                boxSizing: 'border-box',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '340px',
                width: '280px',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = labelColor
                e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            {/* Label with color bar */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                        width: '4px',
                        height: '18px',
                        background: labelColor,
                        borderRadius: '2px'
                    }} />
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: labelColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {label}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    margin: 0,
                    fontFamily: '"Geist", sans-serif',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    letterSpacing: '-0.02em'
                }}>
                    {title}
                </h3>
                <span style={{
                    fontSize: '1rem',
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.8)',
                    textTransform: 'uppercase'
                }}>
                    {subtitle}
                </span>

                {/* Description */}
                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '10px 0 0 0',
                    lineHeight: 1.4
                }}>
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div>
                {/* Stats */}
                {(startLabel || endLabel) && (
                    <div style={{
                        display: 'flex',
                        gap: '32px',
                        marginBottom: '12px'
                    }}>
                        {startLabel && (
                            <div>
                                <span style={{
                                    display: 'block',
                                    fontSize: '0.65rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textTransform: 'uppercase',
                                    marginBottom: '2px'
                                }}>
                                    {startLabel}
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}>
                                    {startValue}
                                </span>
                            </div>
                        )}
                        {endLabel && (
                            <div>
                                <span style={{
                                    display: 'block',
                                    fontSize: '0.65rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textTransform: 'uppercase',
                                    marginBottom: '2px'
                                }}>
                                    {endLabel}
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}>
                                    {endValue}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Link */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#ffffff'
                }}>
                    <span style={{ color: labelColor }}>✓</span>
                    {linkText}
                </div>
            </div>
        </div>
    )
}
