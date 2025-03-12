import { useState, useEffect } from "react";
import { getEmployees } from "../../../services/EmployeeService";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const useEmployeeDetail = (id) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalHorasTrabajadasMes, setTotalHorasTrabajadasMes] = useState(0);
    const [diasExtra, setDiasExtra] = useState({});
    const [totalHorasExtras, setTotalHorasExtras] = useState(0);
    const [assistance, setAssistance] = useState([]);
    const [totalSalarioOrdinario, setTotalSalarioOrdinario] = useState(0)
    const [totalSalarioConExtras, setTotalSalarioConExtras] = useState(0);

    const validarHorasExtra = (tipoHorario, diffHours, checkIn, checkOut, selectedEmployee) => {
        let horasExtra = 0;
        let horasDia = 0;
        let incremento = 0;

        let tipo = "";

        let entrada = dayjs(checkIn).format("dddd, DD MMM YYYY, hh:mm:ss");
        let salida = dayjs(checkOut).format("dddd, DD MMM YYYY, hh:mm:ss");
    
        // Validamos si selectedEmployee tiene los datos necesarios
        if (!selectedEmployee) return;
    
        const salario = selectedEmployee?.attributes.salary;
        const horasMaximasSemanales = selectedEmployee?.relationships.workshifts[0]?.attributes.maximun_weekly_hours || 0;
        
        let diasLaborales = selectedEmployee?.relationships.workshifts[0]?.attributes.schedule_type === "fixed_halftime" ? 5 : 6;
        
        const horasDiariasLaborales = parseFloat((horasMaximasSemanales / diasLaborales).toFixed(2));
        const horasTrabajadasMes = horasDiariasLaborales * 30;
        const valorHoraOrdinariaLaboral = parseFloat((salario / horasTrabajadasMes).toFixed(2));
    
        console.log("Valor hora ordinaria:", valorHoraOrdinariaLaboral);
        console.log("Horas trabajadas al mes:", horasTrabajadasMes);
        console.log("Días laborales:", diasLaborales);
        console.log("Horas diarias laborales:", horasDiariasLaborales);
        console.log("Dias extra: ",diasExtra);

        setTotalHorasTrabajadasMes(horasTrabajadasMes);
        setTotalSalarioOrdinario(horasTrabajadasMes * valorHoraOrdinariaLaboral);
    
        switch (tipoHorario) {
            case "fixed_halftime":
                if (diffHours > 4) {
                    horasExtra = parseFloat((diffHours - 4).toFixed(2));
                    horasDia = parseFloat(diffHours.toFixed(2));
                }
                if (dayjs(checkIn).format("dddd").toLowerCase() === "sábado" || 
                    dayjs(checkIn).format("dddd").toLowerCase() === "domingo") {
                    horasExtra = parseFloat(diffHours.toFixed(2));
                    horasDia = parseFloat(diffHours.toFixed(2));
                }
                break;
            case "fixed":
                let almuerzo = 2;
                let trabajo = 8;
                let jornada = almuerzo + trabajo;
    
                if (diffHours > 10) {
                    horasExtra = parseFloat((diffHours - jornada).toFixed(2));
                    horasDia = parseFloat((diffHours - almuerzo).toFixed(2));
                }
    
                if (dayjs(checkIn).format("dddd").toLowerCase() === "sábado") {
                    if (diffHours > 4) {
                        horasExtra = parseFloat((diffHours - 4).toFixed(2));
                        horasDia = parseFloat(diffHours.toFixed(2));
                    }
                }
    
                if (dayjs(checkIn).format("dddd").toLowerCase() === "domingo") {
                    horasExtra = parseFloat(diffHours.toFixed(2));
                    horasDia = parseFloat(diffHours.toFixed(2));
                }
                break;
            case "flexible":
                horasExtra = parseFloat(diffHours.toFixed(2));
                horasDia = parseFloat(diffHours.toFixed(2));
                break;
            default:
                horasExtra = 0;
        }
    
        incremento = parseFloat((horasExtra * valorHoraOrdinariaLaboral * 0.27).toFixed(2));
    
        if (horasExtra > 0) {
            setDiasExtra(prevState => ({
                ...prevState,
                [dayjs(checkIn).format("dddd, DD MMM YYYY")]: {
                    horasDia, 
                    horasExtra,
                    valorHoraOrdinariaLaboral,
                    incremento,
                    entrada,
                    salida
                }
            }));
        }
    };

    useEffect(() => {
        let totalIncremento = Object.values(diasExtra).reduce((acc, entry) => {
            return acc + parseFloat(entry.incremento);
        }, 0);
    
        setTotalSalarioConExtras(totalSalarioOrdinario + totalIncremento);
    }, [diasExtra, totalSalarioOrdinario]);
    

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployees();
                const selectedEmployee = data.find(emp => emp.id === parseInt(id));
                setEmployee(selectedEmployee || null);

                const controlMes = selectedEmployee.relationships.accessControls.map(control => control.attributes);
                const tipoHorario = selectedEmployee.relationships.workshifts[0].attributes.schedule_type;
                
                const diferenciasHoraEntradaSalida = controlMes.map(entry => {
                    if (!entry.check_in || !entry.check_out) {
                        return { ...entry, horasTrabajoDia: "0.00" }; // Manejo de valores nulos
                    }
                
                    const checkIn = dayjs(entry.check_in);
                    const checkOut = dayjs(entry.check_out);
                
                    const diffHours = checkOut.diff(checkIn, "minute") / 60; 

                    // Llamar a la función para validar el contrato y almacenar horas extra
                    validarHorasExtra(tipoHorario, diffHours, checkIn, checkOut, selectedEmployee);
                                    
                    return {
                        ...entry,
                        horasTrabajoDia: diffHours.toFixed(2)
                    };
                });
                
                console.log("Diferencias: ",diferenciasHoraEntradaSalida);
                setAssistance(diferenciasHoraEntradaSalida);
            
            } catch (err) {
                setError("Error al cargar los datos del empleado");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    {/* obtengo la suma total de las horas extras */}
    useEffect(()=>{
        let sum = Object.values(diasExtra).reduce((acc, entry) => {
            console.log("valor: ", entry.horasExtra);
            return acc + parseFloat(entry.horasExtra);
        }, 0);



        setTotalHorasExtras(sum);
        console.log("Dias extr:  ",diasExtra)
    }, [diasExtra]);

    return { employee, assistance, diasExtra, totalSalarioOrdinario, totalSalarioConExtras, totalHorasExtras, totalHorasTrabajadasMes, loading, error };
};

export default useEmployeeDetail;
