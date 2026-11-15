import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { notFound, routes } from './routes'

/** Keeps <title> and description right on client-side navigation (prerendered pages already have them). */
function MetaSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const r = routes.find((x) => x.path === pathname) ?? notFound
    document.title = r.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', r.meta.description)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Layout>
      <MetaSync />
      <Routes>
        {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
        <Route path="*" element={<notFound.Component />} />
      </Routes>
    </Layout>
  )
}
