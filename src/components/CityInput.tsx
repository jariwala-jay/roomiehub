
import React, { useState } from "react";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CityInput = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    onChange(e); // Pass the event object

    if (value.length > 1) {
      try {
        const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=5&countryIds=US,ES,CA,AU,GB,IN&offset=0`,
          {
            params: { namePrefix: value },
            headers: {
              "X-RapidAPI-Key": "f6fdd2092emsh2e9beaadcc95556p1b7405jsn40b30084351e", // Replace with your RapidAPI key
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    onChange({ target: { name: "city", value: city.name } });
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    if (!suggestions.some(suggestion => suggestion.name === value)) {
      onChange({ target: { name: "city", value: "" } });
    }
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
        City
      </label>
      <input
        type="text"
        id="city"
        name="city"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        required
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onMouseDown={() => handleSuggestionClick(city)}
            >
              <LocationOnIcon className="w-5 h-5 mr-2"/>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityInput;
