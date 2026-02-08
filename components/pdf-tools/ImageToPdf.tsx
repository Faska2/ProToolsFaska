'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import jsPDF from 'jspdf';
import { Upload, Image as ImageIcon, X, ArrowDown, ArrowUp, Loader2 } from 'lucide-react';

export default function ImageToPdf() {
  const t = useTranslations();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Filter for image files only
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles([...files, ...newFiles]);
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

  const convertToPdf = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Load image
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate image dimensions to fit page while maintaining aspect ratio
        const ratio = imgProps.width / imgProps.height;
        let width = pdfWidth;
        let height = width / ratio;

        if (height > pdfHeight) {
          height = pdfHeight;
          width = height * ratio;
        }

        // Add new page for each image except the first one
        if (i > 0) {
          pdf.addPage();
        }

        // Center image on page
        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        pdf.addImage(imgData, 'JPEG', x, y, width, height);
      }

      pdf.save(`images-to-pdf-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error converting images to PDF:', error);
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
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <span className="text-lg font-medium text-white mb-2">
            {t('Pdf.dropFiles')}
          </span>
          <span className="text-sm text-gray-400">
            {t('Pdf.imageFormats')}
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">{files.length} {t('Pdf.imagesSelected')}</h3>
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
                  <ImageIcon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
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
        onClick={convertToPdf}
        disabled={files.length === 0 || isProcessing}
        className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center justify-center transition-all"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
            {t('Pdf.processing')}
          </>
        ) : (
          t('Pdf.convert')
        )}
      </button>
    </div>
  );
}
