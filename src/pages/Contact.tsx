import { useState, type FormEvent } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { Reveal, WhatsAppButton, WhatsAppIcon } from '../components/ui'
import { SITE, waLink } from '../site'

const NEEDS = ['MedDesk (pharmacy)', 'School ERP', 'Hotel ERP', 'Website', 'Web app', 'Mobile app', 'AI system / chatbot', 'Something else']

export default function Contact() {
  const [need, setNeed] = useState(NEEDS[0])
  const [name, setName] = useState('')
  const [biz, setBiz] = useState('')
  const [msg, setMsg] = useState('')

  // Nothing is stored or sent to us by this page: it only opens WhatsApp with the text filled in.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Hi STDN, I'm ${name || '-'}${biz ? ` from ${biz}` : ''}.\nInterested in: ${need}\n${msg}`.trim()
    window.open(waLink(text), '_blank', 'noopener')
  }

  const field = 'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[1rem] outline-none transition focus:border-ink'

  return (
    <section className="pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Reveal now><p className="eyebrow">Contact</p></Reveal>
          <Reveal now delay={70}><h1 className="display mt-5 max-w-[12ch]">Let’s talk.</h1></Reveal>
          <Reveal now delay={140}><p className="lede mt-7 max-w-md">WhatsApp is the fastest way to reach us. Write in English or Hindi and our team will get back to you. If it helps, an STDN expert will call you.</p></Reveal>
          <Reveal now delay={200} className="mt-10"><WhatsAppButton /></Reveal>
          <Reveal now delay={240}>
            <ul className="mt-12 space-y-5 text-[1.02rem]">
              <li className="flex items-center gap-3"><Mail size={20} className="text-ink-3" aria-hidden="true" /><a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center hover:text-ember">{SITE.email}</a></li>
              <li className="flex items-center gap-3"><MapPin size={20} className="text-ink-3" aria-hidden="true" />{SITE.place}, India</li>
            </ul>
          </Reveal>
        </div>

        <Reveal now delay={120}>
          <form onSubmit={submit} className="rounded-[24px] bg-sand p-6 md:p-10">
            <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em]">Write it here, send it on WhatsApp</h2>
            <p className="mt-2 text-[0.92rem] text-ink-3">This opens WhatsApp with your message ready. This website doesn’t store it.</p>
            <label className="mt-7 block text-[0.9rem] font-medium">I’m interested in
              <select value={need} onChange={(e) => setNeed(e.target.value)} className={field}>
                {NEEDS.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-[0.9rem] font-medium">Your name
                <input value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
              </label>
              <label className="block text-[0.9rem] font-medium">Business (optional)
                <input value={biz} onChange={(e) => setBiz(e.target.value)} className={field} autoComplete="organization" />
              </label>
            </div>
            <label className="mt-5 block text-[0.9rem] font-medium">What do you need?
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className={field} />
            </label>
            <button type="submit" className="btn btn-ink mt-7 w-full justify-center sm:w-auto"><WhatsAppIcon /> Continue on WhatsApp</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
