import { ChangeEvent } from 'react';

interface Preferences {
  gender: string;
  age_min: number;
  age_max: number;
  budget_min: number;
  budget_max: number;
  veg_nonveg: string;
}

interface PreferencesFormProps {
  preferences: Preferences;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PreferencesForm = ({ preferences, handleChange }: PreferencesFormProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Roommate Preferences</h3>
      <div className="mb-4">
        <label htmlFor="pref_gender" className="block text-sm font-medium text-gray-700">Preferred Gender</label>
        <select
          id="pref_gender"
          name="preferences.gender"
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
          name="preferences.age_min"
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
          name="preferences.age_max"
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
          name="preferences.budget_min"
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
          name="preferences.budget_max"
          value={preferences.budget_max}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="veg_nonveg_pref" className="block text-sm font-medium text-gray-700">Veg/Non-Veg Preference</label>
        <select
          id="veg_nonveg_pref"
          name="preferences.veg_nonveg"
          value={preferences.veg_nonveg}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Any">Any</option>
        </select>
      </div>
    </div>
  );
};

export default PreferencesForm;
