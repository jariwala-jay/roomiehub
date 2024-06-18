import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    gender: 'Any',
    age_min: 18,
    age_max: 100,
    budget_min: 0,
    budget_max: 100000,
    veg_nonveg: 'Any',
  });
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPreferencesAndSearch = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const preferencesResponse = await axios.get('http://localhost:5000/api/users/preferences');
          setPreferences(preferencesResponse.data);

          const searchResponse = await axios.post('http://localhost:5000/api/users/search', preferencesResponse.data);
          setResults(searchResponse.data);
        }
      } catch (err) {
        setError('Failed to fetch preferences or search for roommates.');
      }
    };

    fetchPreferencesAndSearch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full max-w-md">
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map(user => (
            <div key={user.id} className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow">
              <h4 className="text-lg font-bold">{user.name}</h4>
              <p>Age: {user.age}</p>
              <p>Gender: {user.gender}</p>
              <p>Contact Info: {user.contact_info}</p>
              <p>Email: {user.email}</p>
              <p>Country: {user.country}</p>
              <p>State: {user.state}</p>
              <p>City: {user.city}</p>
              <p>University: {user.university}</p>
              <p>Budget: {user.budget}</p>
              <p>Veg/Non-Veg: {user.veg_nonveg}</p>
              <p>Other Requirements: {user.other_requirements}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
