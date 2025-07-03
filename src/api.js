export const fetchTables = async () => {
  try {
    const response = await fetch('/mocks/tables.json');
    if (!response.ok) throw new Error('Error fetching tables');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Simular POST /reservas/disponibilidad
export const checkAvailability = async (tableId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ available: tableId % 2 === 0 }); // simula disponibilidad par/impar
    }, 500);
  });
};
