'use client';

import { useState, useEffect } from 'react';
import { Win } from '@/lib/db';
import { AREAS, SIZES, PERSONS } from '@/lib/constants';
import { format } from 'date-fns';

export default function Home() {
  const [wins, setWins] = useState<Win[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const fetchWins = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      selectedAreas.forEach((area) => params.append('area', area));
      selectedSizes.forEach((size) => params.append('size', size));
      selectedPersons.forEach((person) => params.append('person', person));

      const response = await fetch(`/api/wins?${params.toString()}`);
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
  }, [searchTerm, selectedAreas, selectedSizes, selectedPersons]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedAreas([]);
    setSelectedSizes([]);
    setSelectedPersons([]);
  };

  const activeFiltersCount =
    selectedAreas.length + selectedSizes.length + selectedPersons.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">
            Trump Administration Wins Database
          </h1>
          <p className="text-blue-200 text-lg">
            A comprehensive catalog of achievements and victories
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search wins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Filters</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Area Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Area</h4>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() =>
                      toggleFilter(area, selectedAreas, setSelectedAreas)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedAreas.includes(area)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      toggleFilter(size, selectedSizes, setSelectedSizes)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Person Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Person</h4>
              <div className="flex flex-wrap gap-2">
                {PERSONS.map((person) => (
                  <button
                    key={person}
                    onClick={() =>
                      toggleFilter(person, selectedPersons, setSelectedPersons)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedPersons.includes(person)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {person}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {isLoading ? (
            'Loading...'
          ) : (
            <span className="font-medium">
              {wins.length} {wins.length === 1 ? 'win' : 'wins'} found
            </span>
          )}
        </div>

        {/* Wins List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading wins...</div>
        ) : wins.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No wins found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {wins.map((win) => (
              <div
                key={win.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900 flex-1">
                    {win.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${
                      win.size === 'Yuge'
                        ? 'bg-red-100 text-red-800'
                        : win.size === 'Bigly'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {win.size}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{win.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {win.area}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {win.person}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {format(new Date(win.date), 'MMMM d, yyyy')}
                  </span>
                </div>

                {win.sourceLink && (
                  <a
                    href={win.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium inline-flex items-center"
                  >
                    View Source
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Admin Link */}
        <div className="mt-12 text-center border-t border-gray-300 pt-8">
          <a
            href="/admin"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Admin Panel →
          </a>
        </div>
      </div>
    </div>
  );
}
