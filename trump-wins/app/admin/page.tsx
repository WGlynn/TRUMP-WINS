'use client';

import { useState, useEffect } from 'react';
import { Win } from '@/lib/db';
import WinForm from '@/components/WinForm';
import { format } from 'date-fns';

export default function AdminPage() {
  const [wins, setWins] = useState<Win[]>([]);
  const [editingWin, setEditingWin] = useState<Win | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWins = async () => {
    try {
      const response = await fetch('/api/wins');
      const data = await response.json();
      setWins(data);
    } catch (error) {
      console.error('Error fetching wins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWins();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this win?')) return;

    try {
      const response = await fetch(`/api/wins/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchWins();
      }
    } catch (error) {
      console.error('Error deleting win:', error);
    }
  };

  const handleSuccess = () => {
    setEditingWin(null);
    setShowAddForm(false);
    fetchWins();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Panel - Trump Wins Database
          </h1>
          <p className="text-gray-600">
            Manage and curate Trump administration achievements
          </p>
        </div>

        {/* Add New Win Button */}
        {!showAddForm && !editingWin && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              + Add New Win
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingWin) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingWin ? 'Edit Win' : 'Add New Win'}
            </h2>
            <WinForm
              win={editingWin || undefined}
              onSuccess={handleSuccess}
              onCancel={() => {
                setEditingWin(null);
                setShowAddForm(false);
              }}
            />
          </div>
        )}

        {/* Wins List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">All Wins ({wins.length})</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : wins.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No wins yet. Add your first win!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {wins.map((win) => (
                <div key={win.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {win.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{win.description}</p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {win.area}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                          {win.size}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                          {win.person}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                          {format(new Date(win.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      {win.sourceLink && (
                        <a
                          href={win.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                        >
                          View Source →
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setEditingWin(win)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(win.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Link to Public Site */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:underline font-medium"
          >
            ← View Public Site
          </a>
        </div>
      </div>
    </div>
  );
}
