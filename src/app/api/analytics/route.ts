import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, label, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'eventType wajib diisi' }, { status: 400 });
    }

    const metric = await prisma.analyticMetric.create({
      data: {
        eventType,
        label: label || undefined,
        metadata: metadata || undefined,
      },
    });

    return NextResponse.json({ success: true, metric });
  } catch (error: any) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
