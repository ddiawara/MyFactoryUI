import React from 'react';
import { Box } from 'lucide-react';
import { Button } from '../ui/Button';
import { OSBuilderForm } from './OSBuilderForm';
import { DeleteConfirmation } from './DeleteConfirmation';

interface OSBuilder {
  id: number;
  name: string;
}

const mockData: OSBuilder[] = [
  { id: 1, name: 'ami' },
  { id: 2, name: 'docker' }
];

export function OSBuilderList() {
  const [builders, setBuilders] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedBuilder, setSelectedBuilder] = React.useState<OSBuilder | null>(null);

  const handleAdd = (name: string) => {
    const newBuilder = {
      id: builders.length + 1,
      name
    };
    setBuilders([...builders, newBuilder]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (name: string) => {
    if (!selectedBuilder) return;
    setBuilders(builders.map(builder => 
      builder.id === selectedBuilder.id ? { ...builder, name } : builder
    ));
    setIsEditModalOpen(false);
    setSelectedBuilder(null);
  };

  const handleDelete = () => {
    if (!selectedBuilder) return;
    setBuilders(builders.filter(builder => builder.id !== selectedBuilder.id));
    setIsDeleteModalOpen(false);
    setSelectedBuilder(null);
  };

  return (
    <div className="bg-white shadow rounded-lg animate-slide-in">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Box className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">OS Builders</h3>
          </div>
          <Button
            icon={Box}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Builder
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {builders.map((builder) => (
              <tr key={builder.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Box className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{builder.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedBuilder(builder);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedBuilder(builder);
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

      <OSBuilderForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      <OSBuilderForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBuilder(null);
        }}
        onSubmit={handleEdit}
        initialName={selectedBuilder?.name}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBuilder(null);
        }}
        onConfirm={handleDelete}
        itemName={selectedBuilder?.name || ''}
        itemType="builder"
      />
    </div>
  );
}