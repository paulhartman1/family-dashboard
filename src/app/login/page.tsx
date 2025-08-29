'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client' // Use the same client as dashboard

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient() // Create client instance

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace('/dashboard')
      }
    }
    checkUser()
  }, [router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    console.log('Attempting login...')

    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })

    if (error) {
      console.log('Login error:', error)
      setError(error.message)
      setLoading(false)
      return
    }

    console.log('Login successful:', data)
    
    // Wait a bit for the session to be set, then redirect
    if (data.session) {
      console.log('Session found, redirecting...')
      // Force a page refresh to ensure middleware picks up the new session
      window.location.href = '/dashboard'
    }
    
    setLoading(false)
  }

  const handleSignUp = async () => {
    setError(null)
    
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      setError(error.message)
    } else {
      setError('Check your email for verification link!')
    }
  }

  return (
    <>
    
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

