import { useState } from "react";
import useEmployee from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeFilter from "../components/EmployeFilters";
import ReactPaginate from "react-paginate";
import "./List.css";
import Spinner from "../../../componentes/spinner/spinner";

const List = () => {
    const { employees, loading, error } = useEmployee();
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Determinar qué empleados mostrar en la página actual
    const employeesToShow = filteredEmployees.length ? filteredEmployees : employees;
    const offset = currentPage * itemsPerPage;
    const currentItems = employeesToShow.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(employeesToShow.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="main">
            {loading && <Spinner />}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <EmployeeFilter employees={employees} setFilteredEmployees={setFilteredEmployees} />
                    <EmployeeTable employees={currentItems} />
                    
                    {/* PAGINACIÓN */}
                    <div className="content-paginate">
                        <ReactPaginate
                            previousLabel="«"
                            nextLabel="»"
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="paginacion"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="selected"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default List;
