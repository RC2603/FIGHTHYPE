# FIGHTHYPE AI - Boxing Analysis Tool

A modern, AI-powered boxing analysis web application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

### ✨ AI-Powered Analysis
- **Real Boxing Analysis**: Uses advanced AI to analyze actual video content (not random numbers!)
- **Boxing Content Detection**: Automatically detects if uploaded video contains boxing content
- **Comprehensive Metrics**: 
  - Total strike count
  - Power analysis (average & peak)
  - Strike speed (km/h)
  - Accuracy percentage
  - Overall rating (1-10)

### 🎯 Detailed Insights
- **Training Mode Detection**: Identifies Shadow Boxing, Bag Work, Pad Work, Sparring, etc.
- **Technique Analysis**: Lists specific boxing techniques observed
- **Strengths & Improvements**: AI coaching feedback on what's working and what to improve
- **Footwork & Defense Assessment**: Detailed evaluation of movement and defensive skills

### 🎬 Sleek Video Experience
- **No Buffering**: Optimized for smooth playback
- **Modern UI**: Dark theme with green accents and gradient effects
- **Responsive Design**: Works perfectly on mobile and desktop
- **Real-time Stats Overlay**: HUD-style statistics display over video

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui with Lucide icons
- **AI**: z-ai-web-dev-sdk for video understanding
- **State Management**: React hooks

## Project Structure

```
/home/z/my-project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze-boxing/
│   │   │       └── route.ts          # AI video analysis API
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── page.tsx                  # Main application UI
│   │   └── globals.css               # Global styles
│   └── components/
│       └── ui/                       # shadcn/ui components
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

## Installation

1. **Install dependencies** (already done in this project):
```bash
bun install
```

2. **Run development server** (already running):
```bash
bun run dev
```

3. **Access the application**:
- Open your browser and navigate to the preview panel
- Or click "Open in New Tab" above the preview panel

## Deployment

### Build for Production

```bash
bun run build
```

### Start Production Server

```bash
bun start
```

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

**Vercel is the best platform for this Next.js application** because:
- ✅ Full Next.js 16 support with App Router
- ✅ Serverless functions for API routes
- ✅ Supports large file uploads (100MB+)
- ✅ Free tier with generous limits
- ✅ Zero configuration required
- ✅ Auto-deploy from GitHub

**Step-by-step deployment:**

1. **Push to GitHub**:
```bash
git add -A
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fighthype-ai-boxing.git
git push -u origin main
```

2. **Deploy to Vercel**:
- Go to [vercel.com](https://vercel.com) and sign up
- Click **Add New** → **Project**
- Import your GitHub repository
- Click **Deploy** (Vercel auto-detects Next.js settings)
- Your app will be live in under 2 minutes!

3. **Configure Max Duration** (for 100MB uploads):
- Go to **Settings** → **Functions**
- Set **Max Duration** to `60` seconds or higher

**That's it!** Your app is now live at `https://your-project.vercel.app` 🎉

### Alternative Platforms

- **Netlify**: Also supports Next.js, good alternative
- **Railway**: Great for custom server needs
- **Render**: Free tier available, good for hobby projects

### GitHub Pages?

❌ **Not recommended** - GitHub Pages only supports static sites and cannot run:
- Next.js API routes
- Server-side code
- z-ai-web-dev-sdk (requires server execution)

**Use Vercel instead for full functionality.**

### Detailed Deployment Guide

For comprehensive deployment instructions, troubleshooting, and production setup, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Environment Variables

No environment variables required - the application is ready to use out of the box.

## Usage Guide

### 1. Upload a Video
- Click the upload area or drag & drop a video file
- Supported formats: MP4, MOV, WEBM, AVI
- Maximum file size: 100MB

### 2. AI Processing
- The AI will:
  1. Read and analyze the video
  2. Detect if it contains boxing content
  3. Extract comprehensive metrics
  4. Generate coaching insights

### 3. View Analysis
- **Video Player**: Watch your video with controls
- **HUD Overlay**: Real-time stats on top of video
- **Stats Panel**: Detailed analysis including:
  - Overall rating
  - Key metrics (power, speed, accuracy)
  - Training mode
  - Technique summary
  - Strengths & improvements
  - Footwork & defense assessment

### 4. Non-Boxing Content
If the AI detects non-boxing content, it will:
- Display a warning message
- Show minimal analysis with 0 metrics
- Suggest uploading a boxing training video

## API Endpoints

### POST /api/analyze-boxing

Analyzes a boxing video using AI.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'video' file

**Response:**
```json
{
  "success": true,
  "analysis": {
    "isBoxingContent": true,
    "summary": "Solid boxing performance with good technique",
    "totalStrikes": 75,
    "averagePower": 68,
    "peakPower": 85,
    "speed": 45,
    "accuracy": 78,
    "technique": ["Solid jab", "Good footwork", "Tight guard"],
    "strengths": ["Excellent footwork", "Powerful cross"],
    "improvements": ["Keep guard up", "More head movement"],
    "trainingMode": "Bag Work",
    "intensity": "High",
    "footwork": "Good balance and movement",
    "defense": "Adequate defensive skills",
    "overallRating": 7
  }
}
```

## Performance Optimizations

1. **Video Handling**:
   - Base64 encoding for AI analysis
   - 100MB upload limit (configured in next.config.ts with 200MB buffer)
   - Compression enabled

2. **UI Performance**:
   - React hooks for efficient state management
   - CSS transitions for smooth animations
   - Responsive images and video

3. **AI Processing**:
   - Two-step analysis (detection → full analysis)
   - Efficient prompt engineering
   - Error handling with fallback values

## Troubleshooting

### Video Not Uploading
- Check file size (max 100MB)
- Verify file format (MP4, MOV, WEBM, AVI)
- Ensure browser supports the format

### Analysis Taking Too Long
- Large videos take longer to process
- Consider shorter clips for faster results
- Check network connection

### Non-Boxing Detection
- Ensure video shows clear boxing content
- Good lighting helps AI detection
- Include visible boxing equipment if possible

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is part of the FIGHTHYPE AI platform.

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and AI**
