import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Preferences {
  preferred_date: string;
  preferred_veg_nonveg: string;
  preference_checklist: string[];
  have_room: string;
}

const SetPreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    preferred_date: '',
    preferred_veg_nonveg: 'Any',
    preference_checklist: [],
    have_room: 'no',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        preference_checklist: checked
          ? [...prevPreferences.preference_checklist, value]
          : prevPreferences.preference_checklist.filter((item) => item !== value),
      }));
    } else {
      setPreferences({ ...preferences, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(preferences)
      const Response = await axios.post('http://localhost:5000/api/users/preferences', preferences);
      console.log(Response.data);
      router.push('/login');
    } catch (err) {
      setError('Failed to set preferences. ' + err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Set Preferences</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input
            type="date"
            id="preferred_date"
            name="preferred_date"
            value={preferences.preferred_date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preferred_veg_nonveg" className="block text-sm font-medium text-gray-700">Preferred Veg/Non-Veg</label>
          <select
            id="preferred_veg_nonveg"
            name="preferred_veg_nonveg"
            value={preferences.preferred_veg_nonveg}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Any">Any</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Preferences Checklist</label>
          <div className="mt-1 space-y-2">
            <label>
              <input
                type="checkbox"
                name="preference_checklist"
                value="male only"
                onChange={handleChange}
                className="mr-2"
              />
              Male Only
            </label>
            <label>
              <input
                type="checkbox"
                name="preference_checklist"
                value="female only"
                onChange={handleChange}
                className="mr-2"
              />
              Female Only
            </label>
            <label>
              <input
                type="checkbox"
                name="preference_checklist"
                value="non-smoker"
                onChange={handleChange}
                className="mr-2"
              />
              Non-Smoker
            </label>
            <label>
              <input
                type="checkbox"
                name="preference_checklist"
                value="non-drinker"
                onChange={handleChange}
                className="mr-2"
              />
              Non-Drinker
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="have_room" className="block text-sm font-medium text-gray-700">Have Room</label>
          <select
            id="have_room"
            name="have_room"
            value={preferences.have_room}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
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

export default SetPreferences;
