import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(result.message || 'Signup failed');
      }
    } catch (err) {
      toast.error('Network error. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4edde] px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 shadow-lg rounded-xl space-y-5 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Your Account</h2>

        <div>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            placeholder="Full Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            placeholder="Mobile Number"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit number',
              },
            })}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
        </div>

        <div>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            placeholder="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            {...register('role')}
            defaultValue="owner"
          >
            <option value="owner">Book Owner</option>
            <option value="seeker">Book Seeker</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-medium px-4 py-3 rounded-lg w-full"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </motion.form>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-green-600 hover:underline text-lg"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default SignUp;
