import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon, XCircle } from 'lucide-react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, variant = 'default', icon, onClose, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'destructive':
          return 'bg-red-100 border-red-400 text-red-700';
        case 'success':
          return 'bg-green-100 border-green-400 text-green-700';
        case 'warning':
          return 'bg-yellow-100 border-yellow-400 text-yellow-700';
        default:
          return 'bg-blue-100 border-blue-400 text-blue-700';
      }
    };

    const getIcon = () => {
      if (icon) return icon;
      switch (variant) {
        case 'destructive':
          return <XCircle className="w-5 h-5" />;
        case 'success':
          return <CheckCircle className="w-5 h-5" />;
        case 'warning':
          return <AlertCircle className="w-5 h-5" />;
        default:
          return <InfoIcon className="w-5 h-5" />;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`border px-4 py-3 rounded relative ${getVariantStyles()}`}
        {...props}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 w-full">
            <div className="text-sm">{children}</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };

export const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h5 className="mb-1 font-medium leading-none tracking-tight">{children}</h5>
);

export const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm [&_p]:leading-relaxed">{children}</div>
);