import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  Route
} from 'lucide-react';

interface BranchLocatorScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  isOpen: boolean;
  hours: string;
}

// Combined list of original branches and branches from the JSON file
const branches: Branch[] = [
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
  // ... (and so on for all other branches from the JSON)
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


export const BranchLocatorScreen: React.FC<BranchLocatorScreenProps> = ({ onOpenMenu }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    // Construct the direct embed URL for Google Maps
    const encodedAddress = encodeURIComponent(branch.address);
    const url = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapEmbedUrl(url);
  };

  const getDirections = (branch: Branch) => {
    // Construct the directions URL for Google Maps
    const encodedAddress = encodeURIComponent(branch.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const callBranch = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden glass-card border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Branch Locator</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Branch List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 mb-6"
            >
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search branches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-600">{filteredBranches.length} branches found</p>
            </motion.div>

            <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {filteredBranches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectBranch(branch)}
                  className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-soft ${selectedBranch?.id === branch.id ? 'border-primary bg-orange-50/50' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${branch.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {branch.isOpen ? 'Open' : 'Closed'}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{branch.address}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-gray-600">{branch.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Navigation className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{branch.distance} km</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{branch.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(branch);
                      }}
                      className="flex-1 bg-gradient-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-premium transition-all duration-300 flex items-center justify-center space-x-1"
                    >
                      <Route className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        callBranch(branch.phone);
                      }}
                      className="flex-1 border border-primary text-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="hidden lg:block lg:sticky lg:top-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl h-[calc(100vh-48px)] shadow-soft overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Branch Map</h2>
              </div>

              <div className="relative h-full">
                {mapEmbedUrl ? (
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={mapEmbedUrl}
                  ></iframe>
                ) : (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Interactive Map</h3>
                      <p className="text-gray-600">Select a branch to view its location on the map.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};