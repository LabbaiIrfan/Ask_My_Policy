import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, BarChart3, ChevronDown } from 'lucide-react';

interface CompanyAnalysisProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

const companies = [
  {
    id: 'default',
    name: 'Select a Company',
    graphs: []
  },
  {
    id: 'bajaj',
    name: 'Bajaj Allianz',
    graphs: [
      {
        title: 'Solvency Ratio Analysis',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501993/b96bb859-d4e4-4361-a5ac-fbf2c60b00e4.png',
        description: 'This graph shows the financial stability and ability of Bajaj Allianz to meet its long-term obligations. A strong solvency ratio indicates that the company has sufficient assets to cover its liabilities and can continue operating sustainably.'
      },
      {
        title: 'Profit After Tax Trends',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759502012/c352c58c-963d-4318-a549-074786049817.png',
        description: 'This analysis displays the annual profit trends and growth trajectory of Bajaj Allianz over recent years. It helps understand the company\'s profitability and business performance in the competitive insurance market.'
      },
      {
        title: 'Claims Incurred Net Ratio',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759502033/ca0cc1e6-7b08-45c4-acbe-46e78c18334c.png',
        description: 'This metric represents the ratio of claims paid to premiums collected by Bajaj Allianz. It shows how efficiently the company manages claims while maintaining profitability and customer satisfaction.'
      }
    ]
  },
  {
    id: 'hdfc',
    name: 'HDFC ERGO',
    graphs: [
      {
        title: 'Profit After Tax Performance',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759503065/145bd5b5-b634-44d8-b27b-f75af8853bc6.png',
        description: 'This graph illustrates HDFC ERGO\'s quarterly and annual profit performance measured in crores. It demonstrates the company\'s ability to generate consistent profits and maintain strong financial health in the insurance sector.'
      },
      {
        title: 'Regulatory Compliance Check',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759503192/ff39b037-12de-4d5c-b7b2-b496b5ec33e6.png',
        description: 'This overview displays HDFC ERGO\'s compliance with IRDAI regulations and industry standards. It reflects the company\'s commitment to maintaining transparency and following regulatory guidelines for customer protection.'
      }
    ]
  },
  {
    id: 'star',
    name: 'Star Health Insurance',
    graphs: [
      {
        title: 'Profit After Tax Growth',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501154/07c9cb62-41ef-4bef-b14c-7255de4b2a45.png',
        description: 'This chart shows Star Health Insurance\'s profit growth patterns over multiple years. It indicates the company\'s business expansion, operational efficiency, and ability to generate sustainable returns for stakeholders.'
      },
      {
        title: 'Incurred Claim Ratio',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501221/39c1aaec-c135-4d4d-9c44-098194c657d8.png',
        description: 'This metric displays Star Health\'s claims settlement efficiency and financial performance. It shows the balance between paying customer claims promptly and maintaining the company\'s financial stability.'
      },
      {
        title: 'Solvency Ratio Dashboard',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501246/2bee5ec0-974f-46df-b77e-ca2fbcc66e7f.png',
        description: 'This dashboard presents Star Health\'s capital adequacy and risk management capabilities. It demonstrates the company\'s financial strength and ability to honor insurance commitments to policyholders.'
      }
    ]
  },
  {
    id: 'care',
    name: 'Care Health Insurance',
    graphs: [
      {
        title: 'Solvency Ratio Performance',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501279/abaaeef9-e582-4235-ae2b-362d4d7e7ea2.png',
        description: 'This analysis shows Care Health Insurance\'s financial stability and regulatory compliance trends. It reflects the company\'s ability to maintain adequate capital reserves and meet regulatory requirements consistently.'
      },
      {
        title: 'Incurred Claim Ratio Analysis',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501303/92b18480-3979-4cff-ba88-ff2fe72502fb.png',
        description: 'This graph displays Care Health\'s claims processing efficiency and cost management strategies. It shows how the company balances customer satisfaction through prompt claim settlements with operational profitability.'
      },
      {
        title: 'Profit After Tax Overview',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501328/4cbc5ced-997b-4a36-bd45-ead1f5256dd4.png',
        description: 'This overview presents Care Health Insurance\'s profitability trends and business growth metrics. It demonstrates the company\'s financial performance and market positioning in the health insurance industry.'
      }
    ]
  },
  {
    id: 'aditya',
    name: 'Aditya Birla Health Insurance',
    graphs: [
      {
        title: 'Solvency Ratio Tracking',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501395/b78f76f7-ae2b-4015-93b8-14c4cce4f398.png',
        description: 'This tracking shows Aditya Birla Health Insurance\'s long-term financial stability and growth indicators. It measures the company\'s capacity to meet future obligations and sustain business operations effectively.'
      },
      {
        title: 'Incurred Claim Ratio Metrics',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501372/4ccc5be1-171b-4a79-ae75-2705617159df.png',
        description: 'This metric analysis reveals Aditya Birla\'s claims management and operational efficiency. It shows how the company handles customer claims while maintaining financial discipline and service quality.'
      },
      {
        title: 'Profit After Tax Analysis',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501345/e1524ac7-b223-4ddf-903e-ca935cc18c4a.png',
        description: 'This analysis presents Aditya Birla Health Insurance\'s revenue generation and profit optimization strategies. It reflects the company\'s business performance and competitive positioning in the market.'
      }
    ]
  },
  {
    id: 'niva',
    name: 'Niva Bupa',
    graphs: [
      {
        title: 'Solvency Ratio Evolution',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501418/afbae048-e1ab-4ca0-a749-f40b67320a43.png',
        description: 'This evolution chart displays Niva Bupa\'s capital management and regulatory adherence over time. It shows the company\'s commitment to maintaining strong financial foundations and meeting industry standards.'
      },
      {
        title: 'Incurred Claim Ratio Insights',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501444/e03eb62c-be52-4ed7-aa00-03f060ee4aaf.png',
        description: 'This insight analysis shows Niva Bupa\'s customer satisfaction and claims settlement patterns. It demonstrates the company\'s approach to balancing customer needs with sustainable business practices.'
      },
      {
        title: 'Profit After Tax Trajectory',
        image: 'https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501462/cb4f6697-e929-4465-8809-e89b305add5c.png',
        description: 'This trajectory shows Niva Bupa\'s business performance and market positioning over recent periods. It indicates the company\'s growth strategy and financial health in the competitive insurance landscape.'
      }
    ]
  }
];

