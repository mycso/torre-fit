'use client';

import { useMemo, useState } from 'react';
import { UsernameForm } from '@/components/UsernameForm';
import { JobSearchForm } from '@/components/JobSearchForm';
import { OpportunityCard } from '@/components/OpportunityCard';
import { FitSummary } from '@/components/FitSummary';
import { Card, CardContent } from '@/components/ui/Card';
import { fetchGenome, searchOpportunities } from '@/lib/torre/client';
import type { TorreGenome, TorreOpportunity } from '@/lib/torre/types';
import { extractOpportunityTerms, extractUserSkills } from '@/lib/fit/extract';
import { scoreFit } from '@/lib/fit/score';

type Scored = {
  opportunity: TorreOpportunity;
  score: number;
  matched: string[];
  missingTop: string[];
};

export default function Home() {
  const [genome, setGenome] = useState<TorreGenome | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [opps, setOpps] = useState<TorreOpportunity[]>([]);
  const [scored, setScored] = useState<Scored[]>([]);

  const [profileLoading, setProfileLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sort, setSort] = useState<'best' | 'newest'>('best');

  async function loadProfile(username: string) {
    setError(null);
    setProfileLoading(true);
    setGenome(null);
    setOpps([]);
    setScored([]);

    const res = await fetchGenome(username.trim());
    setProfileLoading(false);

    if (!res.ok) {
      setError(res.error.message);
      return;
    }

    setGenome(res.data);
    setUserSkills(extractUserSkills(res.data));
  }

  async function runSearch(keyword: string) {
    setError(null);
    setSearchLoading(true);
    setOpps([]);
    setScored([]);

    const res = await searchOpportunities(keyword.trim(), 10);
    setSearchLoading(false);

    if (!res.ok) {
      setError(res.error.message);
      return;
    }

    const results = res.data.results ?? [];
    setOpps(results);

    const scoredResults: Scored[] = results.map((o) => {
      const terms = extractOpportunityTerms(o);
      const s = scoreFit(userSkills, terms);
      return { opportunity: o, score: s.score, matched: s.matched, missingTop: s.missingTop };
    });

    setScored(scoredResults);
  }

  const sorted = useMemo(() => {
    const copy = [...scored];
    if (sort === 'best') return copy.sort((a, b) => b.score - a.score);

    // newest: fall back safely
    return copy.sort((a, b) => {
      const da = a.opportunity.created ? Date.parse(a.opportunity.created) : 0;
      const db = b.opportunity.created ? Date.parse(b.opportunity.created) : 0;
      return db - da;
    });
  }, [scored, sort]);

  const topGaps = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of scored) {
      for (const term of item.missingTop) {
        counts.set(term, (counts.get(term) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count);
  }, [scored]);

  const profileName = genome?.person?.name ?? '';
  const headline = genome?.person?.professionalHeadline ?? '';

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4">
            <UsernameForm onLoad={loadProfile} isLoading={profileLoading} />
            <JobSearchForm 
              onSearch={runSearch}
              isLoading={searchLoading}
              disabled={!genome}
            />

            {error ? (
              <div className='rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
                {error}
              </div>
            ) : null}

            {!genome ? (
              <p className='rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
                Load a Torre username to start. Then search jobs to compute a quick fit score.
              </p>
            ) : null}
          </CardContent>
        </Card>

        {scored.length ? (
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-600">
              Showing <span className="font-medium text-zinc-900">{scored.length}</span> results
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-600">
              Sort
              <select
                className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900"
                value={sort}
                onChange={(e) => setSort(e.target.value as 'best' | 'newest')}
              >
                <option value="best">Best match</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        ) : null}
        
        <div className="space-y-4">
          {searchLoading ? (
            <Card>
              <CardContent className="text-sm text-zinc-600">Searching…</CardContent>
            </Card>
          ) : null}

          {!searchLoading && genome && opps.length === 0 && scored.length === 0 ? (
            <Card>
              <CardContent className="text-sm text-zinc-600">
                Search for a role above to see matched opportunities.
              </CardContent>
            </Card>
          ) : null}

          {sorted.map((item) => (
            <OpportunityCard
              key={item.opportunity.id}
              opportunity={item.opportunity}
              score={item.score}
              matched={item.matched}
              missingTop={item.missingTop}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {genome ? (
          <FitSummary
            profileName={profileName}
            headline={headline}
            userSkills={userSkills}
            topGaps={topGaps}
          />
        ) : (
          <Card>
            <CardContent className="text-sm text-zinc-600">
              Profile summary will appear here after loading a username.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
