import { useEffect, useState } from 'react';
import './App.css';

export default function Pagination() {

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);




  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((data) => data.json())
      .then((data) => {
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / 10));
      })
      .catch((error) => {
        alert("Failed to fetch data");
        console.error("Error fetching data:", error);
      });

  }, [])




  const handlePrevious = () => {

    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleNext = () => {

    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const startIndex = (currentPage - 1) * 10;

  const endIndex = Math.min(startIndex + 10, employees.length)





  return (
    <div className="page">

      <h2>Employee Data Table</h2>


      <table>

        <thead>

          <tr>
            <th className='title_box'>ID</th>
            <th className='title_box'>Name</th>
            <th className='title_box'>Email</th>
            <th className='title_box'>Role</th>
          </tr>

        </thead>



        <tbody>

          {employees.slice(startIndex, endIndex).map((employee) => (

            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}

        </tbody>


      </table>


      <div className='pagination'>
        
        <button onClick={handlePrevious} disabled = {currentPage === 1}>
          Previous
        </button>


        <span className='currentPage'>{currentPage}</span>


        <button onClick={handleNext} disabled = {currentPage === totalPages}>
          Next
        </button>


      </div>
      
    </div>
  );
}


