import { NextResponse } from "next/server";
import { err, ok } from '@/lib/http'

type Body = {
    keyword: string;
    size?: number;
};

export async function POST(req: Request) {
    let body: Body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(err('Invalid JSON body'), { status: 400 });
    }

    const keyword = body.keyword?.trim();
    const size = Math.min(Math.max(body.size ?? 10, 1), 20);

    if(!keyword) {
        return NextResponse.json(err('keyword is required'), {status: 400});
    }

    const qs = new URLSearchParams({
        currency: 'USD',
        periodicity: 'hourly',
        lang: 'en',
        size: String(size),
        contextFeature: 'job_feed',
    });

    const url = `https://search.torre.co/opportunities/_search?${qs.toString()}`;

    const torreBody = {
        and: [
            {
                keywords: { term: keyword, locale: 'en' },
            },
            {
                status: { code: 'open' }
            },
        ],
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            body: JSON.stringify(torreBody),
            cache: 'no-cache',
        });

        if (!res.ok) {
            return NextResponse.json(err('Torre opportunity search failed', res.status), {
                status: res.status,
            });
        }
        const data = await res.json();
        return NextResponse.json(ok(data));
    } catch {
        return NextResponse.json(err('Network error contacting Torre'), { status: 502 })
    }
}
