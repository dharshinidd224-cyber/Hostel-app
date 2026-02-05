import React from 'react';
import GrievanceTableRow from './GrievanceTableRow';

const GrievanceTable = ({ grievances, onStatusUpdate }) => {
  return (
    <div className="w-full overflow-x-auto mt-6">
      <div className="table-gradient">
        <div className="table-inner">

          {/* TABLE */}
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="table-head">
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Priority</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {grievances.map((grievance) => (
                <GrievanceTableRow
                  key={grievance.id}
                  grievance={grievance}
                  onStatusUpdate={onStatusUpdate}
                />
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        /* OUTER GRADIENT BORDER */
        .table-gradient {
          padding: 3px; /* ✅ SPACE FROM BORDER */
          border-radius: 24px;
          background: linear-gradient(135deg, #e0e7ff, #fce7f3);
        }

        /* INNER WHITE CARD */
        .table-inner {
          background: #ffffff;
          border-radius: 22px;
          padding: 16px 12px 20px; /* ✅ HEADER & ROW SPACE */
        }

        /* TABLE HEADER */
        .table-head th {
          font-size: 0.85rem;
          color: #0f172a;
          border-bottom: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default GrievanceTable;