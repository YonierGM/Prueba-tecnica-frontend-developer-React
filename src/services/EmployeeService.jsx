
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error al obtener datos de ${url}`);
    return response.json();
};

const getEmployees = async () => {
    const url = "../src/data/employees.json";
    return fetchData(url).then(data => data.data).catch(error => {
        console.error(error);
        return [];
    });
};

export { getEmployees };
