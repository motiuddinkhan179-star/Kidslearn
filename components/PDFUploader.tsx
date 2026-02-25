'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, FileText, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploaderProps {
  onUpload: (base64: string, mimeType: string) => void;
  isProcessing: boolean;
}

export const PDFUploader: React.FC<FileUploaderProps> = ({ onUpload, isProcessing }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false,
    disabled: isProcessing
  });

  const handleProcess = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      onUpload(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-4 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer
          flex flex-col items-center justify-center gap-4
          ${isDragActive ? 'border-[#FFB84D] bg-[#FFF9F0]' : 'border-[#E6D5B8] bg-white'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#FFB84D] hover:bg-[#FFF9F0]'}
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#FFF9F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileUp className="w-10 h-10 text-[#FFB84D]" />
              </div>
              <h3 className="text-2xl font-kids font-bold text-[#4A3728] mb-2">Drop your PDF or Image here!</h3>
              <p className="text-[#8B735B]">Or click to pick a file (PDF, PNG, JPG)</p>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-[#E6F4EA] rounded-2xl flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <ImageIcon className="w-12 h-12 text-[#34A853]" />
                  ) : (
                    <FileText className="w-12 h-12 text-[#34A853]" />
                  )}
                </div>
                {!isProcessing && (
                  <button
                    onClick={clearFile}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#FF4D4D] rounded-full flex items-center justify-center text-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <p className="font-bold text-[#4A3728] truncate max-w-[200px]">{file.name}</p>
                <p className="text-sm text-[#8B735B]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {file && !isProcessing && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleProcess}
          className="w-full mt-6 py-4 bg-[#FFB84D] text-white rounded-2xl font-kids text-xl font-bold shadow-lg shadow-[#FFB84D]/30 hover:bg-[#FFA51F] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Make it a Story! ✨
        </motion.button>
      )}

      {isProcessing && (
        <div className="mt-6 p-6 bg-white rounded-2xl border-2 border-[#FFB84D] flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-[#FFB84D] animate-spin" />
            <p className="font-kids text-lg text-[#4A3728]">The magic is happening... 🪄</p>
          </div>
          <p className="text-sm text-[#8B735B] text-center">
            Hum puri book ko page-by-page aasan bana rahe hain. <br />
            Isme thoda time lag sakta hai, please wait karein...
          </p>
        </div>
      )}
    </div>
  );
};
