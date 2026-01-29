import { NextResponse } from "next/server";
import { err, ok } from '@/lib/http'

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ username: string }> }
) {
    const { username } = await ctx.params;
    const clean = username?.trim();

    if (!clean) {
        return NextResponse.json(err('Username is required'), { status: 400 });
    }

    const url = `https://torre.ai/api/genome/bios/${encodeURIComponent(username)}`;

    try {
        const res = await fetch(url, {
            headers: { accept: 'application/json' },
            cache: 'no-store',
        })

        if (!res.ok) {
            return NextResponse.json(
                err(`Torre genome request failed`, res.status),
                { status: res.status }
            );
        }
        const data = await res.json();
        return NextResponse.json(ok(data))
    } catch (e) {
        return NextResponse.json(err('Network error contacting Torre'), { status: 502 })
    }
}