import React, { useState } from "react";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CityInput = ({ formData, setFormData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 1) {
      try {
        const response = await axios.get("http://geodb-free-service.wirefreethought.com/v1/geo/cities", {
          params: {
            namePrefix: value,
            limit: 5,
          },
        });
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
    setFormData({ ...formData, city: city.name });
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    if (!suggestions.some(suggestion => suggestion.name === formData.city)) {
      setFormData({ ...formData, city: "" });
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
        value={formData.city}
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
              onClick={() => handleSuggestionClick(city)}
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

