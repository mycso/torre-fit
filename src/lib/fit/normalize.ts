export function normalizeSkillText(input: string): string {
    return input.toLowerCase()
    .replace(/[^a-z0-9\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function uniq<T>(arr: T[]): T[] {
    return Array.from(new Set(arr))
}