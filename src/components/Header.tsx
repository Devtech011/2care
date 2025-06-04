'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';
import Logo from '../../public/assets/report_7652441.png'
import Image from 'next/image';
import Cookies from 'js-cookie';
import { HeaderProps } from '@/types';

export default function Header({ token }: HeaderProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const handleLogin = async (email: string, password: string) => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
    Cookies.remove('token');
    window.location.reload();
  };

  return (
    <section className="text-center mb-12">
      <div className="flex justify-between items-center mb-4 ">
        <div className='flex gap-2'>
           <Image height={50} width={50} src={Logo} alt="" />
           <h1 className="text-2xl md:text-3xl font-semibold">MedReport Analyzer</h1>
        </div>
       
        {token ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLogout()}
              className="text-violet-600 hover:text-violet-700 transition-colors"
            >
              Logout
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors"
              >
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-violet-600 hover:text-violet-700 transition-colors"
          >
            Sign in
          </button>
        )}
      </div>
      <p className="text-gray-600 max-w-xl mx-auto">
        Securely upload your medical reports for AI-powered analysis and receive clear, patient-friendly summaries while maintaining HIPAA compliance.
      </p>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </section>
  );
}
  