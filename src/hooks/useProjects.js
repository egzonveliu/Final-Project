import { useMemo, useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addProject, updateProject, deleteProject,
  setFilter, setSearch, setPage,
} from '../store/slices/projectsSlice'

export function useProjects() {
  const dispatch = useDispatch()
  const { items, filter, search, currentPage, perPage } = useSelector(s => s.projects)

  const filtered = useMemo(() => {
    let result = items
    if (filter !== 'All') result = result.filter(p => p.category === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [items, filter, search])

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, currentPage, perPage])

  const totalPages = Math.ceil(filtered.length / perPage)
  const categories = useMemo(() => ['All', ...new Set(items.map(p => p.category))], [items])

  const add = useCallback((p) => dispatch(addProject({ ...p, createdAt: new Date().toISOString().split('T')[0] })), [dispatch])
  const update = useCallback((p) => dispatch(updateProject(p)), [dispatch])
  const remove = useCallback((id) => dispatch(deleteProject(id)), [dispatch])

  return {
    projects: paginated,
    allProjects: filtered,
    totalPages,
    currentPage,
    categories,
    filter,
    search,
    setFilter: (f) => dispatch(setFilter(f)),
    setSearch: (s) => dispatch(setSearch(s)),
    setPage: (p) => dispatch(setPage(p)),
    add,
    update,
    remove,
  }
}

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
