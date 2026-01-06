export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    rating: number;
    distance: number;
    isOpen: boolean;
    hours: string;
}

export const branches: Branch[] = [
    // Original Branches
    {
        id: '1',
        name: 'Star Health - Bandra West',
        address: 'Shop 15, Linking Road, Bandra West, Mumbai - 400050',
        phone: '+91 9876543210',
        rating: 4.8,
        distance: 0.8,
        isOpen: true,
        hours: '9:00 AM - 7:00 PM'
    },
    {
        id: '2',
        name: 'Star Health - Andheri East',
        address: '203, Chakala Commercial Complex, Andheri East, Mumbai - 400059',
        phone: '+91 9876543211',
        rating: 4.6,
        distance: 2.3,
        isOpen: true,
        hours: '9:00 AM - 7:00 PM'
    },
    {
        id: '3',
        name: 'Star Health - Powai',
        address: 'Unit 45, Galleria Mall, Powai, Mumbai - 400076',
        phone: '+91 9876543212',
        rating: 4.7,
        distance: 4.1,
        isOpen: false,
        hours: '9:00 AM - 7:00 PM'
    },
    {
        id: '4',
        name: 'Star Health - Worli',
        address: 'Ground Floor, Atria Mall, Worli, Mumbai - 400018',
        phone: '+91 9876543213',
        rating: 4.9,
        distance: 5.2,
        isOpen: true,
        hours: '9:00 AM - 8:00 PM'
    },
    // Branches from Bajaj Allianz
    {
        id: '101',
        name: 'Bajaj Allianz - Ahmedabad',
        address: 'Jeevan Prakash Building, 6th Floor, Tilak Marg, Relief Road, Ahmedabad – 380001',
        phone: '+91 99999 88888',
        rating: 4.5,
        distance: 3.1,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '102',
        name: 'Bajaj Allianz - Bengaluru',
        address: 'Jeevan Soudha Building, Ground Floor, 19/19, 24th Main Road, JP Nagar, 1st Phase, Bengaluru – 560078',
        phone: '+91 99999 88888',
        rating: 4.8,
        distance: 8.5,
        isOpen: false,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '103',
        name: 'Bajaj Allianz - Chennai',
        address: 'Fatima Akhtar Court, 4th Floor, 453, Anna Salai, Teynampet, Chennai – 600018',
        phone: '+91 99999 88888',
        rating: 4.6,
        distance: 12.3,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '104',
        name: 'Bajaj Allianz - Delhi',
        address: '2/2 A, Universal Insurance Building, Asaf Ali Road, New Delhi – 110002',
        phone: '+91 99999 88888',
        rating: 4.7,
        distance: 15.0,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '105',
        name: 'Bajaj Allianz - Hyderabad',
        address: '6-2-46, 1st Floor, “Moin Court”, Lane Opp. Hyundai Showroom, A. C. Guards, Lakdi-Ka-Pool, Hyderabad – 500004',
        phone: '+91 99999 88888',
        rating: 4.9,
        distance: 7.2,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '106',
        name: 'Bajaj Allianz - Kolkata',
        address: 'Hindustan Building Annexe, 7th Floor, 4, C.R. Avenue, Kolkata – 700072',
        phone: '+91 99999 88888',
        rating: 4.4,
        distance: 22.1,
        isOpen: false,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '107',
        name: 'Bajaj Allianz - Mumbai',
        address: '3rd Floor, Jeevan Seva Annexe, S.V. Road, Santacruz (W), Mumbai – 400054',
        phone: '+91 99999 88888',
        rating: 4.8,
        distance: 1.2,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    {
        id: '108',
        name: 'Bajaj Allianz - Noida',
        address: 'Bhagwan Sahai Palace, 4th Floor, Main Road, Naya Bans, Sector 15, Noida – 201301',
        phone: '+91 99999 88888',
        rating: 4.7,
        distance: 18.9,
        isOpen: true,
        hours: '10:00 AM - 6:00 PM'
    },
    // Branches from Care Health Insurance Limited
    {
        id: '201',
        name: 'Care Health - Ahmedabad',
        address: 'Jeevan Prakash Building, 6th Floor, Tilak Marg, Relief Road, Ahmedabad – 380001',
        phone: '+91 99999 88888',
        rating: 4.6,
        distance: 3.2,
        isOpen: true,
        hours: '9:30 AM - 6:30 PM'
    },
    {
        id: '202',
        name: 'Care Health - Bengaluru',
        address: 'Jeevan Soudha Building, Ground Floor, 19/19, 24th Main Road, JP Nagar, 1st Phase, Bengaluru – 560078',
        phone: '+91 99999 88888',
        rating: 4.7,
        distance: 8.6,
        isOpen: true,
        hours: '9:30 AM - 6:30 PM'
    },
    {
        id: '203',
        name: 'Care Health - Chennai',
        address: 'Fatima Akhtar Court, 4th Floor, 453, Anna Salai, Teynampet, Chennai – 600018',
        phone: '+91 99999 88888',
        rating: 4.5,
        distance: 12.4,
        isOpen: false,
        hours: '9:30 AM - 6:30 PM'
    },
    {
        id: '204',
        name: 'Care Health - Delhi',
        address: '2/2 A, Universal Insurance Building, Asaf Ali Road, New Delhi – 110002',
        phone: '+91 99999 88888',
        rating: 4.8,
        distance: 15.1,
        isOpen: true,
        hours: '9:30 AM - 6:30 PM'
    },
    {
        id: '515',
        name: 'Aditya Birla Health - Noida',
        address: 'Bhagwan Sahai Palace, 4th Floor, Main Road, Naya Bans, Sector 15, Distt: Gautam Buddh Nagar, U.P - 201301',
        phone: '+91 99999 88888',
        rating: 4.8,
        distance: 18.7,
        isOpen: true,
        hours: '9:00 AM - 7:00 PM'
    },
    {
        id: '516',
        name: 'Aditya Birla Health - Patna',
        address: '2nd Floor, Lalit Bhawan, Bailey Road, Patna - 800 001',
        phone: '+91 99999 88888',
        rating: 4.4,
        distance: 35.4,
        isOpen: false,
        hours: '9:00 AM - 7:00 PM'
    },
    {
        id: '517',
        name: 'Aditya Birla Health - Pune',
        address: 'Jeevan Darshan Bldg., 3rd Floor, C.T.S. No.s. 195 to 198, N.C. Kelkar Road, Narayan Peth, Pune - 411 030',
        phone: '+91 99999 88888',
        rating: 4.9,
        distance: 6.8,
        isOpen: true,
        hours: '9:00 AM - 7:00 PM'
    }
];
