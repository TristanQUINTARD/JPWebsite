
import React from 'react';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

type Props = {
  className?: ClassValue;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Utilisation d'onChange
  placeholder: string;
  type: string;
  name: string;
};

export default function Input({
  className,
  value,
  onChange,
  placeholder,
  type,
  name,
}: Props) {
  return (
    <input
      className={cn(
        'rounded-base bg-white dark:bg-darkBg border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none',
        className,
      )}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Appel direct de onChange
      aria-label={placeholder}
    />
  );
}
