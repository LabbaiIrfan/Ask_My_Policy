import { Search, Filter, Star } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
    onOpenFilterWizard: () => void;
}

export function SearchSection({
    searchQuery,
    setSearchQuery,
    onSearch,
    onOpenFilterWizard
}: SearchSectionProps) {
    return (
        <div className="w-full bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 flex flex-col gap-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-2">
                    <Search className="w-6 h-6 text-primary" />
                    <span>Quick Search</span>
                </h3>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by policy name, company, or features..."
                            className="h-16 text-lg border-gray-200 focus:ring-primary/20 rounded-xl px-6"
                        // removed onKeyPress as auto-search handles it
                        />
                    </div>
                    {/* Search button removed/optional as it's auto-search now, but keeping for click */}
                    <Button
                        onClick={onSearch}
                        className="h-16 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                        <Search className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 px-4 overflow-hidden">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">or let AI help</span>
                <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Smart Filter CTA */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-2">
                    <Filter className="w-6 h-6 text-secondary" />
                    <span>Personalized Recommendation</span>
                </h3>
                <Button
                    onClick={onOpenFilterWizard}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-16 text-xl font-bold rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group flex items-center justify-center gap-3"
                >
                    <Star className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Get Smart Recommendation
                </Button>
                <p className="text-sm text-gray-400">Takes less than 30 seconds for a tailored result</p>
            </div>
        </div>
    );
}
