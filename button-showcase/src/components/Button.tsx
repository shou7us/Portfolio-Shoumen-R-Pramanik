import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'soft' | 'text';
  colorScheme?: 'brand' | 'base' | 'grey' | 'error' | 'ai';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'pill' | 'square' | 'circle';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'solid',
      colorScheme = 'base',
      size = 'md',
      shape = 'rounded',
      leftIcon,
      rightIcon,
      iconOnly,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      'btn',
      `btn-variant-${variant}`,
      `btn-color-${colorScheme}`,
      `btn-size-${size}`,
      `btn-shape-${shape}`,
      iconOnly ? 'btn-icon-only' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
        {!iconOnly && <span className="btn-label">{children}</span>}
        {iconOnly && <span className="btn-icon btn-icon-center">{children}</span>}
        {rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
