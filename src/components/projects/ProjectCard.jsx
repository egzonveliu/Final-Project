import { memo } from 'react'
import { useSelector } from 'react-redux'
import { ExternalLink, Pencil, Trash2, Star } from 'lucide-react'

const ProjectCard = memo(function ProjectCard({ project, onEdit, onDelete, isAdmin }) {
  const allSkills = useSelector(s => s.skills.items)
  const relatedSkills = allSkills.filter(s => project.skillIds?.includes(s.id))

  return (
    <div className="card group relative flex flex-col gap-4 hover:border-accent/20">
      {project.featured && (
        <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono text-accent/70 bg-accent/10 px-2 py-1 rounded">
          <Star size={10} /> Featured
        </span>
      )}

      <div>
        <p className="font-mono text-xs text-accent/70 mb-2 tracking-widest uppercase">{project.category}</p>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="font-mono text-[11px] px-2 py-1 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded text-gray-500 dark:text-white/40">
            {t}
          </span>
        ))}
      </div>

      {relatedSkills.length > 0 && (
        <div className="border-t border-gray-200 dark:border-white/[0.05] pt-3">
          <p className="font-mono text-[10px] text-gray-400 dark:text-white/25 uppercase tracking-widest mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {relatedSkills.map(s => (
              <span key={s.id} className="text-[11px] px-2 py-0.5 bg-accent/[0.06] border border-accent/20 rounded text-accent/70 font-mono">
                {s.name} · {s.level}%
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-white/[0.05]">
        <p className="font-mono text-[11px] text-gray-400 dark:text-white/25">{project.createdAt}</p>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <button onClick={() => onEdit(project)} className="text-gray-300 dark:text-white/30 hover:text-accent transition-colors" aria-label="Edit">
                <Pencil size={14} />
              </button>
              <button onClick={() => onDelete(project.id)} className="text-gray-300 dark:text-white/30 hover:text-red-400 transition-colors" aria-label="Delete">
                <Trash2 size={14} />
              </button>
            </>
          )}
          <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-300 dark:text-white/30 hover:text-accent transition-colors" aria-label="View project">
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
})

export default ProjectCard