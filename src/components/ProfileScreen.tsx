import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Edit2, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard,
  Users,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  Trophy,
  Settings,
  CheckCircle,
  ArrowRight,
  Camera,
  Plus,
  Activity,
  TrendingUp
} from 'lucide-react';

interface ProfileScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  userName: string;
}

export function ProfileScreen({ userName }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const userProfile = {
    name: userName,
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    dateOfBirth: '15/08/1990',
    occupation: 'Software Engineer',
    income: '₹12,00,000 per annum',
    familyMembers: 4,
    joinDate: 'March 2023',
    profileCompleteness: 85,
    membershipLevel: 'Premium'
  };

  const achievements = [
    { id: 1, title: 'Smart Saver', description: 'Saved ₹50,000 in premiums', icon: '💰', points: 500, earned: true },
    { id: 2, title: 'Policy Pro', description: 'Purchased 3+ policies', icon: '🛡️', points: 300, earned: true },
    { id: 3, title: 'Claim Expert', description: 'Zero claim rejections', icon: '🎯', points: 400, earned: true },
    { id: 4, title: 'Loyalty Champion', description: '1 year with Ask My Policy', icon: '⭐', points: 600, earned: false }
  ];

  const familyMembers = [
    { name: 'Priya Sharma', relation: 'Spouse', age: 28, covered: true, avatar: '👩' },
    { name: 'Aadhya Sharma', relation: 'Daughter', age: 5, covered: true, avatar: '👧' },
    { name: 'Rajesh Sharma', relation: 'Father', age: 58, covered: false, avatar: '👨' }
  ];

  const profileStats = [
    { label: 'Active Policies', value: '3', icon: Shield, color: 'bg-blue-50 text-blue-600' },
    { label: 'Claims Filed', value: '2', icon: Activity, color: 'bg-green-50 text-green-600' },
    { label: 'Savings This Year', value: '₹15K', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
    { label: 'Reward Points', value: '2,450', icon: Star, color: 'bg-purple-50 text-purple-600' }
  ];

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Email & SMS alerts',
      enabled: true,
      action: 'toggle'
    },
    {
      icon: Lock,
      title: 'Biometric Login',
      description: 'Fingerprint & Face ID',
      enabled: true,
      action: 'toggle'
    },
    {
      icon: Globe,
      title: 'Language',
      description: 'English (US)',
      enabled: false,
      action: 'change'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage cards & UPI',
      enabled: false,
      action: 'manage'
    }
  ];

  const totalPoints = achievements.reduce((sum, achievement) => 
    sum + (achievement.earned ? achievement.points : 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Profile Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Camera className="text-gray-600" size={16} />
                  </button>
                </div>
                <div>
                  <h2 className="font-bold text-white mb-1">{userProfile.name}</h2>
                  <p className="text-white/80">{userProfile.occupation}</p>
                  <p className="text-white/60 text-sm">Member since {userProfile.joinDate}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">{userProfile.membershipLevel}</span>
                    </div>
                    <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
                      <span className="text-yellow-200 text-sm font-medium">Profile {userProfile.profileCompleteness}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setActiveTab('profile')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('family')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'family'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Users size={18} />
              <span>Family</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'family'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {familyMembers.length}
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('achievements')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'achievements'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Trophy size={18} />
              <span>Rewards</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'achievements'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {achievements.filter(a => a.earned).length}
              </span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab('settings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </motion.button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Personal Information</h3>
                <button className="text-primary hover:text-primary/80 transition-colors">
                  <Edit2 size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: userProfile.email },
                  { icon: Phone, label: 'Phone', value: userProfile.phone },
                  { icon: MapPin, label: 'Address', value: userProfile.address },
                  { icon: Calendar, label: 'Date of Birth', value: userProfile.dateOfBirth },
                  { icon: Briefcase, label: 'Annual Income', value: userProfile.income }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <item.icon size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-6">Profile Completion</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">{userProfile.profileCompleteness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${userProfile.profileCompleteness}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-primary h-3 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { task: 'Add profile photo', completed: false, points: '+50 points' },
                  { task: 'Verify phone number', completed: true, points: '+100 points' },
                  { task: 'Add family members', completed: true, points: '+150 points' },
                  { task: 'Upload documents', completed: false, points: '+200 points' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {item.completed && <CheckCircle className="text-green-600" size={14} />}
                      </div>
                      <span className={`${item.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                        {item.task}
                      </span>
                    </div>
                    <span className="text-sm text-orange-600 font-medium">{item.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Family Tab */}
        {activeTab === 'family' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Family Members</h3>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
                  <Plus size={18} />
                  <span>Add Member</span>
                </button>
              </div>
              
              <div className="grid gap-4">
                {familyMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-xl">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.relation} • Age {member.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        member.covered 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {member.covered ? 'Covered' : 'Not Covered'}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Points Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy size={32} className="text-white" />
                </div>
                <h2 className="font-bold text-white mb-2">Reward Points</h2>
                <p className="text-3xl font-bold mb-2">{totalPoints.toLocaleString()}</p>
                <p className="text-white/80">Available to redeem</p>
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-colors mt-4 flex items-center space-x-2 mx-auto">
                  <span>Redeem Points</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 border text-center transition-all hover:shadow-lg ${
                    achievement.earned 
                      ? 'border-orange-200 hover:border-orange-300' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl ${
                    achievement.earned 
                      ? 'bg-orange-50' 
                      : 'bg-gray-100'
                  }`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.earned ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    {achievement.earned ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
                        Earned • +{achievement.points}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 text-xs font-medium rounded-full">
                        {achievement.points} points
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-6">App Settings</h3>
              <div className="space-y-4">
                {settingsOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <option.icon size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{option.title}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <div>
                      {option.action === 'toggle' ? (
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${
                          option.enabled ? 'bg-primary' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            option.enabled ? 'right-0.5' : 'left-0.5'
                          }`}></div>
                        </div>
                      ) : (
                        <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center space-x-1">
                          <span>{option.action === 'change' ? 'Change' : 'Manage'}</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}