import type { TorreGenome, TorreOpportunity } from "../torre/types";
import { normalizeSkillText, uniq } from "./normalize";

export function extractUserSkills(genome: TorreGenome): string[] {
    const strengths = genome.strengths ?? [];
    const skills = strengths
    .map((s) => s.name ?? '')
    .map(normalizeSkillText)
    .filter(Boolean);

    return uniq(skills)
}

export function extractOpportunityTerms(opp: TorreOpportunity): string[] {
    const raw = [
        opp.objective ?? '',
        ...(opp.organizations ?? []).map((o) => o.name ?? ''),
        ...(opp.locations ?? []),
        opp.type ?? '',
    ];

    const terms = raw
    .join(' ')
    .split(/\s+/)
    .map(normalizeSkillText)
    .filter(Boolean);

    return uniq(terms).filter((t) => t.length >= 3);
}