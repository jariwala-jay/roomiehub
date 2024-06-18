import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProfileCard from "@/components/ProfileCard"; // Import ProfileCard component

interface Preferences {
  gender: string;
  age_min: number;
  age_max: number;
  budget_min: number;
  budget_max: number;
  veg_nonveg: string;
}

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact_info: string;
  email: string;
  country: string;
  state: string;
  city: string;
  university: string;
  budget: number;
  veg_nonveg: string;
  other_requirements: string;
}

const Search = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    gender: "Any",
    age_min: 18,
    age_max: 100,
    budget_min: 0,
    budget_max: 100000,
    veg_nonveg: "Any",
  });
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPreferencesAndSearch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const preferencesResponse = await axios.get(
            "http://localhost:5000/api/users/preferences"
          );
          setPreferences(preferencesResponse.data);

          const searchResponse = await axios.post(
            "http://localhost:5000/api/users/search",
            preferencesResponse.data
          );
          setResults(searchResponse.data);
        }
      } catch (err) {
        setError("Failed to fetch preferences or search for roommates.");
      }
    };

    fetchPreferencesAndSearch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Search Results</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {results.length === 0 ? (
          <p className="text-lg">No results found</p>
        ) : (
          results.map((user) => (
            <ProfileCard key={user.id} user={user} /> // Use ProfileCard component
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
