import { TorreOpportunity } from "@/lib/torre/types";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { ScoreBadge } from "./ScoreBadge";

export function OpportunityCard({
    opportunity,
    score,
    matched,
    missingTop,
}: {
    opportunity: TorreOpportunity;
    score: number;
    matched: string[];
    missingTop: string[];
}) {
    const org = opportunity.organizations?.[0]?.name ?? 'Unkown Org';
    const title = opportunity.objective ?? 'Untitled role';
    const loc = opportunity.remote ? 'Remote' : (opportunity.locations?.[0] ?? 'Location not specified');

    const jobUrl = opportunity.slug ? `https://torre.ai/post/${opportunity.slug}` : undefined;

    return (
        <Card>
            <CardHeader className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold">{title}</h3>
                        <ScoreBadge score={score} />
                    </div>
                    <p className="text-sm text-zinc-600">{org} • {loc}</p>
                </div>

                {jobUrl ? (
                    <a
                        href={jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-sm text-zinc-600 hover:text-zinc-900"
                    >
                        Open ↗
                    </a>
                ) : null}
            </CardHeader>

            <CardContent className="space-y-3">
                <div>
                    <div className="mb-1 text-xs font-medium text-zinc-700">Matched terms</div>
                    {matched.length ? (
                        <div className="flex flex-wrap gap-2">
                            {matched.map((s) => (
                                <span key={s} className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-800">
                                    {s}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-500">No direct matches found in derived terms.</p>
                    )}
                </div>
                <details className="rounded-md border border-zinc-200 bg-zinc-50 p-3">
                    <summary className="cursor-pointer text-sm font-medium text-zinc-800">
                        Reasoning / gaps
                    </summary>
                    <div className="mt-2 text-sm text-zinc-700">
                        <div className="mb-1 text-xs font-medium text-zinc-700">Missing terms (top)</div>
                        {missingTop.length ? (
                            <div className="flex flex-wrap gap-2">
                                {missingTop.map((s) => (
                                    <span key={s} className="rounded-md bg-white px-2 py-1 text-xs text-zinc-800">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-500">No missing terms.</p>
                        )}
                    </div>
                </details>
            </CardContent>
        </Card>
    )
}