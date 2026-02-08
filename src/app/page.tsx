'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, RotateCcw, Volume2, VolumeX, Activity, Trophy, Target, Zap, Eye } from 'lucide-react'

interface BoxingAnalysis {
  isBoxingContent: boolean
  summary: string
  totalStrikes: number
  averagePower: number
  peakPower: number
  speed: number
  accuracy: number
  technique: string[]
  strengths: string[]
  improvements: string[]
  trainingMode: string
  intensity: string
  footwork: string
  defense: string
  overallRating: number
}

export default function BoxingAnalysisApp() {
  const [view, setView] = useState<'upload' | 'processing' | 'analysis'>('upload')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [progress, setProgress] = useState(0)
  const [processingStatus, setProcessingStatus] = useState('')
  const [analysis, setAnalysis] = useState<BoxingAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  const handleFileSelect = (file: File) => {
    setError(null)
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v', 'video/avi']

    if (!validTypes.some(type => file.type === type || file.name.endsWith('.mov') || file.name.endsWith('.m4v'))) {
      setError('Please upload MP4, MOV, WEBM, or AVI format')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Max 5MB')
      return
    }

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }

    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoUrl(url)
    startProcessing(file, url)
  }

  const startProcessing = async (file: File, url: string) => {
    setView('processing')
    setProgress(0)
    setProcessingStatus('Initializing AI engine...')

    const statuses = [
      'Reading video data...',
      'Extracting frames for analysis...',
      'Detecting boxing content...',
      'Analyzing strike patterns...',
      'Calculating power metrics...',
      'Evaluating technique...',
      'Generating insights...'
    ]

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        const newProgress = prev + 2
        const statusIndex = Math.floor((newProgress / 100) * statuses.length)
        setProcessingStatus(statuses[statusIndex] || 'Processing...')
        return newProgress
      })
    }, 100)

    try {
      console.log('Starting fetch to /api/analyze-boxing...')
      console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type)

      const formData = new FormData()
      formData.append('video', file)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

      const response = await fetch('/api/analyze-boxing', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('Response received:', response.status, response.statusText)

      if (!response.ok) {
        console.error('Response not OK:', response.status)
        const errorData = await response.json().catch(() => {
          console.error('Failed to parse error JSON')
          return { error: 'Unknown error' }
        })
        console.error('Error data:', errorData)
        const errorMessage = errorData.error || 'Analysis failed'
        const errorDetails = errorData.details ? `\nDetails: ${errorData.details}` : ''
        throw new Error(`${errorMessage}${errorDetails}`)
      }

      const data = await response.json()
      console.log('Success! Response data:', data)
      setAnalysis(data.analysis)
      setProgress(100)
      setProcessingStatus('Complete!')

      setTimeout(() => {
        clearInterval(interval)
        setView('analysis')
      }, 500)
    } catch (err) {
      clearInterval(interval)
      let errorMessage = 'Analysis failed'

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again with a smaller video file.'
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else {
          errorMessage = err.message
        }
      }

      console.error('Frontend error:', errorMessage)
      console.error('Full error object:', err)
      setError(errorMessage)
      setView('upload')
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const resetApp = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsPlaying(false)
    setVideoFile(null)
    setVideoUrl(null)
    setAnalysis(null)
    setError(null)
    setView('upload')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🥊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                FIGHTHYPE
              </h1>
              <p className="text-xs text-gray-400 tracking-wider">AI BOXING ANALYSIS</p>
            </div>
          </div>
          {view !== 'upload' && (
            <button
              onClick={resetApp}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              New Session
            </button>
          )}
        </div>
      </header>

      <main className="pt-16 min-h-screen">
        {error && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[90%] px-6 py-4 bg-red-500/90 backdrop-blur-sm rounded-lg text-white font-medium animate-in slide-in-from-top shadow-lg">
            <div className="font-bold mb-1">⚠️ Analysis Failed</div>
            <div className="text-sm whitespace-pre-wrap">{error}</div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-xs underline opacity-75 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Upload View */}
        {view === 'upload' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Analyze Your Boxing
              </h2>
              <p className="text-gray-400 text-lg">
                Upload your training video and get AI-powered insights
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Zap, label: 'Power Analysis', desc: 'Measure strike power' },
                { icon: Target, label: 'Strike Tracking', desc: 'Count every punch' },
                { icon: Activity, label: 'Performance Stats', desc: 'Detailed analytics' },
                { icon: Eye, label: 'AI Coaching', desc: 'Technique insights' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-green-500/50 transition-all duration-300 group"
                >
                  <feature.icon className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm mb-1">{feature.label}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm,video/avi"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(file)
                }}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.add('border-green-500', 'bg-green-500/5')
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('border-green-500', 'bg-green-500/5')
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('border-green-500', 'bg-green-500/5')
                  const file = e.dataTransfer.files[0]
                  if (file) handleFileSelect(file)
                }}
                className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center cursor-pointer hover:border-green-500 transition-all duration-300 group"
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-600 group-hover:text-green-400 transition-colors" />
                <h3 className="text-xl font-semibold mb-2">Upload Your Training Video</h3>
                <p className="text-gray-400 mb-4">
                  Drag & drop or click to select
                </p>
                <p className="text-sm text-gray-500">
                  MP4, MOV, WEBM, AVI • Max 5MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Processing View */}
        {view === 'processing' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="w-24 h-24 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-8" />
            <h2 className="text-2xl font-bold mb-2">AI Analysis in Progress</h2>
            <p className="text-gray-400 mb-8">{processingStatus}</p>
            <div className="w-full max-w-md">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">{progress}%</p>
            </div>
          </div>
        )}

        {/* Analysis View */}
        {view === 'analysis' && videoUrl && analysis && (
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
            {/* Video Section */}
            <div className="lg:flex-1 p-4 lg:p-6">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full aspect-video object-contain"
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-1" />}
                    </button>
                    <button
                      onClick={restartVideo}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* HUD Overlay */}
                {showStats && (
                  <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Total Strikes</div>
                      <div className="text-2xl font-bold text-green-400">{analysis.totalStrikes}</div>
                    </div>
                    <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Power</div>
                      <div className="text-2xl font-bold text-green-400">{analysis.peakPower}%</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Non-Boxing Content Warning */}
              {!analysis.isBoxingContent && (
                <div className="mt-4 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl">🥊</div>
                <div>
                <h3 className="text-red-400 font-bold mb-2">Not a Boxing Video</h3>
                <p className="text-red-300 text-sm mb-3">
                {analysis.summary || 'This video does not contain boxing or martial arts content.'}
              </p>
                <p className="text-gray-400 text-xs">
          Please upload a boxing training video (bag work, sparring, pad work, or shadow boxing) for AI analysis.
        </p>
      </div>
    </div>
  </div>
)}
</div>

      {/* Stats Panel - Only show if boxing content */}
      {analysis.isBoxingContent && (
  <div className="lg:w-96 bg-gray-900/50 border-l border-gray-800 p-4 lg:p-6 overflow-y-auto max-h-[50vh] lg:max-h-none">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Combat Analysis</h3>
                <p className="text-sm text-gray-400">AI-powered insights</p>
              </div>

              {/* Rating Card */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-6 text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">{analysis.overallRating}/10</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Overall Rating</div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Power</div>
                  <div className="text-2xl font-bold">{analysis.averagePower}%</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Speed</div>
                  <div className="text-2xl font-bold">{analysis.speed} km/h</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Accuracy</div>
                  <div className="text-2xl font-bold">{analysis.accuracy}%</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Intensity</div>
                  <div className="text-lg font-bold">{analysis.intensity}</div>
                </div>
              </div>

              {/* Training Mode */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Detected Training Mode</h4>
                <div className="bg-gray-800/50 rounded-xl px-4 py-3">
                  <span className="text-lg font-semibold capitalize">{analysis.trainingMode}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Summary</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{analysis.summary}</p>
              </div>

              {/* Technique */}
              {analysis.technique.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Technique Observed</h4>
                  <ul className="space-y-2">
                    {analysis.technique.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Trophy className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {analysis.improvements.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {analysis.improvements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-yellow-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Stats */}
              <div className="grid gap-3">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Footwork</div>
                  <div className="text-sm font-semibold">{analysis.footwork}</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Defense</div>
                  <div className="text-sm font-semibold">{analysis.defense}</div>
                </div>
              </div>
            </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
