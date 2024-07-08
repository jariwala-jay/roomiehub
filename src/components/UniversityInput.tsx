import React, { useState } from "react";
import axios from "axios";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const UniversityInput = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    onChange(e);

    if (value.length > 1) {
      try {
        const response = await axios.get("http://universities.hipolabs.com/search", {
          params: {
            name: value,
          },
        });
        setSuggestions(response.data.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching university suggestions:", error);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (university) => {
    onChange({ target: { name: "university", value: university.name } });
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    if (!suggestions.some(suggestion => suggestion.name === value)) {
      onChange({ target: { name: "university", value: "" } });
    }
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor="university" className="block text-sm font-medium text-gray-700">
        University
      </label>
      <input
        type="text"
        id="university"
        name="university"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        required
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {suggestions.map((university) => (
            <li
              key={university.name}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onMouseDown={() => handleSuggestionClick(university)}
            >
              <AccountBalanceIcon className="w-5 h-5 mr-2"/>
              {university.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversityInput;
