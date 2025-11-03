// import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import {Navigate, useLocation} from "react-router-dom"
import Footer from './footer/footer';
import Home from './home/home';

// // Home Panel

// Admin_Account Panel
import Init_Section from './admin_desing_components/authentication_component/to_begin_section';
import Create_Account from './admin_desing_components/authentication_component/to_create_bill';
import Profile from './admin_desing_components/authentication_component/profile';

// Admin Panel
import Dashboard from './admin_desing_components/dashboard';
import Agreements from './admin_desing_components/agreements';
import Add_Upgrade_Agreements from './admin_desing_components/to_add_to_upgrade_agreements';
import Inspect from './admin_desing_components/inspect';
import Add_Upgrade_Inspect from './admin_desing_components/to_add_to_upgrade_inspect';
import Add_Upgrade_Inspect_ONURE from './admin_desing_components/to_add_to_upgrade_inspect_ONURE';

import AgreementsSucess from './admin_desing_components/agreements_sucess';


// Amr Panel
import UploadXLSX from './amr_desing_components/arm_upload_file';
import Graph_PageOne from './amr_desing_components/arm_graphs_page_one';
import Graph_PageTwo from './amr_desing_components/arm_graphs_page_two';
import Graph_PageThree from './amr_desing_components/arm_graphs_page_three';

// Energetico Panel
import TablaBitacora from './energetico_desing_components/energetico_tablaBitacora';
import TransformerLossReport from './energetico_desing_components/energetico_transformer_loss_report';
import GraphPaginatedView from './amr_desing_components/arm_graph_paginated';
import AreaManagement from './energetico_desing_components/area_management';
import DailyReport from './energetico_desing_components/energetico_daily_report';
import SecondaryInfoManager from './energetico_desing_components/secondary_info_manager';
import DailyReportGenerator from './energetico_desing_components/energetico_daily_report';
import ReportDiary from './energetico_desing_components/report_dairy'


// // Authentication

// import { AuthProvider } from './authentication_component/authContext';
// import PrivateRoute from './authentication_component/privateRoute';

function RequireToken ({children}) {
    
    let auth = localStorage.getItem('token');
    let location = useLocation()

    if(!auth){
        return <Navigate to='/admin/to_begin_section' state={{from: location}}/>
    }

    return children
}

function App() {
  return (
    <>
      <Navbar/>
          <Routes>
                {/* Home Panel */}
                {/* <Route exact path='/' element={<RequireToken> <Home/> </RequireToken>}></Route> */}
                <Route exact path='/' element={<Home/>}></Route>

                {/* Admin_Account Panel */}
                <Route path='/admin/to_create_bill' element={<Create_Account/>}/>
                <Route path='/admin/to_begin_section' element={<Init_Section/>}/>
                <Route path='/admin/to_upgrade_profile' element={<Profile/>}/>
                
                {/* Admin Panel */}
                <Route path='/admin/dashboard' element={<Dashboard/>}/>
                <Route path='/admin/dashboard/agreements' element={<Agreements/>}/>
                <Route path='/admin/dashboard/to_add_agreements' element={<Add_Upgrade_Agreements/>}/>
                <Route path='/admin/dashboard/to_upgrade_agreements/:id' element={<Add_Upgrade_Agreements/>}/>
                <Route path='/admin/dashboard/inspect' element={<Inspect/>}/>
                <Route path='/admin/dashboard/to_add_inspect/' element={<Add_Upgrade_Inspect/>}/>
                <Route path='/admin/dashboard/to_upgrade_inspect/:id' element={<Add_Upgrade_Inspect/>}/>
                <Route path='/admin/dashboard/to_add_inspect_onure' element={<Add_Upgrade_Inspect_ONURE/>}/>

                <Route path='/agreements-sucess' element={<AgreementsSucess/>}/>
                

                {/* Amr Panel */}
                <Route path='/amr-upload-file' element={<UploadXLSX/>}/>
                {/* <Route path='/graph-page-one' element={<Graph_PageOne/>}/>
                <Route path='/graph-page-two' element={<Graph_PageTwo/>}/>
                <Route path='/graph-page-three' element={<Graph_PageThree/>}/> */}

                <Route path='/graph-monitoring' element={<GraphPaginatedView/>}/>

                {/* Energetico Panel */}
                <Route path='/energetico-tablaBitacora' element={<TablaBitacora/>}/>
                <Route path='/energetico-transformacionElectrica' element={<TransformerLossReport/>}/>
                <Route path='/energetico-reporte-diario' element={<DailyReportGenerator/>}/>
                {/* <Route path='/energetico-reporte-diario' element={<ReportDiary/>}/> */}
                
          </Routes>
          

          <Footer/>
        
    </>
  );
}


export default App;
