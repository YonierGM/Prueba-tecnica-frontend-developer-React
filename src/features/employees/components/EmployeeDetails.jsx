
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
            <h1><span className="dato">{employee.attributes.first_name} {employee.attributes.last_name}</span></h1>
            <p><span className="dato">{employee.attributes.charge}</span></p>
          </div>
          <hr className="dividir" />
          <div className="info-base">
            <p><span className="dato">Correo:</span> {employee.attributes.email}</p>
            <p><span className="dato">Teléfono:</span> {employee.attributes.phone}</p>
            <p><span className="dato">Cargo:</span> {employee.attributes.charge}</p>
            <p><span className="dato">Salario:</span> ${employee.attributes.salary.toLocaleString("es-ES")}</p>
          </div>
          <hr className="dividir"/>
          <div className="horario">
            <p><span className="dato">Horario:</span> {employee.relationships.workshifts[0].attributes.schedule_type}</p>
            <p><span className="dato">Max. Horas semanales:</span> {employee.relationships.workshifts[0].attributes.maximun_weekly_hours}</p>
          </div>
          <hr className="dividir"/>
          <div className="salario">
            <p><span className="dato">Horas trabajadas al mes:</span> {totalHorasTrabajadasMes}</p>
            <p><span className="dato">Horas extras:</span> {totalHorasExtras} hrs</p>
            <p><span className="dato">Salario ordinario:</span> ${totalSalarioOrdinario.toLocaleString("es-ES")}</p>
            <p><span className="dato">Salario con horas extras:</span> ${totalSalarioConExtras.toLocaleString("es-ES")}</p>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default EmployeDetails
