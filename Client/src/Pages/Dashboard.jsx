import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', location: '', contact: '' });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    if (!u) return navigate('/login');
    setUser(u);
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:5000/api/books');
    const data = await res.json();
    setBooks(data);
    setFilteredBooks(data);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const book = { ...newBook, owner: user.name };
    const res = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (res.ok) {
      fetchBooks();
      setNewBook({ title: '', author: '', location: '', contact: '' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.location.toLowerCase().includes(query)
      )
    );
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user.name} ({user.role})</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {user.role === 'owner' && (
        <form onSubmit={handleAddBook} className="bg-white p-4 rounded-lg shadow space-y-3">
          <h2 className="text-lg font-semibold">Add a Book</h2>
          <input className="w-full border p-2 rounded" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Location" value={newBook.location} onChange={e => setNewBook({ ...newBook, location: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Contact" value={newBook.contact} onChange={e => setNewBook({ ...newBook, contact: e.target.value })} />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" type="submit">Add Book</button>
        </form>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Listings</h2>
          <input
            className="border rounded px-3 py-2 w-64"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title, author or location"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <p><span className="font-semibold"> Title:</span> {book.title}</p>
              <p><span className="font-semibold"> Author:</span> {book.author}</p>
              <p><span className="font-semibold"> Owner:</span> {book.owner}</p>
              <p><span className="font-semibold"> Location:</span> {book.location}</p>
              <p><span className="font-semibold"> Contact:</span> {book.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
