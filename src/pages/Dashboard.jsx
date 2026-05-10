import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import { addSkill, updateSkill, deleteSkill } from '../store/slices/skillsSlice'
import { fetchUserActivity } from '../api/client'
import ProjectForm from '../components/projects/ProjectForm'
import SkillForm from '../components/skills/SkillForm'
import Modal from '../components/ui/Modal'
import { Plus, Pencil, Trash2, FolderOpen, Zap, CheckSquare, User } from 'lucide-react'
import toast from 'react-hot-toast'

function StatsRow({ projectCount, skillCount, activityCount }) {
  const stats = [
    { label: 'Projects', value: projectCount, icon: FolderOpen },
    { label: 'Skills', value: skillCount, icon: Zap },
    { label: 'API Tasks', value: activityCount, icon: CheckSquare },
  ]
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-dark-700 rounded-lg p-5 border border-white/[0.07]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded bg-accent/[0.08] flex items-center justify-center">
              <Icon size={15} className="text-accent" />
            </div>
            <p className="font-mono text-xs text-white/35 uppercase tracking-widest">{label}</p>
          </div>
          <p className="text-3xl font-extrabold text-white">{value}</p>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const skills = useSelector(s => s.skills.items)
  const allProjects = useSelector(s => s.projects.items)
  const { add: addProject, update: updateProject, remove: removeProject } = useProjects()

  const [modal, setModal] = useState({ open: false, type: null, item: null })

  const { data: activity = [] } = useQuery({
    queryKey: ['activity'],
    queryFn: fetchUserActivity,
    staleTime: 1000 * 60 * 5,
  })

  const chartData = useMemo(() => skills.map(s => ({ name: s.name.split(' ')[0], level: s.level })), [skills])

  const openModal = useCallback((type, item = null) => setModal({ open: true, type, item }), [])
  const closeModal = useCallback(() => setModal({ open: false, type: null, item: null }), [])

  const handleProjectSubmit = useCallback((data) => {
    if (modal.item) { updateProject({ ...modal.item, ...data }); toast.success('Projekt u përditësua!') }
    else { addProject(data); toast.success('Projekt u shtua!') }
    closeModal()
  }, [modal.item, addProject, updateProject, closeModal])

  const handleSkillSubmit = useCallback((data) => {
    if (modal.item) { dispatch(updateSkill({ ...modal.item, ...data, level: Number(data.level) })); toast.success('Skill u përditësua!') }
    else { dispatch(addSkill({ ...data, level: Number(data.level) })); toast.success('Skill u shtua!') }
    closeModal()
  }, [modal.item, dispatch, closeModal])

  const handleDeleteProject = useCallback((id) => {
    if (window.confirm('Fshi projektin?')) { removeProject(id); toast.success('Projekt u fshi.') }
  }, [removeProject])

  const handleDeleteSkill = useCallback((id) => {
    if (window.confirm('Fshi skill-in?')) { dispatch(deleteSkill(id)); toast.success('Skill u fshi.') }
  }, [dispatch])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Welcome */}
      <div className="flex items-center gap-4 mb-10 p-5 card">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <User size={20} className="text-accent" />
        </div>
        <div>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-1">Dashboard</p>
          <h1 className="text-xl font-bold text-white">Welcome back, {user?.name}!</h1>
          <p className="text-sm text-white/40">{user?.email} · {user?.role}</p>
        </div>
      </div>

      <StatsRow projectCount={allProjects.length} skillCount={skills.length} activityCount={activity.filter(a => a.completed).length} />

      {/* Chart */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-5">Skills Overview</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={28}>
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#0f0f16', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, fontSize: 12 }}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            />
            <Bar dataKey="level" radius={[3, 3, 0, 0]}>
              {chartData.map((_, i) => <Cell key={i} fill={`rgba(124,255,164,${0.4 + (i % 3) * 0.2})`} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Projects CRUD */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Manage Projects</h2>
          <button onClick={() => openModal('project')} className="btn-primary py-2 px-3 text-xs flex items-center gap-1">
            <Plus size={13} /> Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {allProjects.map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-dark-600 rounded border border-white/[0.05] hover:border-white/[0.1] transition-colors">
              <div>
                <p className="text-sm font-medium text-white/80">{p.title}</p>
                <p className="font-mono text-xs text-white/30">{p.category} · {p.createdAt}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openModal('project', p)} className="p-1.5 text-white/30 hover:text-accent transition-colors"><Pencil size={13} /></button>
                <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills CRUD */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Manage Skills</h2>
          <button onClick={() => openModal('skill')} className="btn-primary py-2 px-3 text-xs flex items-center gap-1">
            <Plus size={13} /> Add
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skills.map(s => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-dark-600 rounded border border-white/[0.05] hover:border-white/[0.1] transition-colors">
              <div>
                <p className="text-sm text-white/75">{s.name}</p>
                <p className="font-mono text-xs text-accent/60">{s.level}%</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openModal('skill', s)} className="p-1 text-white/30 hover:text-accent transition-colors"><Pencil size={12} /></button>
                <button onClick={() => handleDeleteSkill(s.id)} className="p-1 text-white/30 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Activity */}
      <div className="card">
        <h2 className="font-bold text-white mb-5">Recent Activity <span className="font-mono text-xs text-white/25 ml-2">via API</span></h2>
        <div className="flex flex-col gap-2">
          {activity.slice(0, 6).map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-dark-600 rounded border border-white/[0.04]">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.completed ? 'bg-accent' : 'bg-white/20'}`} />
              <p className="text-sm text-white/55 truncate">{item.title}</p>
              <span className={`ml-auto font-mono text-[10px] px-2 py-0.5 rounded ${item.completed ? 'bg-accent/10 text-accent/70' : 'bg-white/[0.04] text-white/25'}`}>
                {item.completed ? 'done' : 'pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modal.open}
        onClose={closeModal}
        title={modal.type === 'project' ? (modal.item ? 'Modifiko Projektin' : 'Shto Projekt') : (modal.item ? 'Modifiko Skill' : 'Shto Skill')}
      >
        {modal.type === 'project'
          ? <ProjectForm onSubmit={handleProjectSubmit} defaultValues={modal.item} onCancel={closeModal} />
          : <SkillForm onSubmit={handleSkillSubmit} defaultValues={modal.item} onCancel={closeModal} />
        }
      </Modal>
    </div>
  )
}
