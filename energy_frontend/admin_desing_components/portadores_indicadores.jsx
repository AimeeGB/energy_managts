import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar/sidebar';

import * as MensualServer from './server/ReporteMensualServer'

import { ExportToExcelMensual } from '../export-excel/ExportExcel';

const Portador_Indicador = () => { 

    return (
        <>
            <div className='container mt-4'>
            <h3 className='mb-4'>Portadores e Indicadores Energeticos</h3>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar/>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-md-4 mb-2'>
                            <div className='list-group'>
                                <div className='list-group-item'>
                                    <h5>Portadores (Unidades)</h5>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Electricidad (W, kW, MW)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Diesel (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Fue-Oil (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Lubricante (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Gasolina (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Gas Licuado (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Queroseno (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5 mb-2'>
                            <div className='list-group'>
                                <div className='list-group-item'>
                                    <h5>Portadores (Unidades)</h5>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Turbocombustible (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Carbono Vegetal (kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Carbono Mineral (kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Alcohol Desnaturalizado (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Gas Manufacturado (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Agua o Vapor (l, Hl, kg, T)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h5>Portadores Energeticos</h5>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 mb-2'>
                        <div className='list-group'>
                                <div className='list-group-item'>
                                    <h5>Indicadores</h5>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                                <div className='list-group-item'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked'/>
                                        <label className='form-check-label' for='flexSwitchCheckChecked'>Parte 1</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Indicadores Energeticos</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      )


}

export default Portador_Indicador