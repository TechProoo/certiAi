import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const SuccessNotification = ({
  message,
  onClose,
  duration = 3000,
}: SuccessNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px]">
        <div className="shrink-0">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Success</p>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;
