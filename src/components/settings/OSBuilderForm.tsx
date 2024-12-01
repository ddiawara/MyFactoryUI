import React from 'react';
import { Box } from 'lucide-react';
import { Button } from '../ui/Button';

interface OSBuilderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
}

export function OSBuilderForm({ isOpen, onClose, onSubmit, initialName }: OSBuilderFormProps) {
  const [name, setName] = React.useState(initialName || '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Box className="h-5 w-5 mr-2 text-indigo-600" />
            {initialName ? 'Edit Builder' : 'Add Builder'}
          </h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
          }} className="mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ami"
                required
              />
            </div>

            <div className="mt-5 sm:mt-6 flex space-x-3">
              <Button
                type="submit"
                className="flex-1"
              >
                {initialName ? 'Update Builder' : 'Add Builder'}
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