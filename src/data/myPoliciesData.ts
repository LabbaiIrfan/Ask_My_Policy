export interface Policy {
    id: string;
    name: string;
    company: string;
    icon: string;
    policyNumber: string;
    coverage: string;
    premium: string;
    renewalDate: string;
    daysToRenewal: number;
    status: 'active' | 'renewal_due' | 'expired';
    claimsUsed: number;
    claimsLimit: string;
    features: string[];
    rating: number;
    popular: boolean;
}

export const activePolicies: Policy[] = [
    {
        id: '1',
        name: 'HealthGuard Family Pro',
        company: 'Star Health Insurance',
        icon: '🏥',
        policyNumber: 'SH-2024-001234',
        coverage: '₹15,00,000',
        premium: '₹18,500',
        renewalDate: '2024-12-15',
        daysToRenewal: 45,
        status: 'active',
        claimsUsed: 2,
        claimsLimit: 'Unlimited',
        features: ['Cashless Network', 'Pre-Post Hospitalization', 'Maternity'],
        rating: 4.8,
        popular: false
    },
    {
        id: '2',
        name: 'DriveSecure Comprehensive',
        company: 'Bajaj Allianz',
        icon: '🚗',
        policyNumber: 'BA-2024-567890',
        coverage: '₹8,00,000',
        premium: '₹12,800',
        renewalDate: '2024-11-30',
        daysToRenewal: 15,
        status: 'renewal_due',
        claimsUsed: 0,
        claimsLimit: 'No Claim Bonus: 50%',
        features: ['Zero Depreciation', 'Engine Protection', 'Roadside Assistance'],
        rating: 4.7,
        popular: true
    },
    {
        id: '3',
        name: 'SecureLife Term Plus',
        company: 'HDFC Life',
        icon: '🛡️',
        policyNumber: 'HL-2024-112233',
        coverage: '₹1,00,00,000',
        premium: '₹15,600',
        renewalDate: '2025-03-22',
        daysToRenewal: 120,
        status: 'active',
        claimsUsed: 0,
        claimsLimit: 'Term Life Coverage',
        features: ['Tax Benefits', 'Accidental Death Benefit', 'Terminal Illness'],
        rating: 4.9,
        popular: false
    }
];
