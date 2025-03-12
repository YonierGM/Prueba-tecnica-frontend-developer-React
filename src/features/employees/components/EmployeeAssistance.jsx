import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./EmployeeAssistance.css"

// Configurar español en dayjs
dayjs.locale("es");

const EmployeeCalendar = ({ attendanceData, diasExtra }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Extrae las fechas de check-in y las convierte a un formato de solo fecha
    const attendedDates = attendanceData.map(entry =>
        dayjs(entry.check_in).format("YYYY-MM-DD")
    );

    // Función para resaltar las fechas en el calendario
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Formato para asistencia
            const formattedExtraDate = dayjs(date).format("dddd, DD MMM YYYY"); // Formato para horas extra
    
            const isAttended = attendedDates.includes(formattedDate);
            const isExtra = diasExtra.hasOwnProperty(formattedExtraDate);
    
            if (isAttended && isExtra) {
                return "highlight-extra"; // Verde + Amarillo
            }
            if (isAttended) {
                return "highlight"; // Verde (solo asistencia)
            }
            if (isExtra) {
                return "extra-only"; // Amarillo (solo horas extra)
            }
        }
    };

    // Función para manejar el clic en una fecha
    const handleDayClick = (date) => {
        const formattedDate = dayjs(date).format("dddd, DD MMM YYYY");
        setSelectedDate(formattedDate);
    };

    return (
        <div className="content calendario">
            {/* Mostrar información cuando se seleccione un día */}
            {selectedDate && (
            <div className="info-detalle">
                <div className="info-dia">
                    <h3>{selectedDate}</h3>
                    {diasExtra[selectedDate] ? (
                        <>
                            <p>Horas trabajadas: {diasExtra[selectedDate].horasDia}</p>
                            <p>Horas extras: {diasExtra[selectedDate].horasExtra}</p>
                            <br />
                            <p>Entrada: {dayjs(diasExtra[selectedDate].entrada).format("HH:mm:ss")}</p>
                            <p>Salida: {dayjs(diasExtra[selectedDate].salida).format("HH:mm:ss")}</p>

                        </>
                    ) : (
                        <p>No hay horas extras registradas.</p>
                    )}
                </div>
            </div>
            )}
            <br />
            <div className="calendar-notas">

            <div className="indicadores">
                <div className="indicador">
                    <div className="luz asiste">
                    </div>
                    <p>Asistió al trabajo</p>
                </div>

                <div className="indicador">
                    <div className="luz extra">
                    </div>
                    <p>Asistió y registró horas extras</p>
                </div>
            </div>
            <Calendar className="calendario" locale="es-ES" tileClassName={tileClassName} onClickDay={handleDayClick}  />
            </div>
        </div>
    );
};

export default EmployeeCalendar;
