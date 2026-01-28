import * as React from 'react';

export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div 
            className={['rounded-lg border border-zinc-200 bg-white shadow-sm', className].join(' ')}
            {...props}
        />
    )
}

export function CardHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={['border-b border-zinc-100 p-4', className].join(' ')} {...props} />
}

export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['p-4', className].join(' ')} {...props} />;
}

