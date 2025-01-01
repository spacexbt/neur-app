import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/components/provider-theme';

// Define interfaces for custom render options
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
}

// Define the props type for our wrapper component
interface TestWrapperProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

// Create a wrapper component with TypeScript support
function TestWrapper({ children, theme = 'light' }: TestWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// Create a custom render function with proper TypeScript types
function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { theme, ...renderOptions } = options;
  
  return render(ui, {
    wrapper: ({ children }) => (
      <TestWrapper theme={theme}>{children}</TestWrapper>
    ),
    ...renderOptions,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };