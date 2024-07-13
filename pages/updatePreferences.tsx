import { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Checkbox from '@mui/joy/Checkbox'; // Import MUI Checkbox

interface Preferences {
  preferred_date: string;
  preferred_veg_nonveg: string;
  preference_checklist: string[];
  have_room: string;
}

const UpdatePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            "http://localhost:5000/api/users/preferences"
          );
          setPreferences(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load preferences.");
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (preferences) {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {
        setPreferences({
          ...preferences,
          preference_checklist: checked
            ? [...preferences.preference_checklist, value]
            : preferences.preference_checklist.filter((item) => item !== value),
        });
      } else {
        setPreferences({ ...preferences, [name]: value });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios.put(
          "http://localhost:5000/api/users/preferences",
          preferences
        );
        alert("Preferences updated successfully");
      }
    } catch (err) {
      setError("Failed to update preferences.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProtectedRoute>
      {preferences && (
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
              value={preferences.preferred_date}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            <label className="block text-sm font-medium text-gray-700">
              Preferences Checklist
            </label>
            <div className=" flex flex-col mt-1 space-y-2">
              <Checkbox
                color="neutral"
                size="md"
                variant="soft"
                label="Male Only"
                name="preference_checklist"
                value="male only"
                onChange={handleChange}
                checked={preferences.preference_checklist.includes("male only")}
              />
              <Checkbox
                color="neutral"
                size="md"
                variant="soft"
                label="Female Only"
                name="preference_checklist"
                value="female only"
                onChange={handleChange}
                checked={preferences.preference_checklist.includes(
                  "female only"
                )}
              />
              <Checkbox
                color="neutral"
                size="md"
                variant="soft"
                label="Non-Smoker"
                name="preference_checklist"
                value="non-smoker"
                onChange={handleChange}
                checked={preferences.preference_checklist.includes(
                  "non-smoker"
                )}
              />
              <Checkbox
                color="neutral"
                size="md"
                variant="soft"
                label="Non-Drinker"
                name="preference_checklist"
                value="non-drinker"
                onChange={handleChange}
                checked={preferences.preference_checklist.includes(
                  "non-drinker"
                )}
              />
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
              value={preferences.have_room}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Any">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#333231] transition-colors duration-300 text-white rounded-xl border-r-4 border-b-4 border-[#eeeeee00] hover:border-[#ffc336]"
          >
            Save Preferences
          </button>
        </form>
      )}
    </ProtectedRoute>
  );
};

export default UpdatePreferences;
