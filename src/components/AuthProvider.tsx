'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/src/store/auth.store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initializeFromCookies = useAuthStore(state => state.initializeFromCookies);

  useEffect(() => {
    initializeFromCookies();
  }, [initializeFromCookies]);

  return <>{children}</>;
}