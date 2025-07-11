'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full p-2 border mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleSignup}>
        Create Account
      </button>
      <button className="bg-purple-600 text-white px-4 py-2 mx-4 rounded" onClick={() => router.push('/login')}>
        Log In
      </button>
    </div>
  )
}
