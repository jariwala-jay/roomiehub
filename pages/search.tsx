import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
      <h2 className="text-3xl font-bold pb-[50px]">Search Results</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {results.length === 0 ? (
          <p className="text-lg">No results found</p>
        ) : (
          results.map((user) => (
            
              <div
                key={user.id}
                className=" w-full mx-auto p-6 m-4 bg-white dark:bg-gray-950 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16">
                    <img src="/placeholder-user.jpg" />
                  </div>
                  <div>
                    <h2 className=" text-xxl font-semibold">John Doe</h2>
                    <p className="text-[#ff3a3a] dark:text-gray-400 text-sm">
                      <span className="font-medium">Age:</span> {user.age} |{" "}
                      <span className="font-medium">Gender:</span> {user.gender}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Contact:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.contact_info}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Email:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Country:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.country}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      State:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.state}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      City:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      University:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.university}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Budget:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      ${user.budget}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Dietary Preference:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.veg_nonveg}
                    </span>
                  </div>
                </div>
              </div>
             
            
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
