'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import LogoutButton from '../components/LogoutButton'

export default function Dashboard() {
const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        console.error(error)
        router.push('/login')
      }
    }
    getUser()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl">Welcome to the Dashboard</h1>
      {user && <p className="mt-2">Logged in as: {user.email}</p>}
      <LogoutButton />
    </div>
  )
}
