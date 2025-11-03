const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Algo salió mal');
    }
    return response;
};

//Codigo funcional 03/05/25
const api = {
    
    //Codigo funcional 21/05/25
    // async createEnergyConsumption(data) {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/energy-consumption/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });
            
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             // Si es error de unicidad, intenta actualizar
    //             if (errorData.non_field_errors && errorData.non_field_errors.some(e => e.includes('unique'))) {
    //                 return this.updateEnergyConsumption(data.area, data.month, data.year, data);
    //             }
    //             throw new Error(errorData.message || 'Algo salió mal');
    //         }
            
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error en createEnergyConsumption:', error);
    //         throw error;
    //     }
    // },

    //Codigo de prueba 21/05/25

    async createEnergyConsumption(data) {
        try {
            // Asegúrate de que area_id esté presente y sea un número
            if (!data.area_id && data.area) {
                data.area_id = data.area;
            }
    
            const response = await fetch(`${API_BASE_URL}/energy-consumption/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);  // Para depuración
                throw new Error(errorData.detail || JSON.stringify(errorData));
            }
            return await response.json();
        } catch (error) {
            console.error('Error en createEnergyConsumption:', error);
            throw error;
        }
    },

    async updateEnergyConsumption(area, month, year, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/energy-consumption/`, {
                method: 'PUT',  // Cambiado de PATCH a PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, area, month, year }),
            });
            await handleResponse(response);
            return await response.json();
        } catch (error) {
            console.error('Error en updateEnergyConsumption:', error);
            throw error;
        }
    },

    async downloadExcel(month, year, planMes) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/download-excel-bitacora/?month=${month}&year=${year}&plan_mes=${planMes}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            await handleResponse(response);
            return await response.blob();
        } catch (error) {
            console.error('Error en downloadExcel:', error);
            throw error;
        }
    },
    
    //Codigo funcional 20/05/25
    // async getEnergyData(area, month, year) {
    //     try {
    //       const response = await fetch(
    //         `${API_BASE_URL}/get-energy-data/?area=${area}&month=${month}&year=${year}`,
    //         {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //         }
    //       );
          
    //       if (response.status === 200) {
    //         const data = await response.json();
    //         return data || null;  // Devuelve null si la respuesta es null/undefined
    //       }
    //       return null;  // Devuelve null para otros códigos de estado
    //     } catch (error) {
    //       console.error('Error en getEnergyData:', error);
    //       return null;  // Devuelve null en caso de error
    //     }
    // },

    //Codigo de prueba 20/05/25

    async getAreas() {
        try {
            const response = await fetch(`${API_BASE_URL}/areas/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await handleResponse(response);
            return await response.json();
        } catch (error) {
            console.error('Error en getAreas:', error);
            throw error;
        }
    },

    async createArea(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/areas/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            await handleResponse(response);
            return await response.json();
        } catch (error) {
            console.error('Error en createArea:', error);
            throw error;
        }
    },

    // async updateArea(id, data) {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/areas/${id}/`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });
    //         await handleResponse(response);
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error en updateArea:', error);
    //         throw error;
    //     }
    // },

    // async deleteArea(id) {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/areas/${id}/`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
            
    //         if (!response.ok) {
    //             throw new Error('Error al cambiar estado del área');
    //         }
            
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error en deleteArea:', error);
    //         throw error;
    //     }
    // },

    async updateArea(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/areas/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await handleResponse(response);
            return await response.json();
        } catch (error) {
            console.error('Error en updateArea:', error);
            throw error;
        }
    },

    async deleteArea(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/areas/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el área permanentemente');
            }
            return true;
        } catch (error) {
            console.error('Error en deleteArea:', error);
            throw error;
        }
    },

    // ... (resto de los métodos permanecen iguales, pero actualizando getEnergyData para usar area_id)
    async getEnergyData(area_id, month, year) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/get-energy-data/?area_id=${area_id}&month=${month}&year=${year}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                const data = await response.json();
                return data || null;
            }
            return null;
        } catch (error) {
            console.error('Error en getEnergyData:', error);
            return null;
        }
    },

    async processBitacoraFile(month, year) {
        try {
            const response = await fetch(`${API_BASE_URL}/process-bitacora-file/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ month, year }),
            });
            await handleResponse(response);
            return await response.json();
        } catch (error) {
            console.error('Error processing bitacora file:', error);
            throw error;
        }
    },

};

export default api;