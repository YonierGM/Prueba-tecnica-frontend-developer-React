import { useNavigate } from "react-router-dom";
import "./EmployeeTable.css";

function EmployeeTable({employees}) {
    const navigate = useNavigate();

  return (
    <>
    <div className="content">
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th className="item-table">Correo</th>
                    <th className="item-table">Cargo</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
            {employees.map((employee) => (
                <tr onClick={() => navigate(`/empleados/${employee.id}`)} key={employee.id}>
                    <td>{employee.attributes.first_name}</td>
                    <td>{employee.attributes.last_name}</td>
                    <td className="item-table">{employee.attributes.email}</td>
                    <td className="item-table">{employee.attributes.charge}</td>
                    <td>${employee.attributes.salary.toLocaleString("es-ES")}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    </>

  )
}

export default EmployeeTable
