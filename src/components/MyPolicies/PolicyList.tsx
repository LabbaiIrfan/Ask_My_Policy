import { PolicyCard } from './PolicyCard';
import type { Policy } from '../../data/myPoliciesData';

interface PolicyListProps {
    policies: Policy[];
}

export function PolicyList({ policies }: PolicyListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
                <PolicyCard key={policy.id} policy={policy} index={index} />
            ))}
        </div>
    );
}
