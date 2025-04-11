import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

    const result = await res.json();
    if (res.ok) {
      alert('Signup successful! Please log in.');
      navigate('/login');
    } else {
      alert(result.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-md rounded-xl space-y-4 w-96">
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <input className="w-full border p-2" placeholder="Name" {...register('name')} />
        <input className="w-full border p-2" placeholder="Mobile Number" {...register('mobile')} />
        <input className="w-full border p-2" placeholder="Email" {...register('email')} />
        <input className="w-full border p-2" type="password" placeholder="Password" {...register('password')} />
        <select className="w-full border p-2" {...register('role')}>
          <option value="owner">Book Owner</option>
          <option value="seeker">Book Seeker</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
