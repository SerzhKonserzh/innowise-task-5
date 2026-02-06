'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/store/auth.store';
import { LoginForm } from '@/src/components/LoginForm';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}