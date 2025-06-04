import React from 'react';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
    return (
        <div className="max-w-[50rem] mx-auto">
            <h2 className=" p-6 text-3xl font-bold">{title}</h2>
            {children}
        </div>
    );
}
