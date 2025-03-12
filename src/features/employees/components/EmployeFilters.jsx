import { useState } from "react";
import "./EmployeFilters.css";

function EmployeeFilter({ employees, setFilteredEmployees }) {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        const filtered = employees.filter(employee =>
            employee.attributes.first_name.toLowerCase().includes(term) ||
            employee.attributes.email.toLowerCase().includes(term) ||
            employee.attributes.charge.toLowerCase().includes(term)
        );
        setFilteredEmployees(filtered);
    };

    const handleSort = (field) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortBy(field);
        setSortOrder(order);
        
        const sorted = [...employees].sort((a, b) => {
            if (field === "salary") {
                return order === "asc" ? a.attributes.salary - b.attributes.salary : b.attributes.salary - a.attributes.salary;
            }
            return order === "asc"
                ? a.attributes[field].localeCompare(b.attributes[field])
                : b.attributes[field].localeCompare(a.attributes[field]);
        });
        setFilteredEmployees(sorted);
    };

    return (
        <section className="content">
            <div className="busqueda">
                <input
                    type="text"
                    placeholder="Buscar por nombre, correo o cargo"
                    value={searchTerm}
                    onChange={handleSearch}
                    className=""
                />
                <select onChange={(e) => handleSort(e.target.value)} className="">
                    <option value="">Ordenar por</option>
                    <option value="first_name">Nombre</option>
                    <option value="salary">Salario</option>
                </select>
            </div>
        </section>
    );
}

export default EmployeeFilter;