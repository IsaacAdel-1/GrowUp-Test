import { useEffect, useState } from 'react'

/* ============================================================
   راوتر بسيط بالـ hash (بدون مكتبات) — يدعم زر الرجوع والروابط.
   المسارات: /quiz  /result  /stages  /guide  /guide/<principleId>
   ------------------------------------------------------------
   يُرجع: [{ view, param }, navigate]
   ============================================================ */

function parse(hash) {
  const path = hash.replace(/^#/, '') || '/quiz'
  const parts = path.split('/').filter(Boolean) // ['guide','principle-3']
  return { view: parts[0] || 'quiz', param: parts[1] || null }
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const onHash = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (path) => {
    const next = path.startsWith('/') ? path : `/${path}`
    if (window.location.hash.replace(/^#/, '') !== next) {
      window.location.hash = next
    }
    // مرّر لأعلى الصفحة عند تغيير المسار
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return [route, navigate]
}
