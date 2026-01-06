
export interface ProfileData {
    personal: {
        age: string;
        gender: string;
        maritalStatus: string;
        dependents: string;
        location: string;
        occupation: string;
    };
    financial: {
        annualIncome: string;
        netWorth: string;
        existingDebt: string;
    };
    lifestyle: {
        smokingHabits: string;
        drinkingHabits: string;
        highRiskHobbies: string[];
    };
    health: {
        medicalHistory: string[];
        familyMedicalHistory: string[];
        currentMedications: string;
        currentConditions: string[];
    };
    policyPreferences: {
        desiredPolicyTypes: string[];
        coverageAmount: string;
        premiumBudget: string;
        preferredDeductible: string;
    };
}

export const highRiskHobbies = [
    'Rock Climbing', 'Skydiving', 'Motorcycling', 'Scuba Diving',
    'Mountaineering', 'Racing', 'Martial Arts', 'Extreme Sports'
];

export const commonConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Depression',
    'Anxiety', 'Arthritis', 'Cancer', 'Allergies', 'Thyroid Issues'
];

export const familyConditions = [
    'Heart Disease', 'Cancer', 'Diabetes', 'Stroke', 'Alzheimer\'s',
    'Mental Health Issues', 'Kidney Disease', 'Liver Disease'
];

export const policyTypes = [
    'Individual Health Insurance', 'Family Health Insurance', 'Critical Illness Insurance',
    'Senior Citizen Health Insurance', 'Maternity Health Insurance', 'Disease-Specific Insurance'
];

export const initialProfileData: ProfileData = {
    personal: {
        age: '',
        gender: '',
        maritalStatus: '',
        dependents: '',
        location: '',
        occupation: ''
    },
    financial: {
        annualIncome: '',
        netWorth: '',
        existingDebt: ''
    },
    lifestyle: {
        smokingHabits: '',
        drinkingHabits: '',
        highRiskHobbies: []
    },
    health: {
        medicalHistory: [],
        familyMedicalHistory: [],
        currentMedications: '',
        currentConditions: []
    },
    policyPreferences: {
        desiredPolicyTypes: [],
        coverageAmount: '',
        premiumBudget: '',
        preferredDeductible: ''
    }
};
