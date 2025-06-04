'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import LoginModal from "./LoginModal";
import { fileAPI } from '@/services/api';
import Loader from './Loader';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { FileUploaderProps } from '@/types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function FileUploader({ setSummary, token }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 10MB');
      return false;
    }

    return true;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const selected = e.target.files?.[0];
    if (selected) {
      if (validateFile(selected)) {
        setFile(selected);
      } else {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (agreed) setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!agreed) {
      toast.error("You must consent to HIPAA terms before uploading.");
      return;
    }

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoginModalOpen(false);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    if (!agreed) {
      toast.error("You must consent to HIPAA terms before uploading.");
      return;
    }

    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    setUploading(true);
    try {
      const result = await fileAPI.uploadFile(file);
      setSummary(result.summary);
      toast.success("File uploaded successfully!");
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = () => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    inputRef.current?.click();
  };

  return (
    <>
      {uploading && <Loader />}
      <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Upload Your Medical Report</h2>
        <p className="text-gray-500 text-sm mb-6">
          We support PDF files up to 10MB from various medical providers.
        </p>

        <label className="block mb-6 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2"
          />
          I consent to the secure processing of my health data (HIPAA compliant).
        </label>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileSelect}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 
            ${!agreed
              ? "cursor-not-allowed opacity-50 border-gray-300"
              : dragActive
                ? "border-violet-500 bg-violet-50"
                : "cursor-pointer border-gray-300 hover:bg-gray-50"
            }`}
        >
          <input
            type="file"
            accept="application/pdf"
            disabled={!agreed || uploading}
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-violet-600 text-2xl">⬆️</div>
            <p className="text-gray-600">Drag & drop your PDF file here or click to select</p>
            <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
            <button
              type="button"
              className="bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-violet-700"
              disabled={!agreed}
            >
              Select PDF File
            </button>
          </div>
        </div>

        {file && (
          <div className="mt-6">
            <div className="p-3 bg-violet-50 border border-violet-200 rounded text-sm text-violet-700 flex items-center gap-2 mb-3">
              📄 <span className="truncate">{file?.name}</span>
              <span className="text-xs text-gray-500">({formatFileSize(file?.size)})</span>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Upload File
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          Your data is securely encrypted and transmitted according to HIPAA standards.
        </p>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
