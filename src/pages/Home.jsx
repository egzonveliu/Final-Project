import { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Download } from 'lucide-react'

function HeroSection() {
  const textRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <p className={`section-tag mb-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Available for work
      </p>
      <h1
        ref={textRef}
        className={`text-6xl md:text-8xl font-extrabold leading-none tracking-tight text-white/95 mb-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        Egzon<br /><span className="text-white/30">Veliu</span>
      </h1>
      <p className={`text-xl text-white/40 mb-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Junior Front-End Developer
      </p>
      <p className={`max-w-xl text-base text-white/55 leading-relaxed mb-10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Building modern, responsive, and functional web applications with React and Tailwind CSS.
        Combining technical skills with a practical, detail-oriented mindset.
      </p>
      <div className={`flex flex-wrap gap-3 mb-16 transition-all duration-700 delay-[400ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link to="/projects" className="btn-primary flex items-center gap-2">
          View Projects <ArrowRight size={15} />
        </Link>
        <Link to="/contact" className="btn-outline">Get in Touch</Link>
      </div>
      <div className="grid grid-cols-3 gap-8 border-t border-white/[0.07] pt-8 max-w-sm">
        {[{ n: '8+', l: 'Tech Skills' }, { n: '6+', l: 'Years Exp.' }, { n: '2025', l: 'Diploma' }].map(s => (
          <div key={s.l}>
            <p className="text-2xl font-extrabold text-white/95">{s.n}</p>
            <p className="font-mono text-[11px] text-white/30 tracking-widest uppercase mt-1">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillsPreview() {
  const skills = useSelector(s => s.skills.items)
  const topSkills = useMemo(() => skills.slice(0, 6), [skills])

  return (
    <section className="border-t border-white/[0.06] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white/90">Tech Stack</h2>
          <Link to="/about" className="font-mono text-xs text-accent/70 hover:text-accent transition-colors tracking-widest">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topSkills.map(skill => (
            <div key={skill.id} className="card hover:border-accent/20 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{skill.name}</span>
                <span className="font-mono text-xs text-accent/60">{skill.level}%</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent/70 rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const items = [
    { date: '2025', title: 'Diploma in Front-End Development', sub: 'Creative Hub', desc: 'React.js, Tailwind CSS, REST APIs, Git, and modern JavaScript.' },
    { date: '2019 — Present', title: 'Supply Specialist', sub: 'Interex', desc: 'Managing supply processes, logistics coordination, and operational optimisation.' },
    { date: '2018', title: "Bachelor's in Economics", sub: 'University of Prishtina', desc: 'Analytical and business foundation complementing technical development.' },
  ]
  return (
    <section className="border-t border-white/[0.06] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white/90 mb-10">Experience & Education</h2>
        <div className="relative pl-6 border-l border-white/[0.08] flex flex-col gap-10">
          {items.map((item) => (
            <div key={item.title} className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-dark-900 shadow-[0_0_0_1px_rgba(124,255,164,0.3)]" />
              <p className="font-mono text-xs text-white/30 mb-1 tracking-widest">{item.date}</p>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-accent/70 mb-2">{item.sub}</p>
              <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SkillsPreview />
      <TimelineSection />
    </div>
  )
}
