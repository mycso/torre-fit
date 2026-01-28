import type { ApiResult } from "../http";
import { TorreGenome, TorreOpportunitySearchResponse } from "./types";

export async function safeJson<T>(res: Response): Promise<T> {
    return (await res.json()) as T;
}

export async function fetchGenome(username: string): Promise<ApiResult<TorreGenome>> {
    const res = await fetch(`/api/torre/genome/${encodeURIComponent(username)}`);
    return await safeJson(res);
}

export async function searchOpportunities(keyword: string, size = 10) {
    const res = await fetch('/api/torre/opportunities/search', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ keyword, size }),
    });

    const json = await safeJson<ApiResult<TorreOpportunitySearchResponse>>(res);
    return json;
}

