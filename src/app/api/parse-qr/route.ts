import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { payload } = await request.json();

        if (!payload) {
            return NextResponse.json({ error: 'QR payload is required' }, { status: 400 });
        }

        const response = await fetch('https://b2u-qr-worker.qr4pos.workers.dev/parse', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.QR_WORKER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload })
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error: 'Failed to parse QR code', details: error }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
