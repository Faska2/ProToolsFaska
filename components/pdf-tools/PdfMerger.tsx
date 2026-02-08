'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, ArrowDown, ArrowUp, Loader2 } from 'lucide-react';

export default function PdfMerger() {
  const t = useTranslations();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) {
      return;
    }

    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert(t('Common.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/5 border border-white/10 rounded-lg shadow-sm text-white">
      <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center mb-8 bg-white/5 hover:bg-white/10 transition-colors">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <span className="text-lg font-medium text-white mb-2">
            {t('Pdf.dropFiles')}
          </span>
          <span className="text-sm text-gray-400">
            {t('Pdf.pdfOnly')}
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">{files.length} {t('Pdf.filesSelected')}</h3>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              {t('Pdf.clear')}
            </button>
          </div>
          
          <ul className="space-y-3">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10"
              >
                <div className="flex items-center overflow-hidden">
                  <FileText className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="truncate text-sm font-medium text-gray-200">
                    {file.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} {t('Common.mb')})
                  </span>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => moveFile(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(index, 'down')}
                    disabled={index === files.length - 1}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={mergePdfs}
        disabled={files.length < 2 || isProcessing}
        className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center justify-center transition-all"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
            {t('Pdf.processing')}
          </>
        ) : (
          t('Pdf.merge')
        )}
      </button>
    </div>
  );
}
