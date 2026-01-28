import {uniq} from './normalize';

export type Fitscore = {
    score: number;
    matched: string[];
    missingTop: string[];
};

export function scoreFit(userSkills: string[], opportunityTerms: string[]): Fitscore {
    const user = uniq(userSkills).filter(Boolean);
    const opp = uniq(opportunityTerms).filter(Boolean);

    if(user.length === 0 || opp.length === 0) {
        return { score: 0, matched: [], missingTop: opp.slice(0, 10) };
    }

    const userSet = new Set(user);
    const matched = opp.filter((t) => userSet.has(t));

    const denom = Math.min(user.length, opp.length);
    const ratio = denom === 0 ? 0 : matched.length / denom;
    const score = Math.max(0, Math.min(100, Math.round(ratio * 100)));

    const missing = opp.filter((t) => !userSet.has(t));

    return {
        score,
        matched: matched.slice(0, 12),
        missingTop: missing.slice(0, 12),
    };
}