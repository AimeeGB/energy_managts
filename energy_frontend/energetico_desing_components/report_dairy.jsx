// ReportDiary.jsx (modificado)
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import DailyReportGenerator from './energetico_daily_report';
import StaticAreasManagement from './diarystaticmanager';


const ReportDiary = () => {
  const [key, setKey] = useState('generate');

  return (
    <div className="py-4">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="generate" title="Generar Reporte">
          <DailyReportGenerator />
        </Tab>
        <Tab eventKey="manage" title="Gestionar Áreas Estáticas">
          <StaticAreasManagement />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportDiary;