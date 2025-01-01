import * as React from 'react';
import { cn } from '@/lib/utils';

type InputValue = string | number | readonly string[];

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** The current value of the input */
  value?: InputValue;
  /** Callback when the input value changes */
  onChange?: (value: InputValue, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional error state */
  error?: boolean;
  /** Optional error message */
  errorMessage?: string;
  /** Optional helper text */
  helperText?: string;
  /** Optional start adornment (element before input) */
  startAdornment?: React.ReactNode;
  /** Optional end adornment (element after input) */
  endAdornment?: React.ReactNode;
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional test ID for testing purposes */
  'data-testid'?: string;
}

const getInputSize = (size: InputProps['size']): string => {
  switch (size) {
    case 'sm':
      return 'h-8 text-sm';
    case 'lg':
      return 'h-10 text-lg';
    default:
      return 'h-9 text-base md:text-sm';
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error,
      errorMessage,
      helperText,
      startAdornment,
      endAdornment,
      size = 'md',
      onChange,
      value,
      'data-testid': testId,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
      onChange?.(newValue, event);
    };

    return (
      <div className="relative w-full">
        {startAdornment && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{startAdornment}</div>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive',
            startAdornment && 'pl-10',
            endAdornment && 'pr-10',
            getInputSize(size),
            className,
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          data-testid={testId}
          aria-invalid={error}
          aria-errormessage={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div>
        )}
        {(helperText || errorMessage) && (
          <div
            className={cn(
              'mt-1 text-sm',
              error ? 'text-destructive' : 'text-muted-foreground',
            )}
            id={error ? `${props.id}-error` : undefined}
          >
            {error ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
