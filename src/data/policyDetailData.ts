import { Shield, Heart, Zap } from 'lucide-react';

// --- Interfaces ---

export interface PolicyData {
    name: string;
    company: string;
    coverAmount: string;
    premium: string;
    originalPremium: string;
    discount: string;
    rating: number;
    reviews: number;
    claimsSettled: number;
    badges: string[];
    description: string;
    features: string[];
}

export interface AddOnCategory {
    id: string;
    name: string;
    icon: any; // Using any for Lucide icon component type to avoid complex typing for now
    description: string;
}

export interface AddOn {
    name: string;
    company: string;
    summary: string;
    coverAmount: string;
    price: string;
}

export interface Rider {
    name: string;
    summary: string;
    price: string;
}

export interface Testimonial {
    id: number;
    name: string;
    age: number;
    city: string;
    rating: number;
    verified: boolean;
    claimAmount: string;
    review: string;
    helpful: number;
    date: string;
    hospitalStay: string;
}

// --- Data ---

export const policyData: PolicyData = {
    name: 'HealthCare Premium Plus',
    company: 'Star Health Insurance',
    coverAmount: '₹10,00,000',
    premium: '₹18,500',
    originalPremium: '₹21,700',
    discount: 'Save ₹3,200',
    rating: 4.8,
    reviews: 2847,
    claimsSettled: 89,
    badges: ['Popular', 'Bestseller'],
    description: 'Premium health insurance plan offering comprehensive coverage with extensive benefits, cashless hospitalization, and superior claim settlement experience.',
    features: [
        'Cashless Hospitals - Network of 12,000+ hospitals',
        'Pre & Post Hospitalization - Up to 60 days coverage',
        'Maternity Cover - Comprehensive maternity benefits',
        'No Claim Bonus - Up to 100% premium discount'
    ]
};

export const addOnCategories: AddOnCategory[] = [
    {
        id: 'topup',
        name: 'Top Up',
        icon: Shield,
        description: 'Additional coverage when your base sum insured is exhausted'
    },
    {
        id: 'critical',
        name: 'Critical Illness',
        icon: Heart,
        description: 'Lump sum benefit for specified critical illnesses'
    },
    {
        id: 'supertopup',
        name: 'Super Top Up',
        icon: Zap,
        description: 'Enhanced top-up with lower deductible options'
    }
];

export const addOns: Record<string, AddOn[]> = {
    topup: [
        {
            name: 'Health Guard Top Up',
            company: 'Bajaj Allianz',
            summary: 'Additional coverage when your base policy limit is exhausted. No waiting period for accidents.',
            coverAmount: 'Rs. 5 Lakh',
            price: 'Rs. 2,499'
        },
        {
            name: 'Care Supreme Top Up',
            company: 'Care Health',
            summary: 'Comprehensive top-up plan with worldwide coverage and emergency assistance.',
            coverAmount: 'Rs. 10 Lakh',
            price: 'Rs. 4,999'
        }
    ],
    critical: [
        {
            name: 'Critical Care Shield',
            company: 'HDFC ERGO',
            summary: 'Covers 37 critical illnesses with lump sum benefit. Includes partial benefits for early stages.',
            coverAmount: 'Rs. 4 Lakh',
            price: 'Rs. 1,999'
        },
        {
            name: 'Life Guard Critical',
            company: 'Star Health',
            summary: 'Protection against major critical illnesses with immediate payout and no claim hassles.',
            coverAmount: 'Rs. 6 Lakh',
            price: 'Rs. 2,799'
        }
    ],
    supertopup: [
        {
            name: 'Super Health Guard',
            company: 'Niva Bupa',
            summary: 'Lower deductible super top-up with enhanced benefits and global coverage options.',
            coverAmount: 'Rs. 15 Lakh',
            price: 'Rs. 6,999'
        },
        {
            name: 'Aditya Birla Super Shield',
            company: 'Aditya Birla',
            summary: 'Premium super top-up with no room rent restrictions and unlimited restoration benefit.',
            coverAmount: 'Rs. 20 Lakh',
            price: 'Rs. 8,499'
        }
    ]
};

export const riders: Rider[] = [
    {
        name: 'Maternity Cover Rider',
        summary: 'Comprehensive maternity coverage including normal and cesarean delivery with newborn coverage.',
        price: 'Rs. 999'
    },
    {
        name: 'Personal Accident Rider',
        summary: 'Additional protection against accidental death and permanent disability with 24/7 coverage.',
        price: 'Rs. 599'
    },
    {
        name: 'Daily Cash Rider',
        summary: 'Daily allowance during hospitalization to cover incidental expenses and loss of income.',
        price: 'Rs. 799'
    },
    {
        name: 'OPD Treatment Rider',
        summary: 'Coverage for outpatient department expenses including consultation fees and diagnostic tests.',
        price: 'Rs. 1,299'
    }
];

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        age: 34,
        city: 'Mumbai',
        rating: 5,
        verified: true,
        claimAmount: '₹2.8 Lakh',
        review: 'Excellent experience with Star Health! When my husband was diagnosed with kidney stones, the cashless claim process was incredibly smooth. The hospital coordinators handled everything, and we didn\'t have to pay a single rupee upfront. The policy covered all expenses including post-operative care.',
        helpful: 89,
        date: '2 months ago',
        hospitalStay: '7 days'
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        age: 42,
        city: 'Delhi',
        rating: 5,
        verified: true,
        claimAmount: '₹4.2 Lakh',
        review: 'Had to undergo emergency cardiac surgery last year. Star Health\'s claim settlement was faster than expected - got approval within 4 hours of admission. The coverage was comprehensive, including ICU charges, medicines, and even ambulance costs. Highly recommend this policy!',
        helpful: 156,
        date: '4 months ago',
        hospitalStay: '12 days'
    },
    {
        id: 3,
        name: 'Meera Patel',
        age: 29,
        city: 'Bangalore',
        rating: 4,
        verified: true,
        claimAmount: '₹1.5 Lakh',
        review: 'Great policy for maternity coverage! The waiting period was clearly explained, and when the time came, all my delivery expenses were covered including newborn care. The only minor issue was some paperwork delays, but overall very satisfied with the service.',
        helpful: 67,
        date: '6 months ago',
        hospitalStay: '4 days'
    },
    {
        id: 4,
        name: 'Amit Singh',
        age: 38,
        city: 'Pune',
        rating: 5,
        verified: true,
        claimAmount: '₹3.1 Lakh',
        review: 'My father needed cataract surgery in both eyes. The pre-authorization was approved instantly through their app. The day-care procedure was completely cashless, and even the follow-up consultations were covered. Excellent customer service throughout!',
        helpful: 124,
        date: '3 months ago',
        hospitalStay: 'Day care'
    },
    {
        id: 5,
        name: 'Sneha Reddy',
        age: 31,
        city: 'Hyderabad',
        rating: 4,
        verified: true,
        claimAmount: '₹95,000',
        review: 'Used this policy for my thyroid surgery. The claim process was transparent and all communication was prompt. They even covered my pre and post hospitalization expenses which other insurers often reject. Very professional team and fair claim assessments.',
        helpful: 78,
        date: '8 months ago',
        hospitalStay: '3 days'
    }
];
