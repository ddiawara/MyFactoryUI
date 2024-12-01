import React from 'react';
import { Server } from 'lucide-react';
import { Button } from '../ui/Button';
import { FilterBar } from '../ui/FilterBar';
import { OSForm } from './OSForm';
import { DeleteConfirmation } from '../settings/DeleteConfirmation';

interface OS {
  id: number;
  name: string;
  os_family_id: number;
  os_architecture_id: number;
  os_builder_id: number;
  run_test: boolean;
}

const mockData: OS[] = [
  {
    id: 1,
    name: 'Ubuntu 22.04',
    os_family_id: 1,
    os_architecture_id: 1,
    os_builder_id: 1,
    run_test: true
  }
];

export function OSList() {
  const [osList, setOSList] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedOS, setSelectedOS] = React.useState<OS | null>(null);
  const [filteredOS, setFilteredOS] = React.useState(osList);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState({
    runTest: ''
  });

  React.useEffect(() => {
    let result = [...osList];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(os => 
        os.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (activeFilters.runTest) {
      result = result.filter(os => 
        (activeFilters.runTest === 'yes') === os.run_test
      );
    }
    
    setFilteredOS(result);
  }, [osList, searchTerm, activeFilters]);

  const handleAdd = (name: string) => {
    const newOS = {
      id: osList.length + 1,
      name,
      os_family_id: 1,
      os_architecture_id: 1,
      os_builder_id: 1,
      run_test: false
    };
    setOSList([...osList, newOS]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (name: string) => {
    if (!selectedOS) return;
    setOSList(osList.map(os => 
      os.id === selectedOS.id ? { ...os, name } : os
    ));
    setIsEditModalOpen(false);
    setSelectedOS(null);
  };

  const handleDelete = () => {
    if (!selectedOS) return;
    setOSList(osList.filter(os => os.id !== selectedOS.id));
    setIsDeleteModalOpen(false);
    setSelectedOS(null);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Operating Systems</h1>
          <Button
            icon={Server}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add OS
          </Button>
        </div>

        <FilterBar
          searchPlaceholder="Search operating systems..."
          filters={{
            runTest: {
              label: 'Run Tests',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ]
            }
          }}
          onSearch={setSearchTerm}
          onFilter={(key, value) => setActiveFilters(prev => ({ ...prev, [key]: value }))}
        />

        <div className="mt-8 bg-white shadow rounded-lg animate-slide-in">
          <div className="px-4 py-5 sm:p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Run Tests
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOS.map((os) => (
                  <tr key={os.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{os.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${os.run_test ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {os.run_test ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          setSelectedOS(os);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedOS(os);
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
        </div>

        <OSForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
        />

        <OSForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedOS(null);
          }}
          onSubmit={handleEdit}
          initialName={selectedOS?.name}
        />

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedOS(null);
          }}
          onConfirm={handleDelete}
          itemName={selectedOS?.name || ''}
          itemType="OS"
        />
      </div>
    </div>
  );
}