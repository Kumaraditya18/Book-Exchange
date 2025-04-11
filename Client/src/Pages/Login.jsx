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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-md rounded-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input className="w-full border p-2" placeholder="Email" {...register('email')} />
        <input className="w-full border p-2" type="password" placeholder="Password" {...register('password')} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline text-sm"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default Login;
