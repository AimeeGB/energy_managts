// const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

// const dailyReportApi = {
//     async generateDailyReport(date) {
//         try {
//             const response = await fetch(
//                 `${API_BASE_URL}/daily-report/?date=${date}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
            
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message || 'Error al generar reporte');
//             }
            
//             return await response.blob();
//         } catch (error) {
//             console.error('Error en generateDailyReport:', error);
//             throw error;
//         }
//     },
    
//     async getAvailableDates() {
//         try {
//             const response = await fetch(
//                 `${API_BASE_URL}/available-dates/`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
            
//             if (!response.ok) {
//                 throw new Error('Error al obtener fechas disponibles');
//             }
            
//             return await response.json();
//         } catch (error) {
//             console.error('Error en getAvailableDates:', error);
//             throw error;
//         }
//     }
// };

// export default dailyReportApi;


// const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

// export const dailyReportApi = {
//   async generateDailyReport(date) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/generate-daily-report/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ date }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Error al generar el reporte');
//       }

//       return await response.blob();
//     } catch (error) {
//       console.error('Error generating daily report:', error);
//       throw error;
//     }
//   },
// };

// daily_report_api.js - Mejorar manejo de errores
const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

export const dailyReportApi = {
  async generateDailyReport(date) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-daily-report/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) {
        let errorMessage = 'Error al generar el reporte';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // Si no se puede parsear como JSON, usar el texto de la respuesta
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error generating daily report:', error);
      
      // Mejorar mensajes de error para el usuario
      if (error.message.includes('No hay datos disponibles')) {
        throw new Error('No se encontraron datos para la fecha seleccionada. Verifique que existan registros para ese mes.');
      } else if (error.message.includes('Formato de fecha')) {
        throw new Error('Formato de fecha incorrecto. Use el formato YYYY-MM-DD.');
      } else {
        throw new Error(`Error al generar el reporte: ${error.message}`);
      }
    }
  },
};