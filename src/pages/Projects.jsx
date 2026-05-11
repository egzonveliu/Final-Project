import { useState, useCallback, useRef, useEffect } from 'react'
import { Search, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProjects, useDebounce } from '../hooks/useProjects'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectForm from '../components/projects/ProjectForm'
import Modal from '../components/ui/Modal'
import Pagination from '../components/ui/Pagination'
import toast from 'react-hot-toast'

function ProjectsHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
      <p className="section-tag mb-5">My Work</p>
      <h1 className="page-title mb-4">Projects</h1>
      <p className="text-base text-gray-500 dark:text-white/50 max-w-lg">
        Front-end projects built with focus on clean design, functionality, and mobile responsiveness.
      </p>
    </section>
  )
}

export default function Projects() {
  const { isAuthenticated } = useAuth()
  const {
    projects, totalPages, currentPage, categories, filter, search,
    setFilter, setSearch, setPage, add, update, remove,
  } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [localSearch, setLocalSearch] = useState(search)
  const searchRef = useRef(null)
  const debounced = useDebounce(localSearch, 350)

  useEffect(() => { setSearch(debounced) }, [debounced, setSearch])

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus()
  }, [])

  const handleAdd = useCallback(() => { setEditing(null); setModalOpen(true) }, [])
  const handleEdit = useCallback((p) => { setEditing(p); setModalOpen(true) }, [])
  const handleClose = useCallback(() => { setModalOpen(false); setEditing(null) }, [])

  const handleSubmit = useCallback((data) => {
    if (editing) {
      update({ ...editing, ...data })
      toast.success('Projekti u përditësua!')
    } else {
      add(data)
      toast.success('Projekti u shtua!')
    }
    handleClose()
  }, [editing, add, update, handleClose])

  const handleDelete = useCallback((id) => {
    if (window.confirm('A jeni i sigurt që dëshironi të fshini këtë projekt?')) {
      remove(id)
      toast.success('Projekti u fshi.')
    }
  }, [remove])

  return (
    <div>
      <ProjectsHero />

      {/* Search, Filter, Add */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded text-xs font-mono tracking-wide border transition-colors
                  ${filter === cat
                    ? 'bg-accent/10 border-accent/40 text-accent'
                    : 'border-gray-200 dark:border-white/[0.08] text-gray-400 dark:text-white/40 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-600 dark:hover:text-white/70'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
              <input
                ref={searchRef}
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Kërko projekte..."
                className="input pl-9 py-2 text-xs"
              />
            </div>
            {isAuthenticated && (
              <button onClick={handleAdd} className="btn-primary py-2 px-4 text-xs flex items-center gap-2 whitespace-nowrap">
                <Plus size={14} /> Add Project
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6">
        {projects.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-white/30">
            <p className="text-lg mb-2">Asnjë projekt nuk u gjet.</p>
            <p className="text-sm">Provo të ndryshosh filtrin ose kërkimin.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} onEdit={handleEdit} onDelete={handleDelete} isAdmin={isAuthenticated} />
            ))}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal isOpen={modalOpen} onClose={handleClose} title={editing ? 'Modifiko Projektin' : 'Shto Projekt të Ri'}>
        <ProjectForm onSubmit={handleSubmit} defaultValues={editing} onCancel={handleClose} />
      </Modal>
    </div>
  )
}