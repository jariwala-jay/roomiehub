import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Preferences = () => {
  const [formData, setFormData] = useState({
    preferred_date: "",
    preferred_veg_nonveg: "",
    preference_checklist: [],
    have_room: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const userId = localStorage.getItem("user_id");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        preference_checklist: checked
          ? [...prevData.preference_checklist, value]
          : prevData.preference_checklist.filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register/preferences", {
        user_id: userId,
        ...formData,
      });
      router.push("/login");
    } catch (error) {
      setError("Failed to set preferences. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Set Preferences</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="preferred_date"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Date
          </label>
          <input
            type="date"
            id="preferred_date"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="preferred_veg_nonveg"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Veg/Non-Veg
          </label>
          <select
            id="preferred_veg_nonveg"
            name="preferred_veg_nonveg"
            value={formData.preferred_veg_nonveg}
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
          <label className="block text-sm font-medium text-gray-700">
            Preferences Checklist
          </label>
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
          <label
            htmlFor="have_room"
            className="block text-sm font-medium text-gray-700"
          >
            Have Room
          </label>
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Finish Registration
        </button>
      </form>
    </div>
  );
};

export default Preferences;
