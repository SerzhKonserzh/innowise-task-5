'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/src/store/auth.store';
import { loginFormSchema } from './LoginForm.schema';
import type { LoginFormValues } from './LoginForm.schema';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const onSubmit = async (data: LoginFormValues) => {
    setError('');
    
    try {
      await login(data);
      
      //timeout to synchronize cookie
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push('/');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !onLoginSuccess) {
      router.push('/');
    }
  }, [isAuthenticated, router, onLoginSuccess]);

  return (
    <Card className="w-full max-w-md mx-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
        <CardContent className="flex flex-col gap-9">
          <div className="relative">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder='Enter username'
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 absolute top-15 left-0">{errors.username.message}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder='Enter password'
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 absolute top-15 left-0">{errors.password.message}</p>
            )}
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}