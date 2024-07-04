import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff7e4]">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-[1100px] h-[600px] w-full">
        <div className='grid grid-cols-2 items-center h-full '>
          <div className='flex flex-col items-center'>
          <div className=' w-[80%]'>
        <div className="flex flex-col mb-12">
          <img src="/logo.png" alt="RoomieHub Logo" className="mb-12 w-1/2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            Please sign to your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-xl"
            />
          </div>
          <div>
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#333231]   transition-colors duration-300 text-white rounded-xl border-r-4 border-b-4  border-[#eeeeee00] border-r-4 hover:border-b-4 hover:border-r-4 hover:border-[#ffc336]"
          >
            Sign in
          </button>
        </form>
        {error && <div className="text-red-500 mb-4 text-center mt-2  ">{error}</div>}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#ffc336] underline">
            Register
          </a>
        </p>
        </div>
        </div>
        <div className='pic'>
        <img src="/login.png" alt="RoomieHub Login" className="mb-2 rounded-xl" />
          </div>
          </div>  
      </div>
    </div>
  );
};

export default Login;
