"use client"
import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center z-50"
      onClick={onClose}
    >
        <MaxWidthWrapper>
      <div className="bg-black p-4 shadow-md w-full" onClick={(e) => e.stopPropagation()}>
        

            {children}
       
        
      </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PrivacyModal;