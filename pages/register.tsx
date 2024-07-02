import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface FormData {
  full_name: string;
  email: string;
  contact_no: string;
  password: string;
  city: string;
  university: string;
  profile_pic: File | null;
  age: string;
  gender: string;
  budget: string;
  veg_nonveg: string;
  drinker: string;
  smoker: string;
  description: string;
  have_room: string;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    contact_no: "",
    password: "",
    city: "",
    university: "",
    profile_pic: null,
    age: "",
    gender: "",
    budget: "",
    veg_nonveg: "",
    drinker: "",
    smoker: "",
    description: "",
    have_room: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profile_pic: e.target.files[0] });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormData];
        if (value !== null) {
          data.append(key, value);
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      router.push("/setPreferences");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Failed to register user.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {step === 1 && (
          <>
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
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
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
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
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
                value={formData.contact_no}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
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
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="university"
                className="block text-sm font-medium text-gray-700"
              >
                University
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              Next Step
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-4">
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
                required
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
                value={formData.age}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
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
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
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
                value={formData.budget}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
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
                value={formData.veg_nonveg}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Option</option>
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
                value={formData.drinker}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Option</option>
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
                value={formData.smoker}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Option</option>
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
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
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
                value={formData.have_room}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
