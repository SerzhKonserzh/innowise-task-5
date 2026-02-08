import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from '../../src/components/LoginForm'

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => {},
    handleSubmit: () => (fn: any) => fn,
    formState: { errors: {}, isSubmitting: false },
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('../../src/store/auth.store', () => ({
  useAuthStore: () => ({
    login: vi.fn(),
  }),
}))

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    render(<LoginForm />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Enter your credentials to access your account')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })
  
  it('matches snapshot', () => {
    const { asFragment } = render(<LoginForm />)
    expect(asFragment()).toMatchSnapshot()
  })
})