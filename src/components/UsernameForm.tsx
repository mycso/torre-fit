'use client';

import { useState } from "react";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function UsernameForm({
    onLoad,
    isLoading,
}: {
    onLoad: (username: string) => void;
    isLoading: boolean;
}) {
    const [username, setUsername] = useState('');

    return (
        <form
            className="flex flex-col gap-2 sm:flex-row sm:items-end"
            onSubmit={(e) => {
                e.preventDefault()
                onLoad(username);
            }}
        >
            <label className="w-full">
                <div className="mb-1 text-xs font-medium text-zinc-700">Torre username</div>
                <Input 
                    placeholder="e.g. michaelsokan"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <Button type="submit" disabled={isLoading || !username.trim()} className="sm:w-40">
                {isLoading ? 'Loading...' : 'Load Profile'}
            </Button>
        </form>
    )
}