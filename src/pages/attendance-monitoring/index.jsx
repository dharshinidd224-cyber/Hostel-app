import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import Icon from '../../components/AppIcon';
import PageHeader from './components/PageHeader';
import SummaryCard from './components/SummaryCard';
import AbsentStudentsList from './components/AbsentStudentsList';
import DateFilter from './components/DateFilter';

const API_URL = "http://localhost:5000"; 




const AttendanceMonitoring = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
const [summary, setSummary] = useState({
  total: 0,
  present: 0,
  absent: 0
});

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('All Blocks');
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

useEffect(() => {
  const fetchWardenReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/attendance/report`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      console.log("Warden report:", data);

      if (data.success) {
        setStudents(data.records);

        const total = data.records.length;
        const absent = data.records.filter(s => s.consecutiveAbsences > 0).length;
        const present = total - absent;

        setSummary({ total, present, absent });
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchWardenReport();
}, []);

  // Summary data
  const summaryData = [
    {
      id: 1,
      title: 'Total Students',
      count: summary.total,
      icon: 'Users',
      iconColor: '#ffffff',
      bgColor: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'Present Today',
      count: summary.present,
      percentage: summary.total > 0 ? Math.round((summary.present / summary.total) * 100) : 0,
      icon: 'CheckCircle',
      iconColor: '#ffffff',
      bgColor: 'bg-green-600'
    },
    {
      id: 3,
      title: 'Absent Today',
      count: summary.absent,
      percentage: summary.total > 0 ? Math.round((summary.absent / summary.total) * 100) : 0,
      icon: 'XCircle',
      iconColor: '#ffffff',
      bgColor: 'bg-red-600'
    }
  ];

  // Filter students based on search and block
  const filteredStudents = students?.filter(student => {
  const matchesSearch =
    student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    student?.roomNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());

  const matchesBlock =
    selectedBlock === 'All Blocks' || student?.block === selectedBlock;

  return matchesSearch && matchesBlock;
});


  const handleExportReport = () => {
    console.log('Exporting attendance report...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      
      <div className="py-6 md:py-8">
        {/* Page Header with Back Button */}
        <PageHeader
          title="Attendance Monitoring"
          subtitle="Track and manage daily student attendance records"
          showExportButton={true}
          onExport={handleExportReport}
        />

        {/* Summary Cards with Margins */}
        <div className="px-4 md:px-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryData?.map((card) => (
              <SummaryCard key={card?.id} {...card} />
            ))}
          </div>
        </div>

        {/* Date Filter with Gradient Border - Has margins inside component */}
        <DateFilter
          selectedBlock={selectedBlock}
          selectedDate={selectedDate}
          onSearch={setSearchTerm}
          onBlockChange={setSelectedBlock}
          onDateChange={setSelectedDate}
        />

        {/* Absent Students List with Gradient Border and Margins */}
        <div className="px-4 md:px-6 mb-6">
          <AbsentStudentsList students={filteredStudents} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceMonitoring;