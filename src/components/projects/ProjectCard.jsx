import { memo } from 'react'
import { ExternalLink, Pencil, Trash2, Star } from 'lucide-react'

const ProjectCard = memo(function ProjectCard({ project, onEdit, onDelete, isAdmin }) {
  return (
    <div className="card group relative flex flex-col gap-4 hover:border-accent/20">
      {project.featured && (
        <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono text-accent/70 bg-accent/10 px-2 py-1 rounded">
          <Star size={10} /> Featured
        </span>
      )}

      <div>
        <p className="font-mono text-xs text-accent/70 mb-2 tracking-widest uppercase">{project.category}</p>
        <h3 className="font-bold text-white text-lg leading-snug mb-2">{project.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="font-mono text-[11px] px-2 py-1 bg-white/[0.04] border border-white/[0.07] rounded text-white/40">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.05]">
        <p className="font-mono text-[11px] text-white/25">{project.createdAt}</p>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <button onClick={() => onEdit(project)} className="text-white/30 hover:text-accent transition-colors" aria-label="Edit">
                <Pencil size={14} />
              </button>
              <button onClick={() => onDelete(project.id)} className="text-white/30 hover:text-red-400 transition-colors" aria-label="Delete">
                <Trash2 size={14} />
              </button>
            </>
          )}
          <a href={project.link} target="_blank" rel="noreferrer" className="text-white/30 hover:text-accent transition-colors" aria-label="View project">
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
})

export default ProjectCard
