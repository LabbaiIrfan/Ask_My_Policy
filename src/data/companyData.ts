export interface FinancialMetric {
    value: number;
    change: number;
    trend: 'up' | 'down';
}

export interface RecentNews {
    title: string;
    date: string;
    type: 'success' | 'info';
}

export interface PerformanceData {
    year: string;
    profit: number;
    premium: number;
    claims: number;
}

export interface Company {
    id: string;
    name: string;
    logo: string;
    rating: number;
    established: string;
    marketShare: string;
    claimSettlementRatio: number;
    solvencyRatio: number;
    networkHospitals: number;
    activePolicies: number;
    overview: string;
    financialMetrics: {
        profitAfterTax: FinancialMetric;
        totalPremium: FinancialMetric;
        claimsRatio: FinancialMetric;
        expenseRatio: FinancialMetric;
    };
    strengths: string[];
    recentNews: RecentNews[];
    performanceData: PerformanceData[];
}

export const companies: Company[] = [
    {
        id: 'bajaj',
        name: 'Bajaj Allianz',
        logo: '🏢',
        rating: 4.5,
        established: '2001',
        marketShare: '8.2%',
        claimSettlementRatio: 94.8,
        solvencyRatio: 2.31,
        networkHospitals: 10000,
        activePolicies: 1200000,
        overview: 'Bajaj Allianz is one of India\'s leading private general insurance companies, offering comprehensive health insurance solutions with a strong focus on innovation and customer satisfaction.',
        financialMetrics: {
            profitAfterTax: { value: 1245, change: 12.5, trend: 'up' },
            totalPremium: { value: 12450, change: 15.2, trend: 'up' },
            claimsRatio: { value: 72.5, change: -2.1, trend: 'down' },
            expenseRatio: { value: 26.8, change: -1.5, trend: 'down' }
        },
        strengths: [
            'Wide network of cashless hospitals',
            'Quick claim settlement process',
            'Innovative digital solutions',
            'Strong financial stability'
        ],
        recentNews: [
            { title: 'Launched AI-powered claim processing', date: '2 weeks ago', type: 'success' },
            { title: 'Partnership with 500+ new hospitals', date: '1 month ago', type: 'info' },
            { title: 'Award for Best Health Insurance Provider', date: '2 months ago', type: 'success' }
        ],
        performanceData: [
            { year: '2020', profit: 890, premium: 9800, claims: 75.2 },
            { year: '2021', profit: 1020, premium: 10500, claims: 74.8 },
            { year: '2022', profit: 1110, premium: 11200, claims: 73.5 },
            { year: '2023', profit: 1245, premium: 12450, claims: 72.5 }
        ]
    },
    {
        id: 'hdfc',
        name: 'HDFC ERGO',
        logo: '🏛️',
        rating: 4.6,
        established: '2002',
        marketShare: '9.5%',
        claimSettlementRatio: 96.2,
        solvencyRatio: 2.45,
        networkHospitals: 12000,
        activePolicies: 1500000,
        overview: 'HDFC ERGO Health Insurance is known for its customer-centric approach and comprehensive coverage options, backed by strong financial credentials and a wide service network.',
        financialMetrics: {
            profitAfterTax: { value: 1580, change: 18.3, trend: 'up' },
            totalPremium: { value: 15200, change: 16.8, trend: 'up' },
            claimsRatio: { value: 70.2, change: -3.2, trend: 'down' },
            expenseRatio: { value: 25.5, change: -2.0, trend: 'down' }
        },
        strengths: [
            'Highest claim settlement ratio',
            'Excellent customer service',
            'Comprehensive policy coverage',
            'Digital-first approach'
        ],
        recentNews: [
            { title: 'Expanded telemedicine services', date: '1 week ago', type: 'info' },
            { title: 'Record claim settlement ratio achieved', date: '3 weeks ago', type: 'success' },
            { title: 'New wellness program launched', date: '1 month ago', type: 'info' }
        ],
        performanceData: [
            { year: '2020', profit: 1150, premium: 11800, claims: 73.5 },
            { year: '2021', profit: 1280, premium: 13000, claims: 72.1 },
            { year: '2022', profit: 1420, premium: 14200, claims: 71.0 },
            { year: '2023', profit: 1580, premium: 15200, claims: 70.2 }
        ]
    },
    {
        id: 'star',
        name: 'Star Health Insurance',
        logo: '⭐',
        rating: 4.4,
        established: '2006',
        marketShare: '7.8%',
        claimSettlementRatio: 92.5,
        solvencyRatio: 2.18,
        networkHospitals: 9500,
        activePolicies: 950000,
        overview: 'Star Health Insurance is India\'s first standalone health insurance company, specializing exclusively in health insurance with a strong focus on preventive healthcare.',
        financialMetrics: {
            profitAfterTax: { value: 980, change: 10.8, trend: 'up' },
            totalPremium: { value: 10800, change: 12.5, trend: 'up' },
            claimsRatio: { value: 74.8, change: -1.8, trend: 'down' },
            expenseRatio: { value: 27.2, change: -0.8, trend: 'down' }
        },
        strengths: [
            'Specialized health insurance focus',
            'Comprehensive preventive care',
            'Wide policy portfolio',
            'Strong regional presence'
        ],
        recentNews: [
            { title: 'IPO successfully launched', date: '2 weeks ago', type: 'success' },
            { title: 'Introduced family floater plans', date: '3 weeks ago', type: 'info' },
            { title: 'Expanded to tier-3 cities', date: '1 month ago', type: 'info' }
        ],
        performanceData: [
            { year: '2020', profit: 750, premium: 8500, claims: 76.5 },
            { year: '2021', profit: 850, premium: 9200, claims: 75.8 },
            { year: '2022', profit: 920, premium: 10000, claims: 75.2 },
            { year: '2023', profit: 980, premium: 10800, claims: 74.8 }
        ]
    },
    {
        id: 'care',
        name: 'Care Health Insurance',
        logo: '💚',
        rating: 4.3,
        established: '2012',
        marketShare: '6.5%',
        claimSettlementRatio: 91.8,
        solvencyRatio: 2.05,
        networkHospitals: 8500,
        activePolicies: 850000,
        overview: 'Care Health Insurance provides innovative health insurance solutions with a focus on affordability and accessibility, making quality healthcare coverage available to all segments.',
        financialMetrics: {
            profitAfterTax: { value: 720, change: 14.2, trend: 'up' },
            totalPremium: { value: 8900, change: 13.8, trend: 'up' },
            claimsRatio: { value: 76.2, change: -2.5, trend: 'down' },
            expenseRatio: { value: 28.5, change: -1.2, trend: 'down' }
        },
        strengths: [
            'Affordable premium options',
            'Innovative product offerings',
            'Strong digital presence',
            'Customer-friendly policies'
        ],
        recentNews: [
            { title: 'Launched mobile health screening', date: '1 week ago', type: 'info' },
            { title: 'Partnership with fitness apps', date: '2 weeks ago', type: 'success' },
            { title: 'New senior citizen plans', date: '3 weeks ago', type: 'info' }
        ],
        performanceData: [
            { year: '2020', profit: 520, premium: 7000, claims: 78.5 },
            { year: '2021', profit: 610, premium: 7800, claims: 77.8 },
            { year: '2022', profit: 680, premium: 8400, claims: 77.0 },
            { year: '2023', profit: 720, premium: 8900, claims: 76.2 }
        ]
    },
    {
        id: 'niva',
        name: 'Niva Bupa',
        logo: '🔵',
        rating: 4.5,
        established: '2008',
        marketShare: '7.2%',
        claimSettlementRatio: 95.5,
        solvencyRatio: 2.38,
        networkHospitals: 11000,
        activePolicies: 1100000,
        overview: 'Niva Bupa Health Insurance offers comprehensive health insurance solutions with international standards, backed by Bupa\'s global healthcare expertise.',
        financialMetrics: {
            profitAfterTax: { value: 1120, change: 16.5, trend: 'up' },
            totalPremium: { value: 11500, change: 14.8, trend: 'up' },
            claimsRatio: { value: 71.8, change: -2.8, trend: 'down' },
            expenseRatio: { value: 26.2, change: -1.8, trend: 'down' }
        },
        strengths: [
            'International quality standards',
            'Excellent claim settlement',
            'Comprehensive wellness programs',
            'Premium service quality'
        ],
        recentNews: [
            { title: 'Enhanced global coverage options', date: '1 week ago', type: 'success' },
            { title: 'Digital health records integration', date: '2 weeks ago', type: 'info' },
            { title: 'Award for innovation in health tech', date: '1 month ago', type: 'success' }
        ],
        performanceData: [
            { year: '2020', profit: 820, premium: 9000, claims: 74.2 },
            { year: '2021', profit: 940, premium: 9800, claims: 73.5 },
            { year: '2022', profit: 1050, premium: 10800, claims: 72.5 },
            { year: '2023', profit: 1120, premium: 11500, claims: 71.8 }
        ]
    }
];
