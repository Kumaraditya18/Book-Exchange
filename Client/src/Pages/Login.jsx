import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebe4d4] px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-md p-8 space-y-6 border"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">🔐 Login</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="example@mail.com"
              {...register('email')}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-150 shadow"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-green-500 hover:underline text-lg"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
