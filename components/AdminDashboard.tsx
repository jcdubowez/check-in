
import React from 'react';
import { MonthlyReview } from '../types';
import { SATISFACTION_EMOJIS } from '../constants';

interface AdminDashboardProps {
  reviews: MonthlyReview[];
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ reviews, onClose }) => {
  const downloadCSV = () => {
    const headers = ['Fecha', 'Email', 'Mes', 'Completitud %', 'Bugs', 'Satisfaccion', 'Comentarios'];
    const rows = reviews.map(r => [
      r.timestamp,
      r.developerEmail,
      r.monthName,
      r.completionPercentage,
      r.bugCount,
      SATISFACTION_EMOJIS.find(e => e.level === r.satisfaction)?.label || r.satisfaction,
      `"${(r.comments || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers, ...rows]
      .map(e => e.join(";"))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Check-in_Reporte_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-800">Panel de Control</h2>
            <p className="text-slate-500 text-sm">Reportes mensuales del equipo</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
            <i className="fa-solid fa-xmark text-slate-500"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {reviews.length === 0 ? (
            <div className="text-center py-20 text-slate-400 italic">No hay registros cargados.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b">
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Mes</th>
                  <th className="pb-4 text-center">Sprint</th>
                  <th className="pb-4 text-center">Bugs</th>
                  <th className="pb-4">Sentimiento</th>
                  <th className="pb-4">Comentarios</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                {[...reviews].reverse().map((review) => (
                  <tr key={review.id} className="border-b last:border-0 hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 font-semibold text-slate-800">{review.developerEmail}</td>
                    <td className="py-4 whitespace-nowrap">{review.monthName}</td>
                    <td className="py-4 text-center font-mono">{review.completionPercentage}%</td>
                    <td className="py-4 text-center">{review.bugCount}</td>
                    <td className="py-4 text-center">
                      {SATISFACTION_EMOJIS.find(e => e.level === review.satisfaction)?.emoji}
                    </td>
                    <td className="py-4 max-w-xs truncate italic text-slate-400" title={review.comments}>
                      {review.comments || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-6 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-slate-500 text-sm">Total: {reviews.length} reportes</span>
          <button
            onClick={downloadCSV}
            disabled={reviews.length === 0}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <i className="fa-solid fa-file-csv"></i>
            Descargar CSV para Excel
          </button>
        </div>
      </div>
    </div>
  );
};
