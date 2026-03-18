'use client';

import { Task } from '@/types';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: Partial<Task>) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(task.id, {
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isCompleted = task.status === 'completed';
  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Task</h3>
        <Input
          label="Task Title"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            rows={3}
          />
        </div>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            onClick={handleSave} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${
      isCompleted 
        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="pt-1">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(task.id)}
              className="w-6 h-6 rounded-lg cursor-pointer accent-green-500 transition-transform hover:scale-110"
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-bold leading-tight mb-2 transition-all ${
                  isCompleted
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`text-sm leading-relaxed mb-3 ${
                    isCompleted
                      ? 'text-gray-500'
                      : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                    isCompleted
                      ? 'bg-green-200 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </span>

                  {/* Created Date */}
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {createdDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
              title="Edit task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
