import { describe, expect, it } from 'vitest';
import { normalizeSkillText } from './normalize';
import { scoreFit } from './score';

describe('normalizeSkillText', () => {
  it('normalizes case and punctuation', () => {
    expect(normalizeSkillText('React.js!!! ')).toBe('react.js');
  });

  it('keeps useful tokens like c# and c++', () => {
    expect(normalizeSkillText('C# Developer')).toBe('c# developer');
    expect(normalizeSkillText('C++ Engineer')).toBe('c++ engineer');
  });
});

describe('scoreFit', () => {
  it('returns 0 when empty inputs', () => {
    expect(scoreFit([], ['react']).score).toBe(0);
    expect(scoreFit(['react'], []).score).toBe(0);
  });

  it('scores based on overlap with bounded result', () => {
    const res = scoreFit(['react', 'typescript', 'node.js'], ['react', 'python', 'node.js']);
    expect(res.matched).toEqual(['react', 'node.js']);
    expect(res.score).toBeGreaterThan(0);
    expect(res.score).toBeLessThanOrEqual(100);
  });
});