import React from 'react';
import { Server } from 'lucide-react';
import { Button } from '../ui/Button';

interface OSFamilyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OSFamilyFormData) => void;
  initialData?: OSFamilyFormData;
}

export interface OSFamilyFormData {
  name: string;
  nature: 'linux' | 'windows';
}

export function OSFamilyForm({ isOpen, onClose, onSubmit, initialData }: OSFamilyFormProps) {
  const [formData, setFormData] = React.useState<OSFamilyFormData>(
    initialData || {
      name: '',
      nature: 'linux'
    }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Server className="h-5 w-5 mr-2 text-indigo-600" />
            {initialData ? 'Edit OS Family' : 'Add OS Family'}
          </h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ubuntu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nature</label>
              <select
                value={formData.nature}
                onChange={(e) => setFormData({ ...formData, nature: e.target.value as 'linux' | 'windows' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="linux">Linux</option>
                <option value="windows">Windows</option>
              </select>
            </div>

            <div className="mt-5 sm:mt-6 flex space-x-3">
              <Button
                type="submit"
                className="flex-1"
              >
                {initialData ? 'Update OS Family' : 'Add OS Family'}
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