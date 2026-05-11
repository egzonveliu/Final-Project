import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

function AboutHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
      <p className="section-tag mb-5">About Me</p>
      <h1 className="page-title mb-6">Who I Am</h1>
      <p className="max-w-2xl text-base text-gray-600 dark:text-white/55 leading-relaxed">
        I'm Egzon — a Junior Front-End Developer based in Kosovo. I transitioned into tech
        combining over 6 years of real business experience with modern web development skills.
        My background in operations taught me to be detail-oriented, organised, and a strong
        communicator — qualities I bring directly into my code.
      </p>
    </section>
  )
}

function SkillsSection() {
  const skills = useSelector(s => s.skills.items)

  const radarData = useMemo(() => skills.map(s => ({ subject: s.name, A: s.level })), [skills])

  const byCategory = useMemo(() => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {})
  }, [skills])

  return (
    <section className="border-t border-gray-200 dark:border-white/[0.06] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-10">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {Object.entries(byCategory).map(([cat, items]) => (
              <div key={cat} className="mb-7">
                <p className="font-mono text-xs text-accent/60 tracking-widest uppercase mb-3">{cat}</p>
                <div className="flex flex-col gap-3">
                  {items.map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-white/75">{skill.name}</span>
                        <span className="font-mono text-xs text-gray-400 dark:text-white/35">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="h-72 md:h-auto">
            <ResponsiveContainer width="100%" height={280}>
           <RadarChart data={radarData}>
  <PolarGrid stroke="rgba(0,0,0,0.1)" className="dark:[stroke:rgba(255,255,255,0.07)]" />
  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(100,100,100,0.8)', fontSize: 11, fontFamily: 'DM Mono' }} />
  <Radar name="Skills" dataKey="A" stroke="#7cffa4" fill="#7cffa4" fillOpacity={0.2} strokeWidth={1.5} />
  <Tooltip
    contentStyle={{ background: '#ffffff', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 6, fontSize: 12 }}
    labelStyle={{ color: '#7cffa4' }}
  />
</RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

function SoftSkillsSection() {
  const soft = ['Strong communication', 'Problem-solving mindset', 'Attention to detail', 'Team collaboration', 'Time management', 'Fast learner', 'Responsible', 'Organised']
  return (
    <section className="border-t border-gray-200 dark:border-white/[0.06] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-6">Soft Skills</h2>
            <div className="flex flex-wrap gap-2">
              {soft.map(s => (
                <span key={s} className="text-sm px-3 py-2 bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded text-gray-600 dark:text-white/55">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-6">Languages</h2>
            {[{ lang: 'Albanian', level: 'Native', pct: 100 }, { lang: 'English', level: 'Good', pct: 70 }].map(l => (
              <div key={l.lang} className="mb-5">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-white/75">{l.lang}</span>
                  <span className="font-mono text-xs text-accent/60">{l.level}</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-white/[0.05] rounded-full">
                  <div className="h-full bg-accent/60 rounded-full" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}

            <div className="mt-10 p-5 border border-accent/15 bg-accent/[0.03] rounded-lg">
              <p className="font-mono text-xs text-accent tracking-widest mb-2">CAREER OBJECTIVE</p>
              <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed">
                Looking for an internship or junior Front-End Developer opportunity where I can apply
                my technical knowledge, continue learning, and contribute to real web development
                projects as part of a professional team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <div>
      <AboutHero />
      <SkillsSection />
      <SoftSkillsSection />
    </div>
  )
}