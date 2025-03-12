
import "./EmployeeDetails.css"

function EmployeDetails({employee, totalHorasTrabajadasMes, totalHorasExtras, totalSalarioOrdinario, totalSalarioConExtras}) {
  if (!employee || !employee.relationships?.workshifts?.length) {
    return <p>No hay información de horario disponible.</p>;
  }

  return (
    <>
    <div className="content">
      <div className="card">
        <div className="header">
          <img src="../../../src/assets/card-image.jpg" alt="Perfil" />

        </div>
        <div className="body">
          <div className="cargo">
            <h1><strong>{employee.attributes.first_name} {employee.attributes.last_name}</strong></h1>
            <p><strong>{employee.attributes.charge}</strong></p>
          </div>
          <hr className="dividir" />
          <div className="info-base">
            <p><strong>Correo:</strong> {employee.attributes.email}</p>
            <p><strong>Teléfono:</strong> {employee.attributes.phone}</p>
            <p><strong>Cargo:</strong> {employee.attributes.charge}</p>
            <p><strong>Salario:</strong> ${employee.attributes.salary.toLocaleString("es-ES")}</p>
          </div>
          <hr className="dividir"/>
          <div className="horario">
            <p><strong>Horario:</strong> {employee.relationships.workshifts[0].attributes.schedule_type}</p>
            <p><strong>Max. Horas semanales:</strong> {employee.relationships.workshifts[0].attributes.maximun_weekly_hours}</p>
          </div>
          <hr className="dividir"/>
          <div className="salario">
            <p><strong>Horas trabajadas al mes:</strong> {totalHorasTrabajadasMes}</p>
            <p>Horas extras: {totalHorasExtras} hrs</p>
            <p>Salario ordinario: ${totalSalarioOrdinario.toLocaleString("es-ES")}</p>
            <p>Salario con horas extras: ${totalSalarioConExtras.toLocaleString("es-ES")}</p>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default EmployeDetails
