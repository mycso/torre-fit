'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function JobSearchForm({
    onSearch,
    isLoading,
    disabled,
}: {
    onSearch: (keyword: string) => void;
    isLoading: boolean;
    disabled: boolean;
}) {
    const [keyword, setKeyword] = useState('');

    return (
        <form
            className='flex flex-col gap-2 sm:flex-row sm:items-end'
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(keyword);
            }}
        >
            <label className="w-full">
                <div className="mb-1 text-xs font-medium text-zinc-700">Job keyword</div>
                <Input
                    placeholder="e.g. Frontend, React, Product Designer"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    disabled={disabled}
                />
            </label>

            <Button
                type="submit"
                disabled={disabled || isLoading || !keyword.trim()}
                className="sm:w-40"
            >
                {isLoading ? 'Searching…' : 'Search jobs'}
            </Button>
        </form>
    )
}