from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import inch

def generate_inspection_pdf(inspeccion):
    """Genera un PDF con los datos de la inspección"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )
    
    # Configuración de estilos
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name='Center',
        alignment=TA_CENTER,
        fontSize=14,
        spaceAfter=20
    ))
    styles.add(ParagraphStyle(
        name='Justify',
        alignment=TA_JUSTIFY,
        fontSize=12,
        leading=14
    ))
    styles.add(ParagraphStyle(
        name='Signature',
        alignment=TA_CENTER,
        fontSize=10,
        spaceBefore=40
    ))
    
    # Contenido del PDF
    story = []
    
    # Título según el tipo de inspección
    titulo = 'Inspecciones de la ONURE' if inspeccion.tipo_inspeccion == 'ONURE' else 'Inspecciones de la Empresa u Organismo Superior'
    story.append(Paragraph(titulo, styles['Center']))
    
    # Fecha de inspección
    fecha_str = inspeccion.inspeccion_time.strftime('%d/%m/%Y')
    story.append(Paragraph(f"Día de la inspección: {fecha_str}", styles['Normal']))
    story.append(Spacer(1, 20))
    
    # 1. Nombre de inspectores
    story.append(Paragraph(f"1. Nombre de los inspectores: {inspeccion.nombre_inpectores}", styles['Normal']))
    story.append(Spacer(1, 15))
    
    # 2. Deficiencias y violaciones
    story.append(Paragraph("2. Deficiencias y violaciones detectadas:", styles['Normal']))
    story.append(Spacer(1, 5))
    story.append(Paragraph(inspeccion.deficiencias_violaciones, styles['Justify']))
    story.append(Spacer(1, 15))
    
    # 3. Plan de acciones
    story.append(Paragraph("3. Plan de Acciones de Mejoras:", styles['Normal']))
    story.append(Spacer(1, 5))
    story.append(Paragraph(inspeccion.plan_acciones, styles['Justify']))
    story.append(Spacer(1, 30))
    
    # 4. Firmas
    story.append(Paragraph("4. Firma de los inspectores y del Director del centro", styles['Normal']))
    story.append(Spacer(1, 40))
    
    # Líneas de firma
    story.append(Paragraph("_________________________", styles['Signature']))
    story.append(Paragraph("Firma de los inspectores", styles['Signature']))
    story.append(Spacer(1, 20))
    story.append(Paragraph("_________________________", styles['Signature']))
    story.append(Paragraph("Firma del Director del centro", styles['Signature']))
    
    # Generar el PDF
    doc.build(story)
    pdf = buffer.getvalue()
    buffer.close()
    
    return pdf
    
    