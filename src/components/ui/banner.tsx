'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const BANNER_STATE_KEY = 'dd-banner:visible' as const;
type BannerState = 'true' | 'false';

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to display in the banner */
  children: React.ReactNode;
  /** Optional callback when banner is dismissed */
  onDismiss?: () => void;
  /** Optional initial visibility state */
  defaultVisible?: boolean;
  /** Optional class name for the banner container */
  className?: string;
  /** Optional test ID for testing purposes */
  'data-testid'?: string;
}

export function Banner({
  children,
  onDismiss,
  defaultVisible = true,
  className,
  'data-testid': testId,
  ...props
}: BannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultVisible;
    const bannerState = localStorage.getItem(BANNER_STATE_KEY) as BannerState | null;
    return bannerState !== 'false';
  });

  // Persist banner state in localStorage
  useEffect(() => {
    const bannerState = localStorage.getItem(BANNER_STATE_KEY) as BannerState | null;
    if (!bannerState && defaultVisible) {
      setIsVisible(true);
    }
  }, [defaultVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(BANNER_STATE_KEY, 'false');
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="relative bg-muted px-6 py-2.5 sm:px-3.5"
      data-testid={testId}
      {...props}
    >
      <div className="flex items-center justify-between gap-x-4">
        <p className="text-sm">{children}</p>
        <button
          type="button"
          className="-m-1.5 flex-none p-1.5 hover:opacity-80"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
        >
          <span className="sr-only">Dismiss</span>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}