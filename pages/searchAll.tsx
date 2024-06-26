import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import Modal from "react-modal";
import Slider from "@mui/material/Slider";

const SearchAll = () => {
  const [preferences, setPreferences] = useState({
    veg_nonveg: "Any",
    preference_checklist: [],
    have_room: "Any",
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    budget: [0, 10000],
    city: "",
    veg_nonveg: "Any",
    preference_checklist: [],
    have_room: "Any",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    const fetchPreferencesAndSearch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Fetch preferences
          const preferencesResponse = await axios.get(
            "http://localhost:5000/api/users/preferences"
          );
          const prefs = preferencesResponse.data;
          setPreferences(prefs);

          // Fetch user profile
          const userProfileResponse = await axios.get(
            "http://localhost:5000/api/users/profile"
          );
          const userProfile = userProfileResponse.data;
          const userBudgetMax = userProfile.budget * 1.2;

          setFilters({
            budget: [0, userBudgetMax],
            city: userProfile.city || "",
            veg_nonveg: prefs.veg_nonveg || "Any",
            preference_checklist: prefs.preference_checklist || [],
            have_room: prefs.have_room || "Any",
          });

          // Initial search with combined preferences and profile data
          const initialSearchCriteria = {
            ...prefs,
            budget_min: 0,
            budget_max: userBudgetMax,
            city: userProfile.city || "",
          };

          const searchResponse = await axios.post(
            "http://localhost:5000/api/users/searchAll",
            initialSearchCriteria
          );
          setResults(searchResponse.data);
        }
      } catch (err) {
        setError("Failed to fetch preferences or search for roommates.");
      }
    };

    fetchPreferencesAndSearch();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleChecklistChange = (event) => {
    const { value, checked } = event.target;
    let updatedChecklist = [...filters.preference_checklist];
    if (checked) {
      updatedChecklist.push(value);
    } else {
      updatedChecklist = updatedChecklist.filter((item) => item !== value);
    }
    setFilters({ ...filters, preference_checklist: updatedChecklist });
  };

  const handleBudgetChange = (event, newValue) => {
    setFilters({ ...filters, budget: newValue });
  };

  const applyFilters = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const filterCriteria = {
          city: filters.city,
          preferred_veg_nonveg: filters.veg_nonveg,
          preference_checklist: filters.preference_checklist,
          have_room: filters.have_room,
          budget_min: filters.budget[0],
          budget_max: filters.budget[1],
        };
        console.log("Applying Filters:", filterCriteria); // Debugging line
        const searchResponse = await axios.post(
          "http://localhost:5000/api/users/searchAll",
          filterCriteria
        );
        setResults(searchResponse.data);
      }
      setIsFilterModalOpen(false);
    } catch (err) {
      setError("Failed to apply filters.");
    }
  };

  const filteredResults = results.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const checklistOptions = [
    "male only",
    "female only",
    "non-smoker",
    "non-drinker",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Search Results</h2>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by any keyword"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Filters
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {filteredResults.length === 0 ? (
          <p className="text-lg">No results found</p>
        ) : (
          filteredResults.map((user) => (
            <ProfileCard key={user.id} user={user} currentUser={currentUser} />
          ))
        )}
      </div>
      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        contentLabel="Filters"
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Filter Options</h2>
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Budget
          </label>
          <Slider
            value={filters.budget}
            onChange={handleBudgetChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={4000}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="veg_nonveg"
            className="block text-sm font-medium text-gray-700"
          >
            Veg/Non-Veg
          </label>
          <select
            id="veg_nonveg"
            name="veg_nonveg"
            value={filters.veg_nonveg}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Any">Any</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="preference_checklist"
            className="block text-sm font-medium text-gray-700"
          >
            Preferences
          </label>
          <div>
            {checklistOptions.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`preference_${index}`}
                  value={item}
                  checked={filters.preference_checklist.includes(item)}
                  onChange={handleChecklistChange}
                  className="mr-2"
                />
                <label htmlFor={`preference_${index}`}>{item}</label>
              </div>
            ))}
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
            value={filters.have_room}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </Modal>
    </div>
  );
};

export default SearchAll;
