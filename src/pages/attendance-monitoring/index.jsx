import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import SummaryCard from './components/SummaryCard';
import AbsentStudentsList from './components/AbsentStudentsList';
import DateFilter from './components/DateFilter';

const AttendanceMonitoring = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/warden-dashboard' },
    { label: 'Attendance Monitoring', path: '/attendance-monitoring' }
  ];

  // Summary data
  const summaryData = [
    {
      id: 1,
      title: 'Total Students',
      count: 450,
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Present Today',
      count: 423,
      percentage: 94,
      icon: 'CheckCircle',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      id: 3,
      title: 'Absent Today',
      count: 27,
      percentage: 6,
      icon: 'XCircle',
      iconColor: 'var(--color-error)',
      bgColor: 'bg-error/10'
    }
  ];

  // Mock absent students data
  const absentStudents = [
    {
      id: 1,
      name: 'Rahul Sharma',
      studentId: 'STU2024045',
      block: 'Block A',
      roomNumber: 'A-205',
      lastAttendance: '2026-01-29',
      consecutiveAbsences: 2
    },
    {
      id: 2,
      name: 'Priya Patel',
      studentId: 'STU2024089',
      block: 'Block B',
      roomNumber: 'B-312',
      lastAttendance: '2026-01-30',
      consecutiveAbsences: 1
    },
    {
      id: 3,
      name: 'Amit Kumar',
      studentId: 'STU2024123',
      block: 'Block A',
      roomNumber: 'A-401',
      lastAttendance: '2026-01-28',
      consecutiveAbsences: 3
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      studentId: 'STU2024156',
      block: 'Block C',
      roomNumber: 'C-108',
      lastAttendance: '2026-01-30',
      consecutiveAbsences: 1
    },
    {
      id: 5,
      name: 'Vikram Singh',
      studentId: 'STU2024201',
      block: 'Block B',
      roomNumber: 'B-215',
      lastAttendance: '2026-01-27',
      consecutiveAbsences: 4
    },
    {
      id: 6,
      name: 'Anjali Verma',
      studentId: 'STU2024234',
      block: 'Block A',
      roomNumber: 'A-310',
      lastAttendance: '2026-01-29',
      consecutiveAbsences: 2
    },
    {
      id: 7,
      name: 'Rajesh Gupta',
      studentId: 'STU2024267',
      block: 'Block C',
      roomNumber: 'C-405',
      lastAttendance: '2026-01-30',
      consecutiveAbsences: 1
    },
    {
      id: 8,
      name: 'Kavita Desai',
      studentId: 'STU2024298',
      block: 'Block B',
      roomNumber: 'B-502',
      lastAttendance: '2026-01-28',
      consecutiveAbsences: 3
    }
  ];

  const blockOptions = [
    { value: 'all', label: 'All Blocks' },
    { value: 'Block A', label: 'Block A' },
    { value: 'Block B', label: 'Block B' },
    { value: 'Block C', label: 'Block C' }
  ];

  // Filter students based on search and block
  const filteredStudents = absentStudents?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.roomNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesBlock = selectedBlock === 'all' || student?.block === selectedBlock;
    return matchesSearch && matchesBlock;
  });

  const handleExportReport = () => {
    console.log('Exporting attendance report...');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation />
      
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <BreadcrumbNavigation items={breadcrumbItems} />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Attendance Monitoring
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and manage daily student attendance records
              </p>
            </div>
            <Button
              variant="default"
              iconName="Download"
              onClick={handleExportReport}
              className="w-full md:w-auto"
            >
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {summaryData?.map((card) => (
            <SummaryCard key={card?.id} {...card} />
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Search by name, ID, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              options={blockOptions}
              value={selectedBlock}
              onChange={setSelectedBlock}
              placeholder="Select Block"
            />
            
            <DateFilter
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>

        {/* Absent Students List */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <Icon name="UserX" size={20} color="var(--color-error)" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Absent Students ({filteredStudents?.length})
              </h3>
            </div>
          </div>
          
          <AbsentStudentsList students={filteredStudents} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceMonitoring;