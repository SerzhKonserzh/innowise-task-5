import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '../../src/app/(public)/login/page'

vi.mock('../../src/components/LoginForm', () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm Component</div>
}))

describe('LoginPage', () => {
  it('renders login page correctly', () => {
    render(<LoginPage />)
    
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })
  
  it('matches snapshot', () => {
    const { asFragment } = render(<LoginPage />)
    expect(asFragment()).toMatchSnapshot()
  })
})