import { Card, CardContent, CardHeader } from "./ui/Card";

export function FitSummary({
    profileName,
    headline,
    userSkills,
    topGaps,
}: {
    profileName: string;
    headline: string;
    userSkills: string[];
    topGaps: Array<{ term: string; count: number }>;
}) {
    return (
        <Card className="sticky top-6">
            <CardHeader>
                <div className="text-sm font-semibold">{profileName || 'Profile loaded'}</div>
                <div className="text-sm text-zinc-600">{headline || '-'}</div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <div className="mb-1 text-xs font-medium text-zinc-700"></div>
                    <div className="flex flex-wrap gap-2">
                        {userSkills.slice(0, 16).map((s) => (
                            <span key={s} className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-800">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-xs font-medium text-zinc-700">
                        Top gaps (derived from results)
                    </div>
                    {topGaps.length ? (
                        <ul className="space-y-1 text-sm">
                            {topGaps.slice(0, 10).map((g) => (
                                <li key={g.term} className="flex items-center justify-between">
                                    <span className="text-zinc-800">{g.term}</span>
                                    <span className="text-xs text-zinc-500">{g.count}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-zinc-500">Search jobs to generate gap suggestions.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}