export type TorreGenome = {
    person?: { name?: string; professionalHeadline?: string }
    strengths?: Array<{ name?: string }>;
};

export type TorreOpportunity = {
    id: string;
    objective?: string,
    slug?: string;
    type?: string;
    organizations?: Array<{ name?: string }>;
    locations?: string[];
    remote?: boolean;
    compensation?: {
        data?: {
            code?: string;
            minAmount?: number;
            maxAmount?: number;
            periodicity?: string;
        };
    };
    created?: string;
};

export type TorreOpportunitySearchResponse = {
    results?: TorreOpportunity[];
};

