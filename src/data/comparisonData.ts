import { Calendar, Bed, Zap, Baby, Clock, Ambulance, Stethoscope } from 'lucide-react';

// --- Helper Types ---
export interface PolicyInfo {
    id: string;
    name: string;
    company: string;
    icon: string;
}

export interface ApiPolicyFeatures {
    preHospitalizationDays: number;
    postHospitalizationDays: number;
    sumInsuredRestoration: boolean;
    waitingPeriodInitialDays: number;
    waitingPeriodPEDMonths: number;
    advancedTreatmentsCovered: boolean;
    discountsAvailable: boolean;
    maternityCover: boolean;
    specialCovers: string[];
    roomRentCover: string;
    dayCareCover: boolean;
    ambulanceCover: boolean;
    optionalBenefits: string[];
}

export type ComparisonData = Record<string, ApiPolicyFeatures>;

// --- Helper Functions ---
export const getInsurerIcon = (insurer: string) => {
    if (insurer.includes('Aditya Birla')) return '🌞';
    if (insurer.includes('Star')) return '⭐';
    if (insurer.includes('Bajaj')) return '🛡️';
    if (insurer.includes('ICICI')) return '🏦';
    if (insurer.includes('Niva Bupa')) return '❤️';
    if (insurer.includes('Care')) return '💚';
    return '📄';
};

// --- Data Constants ---
export const RAW_POLICIES = [
    { policy_name: "Activ One", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Super Health Plus Top Up", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Fit", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Health", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Arogya Sanjeevani Policy", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Ekam Suraksha", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Assure", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Super Star", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Diabetes Safe Insurance Policy", insurer: "Star Health and Allied Insurance Co. Ltd." },
    { policy_name: "Medi Classic Insurance Policy – Individual", insurer: "Star Health and Allied Insurance Co. Ltd." },
    { policy_name: "Star Health Assure Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Star Comprehensive Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Young Star Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Health Guard", insurer: "Bajaj Allianz General Insurance Company Limited" },
    { policy_name: "My Health Care Plan (Plan 1)", insurer: "Bajaj General Insurance Limited" },
    { policy_name: "Elevate", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Smart Janta Personal Accident Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "MashaK (Mosquito) Rakshak Policy", insurer: "ICICI Lombard GIC Limited" },
    { policy_name: "Women’s Cancer Shield", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Saral Suraksha Bima", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Health Shield 360 Retail", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Hospifund Insurance", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Income Protect", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Rashtriya Swasthya Bima Yojana", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Personal Care Insurance Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Personal Protect", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Healthcare Plus Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Rise", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Aspire", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Heart Beat", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "ReAssure 3.0", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "GoActive", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Aapke Liye-Uttar Pradesh", insurer: "Bajaj Allianz General Insurance Co. Ltd" },
    { policy_name: "Care Advantage", insurer: "Care Health Insurance Limited" }
];

// --- Feature Definitions ---
export const featureDefinitions = {
    'Pre/Post Hospitalization': {
        description: 'Coverage for medical expenses before admission and after discharge.',
        icon: Calendar,
        tip: 'Longer periods mean better coverage for related expenses.',
        formatter: (p: ApiPolicyFeatures) => `${p.preHospitalizationDays} / ${p.postHospitalizationDays} days`,
    },
    'Room Rent Limit': {
        description: 'The maximum amount your insurer will pay for your hospital room per day.',
        icon: Bed,
        tip: '"No Limit" or specific room types offer more flexibility.',
        formatter: (p: ApiPolicyFeatures) => p.roomRentCover,
    },
    'Sum Insured Restoration': {
        description: 'Benefit that restores your sum insured after it has been exhausted.',
        icon: Zap,
        tip: '100% restoration provides a safety net for multiple claims in a year.',
        formatter: (p: ApiPolicyFeatures) => p.sumInsuredRestoration ? 'Yes' : 'No',
    },
    'Maternity Cover': {
        description: 'Coverage for pregnancy-related expenses.',
        icon: Baby,
        tip: 'Crucial for family planning, but usually has a waiting period.',
        formatter: (p: ApiPolicyFeatures) => p.maternityCover ? 'Yes' : 'No',
    },
    'Day Care Procedures': {
        description: 'Medical procedures that don\'t require 24-hour hospitalization.',
        icon: Clock,
        tip: 'Comprehensive plans cover all day care procedures.',
        formatter: (p: ApiPolicyFeatures) => p.dayCareCover ? 'All Covered' : 'Not Covered',
    },
    'Ambulance Cover': {
        description: 'Coverage for emergency ambulance charges.',
        icon: Ambulance,
        tip: 'Higher limits are better for emergencies.',
        formatter: (p: ApiPolicyFeatures) => p.ambulanceCover ? 'Yes' : 'No',
    },
    'PED Waiting Period': {
        description: 'The duration you must wait before the policy covers pre-existing diseases.',
        icon: Stethoscope,
        tip: 'A shorter waiting period is highly desirable.',
        formatter: (p: ApiPolicyFeatures) => `${p.waitingPeriodPEDMonths} months`,
    },
};
