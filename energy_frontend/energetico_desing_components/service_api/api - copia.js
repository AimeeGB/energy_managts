const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Algo salió mal');
    }
    return response;
};

const api = {
    
    async createEnergyConsumption(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/energy-consumption/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                // Si es error de unicidad, intenta actualizar
                if (errorData.non_field_errors && errorData.non_field_errors.some(e => e.includes('unique'))) {
                    return this.updateEnergyConsumption(data.area, data.month, data.year, data);
                }
                throw new Error(errorData.message || 'Algo salió mal');
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

    // async downloadExcel(area, month, year, planMes) {
    //     try {
    //         const response = await fetch(
    //             `${API_BASE_URL}/download-excel/?area=${area}&month=${month}&year=${year}&plan_mes=${planMes}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );
    //         await handleResponse(response);
    //         return await response.blob();
    //     } catch (error) {
    //         console.error('Error en downloadExcel:', error);
    //         throw error;
    //     }
    // },

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

    // async downloadExcelB(month, year) {
    //     try {
    //         const response = await fetch(
    //             `${API_BASE_URL}/download-excel-b/?month=${month}&year=${year}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );
    //         await handleResponse(response);
    //         return await response.blob();
    //     } catch (error) {
    //         console.error('Error en downloadExcelB:', error);
    //         throw error;
    //     }
    // },

    async getEnergyData(area, month, year) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/get-energy-data/?area=${area}&month=${month}&year=${year}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (response.status === 200) {
            const data = await response.json();
            return data || null;  // Devuelve null si la respuesta es null/undefined
          }
          return null;  // Devuelve null para otros códigos de estado
        } catch (error) {
          console.error('Error en getEnergyData:', error);
          return null;  // Devuelve null en caso de error
        }
    },


    async getTransformerLossData(month, year) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/transformer-loss-data/?month=${month}&year=${year}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          await handleResponse(response);
          return await response.json();
        } catch (error) {
          console.error('Error getting transformer loss data:', error);
          throw error;
        }
    },
      
    async uploadBitacoraFile(file) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch(
            `${API_BASE_URL}/process-bitacora-file/`,
            {
              method: 'POST',
              body: formData,
            }
          );
          await handleResponse(response);
          return await response.json();
        } catch (error) {
          console.error('Error uploading bitacora file:', error);
          throw error;
        }
    },
      
    async downloadExcelTransformerLossData(month, year) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/download-excel-transformer-loss-data/?month=${month}&year=${year}`,
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
          console.error('Error downloading Excel B:', error);
          throw error;
        }
    }
};

export default api;