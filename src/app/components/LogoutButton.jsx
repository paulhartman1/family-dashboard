'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout failed:', error.message)
    } else {
      router.push('/login') 
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-fuchsia/90"
    >
      Log out
    </button>
  )
}
