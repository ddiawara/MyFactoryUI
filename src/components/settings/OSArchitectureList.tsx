import React from 'react';
import { Cpu } from 'lucide-react';
import { Button } from '../ui/Button';
import { OSArchitectureForm } from './OSArchitectureForm';
import { DeleteConfirmation } from './DeleteConfirmation';

interface OSArchitecture {
  id: number;
  name: string;
}

const mockData: OSArchitecture[] = [
  { id: 1, name: 'amd64' },
  { id: 2, name: 'arm64' }
];

export function OSArchitectureList() {
  const [architectures, setArchitectures] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedArchitecture, setSelectedArchitecture] = React.useState<OSArchitecture | null>(null);

  const handleAdd = (name: string) => {
    const newArchitecture = {
      id: architectures.length + 1,
      name
    };
    setArchitectures([...architectures, newArchitecture]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (name: string) => {
    if (!selectedArchitecture) return;
    setArchitectures(architectures.map(arch => 
      arch.id === selectedArchitecture.id ? { ...arch, name } : arch
    ));
    setIsEditModalOpen(false);
    setSelectedArchitecture(null);
  };

  const handleDelete = () => {
    if (!selectedArchitecture) return;
    setArchitectures(architectures.filter(arch => arch.id !== selectedArchitecture.id));
    setIsDeleteModalOpen(false);
    setSelectedArchitecture(null);
  };

  return (
    <div className="bg-white shadow rounded-lg animate-slide-in">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Cpu className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">OS Architectures</h3>
          </div>
          <Button
            icon={Cpu}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Architecture
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
            {architectures.map((arch) => (
              <tr key={arch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{arch.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedArchitecture(arch);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedArchitecture(arch);
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

      <OSArchitectureForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      <OSArchitectureForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedArchitecture(null);
        }}
        onSubmit={handleEdit}
        initialName={selectedArchitecture?.name}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedArchitecture(null);
        }}
        onConfirm={handleDelete}
        itemName={selectedArchitecture?.name || ''}
        itemType="architecture"
      />
    </div>
  );
}