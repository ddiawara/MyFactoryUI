import React from 'react';
import { Cloud, Globe, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { FilterBar } from '../ui/FilterBar';
import { ProviderForm, ProviderFormData } from './ProviderForm';
import { DeleteConfirmation } from './DeleteConfirmation';

interface Provider {
  id: number;
  provider: 'aws' | 'gcp';
  region: string;
  role_name: string;
  ami_config?: {
    source_image: string;
    image_owner: string;
    vpc_region: string;
    instance_type: string;
    ssh_tmp_key: string;
  };
  docker_config?: {
    official_image_url: string;
    source_image: string;
  };
}

const mockData: Provider[] = [
  {
    id: 1,
    provider: 'aws',
    region: 'us-east-1',
    role_name: 'my-aws-role',
    ami_config: {
      source_image: 'ami-0123456789abcdef0',
      image_owner: 'self',
      vpc_region: 'eu-west-1',
      instance_type: 't3.small',
      ssh_tmp_key: 'ssh-rsa AAAAB3m'
    }
  },
  {
    id: 2,
    provider: 'gcp',
    region: 'us-central1',
    role_name: 'my-gcp-role',
    docker_config: {
      official_image_url: 'https://hub.docker.com/_/ubuntu',
      source_image: 'ubuntu:22.04'
    }
  }
];

const providerColors = {
  aws: 'bg-yellow-100 text-yellow-800',
  gcp: 'bg-blue-100 text-blue-800'
};

export function ProviderList() {
  const [providers, setProviders] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<Provider | null>(null);
  const [filteredProviders, setFilteredProviders] = React.useState(providers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState({
    provider: '',
    region: ''
  });

  React.useEffect(() => {
    let result = [...providers];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(provider => 
        provider.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (activeFilters.provider) {
      result = result.filter(provider => provider.provider === activeFilters.provider);
    }
    
    if (activeFilters.region) {
      result = result.filter(provider => provider.region === activeFilters.region);
    }
    
    setFilteredProviders(result);
  }, [providers, searchTerm, activeFilters]);

  const handleAdd = (data: ProviderFormData) => {
    const newProvider = {
      id: providers.length + 1,
      ...data
    };
    setProviders([...providers, newProvider]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: ProviderFormData) => {
    if (!selectedProvider) return;
    
    setProviders(providers.map(p => 
      p.id === selectedProvider.id ? { ...p, ...data } : p
    ));
    setIsEditModalOpen(false);
    setSelectedProvider(null);
  };

  const handleDelete = () => {
    if (!selectedProvider) return;
    
    setProviders(providers.filter(p => p.id !== selectedProvider.id));
    setIsDeleteModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Cloud Providers</h2>
        </div>
        <Button
          icon={Cloud}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Provider
        </Button>
      </div>

      <FilterBar
        searchPlaceholder="Search providers..."
        filters={{
          provider: {
            label: 'Provider',
            options: [
              { label: 'AWS', value: 'aws' },
              { label: 'GCP', value: 'gcp' }
            ]
          },
          region: {
            label: 'Region',
            options: [
              { label: 'US East', value: 'us-east-1' },
              { label: 'US Central', value: 'us-central1' },
              { label: 'EU West', value: 'eu-west-1' }
            ]
          }
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => setActiveFilters(prev => ({ ...prev, [key]: value }))}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProviders.map((provider) => (
              <tr key={provider.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 text-gray-400 mr-3" />
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${providerColors[provider.provider]}`}>
                      {provider.provider.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    {provider.region}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    {provider.role_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedProvider(provider);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedProvider(provider);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProviderForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      <ProviderForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProvider(null);
        }}
        onSubmit={handleEdit}
        initialData={selectedProvider || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProvider(null);
        }}
        onConfirm={handleDelete}
        providerName={selectedProvider?.provider.toUpperCase() || ''}
      />
    </div>
  );
}