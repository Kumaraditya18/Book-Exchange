import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7f3] space-y-50">
      <h1 className="text-4xl text- font-bold">Welcome to Book Exchange Portal</h1>
      <div className="space-x-5">
        <Link to="/signup" className="bg-blue-500 text-white px-4 py-3 rounded-lg">Signup</Link>
        <Link to="/login" className="bg-green-500 text-white px-4 py-3 rounded-lg">Login</Link>
      </div>
    </div>
  );
};

export default Home;
