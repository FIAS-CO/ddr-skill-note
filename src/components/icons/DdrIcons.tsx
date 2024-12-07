import soflanIcon from '@/assets/icons/soflan.svg';
import stopIcon from '@/assets/icons/stop.svg';
import shockIcon from '@/assets/icons/shockarrow.svg';
import { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'img'> {
    size?: number;
}

export const SoflanIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    ...props
}) => (
    <img
        src={soflanIcon}
        width={size}
        height={size}
        className={`inline-block ${className}`}
        alt="BPM変化あり"
        title="BPM変化あり"
        {...props}
    />
);

export const StopIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    ...props
}) => (
    <img
        src={stopIcon}
        width={size}
        height={size}
        className={`inline-block ${className}`}
        alt="停止あり"
        title="停止あり"
        {...props}
    />
);

export const ShockIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    ...props
}) => (
    <img
        src={shockIcon}
        width={size}
        height={size}
        className={`inline-block ${className}`}
        alt="ショックアローあり"
        title="ショックアローあり"
        {...props}
    />
);