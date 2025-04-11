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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
    const data = await res.json();
    setBooks(data);
    setFilteredBooks(data);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const book = { ...newBook, owner: user.name, status: 'Available' };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (res.ok) {
      fetchBooks();
      setNewBook({ title: '', author: '', location: '', contact: '' });
    }
  };

  const toggleBookStatus = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}/status`, {
      method: 'PATCH',
    });
    if (res.ok) {
      fetchBooks();
    } else {
      alert('Failed to update book status.');
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

  if (!user) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f3e9d8] p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{user.name}</span> ({user.role})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Add Book Form */}
      {user.role === 'owner' && (
        <form
          onSubmit={handleAddBook}
          className="bg-white p-6 rounded-lg shadow space-y-4 border"
        >
          <h2 className="text-xl font-semibold text-gray-700">📚 Add a New Book</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="border p-3 rounded w-full" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
            <input className="border p-3 rounded w-full" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
            <input className="border p-3 rounded w-full" placeholder="Location" value={newBook.location} onChange={e => setNewBook({ ...newBook, location: e.target.value })} />
            <input className="border p-3 rounded w-full" placeholder="Contact" value={newBook.contact} onChange={e => setNewBook({ ...newBook, contact: e.target.value })} />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
            Add Book
          </button>
        </form>
      )}

      {/* Book Listings */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">📖 All Listings</h2>
          <input
            className="border rounded px-4 py-2 w-full sm:w-80"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title, author or location"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border shadow-sm hover:shadow-md transition">
              <div className="space-y-1 text-gray-700">
                <p><span className="font-semibold">📘 Title:</span> {book.title}</p>
                <p><span className="font-semibold">✍️ Author:</span> {book.author}</p>
                <p><span className="font-semibold">👤 Owner:</span> {book.owner}</p>
                <p><span className="font-semibold">📍 Location:</span> {book.location}</p>
                <p><span className="font-semibold">📞 Contact:</span> {book.contact}</p>
                <p><span className="font-semibold">📌 Status:</span> <span className={book.status === 'Available' ? 'text-green-600' : 'text-red-500'}>{book.status}</span></p>
              </div>

              {/* Action Button */}
              <div className="mt-3">
                {user.role === 'seeker' && book.status === 'Available' && (
                  <button
                    onClick={() => toggleBookStatus(book._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                  >
                    Rent
                  </button>
                )}

                {user.role === 'owner' && book.owner === user.name && book.status === 'Rented' && (
                  <button
                    onClick={() => toggleBookStatus(book._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
                  >
                    Mark as Returned
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
