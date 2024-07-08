
import { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import CityInput from "@/components/CityInput";
import UniversityInput from "@/components/UniversityInput";

interface UserProfile {
  full_name: string;
  age: string;
  gender: string;
  contact_no: string;
  email: string;
  city: string;
  university: string;
  profile_pic: string;
  budget: string;
  veg_nonveg: string;
  drinker: string;
  smoker: string;
  description: string;
  have_room: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            "http://localhost:5000/api/users/profile"
          );
          setProfile(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const formData = new FormData();
        if (profile) {
          formData.append("full_name", profile.full_name);
          formData.append("age", profile.age);
          formData.append("gender", profile.gender);
          formData.append("contact_no", profile.contact_no);
          formData.append("email", profile.email);
          formData.append("city", profile.city);
          formData.append("university", profile.university);
          formData.append("budget", profile.budget);
          formData.append("veg_nonveg", profile.veg_nonveg);
          formData.append("drinker", profile.drinker);
          formData.append("smoker", profile.smoker);
          formData.append("description", profile.description);
          formData.append("have_room", profile.have_room);
        }

        if (selectedFile) {
          formData.append("profile_pic", selectedFile);
        }

        await axios.put("http://localhost:5000/api/users/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Profile updated successfully");
      }
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {profile && (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              {profile.profile_pic && (
                <img
                  src={`data:image/jpeg;base64,${Buffer.from(profile.profile_pic).toString('base64')}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              )}
              <label
                htmlFor="profile_pic"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                onChange={handleFileChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_no"
                className="block text-sm font-medium text-gray-700"
              >
                Contact No
              </label>
              <input
                type="text"
                id="contact_no"
                name="contact_no"
                value={profile.contact_no}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <CityInput value={profile.city} onChange={handleChange} />
            <UniversityInput value={profile.university} onChange={handleChange} />

            <div className="mb-4">
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700"
              >
                Budget
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={profile.budget}
                onChange={handleChange}
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
                value={profile.veg_nonveg}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="drinker"
                className="block text-sm font-medium text-gray-700"
              >
                Drinker
              </label>
              <select
                id="drinker"
                name="drinker"
                value={profile.drinker}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="smoker"
                className="block text-sm font-medium text-gray-700"
              >
                Smoker
              </label>
              <select
                id="smoker"
                name="smoker"
                value={profile.smoker}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
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
                value={profile.have_room}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;

