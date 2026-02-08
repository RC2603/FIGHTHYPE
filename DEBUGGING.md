# Debugging Guide - Boxing Analysis API

## Issue: Analysis Fails at 96%

If you're seeing "Analysis failed" at 96%, follow these steps to debug:

### Step 1: Check Server Logs

The server now has detailed logging. Run this command to see what's happening:

```bash
tail -f /home/z/my-project/dev.log
```

Then try uploading your video again. You'll see detailed logs like:
- `=== Starting video analysis ===`
- `File received: filename.mp4, size: 12345678, type: video/mp4`
- `Converting video to base64...`
- `Base64 conversion complete, length: 123456789`
- `Step 1: Starting content detection...`
- `Detection response received`
- `Step 2: Starting full boxing analysis...`
- `Sending analysis request to AI...`

If there's an error, you'll see:
- `=== Analysis error ===`
- `Error type: [Error type]`
- `Error message: [Detailed message]`
- `Error stack: [Stack trace]`

### Step 2: Common Issues & Solutions

#### Issue 1: File Too Large for Base64 Encoding

**Symptoms:**
- Error about memory or base64 conversion
- Error message mentions "buffer" or "encoding"

**Solution:**
Try with a smaller video file (under 50MB for testing). The API supports up to 200MB, but base64 encoding large files can be memory-intensive.

#### Issue 2: Video Format Not Supported

**Symptoms:**
- Error about video format
- SDK returns "unsupported format" or similar

**Solution:**
Ensure your video is in one of these formats:
- MP4 (recommended)
- MOV
- WEBM
- AVI

Convert your video to MP4 if needed:
```bash
# Using ffmpeg
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

#### Issue 3: AI SDK Not Responding

**Symptoms:**
- Timeout errors
- "Network" or "fetch" errors
- "ZAI" or "SDK" related errors

**Solution:**
This might be a temporary issue with the AI service. Try:
1. Wait a few minutes and try again
2. Use a different video file
3. Check if the video is accessible and not corrupted

#### Issue 4: Video URL Too Long

**Symptoms:**
- Error about "URL too long"
- Base64 string length errors

**Solution:**
The base64-encoded video URL might be too long for the SDK. This is a limitation of the current implementation.

**Workaround:** Use shorter videos (under 30 seconds) for now.

### Step 3: Test with a Simple Video

Create a very short test video (5-10 seconds) and try uploading it:
- Small file size (< 10MB)
- Short duration
- Clear boxing content

This helps isolate if the issue is with:
- The video file itself
- The file size
- The video duration
- The AI service

### Step 4: Check Browser Console

Open your browser's developer tools (F12) and check the:
1. **Console tab** - Look for JavaScript errors
2. **Network tab** - Check the `/api/analyze-boxing` request:
   - Status code (should be 200)
   - Response payload
   - Request timing

### Step 5: Test API Directly (Optional)

You can test the API endpoint directly using curl:

```bash
curl -X POST http://localhost:3000/api/analyze-boxing \
  -F "video=@/path/to/your/video.mp4" \
  -H "Accept: application/json" \
  -v
```

This bypasses the frontend and shows you the raw API response.

### Step 6: Check Video File

Make sure your video:
1. **Is not corrupted** - Play it in a video player first
2. **Has proper MIME type** - Should be `video/mp4`, `video/quicktime`, etc.
3. **Is readable** - File permissions should allow reading
4. **Contains actual content** - Not 0 bytes or empty

### Step 7: What Information to Collect

If the issue persists, collect this information:

1. **Server logs:**
   ```bash
   tail -100 /home/z/my-project/dev.log > server-logs.txt
   ```

2. **Video file info:**
   ```bash
   ffprobe your-video.mp4
   ```
   Or at minimum:
   ```bash
   ls -lh your-video.mp4
   file your-video.mp4
   ```

3. **Browser console errors** - Screenshot or copy text

4. **Network request details** - Screenshot of Network tab showing the failed request

### Temporary Workaround

If you need to test the UI while debugging the AI:

Comment out or modify the AI analysis in the API to return mock data:

```typescript
// In src/app/api/analyze-boxing/route.ts
// After line 81, add:
console.log('Using mock data for testing...')
const mockAnalysis = {
  isBoxingContent: true,
  summary: 'Mock analysis for testing UI',
  totalStrikes: 75,
  averagePower: 68,
  peakPower: 85,
  speed: 45,
  accuracy: 78,
  technique: ['Solid jab', 'Good footwork', 'Tight guard'],
  strengths: ['Excellent footwork', 'Powerful cross'],
  improvements: ['Keep guard up', 'More head movement'],
  trainingMode: 'Bag Work',
  intensity: 'High',
  footwork: 'Good balance and movement',
  defense: 'Adequate defensive skills',
  overallRating: 7
}

return NextResponse.json({
  success: true,
  analysis: mockAnalysis
})
```

This will allow you to test the UI without the AI analysis.

### Getting Help

If you're still stuck, provide:
1. The exact error message
2. Server logs from `/home/z/my-project/dev.log`
3. Video file details (size, format, duration)
4. Browser console errors

### Expected Behavior

When everything works correctly, you should see:

1. **Frontend:**
   - Progress bar goes from 0% to 100%
   - Status messages update: "Initializing AI engine..." → "Reading video data..." → ... → "Complete!"
   - Transitions to analysis view
   - Shows video with stats

2. **Server logs:**
   ```
   === Starting video analysis ===
   File received: video.mp4, size: 12345678, type: video/mp4
   Converting video to base64...
   Base64 conversion complete, length: 123456789
   ZAI instance obtained
   Step 1: Starting content detection...
   Detection response received
   Content detection result: YES, isBoxingContent: true
   Step 2: Starting full boxing analysis...
   Sending analysis request to AI...
   Analysis response received
   Analysis text length: 1234
   Analysis text preview: [First 200 chars of AI response]
   === Analysis completed successfully ===
   Final analysis: { ... }
   ```

### Quick Test Checklist

- [ ] Check server logs for errors
- [ ] Try with a smaller video file
- [ ] Try with a shorter video (under 30 seconds)
- [ ] Verify video format is MP4/MOV/WEBM/AVI
- [ ] Check browser console for errors
- [ ] Test with a different video file
- [ ] Ensure video plays in a regular player
- [ ] Check file permissions and size

---

**Remember:** The detailed logging is now active, so the server logs will tell you exactly where the issue is occurring.
