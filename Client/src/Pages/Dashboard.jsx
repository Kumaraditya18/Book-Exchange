import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', location: '', contact: '', coverImage: '' });
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
      setNewBook({ title: '', author: '', location: '', contact: '', coverImage: '' });
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

  const renderBookCard = (book, i) => (
    <div key={i} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition overflow-hidden">
      <img
        src={book.coverImage || 'https://placehold.co/300x200?text=No+Cover'}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-1 text-gray-700">
        <p><span className="font-semibold">📘 Title:</span> {book.title}</p>
        <p><span className="font-semibold">✍️ Author:</span> {book.author}</p>
        <p><span className="font-semibold">👤 Owner:</span> {book.owner}</p>
        <p><span className="font-semibold">📍 Location:</span> {book.location}</p>
        <p><span className="font-semibold">📞 Contact:</span> {book.contact}</p>
        <p><span className="font-semibold">📌 Status:</span> <span className={book.status === 'Available' ? 'text-green-600' : 'text-red-500'}>{book.status}</span></p>
      </div>
      <div className="p-4">
        {user.role === 'seeker' && book.status === 'Available' && (
          <button
            onClick={() => toggleBookStatus(book._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full"
          >
            Rent
          </button>
        )}

        {user.role === 'owner' && book.owner === user.name && book.status === 'Rented' && (
          <button
            onClick={() => toggleBookStatus(book._id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow w-full"
          >
            Mark as Returned
          </button>
        )}
      </div>
    </div>
  );

  if (!user) return <p className="text-center text-lg mt-10">Loading...</p>;

  const yourBooks = filteredBooks.filter(b => b.owner === user.name);
  const availableBooks = filteredBooks.filter(b => b.status === 'Available' && b.owner !== user.name);

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
            <input className="border p-3 rounded w-full" placeholder="Cover Image URL" value={newBook.coverImage} onChange={e => setNewBook({ ...newBook, coverImage: e.target.value })} />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
            Add Book
          </button>
        </form>
      )}

      {/* Search Bar */}
      <div className="flex justify-end">
        <input
          className="border rounded px-4 py-2 w-full sm:w-80"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title, author or location"
        />
      </div>

      {/* Your Books (for owners) */}
      {user.role === 'owner' && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📘 Your Books</h2>
          {yourBooks.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {yourBooks.map(renderBookCard)}
            </div>
          ) : (
            <p className="text-gray-600">You haven't added any books yet.</p>
          )}
        </div>
      )}

      {/* Available Books */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📖 Available Books</h2>
        {availableBooks.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableBooks.map(renderBookCard)}
          </div>
        ) : (
          <p className="text-gray-600">No available books at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
