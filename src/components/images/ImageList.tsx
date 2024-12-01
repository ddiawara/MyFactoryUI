import React from 'react';
import { Box, Server, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { FilterBar } from '../ui/FilterBar';
import { ImageForm, ImageFormData } from './ImageForm';
import { DeleteConfirmation } from '../settings/DeleteConfirmation';

interface Image {
  id: number;
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

const mockData: Image[] = [
  {
    id: 1,
    os_version: '22.04',
    technical_name: 'ubuntu-base',
    ami_source_image: 'ami-0123456789abcdef0',
    ami_image_owner: 'self',
    ansible_playbook_enabled: true,
    ansible_playbook: 'playbooks/base.yml',
    enabled: true
  },
  {
    id: 2,
    os_version: 'latest',
    technical_name: 'nodejs-dev',
    docker_source_image: 'node:18-alpine',
    docker_official_image_url: 'https://hub.docker.com/_/node',
    ansible_playbook_enabled: true,
    ansible_playbook: 'playbooks/nodejs.yml',
    enabled: false
  }
];

export function ImageList() {
  const [images, setImages] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<Image | null>(null);
  const [filteredImages, setFilteredImages] = React.useState(images);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState({
    type: '',
    status: ''
  });

  React.useEffect(() => {
    let result = [...images];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(image => 
        image.technical_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.os_version.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (activeFilters.type) {
      result = result.filter(image => 
        activeFilters.type === 'ami' ? !!image.ami_source_image : !!image.docker_source_image
      );
    }
    
    if (activeFilters.status) {
      result = result.filter(image => 
        (activeFilters.status === 'enabled') === image.enabled
      );
    }
    
    setFilteredImages(result);
  }, [images, searchTerm, activeFilters]);

  const handleAdd = (data: ImageFormData) => {
    const newImage = {
      id: images.length + 1,
      ...data
    };
    setImages([...images, newImage]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: ImageFormData) => {
    if (!selectedImage) return;
    setImages(images.map(img => 
      img.id === selectedImage.id ? { ...img, ...data } : img
    ));
    setIsEditModalOpen(false);
    setSelectedImage(null);
  };

  const handleDelete = () => {
    if (!selectedImage) return;
    setImages(images.filter(img => img.id !== selectedImage.id));
    setIsDeleteModalOpen(false);
    setSelectedImage(null);
  };

  const toggleImageStatus = (image: Image) => {
    setImages(images.map(img =>
      img.id === image.id ? { ...img, enabled: !img.enabled } : img
    ));
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Box className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Image Configurations</h2>
        </div>
        <Button
          icon={Box}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Image
        </Button>
      </div>

      <FilterBar
        searchPlaceholder="Search images..."
        filters={{
          type: {
            label: 'Type',
            options: [
              { label: 'AMI', value: 'ami' },
              { label: 'Docker', value: 'docker' }
            ]
          },
          status: {
            label: 'Status',
            options: [
              { label: 'Enabled', value: 'enabled' },
              { label: 'Disabled', value: 'disabled' }
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ansible</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredImages.map((image) => (
              <tr key={image.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{image.technical_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.os_version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {image.ami_source_image ? 'AMI' : 'Docker'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.ami_source_image || image.docker_source_image}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {image.ansible_playbook_enabled && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Play className="h-4 w-4 text-green-500 mr-2" />
                      {image.ansible_playbook}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant={image.enabled ? 'secondary' : 'danger'}
                    size="sm"
                    onClick={() => toggleImageStatus(image)}
                  >
                    {image.enabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedImage(image);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedImage(image);
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

      <ImageForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      <ImageForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedImage(null);
        }}
        onSubmit={handleEdit}
        initialData={selectedImage || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedImage(null);
        }}
        onConfirm={handleDelete}
        itemName={selectedImage?.technical_name || ''}
        itemType="image"
      />
    </div>
  );
}