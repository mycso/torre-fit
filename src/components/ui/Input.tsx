import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props}: Props) {
    return (
        <input className={['w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm',
        'outline-none focus:border-zinc-400',
        className,].join(' ')}
        {...props}
        />
    )
}