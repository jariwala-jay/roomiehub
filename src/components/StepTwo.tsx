import React from 'react';

interface StepTwoProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ formData, handleChange, handleBack, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input
          type="text"
          id="profile_pic"
          name="profile_pic"
          value={formData.profile_pic}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="veg_nonveg" className="block text-sm font-medium text-gray-700">Veg/Non-Veg</label>
        <select
          id="veg_nonveg"
          name="veg_nonveg"
          value={formData.veg_nonveg}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Option</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="drinker" className="block text-sm font-medium text-gray-700">Drinker</label>
        <select
          id="drinker"
          name="drinker"
          value={formData.drinker}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="smoker" className="block text-sm font-medium text-gray-700">Smoker</label>
        <select
          id="smoker"
          name="smoker"
          value={formData.smoker}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="have_room" className="block text-sm font-medium text-gray-700">Have Room</label>
        <select
          id="have_room"
          name="have_room"
          value={formData.have_room}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
