import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  familyName: string;
}

export function DeleteConfirmation({ isOpen, onClose, onConfirm, familyName }: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium text-gray-900">Delete OS Family</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete <span className="font-semibold">{familyName}</span>? 
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 flex space-x-3">
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-1"
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}