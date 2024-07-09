import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import Slider from "@mui/material/Slider";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import Checkbox from "@mui/joy/Checkbox";
import CityInput from "@/components/CityInput";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

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
  const [filters, setFilters] = useState({
    budget: [0, 10000],
    city: "",
    veg_nonveg: "Any",
    preference_checklist: [],
    have_room: "Any",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
      if (value === "Male Only") {
        updatedChecklist = updatedChecklist.filter(
          (item) => item !== "Female Only"
        );
      } else if (value === "Female Only") {
        updatedChecklist = updatedChecklist.filter(
          (item) => item !== "Male Only"
        );
      }
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
        setIsFilterModalOpen(false);
      }
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
    { label: "Male Only", value: "Male Only" },
    { label: "Female Only", value: "Female Only" },
    { label: "Non-Smoker", value: "Non-Smoker" },
    { label: "Non-Drinker", value: "Non-Drinker" },
  ];

  return (
    <>
     
      <div className="flex flex-col lg:flex-row max-w-[2160px] mx-auto min-h-screen  bg-gray-100 p-6">
        <div className="lg:w-1/4 bg-white max-h-[82vh] p-4 rounded-lg shadow-md hidden lg:block">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold mr-2">Filters</h2>
            <TuneRoundedIcon className="text-[#ffd062]" />
          </div>

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
              style={{ color: "#FFEF39" }}
            />
            <div className="flex items-center justify-between mb-2 text-gray-600">
              <span>{filters.budget[0]}</span>
              <span>{filters.budget[1]}</span>
            </div>
          </div>
          <CityInput value={filters.city} onChange={handleFilterChange} />
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
                  <Checkbox
                    color="neutral"
                    size="md"
                    variant="soft"
                    id={`preference_${index}`}
                    value={item.value}
                    checked={filters.preference_checklist.includes(item.value)}
                    onChange={handleChecklistChange}
                    className="mr-2"
                  />
                  <label htmlFor={`preference_${index}`}>{item.label}</label>
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
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
        <div className="w-full lg:w-3/4 lg:pl-6">
          <div className="flex items-center mb-6 justify-between">
            <div className="flex items-center">
              <img
                src="/search.png"
                className="w-10 items-center justify-center"
                alt=""
              />
              <h2 className="text-3xl ml-2 font-bold">Search Results</h2>
            </div>
            <div className="lg:hidden">
              <IconButton onClick={() => setIsFilterModalOpen(true)}>
                <TuneRoundedIcon className="text-[#ffd062]" />
              </IconButton>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search by any keyword"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3   3xl:grid-cols-4 gap-6 w-full">
            {filteredResults.length === 0 ? (
              <p className="text-lg">No results found</p>
            ) : (
              filteredResults.map((user) => (
                <ProfileCard
                  key={user.id}
                  user={user}
                  currentUser={currentUser}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-20">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold mr-2">Filters</h2>
            <TuneRoundedIcon className="text-[#ffd062]" />
          </div>

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
              style={{ color: "#FFEF39" }}
            />
            <div className="flex items-center justify-between mb-2 text-gray-600">
              <span>{filters.budget[0]}</span>
              <span>{filters.budget[1]}</span>
            </div>
          </div>
          <CityInput value={filters.city} onChange={handleFilterChange} />
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
                  <Checkbox
                    color="neutral"
                    size="md"
                    variant="soft"
                    id={`preference_${index}`}
                    value={item.value}
                    checked={filters.preference_checklist.includes(item.value)}
                    onChange={handleChecklistChange}
                    className="mr-2"
                  />
                  <label htmlFor={`preference_${index}`}>{item.label}</label>
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
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SearchAll;
