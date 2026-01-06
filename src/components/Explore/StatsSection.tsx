import React from 'react';

export function StatsSection() {
    return (
        <div className="grid grid-cols-3 gap-8 mt-16 px-8">
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">35+</p>
                <p className="text-sm text-gray-500 font-medium">Top Insurers</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">500+</p>
                <p className="text-sm text-gray-500 font-medium">Policies Compared</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">1M+</p>
                <p className="text-sm text-gray-500 font-medium">Claims Settled</p>
            </div>
        </div>
    );
}
