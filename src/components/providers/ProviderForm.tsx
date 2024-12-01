import React from 'react';
import { Cloud, Globe, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProviderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProviderFormData) => void;
  initialData?: ProviderFormData;
}

export interface ProviderFormData {
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

export function ProviderForm({ isOpen, onClose, onSubmit, initialData }: ProviderFormProps) {
  const [formData, setFormData] = React.useState<ProviderFormData>(
    initialData || {
      provider: 'aws',
      region: '',
      role_name: '',
      ami_config: {
        source_image: '',
        image_owner: '',
        vpc_region: 'eu-west-1',
        instance_type: 't3.small',
        ssh_tmp_key: 'ssh-rsa AAAAB3m'
      },
      docker_config: {
        official_image_url: '',
        source_image: ''
      }
    }
  );

  const updateAMIConfig = (field: string, value: string) => {
    setFormData({
      ...formData,
      ami_config: {
        ...formData.ami_config!,
        [field]: value
      }
    });
  };

  const updateDockerConfig = (field: string, value: string) => {
    setFormData({
      ...formData,
      docker_config: {
        ...formData.docker_config!,
        [field]: value
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Cloud className="h-5 w-5 mr-2 text-indigo-600" />
            {initialData ? 'Edit Provider' : 'Add Provider'}
          </h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value as 'aws' | 'gcp' })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="aws">AWS</option>
                  <option value="gcp">GCP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder={formData.provider === 'aws' ? 'us-east-1' : 'us-central1'}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Role Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.role_name}
                    onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="my-role-name"
                  />
                </div>
              </div>
            </div>

            {/* AMI Configuration */}
            {formData.provider === 'aws' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">AMI Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source Image</label>
                    <input
                      type="text"
                      value={formData.ami_config?.source_image}
                      onChange={(e) => updateAMIConfig('source_image', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="ami-0123456789abcdef0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image Owner</label>
                    <input
                      type="text"
                      value={formData.ami_config?.image_owner}
                      onChange={(e) => updateAMIConfig('image_owner', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="self"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">VPC Region</label>
                    <input
                      type="text"
                      value={formData.ami_config?.vpc_region}
                      onChange={(e) => updateAMIConfig('vpc_region', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="eu-west-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Instance Type</label>
                    <input
                      type="text"
                      value={formData.ami_config?.instance_type}
                      onChange={(e) => updateAMIConfig('instance_type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="t3.small"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Docker Configuration */}
            {formData.provider === 'gcp' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Docker Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Official Image URL</label>
                    <input
                      type="text"
                      value={formData.docker_config?.official_image_url}
                      onChange={(e) => updateDockerConfig('official_image_url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="https://hub.docker.com/_/ubuntu"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Source Image</label>
                    <input
                      type="text"
                      value={formData.docker_config?.source_image}
                      onChange={(e) => updateDockerConfig('source_image', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="ubuntu:22.04"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 sm:mt-6 flex space-x-3">
              <Button
                type="submit"
                className="flex-1"
              >
                {initialData ? 'Update Provider' : 'Add Provider'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}