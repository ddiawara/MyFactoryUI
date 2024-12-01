import React from 'react';
import { Server, PieChart, BarChart3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { FilterBar } from '../ui/FilterBar';
import { OSFamilyForm, OSFamilyFormData } from './OSFamilyForm';
import { DeleteConfirmation } from './DeleteConfirmation';

interface OSFamily {
  id: number;
  name: string;
  nature: 'linux' | 'windows';
  imageCount: number;
}

const mockData: OSFamily[] = [
  {
    id: 1,
    name: 'Ubuntu',
    nature: 'linux',
    imageCount: 12
  },
  {
    id: 2,
    name: 'Windows',
    nature: 'windows',
    imageCount: 8
  },
  {
    id: 3,
    name: 'Redhat',
    nature: 'linux',
    imageCount: 0
  }
];

export function OSFamilyList() {
  const [families, setFamilies] = React.useState(mockData);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedFamily, setSelectedFamily] = React.useState<OSFamily | null>(null);
  const [filteredFamilies, setFilteredFamilies] = React.useState(families);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState({
    nature: ''
  });

  React.useEffect(() => {
    let result = [...families];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(family => 
        family.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (activeFilters.nature) {
      result = result.filter(family => family.nature === activeFilters.nature);
    }
    
    setFilteredFamilies(result);
  }, [families, searchTerm, activeFilters]);

  const totalImages = families.reduce((sum, family) => sum + family.imageCount, 0);
  const linuxCount = families.filter(f => f.nature === 'linux')
    .reduce((sum, family) => sum + family.imageCount, 0);
  const windowsCount = families.filter(f => f.nature === 'windows')
    .reduce((sum, family) => sum + family.imageCount, 0);

  const handleAdd = (data: OSFamilyFormData) => {
    const newFamily = {
      id: families.length + 1,
      ...data,
      imageCount: 0
    };
    setFamilies([...families, newFamily]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: OSFamilyFormData) => {
    if (!selectedFamily) return;
    
    setFamilies(families.map(f => 
      f.id === selectedFamily.id 
        ? { ...f, ...data }
        : f
    ));
    setIsEditModalOpen(false);
    setSelectedFamily(null);
  };

  const handleDelete = () => {
    if (!selectedFamily) return;
    
    setFamilies(families.filter(f => f.id !== selectedFamily.id));
    setIsDeleteModalOpen(false);
    setSelectedFamily(null);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">OS Family Management</h1>
          <Button
            icon={Server}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add OS Family
          </Button>
        </div>

        {/* Analytics Section */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PieChart className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Images
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">{totalImages}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Linux Images
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">{linuxCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Windows Images
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">{windowsCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <FilterBar
            searchPlaceholder="Search OS families..."
            filters={{
              nature: {
                label: 'Nature',
                options: [
                  { label: 'Linux', value: 'linux' },
                  { label: 'Windows', value: 'windows' }
                ]
              }
            }}
            onSearch={setSearchTerm}
            onFilter={(key, value) => setActiveFilters(prev => ({ ...prev, [key]: value }))}
          />

          {/* OS Family List */}
          <div className="mt-4 bg-white shadow rounded-lg animate-slide-in transition-all duration-200 hover:shadow-lg">
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image Count
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFamilies.map((family) => (
                    <tr key={family.id} className="transition-colors duration-200 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Server className="h-5 w-5 text-gray-400 mr-3 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-sm font-medium text-gray-900">{family.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${family.nature === 'linux' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {family.nature}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {family.imageCount} images
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setSelectedFamily(family);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setSelectedFamily(family);
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
        </div>

        <OSFamilyForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
        />

        <OSFamilyForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedFamily(null);
          }}
          onSubmit={handleEdit}
          initialData={selectedFamily || undefined}
        />

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedFamily(null);
          }}
          onConfirm={handleDelete}
          familyName={selectedFamily?.name || ''}
        />
      </div>
    </div>
  );
}