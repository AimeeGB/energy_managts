import { jsPDF } from 'jspdf';

// export const generarPdfInspeccion = (inspeccion) => {
//     const doc = new jsPDF();
  
//     // Agregar título según el tipo de inspección
//     const titulo = inspeccion.tipo_inspeccion === 'ONURE' 
//         ? 'Inspecciones de la ONURE' 
//         : 'Inspecciones de la Empresa u Organismo Superior';
        
//         doc.setFontSize(16);
//         doc.text(titulo, 105, 15, { align: 'center' });
    
//         // Agregar fecha de inspección
//         doc.setFontSize(12);
//         doc.text(`Día de la inspección: ${new Date(inspeccion.inspeccion_time).toLocaleDateString()}`, 14, 30);
    
//         // Agregar nombres de inspectores
//         doc.text(`1. Nombre de los inspectores: ${inspeccion.nombre_inpectores}`, 14, 40);
        
//         // Sección de deficiencias
//         doc.text(`2. Deficiencias y violaciones detectadas:`, 14, 50);
//         const lineasDeficiencias = doc.splitTextToSize(inspeccion.deficiencias_violaciones, 180);
//         doc.text(lineasDeficiencias, 20, 60);
        
//         // Sección de plan de acción
//         const ultimaLineaDeficiencia = 60 + (lineasDeficiencias.length * 7);
//         doc.text(`3. Plan de Acciones de Mejoras:`, 14, ultimaLineaDeficiencia + 10);
//         const lineasPlan = doc.splitTextToSize(inspeccion.plan_acciones, 180);
//         doc.text(lineasPlan, 20, ultimaLineaDeficiencia + 20);
        
//         // Espacio para firmas
//         const ultimaLineaPlan = ultimaLineaDeficiencia + 20 + (lineasPlan.length * 7);
//         doc.text(`4. Firma de los inspectores y del Director del centro`, 14, ultimaLineaPlan + 20);
  
//     return doc;
// };

// export const generarPdfInspeccion = (inspeccion) => {
//     const doc = new jsPDF();
    
//     // Configuración inicial
//     doc.setFont('helvetica');
    
//     // Agregar título según el tipo de inspección
//     const titulo = inspeccion.tipo_inspeccion === 'ONURE' 
//         ? 'Inspecciones de la ONURE' 
//         : 'Inspecciones de la Empresa u Organismo Superior';
    
//     doc.setFontSize(16);
//     doc.setFont('helvetica', 'bold');
//     doc.text(titulo, 105, 20, { align: 'center' });
    
//     // Agregar fecha de inspección
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'normal');
//     doc.text(`Día de la inspección: ${new Date(inspeccion.inspeccion_time).toLocaleDateString()}`, 14, 35);
    
//     // Agregar nombres de inspectores
//     doc.text(`1. Nombre de los inspectores: ${inspeccion.nombre_inpectores}`, 14, 45);
    
//     // Sección de deficiencias
//     doc.text(`2. Deficiencias y violaciones detectadas:`, 14, 55);
//     const lineasDeficiencias = doc.splitTextToSize(inspeccion.deficiencias_violaciones || '', 180);
//     doc.text(lineasDeficiencias, 20, 65);
    
//     // Sección de plan de acción
//     const ultimaLineaDeficiencia = 65 + (lineasDeficiencias.length * 7);
//     doc.text(`3. Plan de Acciones de Mejoras:`, 14, ultimaLineaDeficiencia + 10);
//     const lineasPlan = doc.splitTextToSize(inspeccion.plan_acciones || '', 180);
//     doc.text(lineasPlan, 20, ultimaLineaDeficiencia + 20);
    
//     // Espacio para firmas
//     const ultimaLineaPlan = ultimaLineaDeficiencia + 20 + (lineasPlan.length * 7);
//     doc.text(`4. Firma de los inspectores y del Director del centro`, 14, ultimaLineaPlan + 20);
    
//     // Agregar líneas para firmas
//     doc.setDrawColor(0);
//     doc.setLineWidth(0.5);
    
//     // Línea para inspectores
//     doc.line(14, ultimaLineaPlan + 35, 80, ultimaLineaPlan + 35);
//     doc.text('Firma de los inspectores', 14, ultimaLineaPlan + 40);
    
//     // Línea para director
//     doc.line(120, ultimaLineaPlan + 35, 180, ultimaLineaPlan + 35);
//     doc.text('Firma del Director del centro', 120, ultimaLineaPlan + 40);
    
//     return doc;
// };

export const generarPdfInspeccion = (inspeccion) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 22; // Márgen izquierdo
    const maxWidth = pageWidth - 2 * margin; // Ancho máximo del texto
    
    // Configuración inicial
    doc.setFont('helvetica');
    
    // Agregar título según el tipo de inspección
    const titulo = inspeccion.tipo_inspeccion === 'ONURE' 
        ? 'Inspecciones de la ONURE' 
        : 'Inspecciones de la Empresa u Organismo Superior';
    
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(titulo, pageWidth / 2, 20, { align: 'center' });
        
        // Agregar fecha de inspección
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        // doc.text(`Día de la inspección: ${new Date(inspeccion.inspeccion_time).toLocaleDateString()}`, margin, 35);
        doc.text(`Día de la inspección: ${(inspeccion.inspeccion_time)}`, margin, 35);
        
        // Agregar nombres de inspectores
        doc.text(`1. Nombre de los inspectores: ${inspeccion.nombre_inpectores}`, margin, 45);
        
        // Sección de deficiencias
        doc.text(`2. Deficiencias y violaciones detectadas:`, margin, 55);
        
        // Dividir el texto en líneas con un ancho máximo y aplicar justificación
        const lineasDeficiencias = doc.splitTextToSize(inspeccion.deficiencias_violaciones || '', maxWidth - 10); // -10 para ajustar indentación
        doc.text(lineasDeficiencias, margin + 6, 65, { maxWidth, align: 'justify' });
        
        // Calcular posición Y después de las deficiencias
        const alturaDeficiencias = lineasDeficiencias.length * 7; // 7 es la altura aproximada por línea
        const ultimaLineaDeficiencia = 65 + alturaDeficiencias;
        
        // Sección de plan de acción
        doc.text(`3. Plan de Acciones de Mejoras:`, margin, ultimaLineaDeficiencia + 10);
        
        const lineasPlan = doc.splitTextToSize(inspeccion.plan_acciones || '', maxWidth - 10);
        doc.text(lineasPlan, margin + 6, ultimaLineaDeficiencia + 20, { maxWidth, align: 'justify' });
        
        // Calcular posición Y después del plan de acción
        const alturaPlan = lineasPlan.length * 7;
        const ultimaLineaPlan = ultimaLineaDeficiencia + 20 + alturaPlan;
        
        // Espacio para firmas
        doc.text(`4. Firma de los inspectores y del Director del centro`, margin, ultimaLineaPlan + 20);
        
        // Agregar líneas para firmas
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        
        // Línea para inspectores
        doc.line(margin, ultimaLineaPlan + 35, margin + 66, ultimaLineaPlan + 35);
        doc.text('Firma de los inspectores', margin, ultimaLineaPlan + 40);
        
        // Línea para director
        doc.line(margin + 106, ultimaLineaPlan + 35, margin + 166, ultimaLineaPlan + 35);
        doc.text('Firma del Director del centro', margin + 106, ultimaLineaPlan + 40);
    
    return doc;
};