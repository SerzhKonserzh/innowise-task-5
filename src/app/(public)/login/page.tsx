import { LoginForm } from '@/src/components/LoginForm';
import type { Metadata } from 'next';

export const meta: Metadata = {
  title: 'Login',
};

export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}