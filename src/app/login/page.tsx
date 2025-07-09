'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
     <Image
      src="https://picsum.photos/350/350"
      width={350}
      height={350}
      style={imageStyle}
      alt="Picture of the author"
    />
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl mb-4">Log In</h1>
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
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Log In
      </button>
         <button className="bg-purple-600 text-white px-4 mx-4 py-2 rounded" onClick={() => router.push('/signup')}>
        Sign Up
      </button>
    </div>
    </>
  )
}

const imageStyle = {
  borderRadius: '50%',
  border: '1px solid #fff',
  width: '100px',
  height: 'auto',
}


