import { useEffect, useRef, useState, useCallback, forwardRef } from 'react'
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react'
import HTMLFlipBook from 'react-pageflip'

interface PDFFlipbookProps {
    url: string
}

declare global {
    interface Window {
        pdfjsLib: any
    }
}

interface PageProps {
    number: number
    pdfDoc: any
    scale?: number
}

// ForwardRef is CRITICAL for react-pageflip to work on custom components
const Page = forwardRef<HTMLDivElement, PageProps>(({ number, pdfDoc, scale = 1.0 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [loaded, setLoaded] = useState(false)
    const renderTaskRef = useRef<any>(null)

    useEffect(() => {
        if (!pdfDoc || !canvasRef.current) return

        let mounted = true
        const renderPage = async () => {
            // Cancel any pending render task for this page instance
            if (renderTaskRef.current) {
                try {
                    await renderTaskRef.current.cancel()
                } catch (e) {
                    // Ignore cancellation errors
                }
            }

            try {
                const page = await pdfDoc.getPage(number)
                // Default scale 1.5 for good quality, adjusted by prop
                const viewport = page.getViewport({ scale: 1.5 * scale })

                const canvas = canvasRef.current
                if (!canvas || !mounted) return

                const context = canvas.getContext('2d')
                if (!context) return

                canvas.height = viewport.height
                canvas.width = viewport.width

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                }

                const renderTask = page.render(renderContext)
                renderTaskRef.current = renderTask

                await renderTask.promise
                if (mounted) setLoaded(true)
            } catch (error: any) {
                if (error.name !== 'RenderingCancelledException') {
                    console.error(`Error rendering page ${number}:`, error)
                }
            }
        }

        renderPage()

        return () => {
            mounted = false
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel()
            }
        }
    }, [pdfDoc, number, scale])

    return (
        <div ref={ref} className="demoPage" style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.3s'
                }}
            />
            {!loaded && (
                <div style={{ position: 'absolute', color: '#ccc' }}>
                    <Loader2 className="animate-spin" size={24} />
                    <span style={{ fontSize: '10px', display: 'block' }}>{number}</span>
                </div>
            )}
        </div>
    )
})

export function PDFFlipbook({ url }: PDFFlipbookProps) {
    const [pdfDoc, setPdfDoc] = useState<any>(null)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const flipBookRef = useRef<any>(null)

    const [inputPage, setInputPage] = useState("1")
    const [zoom, setZoom] = useState(1)

    // Zoom & Container Logic
    const [containerWidth, setContainerWidth] = useState(800)
    const [containerHeight, setContainerHeight] = useState(600)
    const containerRef = useRef<HTMLDivElement>(null)

    // Window Resize Handler
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                // Maximize width (allow full width minus minimal padding)
                const w = rect.width - 20
                // Maximize height (allow full available height)
                const h = rect.height

                setContainerWidth(w)
                setContainerHeight(h)
            }
        }

        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    // Sync input page when book flips
    const onFlip = useCallback((e: any) => {
        setInputPage((e.data + 1).toString())
    }, [])

    const handlePageSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const page = parseInt(inputPage)
        if (page >= 1 && page <= totalPages && flipBookRef.current) {
            flipBookRef.current.pageFlip().flip(page - 1)
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement && containerRef.current) {
            containerRef.current.requestFullscreen().catch(err => console.error(err))
        } else {
            document.exitFullscreen()
        }
    }


    // Load PDF
    useEffect(() => {
        const loadPdf = async () => {
            setIsLoading(true)
            try {
                if (!window.pdfjsLib) {
                    setTimeout(loadPdf, 500)
                    return
                }
                const loadingTask = window.pdfjsLib.getDocument(url)
                const pdf = await loadingTask.promise
                setPdfDoc(pdf)
                setTotalPages(pdf.numPages)
                setIsLoading(false)
            } catch (error) {
                console.error('Error loading PDF:', error)
                setIsLoading(false)
            }
        }
        loadPdf()
    }, [url])

    const nextBtn = () => {
        flipBookRef.current?.pageFlip()?.flipNext()
    }

    const prevBtn = () => {
        flipBookRef.current?.pageFlip()?.flipPrev()
    }

    // Helper pages array
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    const isMobile = containerWidth < 768

    // Maximized dimensions
    const bookWidth = containerWidth
    const bookHeight = containerHeight

    // Page dimensions
    const pageWidth = isMobile ? bookWidth : bookWidth / 2
    const pageHeight = bookHeight

    return (
        <div ref={containerRef} style={{ width: '100%', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', position: 'relative' }}>

            {/* Loading Overlay */}
            {isLoading && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)', zIndex: 10 }}>
                    <Loader2 size={40} className="animate-spin text-gray-500" />
                </div>
            )}

            {/* Book Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                overflow: 'hidden',
                padding: '0',
                transform: `scale(${zoom})`,
                transition: 'transform 0.2s ease'
            }}>
                {pdfDoc && (
                    <HTMLFlipBook
                        width={Math.floor(pageWidth)}
                        height={Math.floor(pageHeight)}
                        size="stretch"
                        minWidth={200}
                        maxWidth={2500}
                        minHeight={300}
                        maxHeight={2000}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        ref={flipBookRef}
                        className="flip-book"
                        style={{ margin: '0 auto' }}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={1000}
                        usePortrait={isMobile}
                        startZIndex={0}
                        autoSize={true}
                        clickEventForward={true}
                        useMouseEvents={true}
                        swipeDistance={30}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        onFlip={onFlip}
                    >
                        {pages.map((pageNum) => (
                            <Page key={pageNum} number={pageNum} pdfDoc={pdfDoc} />
                        ))}
                    </HTMLFlipBook>
                )}
            </div>

            {/* Controls */}
            <div style={{
                height: '50px',
                background: 'rgba(20, 20, 20, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                zIndex: 20,
                padding: '0 20px',
                marginBottom: '10px'
            }}>
                {/* Navigation */}
                <button
                    onClick={prevBtn}
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Page Input */}
                <form onSubmit={handlePageSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                        type="text"
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        style={{ width: '40px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: 'white', textAlign: 'center', padding: '4px', fontSize: '0.9rem' }}
                    />
                    <span style={{ color: '#ccc', fontSize: '0.8rem' }}>/ {totalPages}</span>
                </form>

                <button
                    onClick={nextBtn}
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
                >
                    <ChevronRight size={20} />
                </button>

                <div style={{ width: '1px', height: '16px', background: '#444' }} />

                {/* Zoom */}
                <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', display: 'flex' }}>
                    <ZoomOut size={16} />
                </button>
                <button onClick={() => setZoom(1)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem', minWidth: '36px' }}>
                    {Math.round(zoom * 100)}%
                </button>
                <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', display: 'flex' }}>
                    <ZoomIn size={16} />
                </button>

                <div style={{ width: '1px', height: '16px', background: '#444' }} />

                {/* Extras */}
                <button onClick={toggleFullscreen} title="Fullscreen" style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', display: 'flex' }}>
                    <Maximize size={16} />
                </button>
                <a href={url} download target="_blank" rel="noopener noreferrer" title="Download PDF" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
                    <Download size={16} />
                </a>
            </div>

            <style>{`
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .demoPage { box-shadow: 0 0 5px rgba(0,0,0,0.1); }
            `}</style>
        </div>
    )
}
