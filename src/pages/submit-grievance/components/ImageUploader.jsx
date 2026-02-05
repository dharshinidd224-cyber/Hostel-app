import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploader = ({ images, onChange, error }) => {
  const fileInputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const maxFiles = 3;
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    
    if (images?.length + files?.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const validFiles = files?.filter(file => {
      if (file?.size > maxFileSize) {
        alert(`${file?.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!file?.type?.startsWith('image/')) {
        alert(`${file?.name} is not an image file`);
        return false;
      }
      return true;
    });

    if (validFiles?.length > 0) {
      const newImages = [...images, ...validFiles];
      onChange(newImages);

      validFiles?.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader?.result]);
        };
        reader?.readAsDataURL(file);
      });
    }

    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const newImages = images?.filter((_, i) => i !== index);
    const newPreviews = previewUrls?.filter((_, i) => i !== index);
    onChange(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Upload Images (Optional)
      </label>
      <p className="text-xs text-gray-600 mb-4">
        Add photos to help illustrate the issue (Max 3 images, 5MB each)
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      {images?.length === 0 ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Icon name="Upload" size={28} color="white" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 mb-1">
                Click to upload images
              </div>
              <div className="text-xs text-gray-600">
                PNG, JPG, JPEG up to 5MB each
              </div>
            </div>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {previewUrls?.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 hover:border-blue-400 transition-colors">
                  <Image
                    src={url}
                    alt={`Grievance evidence photo ${index + 1} showing the reported issue`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-red-600"
                >
                  <Icon name="X" size={16} />
                </button>
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded px-2 py-1">
                  <div className="text-xs text-gray-900 truncate">
                    {images?.[index]?.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {(images?.[index]?.size / 1024)?.toFixed(1)} KB
                  </div>
                </div>
              </div>
            ))}
          </div>

          {images?.length < maxFiles && (
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Add More Images ({images?.length}/{maxFiles})
            </Button>
          )}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 mt-3 text-xs text-red-600">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;