import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const prev = useCallback(() => onPageChange(currentPage - 1), [currentPage, onPageChange])
  const next = useCallback(() => onPageChange(currentPage + 1), [currentPage, onPageChange])

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className="p-2 rounded border border-white/10 text-white/50 hover:border-accent/40 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded border text-sm font-mono transition-colors
            ${page === currentPage
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={next}
        disabled={currentPage === totalPages}
        className="p-2 rounded border border-white/10 text-white/50 hover:border-accent/40 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
