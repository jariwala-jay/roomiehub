import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Checkbox from '@mui/joy/Checkbox';


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
    <div
      style={{
        backgroundImage: "url(/overlay-2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#fff7e4] p-4"
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-[1100px] min-h-[600px] w-full">
        <img
          src="/logo.png"
          alt="RoomieHub Logo"
          className="mb-6 min-w-[150px] w-1/5 mx-auto  "
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center h-full ">
          <div className="pic hidden sm:flex">
            <img
              src="/login.png"
              alt="RoomieHub Login"
              className="mb-2 rounded-xl "
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[90%] sm:w-[80%]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Set Preferences
              </h2>

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
                      label="Male Only"
                      size="md"
                      variant="soft"
                    />
                    <Checkbox
                      color="neutral"
                      label="Female Only"
                      size="md"
                      variant="soft"
                    />
                    <Checkbox
                      color="neutral"
                      label="Non-Smoker"
                      size="md"
                      variant="soft"
                    />
                    <Checkbox
                      color="neutral"
                      label="Non-Drinker"
                      size="md"
                      variant="soft"
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
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#333231]   transition-colors duration-300 text-white rounded-xl border-r-4 border-b-4  border-[#eeeeee00] border-r-4 hover:border-b-4 hover:border-r-4 hover:border-[#ffc336]"
                >
                  Save Preferences
                </button>
              </form>
              {error && (
                <div className="text-red-500 mb-4 text-center mt-2  ">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPreferences;