export function CompanyAnalysis({ onOpenMenu}: CompanyAnalysisProps) {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const handleCompanyChange = (companyId: string) => {
    const company = companies.find(c => c.id === companyId) || companies[0];
    setSelectedCompany(company);
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
          <h1 className="font-semibold text-gray-900">Company Analysis</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-orange rounded-2xl mb-6 shadow-premium">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1>Company Financial Analysis</h1>
          <p className="max-w-2xl mx-auto">
            Analyze the financial performance and key metrics of leading health insurance companies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 mb-8 shadow-soft"
        >
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501122/964520c9-c3d7-49e9-8dd5-3085173dfc89.png"
              alt="Insurance Industry Overview"
              className="w-full rounded-xl border border-gray-200"
            />
          </div>
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501122/964520c9-c3d7-49e9-8dd5-3085173dfc89.png"
              alt="Insurance Industry Overview"
              className="w-full rounded-xl border border-gray-200"
            />
          </div>
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dmmafvjd3/image/upload/v1759501122/964520c9-c3d7-49e9-8dd5-3085173dfc89.png"
              alt="Insurance Industry Overview"
              className="w-full rounded-xl border border-gray-200"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-semibold text-gray-900">
              Select Insurance Company
            </label>
            <div className="relative">
              <select
                value={selectedCompany.id}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {selectedCompany.id === 'default' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Select a Company to View Analysis
              </h3>
              <p className="text-gray-600">
                Choose an insurance company from the dropdown to see their financial analysis graphs
              </p>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {selectedCompany.graphs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {selectedCompany.graphs.map((graph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="glass-card rounded-2xl p-8 shadow-soft"
                >
                  <h3 className="font-semibold text-gray-900 mb-6">{graph.title}</h3>

                  <div className="mb-6">
                    <img
                      src={graph.image}
                      alt={graph.title}
                      className="w-full rounded-xl border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = '';
                      }}
                    />

                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {graph.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}