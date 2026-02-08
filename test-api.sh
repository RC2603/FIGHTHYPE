#!/bin/bash

# Test script for the boxing analysis API
# This script helps you test the API endpoint with a video file

echo "=== Boxing Analysis API Test ==="
echo ""

# Check if a file was provided
if [ -z "$1" ]; then
    echo "Usage: ./test-api.sh <path-to-video-file>"
    echo ""
    echo "Example: ./test-api.sh /path/to/boxing-video.mp4"
    exit 1
fi

VIDEO_FILE="$1"

# Check if file exists
if [ ! -f "$VIDEO_FILE" ]; then
    echo "Error: File not found: $VIDEO_FILE"
    exit 1
fi

echo "Testing with file: $VIDEO_FILE"
echo "File size: $(du -h "$VIDEO_FILE" | cut -f1)"
echo ""

# Make the API request
echo "Sending request to API..."
echo ""

curl -X POST http://localhost:3000/api/analyze-boxing \
  -F "video=@$VIDEO_FILE" \
  -H "Accept: application/json" \
  -v

echo ""
echo ""
echo "=== Test Complete ==="
echo "Check the dev server logs for detailed error messages:"
echo "  tail -f /home/z/my-project/dev.log"
