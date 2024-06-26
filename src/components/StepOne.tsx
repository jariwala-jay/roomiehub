import React from 'react';

interface StepOneProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, handleChange, handleNext }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">Contact No</label>
        <input
          type="text"
          id="contact_no"
          name="contact_no"
          value={formData.contact_no}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
        <input
          type="text"
          id="university"
          name="university"
          value={formData.university}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Next
      </button>
    </form>
  );
};

export default StepOne;
