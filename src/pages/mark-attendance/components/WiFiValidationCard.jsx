import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WiFiValidationCard = ({ 
  isConnected, 
  isValidNetwork, 
  networkName, 
  onMarkAttendance, 
  isLoading,
  isMarked 
}) => {
  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        icon: "WifiOff",
        color: "#dc2626",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        gradientFrom: "from-red-500",
        gradientTo: "to-red-600",
        title: "No Wi-Fi Connection",
        message: "Please connect to the hostel Wi-Fi network to mark your attendance."
      };
    }

    if (!isValidNetwork) {
      return {
        icon: "AlertTriangle",
        color: "#f59e0b",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        gradientFrom: "from-amber-500",
        gradientTo: "to-orange-500",
        title: "Invalid Network",
        message: `You are connected to "${networkName}". Please connect to the hostel Wi-Fi network.`
      };
    }

    return {
      icon: "Wifi",
      color: "#16a34a",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      title: "Connected to Hostel Wi-Fi",
      message: `Connected to "${networkName}". You can now mark your attendance.`
    };
  };

  const status = getConnectionStatus();
  const canMarkAttendance = isConnected && isValidNetwork && !isMarked;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br ${status?.gradientFrom} ${status?.gradientTo}`}>
          <Icon name={status?.icon} size={28} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {status?.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {status?.message}
          </p>
        </div>
      </div>

      {/* Network Status Cards */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <Icon name="Wifi" size={20} color="#6b7280" />
            </div>
            <span className="text-sm md:text-base font-semibold text-gray-900">Network Status</span>
          </div>
          <span className={`text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-sm ${
            isConnected 
              ? isValidNetwork 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-amber-100 text-amber-700 border border-amber-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isConnected ? (isValidNetwork ? "✓ Valid" : "⚠ Invalid") : "✗ Disconnected"}
          </span>
        </div>

        {isConnected && (
          <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Icon name="Radio" size={20} color="#6b7280" />
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">Network Name</span>
            </div>
            <span className="text-xs md:text-sm font-mono font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              {networkName}
            </span>
          </div>
        )}
      </div>

      {/* Mark Present Button */}
      <Button
        variant={canMarkAttendance ? "default" : "outline"}
        fullWidth
        disabled={!canMarkAttendance || isLoading}
        loading={isLoading}
        iconName="CheckCircle2"
        iconPosition="left"
        onClick={onMarkAttendance}
        className={`h-14 md:h-16 text-base md:text-lg font-bold shadow-lg transition-all duration-300 ${
          canMarkAttendance 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-xl transform hover:scale-[1.02]' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isMarked ? "✓ Attendance Already Marked" : "Mark Present"}
      </Button>

      {/* Valid Connection Info */}
      {isConnected && isValidNetwork && !isMarked && (
        <div className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle2" size={20} color="#16a34a" />
            </div>
            <div>
              <h4 className="text-base font-bold text-green-900 mb-1">Ready to Mark</h4>
              <p className="text-sm text-green-700 leading-relaxed">
                Your device is connected to the correct network. Click the button above to mark your attendance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WiFiValidationCard;