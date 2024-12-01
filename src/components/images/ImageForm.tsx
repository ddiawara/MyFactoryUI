import React from 'react';
import { Box, Server } from 'lucide-react';
import { Button } from '../ui/Button';

interface ImageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ImageFormData) => void;
  initialData?: ImageFormData;
}

export interface ImageFormData {
  os_version: string;
  technical_name: string;
  ami_source_image?: string;
  ami_image_owner?: string;
  docker_source_image?: string;
  docker_official_image_url?: string;
  ansible_playbook_enabled: boolean;
  ansible_playbook?: string;
  enabled: boolean;
}

export function ImageForm({ isOpen, onClose, onSubmit, initialData }: ImageFormProps) {
  const [formData, setFormData] = React.useState<ImageFormData>(
    initialData || {
      os_version: '',
      technical_name: '',
      ansible_playbook_enabled: true,
      enabled: true
    }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Server className="h-5 w-5 mr-2 text-indigo-600" />
            {initialData ? 'Edit Image' : 'Add Image'}
          </h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Technical Name</label>
                <input
                  type="text"
                  value={formData.technical_name}
                  onChange={(e) => setFormData({ ...formData, technical_name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ubuntu-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">OS Version</label>
                <input
                  type="text"
                  value={formData.os_version}
                  onChange={(e) => setFormData({ ...formData, os_version: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="22.04"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">AMI Source Image</label>
                <input
                  type="text"
                  value={formData.ami_source_image || ''}
                  onChange={(e) => setFormData({ ...formData, ami_source_image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ami-0123456789abcdef0"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">AMI Image Owner</label>
                <input
                  type="text"
                  value={formData.ami_image_owner || ''}
                  onChange={(e) => setFormData({ ...formData, ami_image_owner: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="self"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Docker Source Image</label>
                <input
                  type="text"
                  value={formData.docker_source_image || ''}
                  onChange={(e) => setFormData({ ...formData, docker_source_image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ubuntu:22.04"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Docker Official Image URL</label>
                <input
                  type="text"
                  value={formData.docker_official_image_url || ''}
                  onChange={(e) => setFormData({ ...formData, docker_official_image_url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="https://hub.docker.com/_/ubuntu"
                />
              </div>

              <div className="col-span-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="ansible-enabled"
                    checked={formData.ansible_playbook_enabled}
                    onChange={(e) => setFormData({ ...formData, ansible_playbook_enabled: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ansible-enabled" className="text-sm font-medium text-gray-700">
                    Enable Ansible Playbook
                  </label>
                </div>
              </div>

              {formData.ansible_playbook_enabled && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Ansible Playbook</label>
                  <input
                    type="text"
                    value={formData.ansible_playbook || ''}
                    onChange={(e) => setFormData({ ...formData, ansible_playbook: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="playbooks/base.yml"
                  />
                </div>
              )}

              <div className="col-span-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="image-enabled"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="image-enabled" className="text-sm font-medium text-gray-700">
                    Enable Image
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex space-x-3">
              <Button
                type="submit"
                className="flex-1"
              >
                {initialData ? 'Update Image' : 'Add Image'}
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