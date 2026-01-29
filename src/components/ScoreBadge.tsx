export function ScoreBadge({ score }: { score: number }) {
    const tone =
        score >= 70 ? 'bg-green-50 text-green-700 border-green-200'
            : score >= 40 ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-zinc-50 text-zinc-700 border-zinc-200';

    return (
        <span className={['inline-flex items-center rounded-full border px-2 py-0.5 text-xs', tone].join(' ')}>
            Fit {score}%
        </span>
    );
}