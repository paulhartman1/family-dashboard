'use client'


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function Home() {
const [user, setUser] = useState<User | null>(null)
  const router = useRouter()


  
  return (
     <p>Redirecting...</p>
  );
}
