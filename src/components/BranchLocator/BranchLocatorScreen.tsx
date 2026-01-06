import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { branches, type Branch } from '../../data/branches';
import { BranchList } from './BranchList';
import { BranchMap } from './BranchMap';

interface BranchLocatorScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

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
          <BranchList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredBranches={filteredBranches}
            selectedBranch={selectedBranch}
            onSelect={handleSelectBranch}
            onDirections={getDirections}
            onCall={callBranch}
          />

          {/* Map Area */}
          <BranchMap mapEmbedUrl={mapEmbedUrl} />

        </div>
      </div>
    </div>
  );
};