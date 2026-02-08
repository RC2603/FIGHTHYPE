import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  console.log('=== GET /api/health CHECK ===')
  return NextResponse.json({
    status: 'ok',
    message: 'API is working!',
    timestamp: new Date().toISOString()
  })
}
