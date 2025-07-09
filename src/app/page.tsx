'use client'


import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function Home() {
const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

 useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
        router.push('/dashboard')
      } else {
        console.error(error, user)
        router.push('/login')
      }
    }
    getUser()
  }, [])
  
  return (
     <p>Redirecting...</p>
  );
}
