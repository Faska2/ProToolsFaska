'use client';

import { CvData } from './CvTypes';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface CvPreviewProps {
  data: CvData;
}

export default function CvPreview({ data }: CvPreviewProps) {
  const t = useTranslations();
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cvRef.current) {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2, // Improve quality
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0; // Top align for CVs typically

      // Adjust height if it exceeds one page, but for MVP one page or simple scaling
      // Ideally, proper PDF generation libraries (pdf-lib) or complex html2pdf handling is better for multi-page.
      // For this MVP, we'll fit to width and allow multi-page if needed by manually slicing, but simple scaling is easiest for "One Page CV".
      
      // Let's stick to standard A4 ratio scaling for the preview
      const componentWidth = pdfWidth;
      const componentHeight = (imgHeight * componentWidth) / imgWidth;
      
      pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      pdf.save('resume.pdf');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleDownload}
        className="self-end inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Download className="mr-2 h-4 w-4" />
        {t('Services.downloadPDF')}
      </button>

      <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
        <div 
          ref={cvRef} 
          className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[20mm] text-gray-900 shadow-sm"
          style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }} // Scale down for preview display
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-800 mb-2">
              {data.personalInfo.fullName || t('CV.yourName')}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
            </div>
            {data.personalInfo.summary && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-4 pb-1">
                {t('CV.experience')}
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-gray-800">{exp.title}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? t('CV.current') : exp.endDate}
                      </span>
                    </div>
                    <div className="text-base font-semibold text-gray-700 mb-1">{exp.company}</div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-4 pb-1">
                {t('CV.education')}
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-gray-800">{edu.school}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div className="text-base text-gray-700">{edu.degree}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-4 pb-1">
                {t('CV.skills')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name} <span className="text-gray-500 text-xs ml-1">({t(`CV.levels.${skill.level.toLowerCase()}`)})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
