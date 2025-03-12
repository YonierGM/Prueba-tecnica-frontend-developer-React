import EmployeeDetails from "../components/EmployeeDetails";
import { useParams } from "react-router-dom";

import useEmployeeDetail from "../hooks/useEmployeeDetail";
import EmployeeAssistance from "../components/EmployeeAssistance";
import Spinner from "../../../componentes/spinner/spinner";
import "./Detail.css"

const Detail = () => {
  const { id } = useParams();
  const { employee, assistance, diasExtra, totalHorasExtras, totalSalarioOrdinario, totalSalarioConExtras, totalHorasTrabajadasMes, loading, error } = useEmployeeDetail(id);

  console.log(employee);
  return (
   <>
      {loading && <Spinner />}
      {error && <p>{error}</p>}
      { 
        !loading && !error && 
        <>
          <EmployeeDetails employee={employee} totalHorasExtras={totalHorasExtras} totalHorasTrabajadasMes={totalHorasTrabajadasMes} totalSalarioOrdinario={totalSalarioOrdinario} totalSalarioConExtras={totalSalarioConExtras} />
          <EmployeeAssistance attendanceData={assistance} diasExtra={diasExtra} />
        </>
      }
   </>
  );
};

export default Detail;
