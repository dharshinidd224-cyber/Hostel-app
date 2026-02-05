import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttachmentUpload = ({ attachments, onAttachmentsChange, maxFiles = 3, maxSizeMB = 5 }) => {
  const [dragActive, setDragActive] = useState(false);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => {
      const isValidType = allowedTypes?.includes(file?.type);
      const isValidSize = file?.size <= maxSizeMB * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (attachments?.length + validFiles?.length <= maxFiles) {
      const newAttachments = validFiles?.map(file => ({
        id: Date.now() + Math.random(),
        name: file?.name,
        size: file?.size,
        type: file?.type,
        file: file
      }));
      onAttachmentsChange([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (id) => {
    onAttachmentsChange(attachments?.filter(att => att?.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('word')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    return 'File';
  };

  return (
    <>
      <style jsx>{`
      @keyframes borderGradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Generic gradient border for upload box */
.gradient-border-box {
  background:
    linear-gradient(var(--bg, white), var(--bg, white)) padding-box,
    linear-gradient(
      135deg,
      #3b82f6,
      #8b5cf6,
      #ec4899,
      #3b82f6
    ) border-box;
  border: 2px solid transparent;
  background-size: 200% 200%;
  animation: borderGradientFlow 3s ease infinite;
}

        @keyframes uploadFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fileSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes dragPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
        }

        .upload-zone {
          transition: all 0.3s ease;
        }

        .upload-zone.drag-active {
          animation: dragPulse 1.5s ease-in-out infinite;
          transform: scale(1.02);
        }
          

        .upload-icon {
          transition: all 0.3s ease;
        }

        .upload-zone:hover .upload-icon {
          animation: uploadFloat 2s ease-in-out infinite;
        }

        .file-item {
          animation: fileSlideIn 0.3s ease-out;
          transition: all 0.2s ease;
        }

        .file-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Attachments (Optional)
        </label>
        <div
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
  className={`
    upload-zone relative rounded-xl p-6 md:p-8
    gradient-border-box
    ${dragActive ? 'drag-active' : ''}
    ${attachments?.length >= maxFiles
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer'}
  `}
  style={{
    '--bg': dragActive ? '#eff6ff' : '#ffffff'
  }}
>

          <input
            type="file"
            multiple
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            disabled={attachments?.length >= maxFiles}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center text-center">
            <div className="upload-icon w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon name="Upload" size={24} color="var(--color-primary)" />
            </div>
            <div className="text-sm md:text-base font-medium text-foreground mb-1">
              Drop files here or click to browse
            </div>
            <div className="text-xs md:text-sm text-muted-foreground caption">
              PDF, DOC, DOCX, JPG, PNG up to {maxSizeMB}MB (Max {maxFiles} files)
            </div>
          </div>
        </div>
        
        {attachments?.length > 0 && (
          <div className="space-y-2">
            {attachments?.map((attachment, index) => (
              <div
                key={attachment?.id}
                className="file-item flex items-center justify-between p-3 md:p-4 rounded-lg border border-border bg-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name={getFileIcon(attachment?.type)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base font-medium text-foreground truncate">
                      {attachment?.name}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {formatFileSize(attachment?.size)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment?.id)}
                  iconName="X"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground caption">
          <Icon name="Info" size={14} />
          <span>
            {attachments?.length} of {maxFiles} files uploaded
          </span>
        </div>
      </div>
    </>
  );
};

export default AttachmentUpload;