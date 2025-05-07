import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  fullWidth = false,
  disabled,
  ...props
}) => {
  // Button style based on variant
  const getButtonStyle = () => {
    const baseStyle = 'py-3 px-4 rounded-lg flex-row items-center justify-center';
    const widthStyle = fullWidth ? 'w-full' : '';
    
    switch (variant) {
      case 'primary':
        return `${baseStyle} ${widthStyle} bg-primary ${disabled || loading ? 'opacity-70' : ''}`;
      case 'secondary':
        return `${baseStyle} ${widthStyle} bg-secondary ${disabled || loading ? 'opacity-70' : ''}`;
      case 'danger':
        return `${baseStyle} ${widthStyle} bg-danger ${disabled || loading ? 'opacity-70' : ''}`;
      case 'success':
        return `${baseStyle} ${widthStyle} bg-success ${disabled || loading ? 'opacity-70' : ''}`;
      case 'outline':
        return `${baseStyle} ${widthStyle} border border-primary ${disabled || loading ? 'opacity-70' : ''}`;
      default:
        return `${baseStyle} ${widthStyle} bg-primary ${disabled || loading ? 'opacity-70' : ''}`;
    }
  };

  // Text style based on variant
  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return 'font-semibold text-primary text-center';
      default:
        return 'font-semibold text-white text-center';
    }
  };

  return (
    <TouchableOpacity
      className={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4361ee' : '#ffffff'} />
      ) : (
        <Text className={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;