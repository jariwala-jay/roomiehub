import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Preferences {
  gender: string;
  age_min: number;
  age_max: number;
  budget_min: number;
  budget_max: number;
  veg_nonveg: string;
}

const UpdatePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    gender: 'Any',
    age_min: 18,
    age_max: 100,
    budget_min: 0,
    budget_max: 100000,
    veg_nonveg: 'Any',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('http://localhost:5000/api/users/preferences');
          setPreferences(response.data);
        }
      } catch (err) {
        setError('Failed to fetch preferences.');
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.put('http://localhost:5000/api/users/preferences', preferences);
        alert('Profile updated successfully');
      }
    } catch (err) {
      setError('Failed to update preferences.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Update Preferences</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Preferred Gender</label>
          <select
            id="gender"
            name="gender"
            value={preferences.gender}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="age_min" className="block text-sm font-medium text-gray-700">Age Minimum</label>
          <input
            type="number"
            id="age_min"
            name="age_min"
            value={preferences.age_min}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age_max" className="block text-sm font-medium text-gray-700">Age Maximum</label>
          <input
            type="number"
            id="age_max"
            name="age_max"
            value={preferences.age_max}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget_min" className="block text-sm font-medium text-gray-700">Budget Minimum</label>
          <input
            type="number"
            id="budget_min"
            name="budget_min"
            value={preferences.budget_min}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget_max" className="block text-sm font-medium text-gray-700">Budget Maximum</label>
          <input
            type="number"
            id="budget_max"
            name="budget_max"
            value={preferences.budget_max}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="veg_nonveg" className="block text-sm font-medium text-gray-700">Veg/Non-Veg Preference</label>
          <select
            id="veg_nonveg"
            name="veg_nonveg"
            value={preferences.veg_nonveg}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Any">Any</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default UpdatePreferences;
