"use client";

import { X } from 'lucide-react';
import { useState } from 'react';

interface EditIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue?: {
    id: string;
    summary: string;
    description: string;
    assignee: string;
    labels: string[];
    status: string;
    priority: string;
  };
}

export default function EditIssueModal({ isOpen, onClose, issue }: EditIssueModalProps) {
  const [formData, setFormData] = useState({
    summary: issue?.summary || '',
    description: issue?.description || '',
    assignee: issue?.assignee || 'Unassigned',
    labels: issue?.labels || [],
    status: issue?.status || 'TO DO',
    priority: issue?.priority || 'Low',
  });

  const [newLabel, setNewLabel] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel)) {
      setFormData(prev => ({
        ...prev,
        labels: [...prev.labels, newLabel]
      }));
      setNewLabel('');
    }
  };

  const removeLabel = (label: string) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.filter(l => l !== label)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated issue:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-foreground">Edit Issue</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-secondary rounded transition-colors duration-200"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Project & Issue Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project <span className="text-red-500">*</span>
              </label>
              <div className="px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground">
                Teams in Space
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Issue type <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>TO DO</option>
                <option>IN PROGRESS</option>
                <option>IN REVIEW</option>
                <option>TESTING</option>
                <option>LAUNCHED</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Summary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter issue summary"
              className="w-full px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter issue description"
              rows={6}
              className="w-full px-4 py-3 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Assignee
            </label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option>Unassigned</option>
              <option>Alana Song</option>
              <option>Amar Sundaram</option>
              <option>Jie Yan</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>Highest</option>
            </select>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Labels
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Add a label"
                className="flex-1 px-4 py-2.5 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLabel();
                  }
                }}
              />
              <button
                type="button"
                onClick={addLabel}
                className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors duration-200"
              >
                Add
              </button>
            </div>
            {formData.labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.labels.map(label => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={() => removeLabel(label)}
                      className="text-blue-700 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded hover:bg-blue-800 transition-colors duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-secondary text-foreground text-sm font-semibold rounded hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
