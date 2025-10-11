
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonLoader from './SkeletonLoader';

const ITEMS_PER_PAGE = 10;

const ListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 1, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/getdata', {});
        if (response.data && response.data.TABLE_DATA && Array.isArray(response.data.TABLE_DATA.data)) {
          setEmployees(response.data.TABLE_DATA.data);
          setError('');
        } else {
          setError('Data received, but format is incorrect.');
        }
      } catch (error) {
        console.error("API Call Failed! Error:", error);
        setError('Could not fetch data from the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAndSortedEmployees = useMemo(() => {
    let sortableItems = [...employees];

    // Filter logic
    if (searchTerm) {
      sortableItems = sortableItems.filter(emp =>
        emp[0].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort logic
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = sortConfig.key === 5 ? parseFloat(a[sortConfig.key].replace(/,/g, '')) : a[sortConfig.key];
        const valB = sortConfig.key === 5 ? parseFloat(b[sortConfig.key].replace(/,/g, '')) : b[sortConfig.key];
        
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [employees, searchTerm, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / ITEMS_PER_PAGE);
  const currentItems = filteredAndSortedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  if (error) return <div className="page-container error-message">{error}</div>;

  return (
    <div className="page-container">
      <h1>Employee List</h1>
      <div className="action-buttons">
        <button onClick={() => navigate('/chart', { state: { employees } })}>Salary Bar Chart</button>
        <button onClick={() => navigate('/pie-chart', { state: { employees } })}>City Pie Chart</button>
        <button onClick={() => navigate('/map', { state: { employees } })}>View City Map</button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => requestSort(3)}>ID</th>
            <th onClick={() => requestSort(0)}>Name</th>
            <th onClick={() => requestSort(1)}>Position</th>
            <th onClick={() => requestSort(2)}>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)
          ) : (
            currentItems.map((emp, index) => (
              <tr key={`emp-${emp[3]}-${index}`}>
                <td>{emp[3]}</td>
                <td>{emp[0]}</td>
                <td>{emp[1]}</td>
                <td>{emp[2]}</td>
                <td>
                  <Link to={`/details/${emp[3]}`} state={{ employee: emp }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {!loading && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListPage;
