// const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

// const handleResponse = async (response) => {
//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Algo salió mal');
//     }
//     return response;
// };

// const api = {
  
//     async getTransformerLossData(month, year) {
//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/transformer-loss-data/?month=${month}&year=${year}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );
//           await handleResponse(response);
//           return await response.json();
//         } catch (error) {
//           console.error('Error getting transformer loss data:', error);
//           throw error;
//         }
//     },
      
//     async uploadBitacoraFile(file) {
//         try {
//           const formData = new FormData();
//           formData.append('file', file);
          
//           const response = await fetch(
//             `${API_BASE_URL}/process-bitacora-file/`,
//             {
//               method: 'POST',
//               body: formData,
//             }
//           );
//           await handleResponse(response);
//           return await response.json();
//         } catch (error) {
//           console.error('Error uploading bitacora file:', error);
//           throw error;
//         }
//     },
      
//     async downloadExcelTransformerLossData(month, year) {
//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/download-excel-transformer-loss-data/?month=${month}&year=${year}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );
//           await handleResponse(response);
//           return await response.blob();
//         } catch (error) {
//           console.error('Error downloading Excel B:', error);
//           throw error;
//         }
//     }
// };

// export default api;


// const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

// const handleResponse = async (response) => {
//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Algo salió mal');
//     }
//     return response;
// };

// const api = {
//     async getTransformerLossData(month, year) {
//         try {
//             const response = await fetch(
//                 `${API_BASE_URL}/transformer-loss-data/?month=${month}&year=${year}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             await handleResponse(response);
//             return await response.json();
//         } catch (error) {
//             console.error('Error getting transformer loss data:', error);
//             throw error;
//         }
//     },

//     async downloadExcelTransformerLossData(month, year) {
//         try {
//             const response = await fetch(
//                 `${API_BASE_URL}/download-excel-transformer-loss-data/?month=${month}&year=${year}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             await handleResponse(response);
//             return await response.blob();
//         } catch (error) {
//             console.error('Error downloading Excel B:', error);
//             throw error;
//         }
//     },

// };

// export default api;


const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Algo salió mal');
    }
    return response;
};

const api = {
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

    async updateTransformerLossData(data) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/transformer-loss-data/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            );
            
            const responseData = await response.json();
            
            if (!response.ok) {
                console.error('Error details:', responseData);
                throw new Error(responseData.error || 'Error al actualizar los datos');
            }
            
            return responseData;
        } catch (error) {
            console.error('Error updating transformer data:', error);
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
    },
};

export default api;