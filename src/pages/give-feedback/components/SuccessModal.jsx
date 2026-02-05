import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, onSubmitAnother }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-overlay"
        onClick={onClose}
      >
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="success-icon-container">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={56} className="success-icon" />
            </div>
          </div>

          <h2 className="modal-title">
            Feedback Submitted Successfully!
          </h2>

          <p className="modal-description">
            Thank you for sharing your experience. Your feedback has been received and will be reviewed by the hostel administration to help us improve our services.
          </p>

          <div className="modal-actions">
            <button
              className="action-button secondary"
              onClick={onSubmitAnother}
            >
              Submit Another
            </button>
            <button
              className="action-button primary"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 40px 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .close-button:hover {
          background: #e5e7eb;
          color: #111827;
          transform: scale(1.05);
        }

        .close-button:active {
          transform: scale(0.95);
        }

        .success-icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .success-icon-wrapper {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: successPop 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        @keyframes successPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-icon {
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .modal-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .modal-description {
          font-size: 1rem;
          color: #6b7280;
          text-align: center;
          line-height: 1.6;
          margin: 0 0 32px 0;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          flex-direction: column;
        }

        .action-button {
          width: 100%;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-button.primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .action-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .action-button.primary:active {
          transform: translateY(0);
        }

        .action-button.secondary {
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .action-button.secondary:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .action-button.secondary:active {
          background: #f3f4f6;
        }

        @media (min-width: 640px) {
          .modal-actions {
            flex-direction: row;
          }

          .action-button.secondary {
            order: -1;
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 32px 24px;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-description {
            font-size: 0.9375rem;
          }

          .success-icon-wrapper {
            width: 80px;
            height: 80px;
          }

          .success-icon {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </>
  );
};

export default SuccessModal;