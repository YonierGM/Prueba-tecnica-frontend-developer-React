import { useState, useEffect } from "react";
import { getEmployees } from "../../../services/EmployeeService";

const useEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (err) {
                setError("Error al cargar los empleados");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    return { employees, loading, error };
};

export default useEmployee;
