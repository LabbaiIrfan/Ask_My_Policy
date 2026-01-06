import { FileText, CheckCircle, DollarSign, CreditCard } from 'lucide-react';

export interface City {
    id: string;
    name: string;
    state: string;
}

export interface Hospital {
    name: string;
    address: string;
    specialty: string;
    rating: number;
    distance: string;
    features: string[];
}

export interface ReimburseStep {
    step: number;
    title: string;
    description: string;
    icon: any; // Using any for Lucide icon component
    color: string;
}

export const cities: City[] = [
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi', state: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
    { id: 'pune', name: 'Pune', state: 'Maharashtra' },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' }
];

export const hospitalsByCity: { [key: string]: Hospital[] } = {
    mumbai: [
        {
            name: 'Apollo Hospital, Navi Mumbai',
            address: 'Plot No 13, Sector 23, Sanpada, Navi Mumbai',
            specialty: 'Multi-Specialty',
            rating: 4.8,
            distance: '2.5 km',
            features: ['24/7 Emergency', 'ICU', 'Cardiac Care', 'Oncology']
        },
        {
            name: 'Fortis Hospital, Mulund',
            address: 'Mulund Goregaon Link Road, Mulund West, Mumbai',
            specialty: 'Multi-Specialty',
            rating: 4.7,
            distance: '3.2 km',
            features: ['Trauma Center', 'Neurology', 'Orthopedics', 'Maternity']
        },
        {
            name: 'Lilavati Hospital',
            address: 'A-791, Bandra Reclamation, Bandra West, Mumbai',
            specialty: 'Super Specialty',
            rating: 4.9,
            distance: '4.1 km',
            features: ['Heart Surgery', 'Cancer Care', 'Kidney Transplant', 'Pediatrics']
        }
    ],
    delhi: [
        {
            name: 'Max Super Speciality Hospital',
            address: 'Saket, New Delhi',
            specialty: 'Super Specialty',
            rating: 4.8,
            distance: '1.8 km',
            features: ['Cardiac Surgery', 'Neurology', 'Oncology', 'Emergency']
        },
        {
            name: 'Fortis Escorts Heart Institute',
            address: 'Okhla Road, New Delhi',
            specialty: 'Cardiac Care',
            rating: 4.9,
            distance: '2.3 km',
            features: ['Heart Surgery', 'Cardiac ICU', 'Interventional Cardiology']
        },
        {
            name: 'Apollo Hospital, New Delhi',
            address: 'Sarita Vihar, New Delhi',
            specialty: 'Multi-Specialty',
            rating: 4.7,
            distance: '3.5 km',
            features: ['Multi-Organ Transplant', 'Cancer Care', 'Neurosurgery']
        }
    ]
};

export const reimburseSteps: ReimburseStep[] = [
    {
        step: 1,
        title: 'Treatment & Payment',
        description: 'Get treatment at any hospital and pay bills upfront',
        icon: FileText,
        color: 'blue'
    },
    {
        step: 2,
        title: 'Collect Documents',
        description: 'Gather all original bills, discharge summary, and reports',
        icon: CheckCircle,
        color: 'green'
    },
    {
        step: 3,
        title: 'Submit Claim',
        description: 'Fill claim form and submit within 30 days of discharge',
        icon: DollarSign,
        color: 'orange'
    },
    {
        step: 4,
        title: 'Receive Reimbursement',
        description: 'Get money back in your bank account within 7-15 days',
        icon: CreditCard,
        color: 'purple'
    }
];
