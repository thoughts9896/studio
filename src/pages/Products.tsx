import { Link } from 'react-router-dom'
import { Badge, FinalCta, Reveal } from '../components/ui'
import { Stage } from '../components/visual'
import { Detail, ExpiryCard } from '../components/mobile'
import { TONE, type Tone } from '../tones'

const items = [
  { to: '/meddesk', name: 'MedDesk', badge: <Badge tone="new">Launching now</Badge>, kind: 'Pharmacy ERP for Windows', text: 'Billing, stock, expiry, purchases and GST for medical stores, with AI that reads supplier bills.', shot: 'md-profit', win: 'MedDesk · Revenue & P&L', alt: 'MedDesk Revenue and P&L: net profit ₹2,703.40 at 24.21% margin, with revenue, cost of goods and gross profit (demo shop)', co: [{ x: 19, y: 33, label: 'Margin, this month', side: 'r' as const }], tone: 'med' as Tone, detail: <ExpiryCard /> },
  { to: '/school-erp', name: 'School ERP', badge: <Badge>Live at erp.stdn.in</Badge>, kind: 'Web app for schools', text: 'Fee ledgers, online payments, receipts, reminders and a parent portal.', shot: 'school-fees', win: 'School ERP · Fee structures', alt: 'School ERP fee structures per class: base fee, late fee, due day and exam fees (demo school)', co: [{ x: 30, y: 30, label: 'Late fee, applied for you', side: 'r' as const }], tone: 'sch' as Tone, detail: <Detail name="d-school-pay" alt="School ERP payments: monthly fees paid by Razorpay and cash (demo students)" /> },
  { to: '/hotel-erp', name: 'Hotel ERP', badge: <Badge>Live</Badge>, kind: 'Hotel & restaurant app for Windows', text: 'Rooms, check-ins, restaurant tables, kitchen tickets and GST billing.', shot: 'hotel-bookings', win: 'Hotel ERP · Bookings', alt: 'Hotel ERP active bookings with guest, room, nights, amount and advance (demo data)', co: [{ x: 89, y: 46, label: 'Advance taken', side: 'l' as const }], tone: 'htl' as Tone, detail: <Detail name="d-hotel-tables" alt="Hotel ERP restaurant tables: available and occupied (demo data)" /> },
]

export default function Products() {
  return (
    <>
      <section className="pt-10 md:pt-16">
        <div className="wrap">
          <Reveal now><p className="eyebrow">Products</p></Reveal>
          <Reveal now delay={70}><h1 className="display mt-5 max-w-[14ch]">Software that runs real businesses.</h1></Reveal>
          <Reveal now delay={140}><p className="lede mt-7 max-w-2xl">Each STDN product is built for one kind of business, around how its day actually goes.</p></Reveal>
        </div>
      </section>
      <section className="pt-14 md:pt-28">
        <div className="wrap space-y-16 md:space-y-24">
          {items.map((it) => (
            <div key={it.name} className="grid items-center gap-7 md:gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="h2">{it.name}</h2>
                  {it.badge}
                </div>
                <p className="mt-3 text-ink-3">{it.kind}</p>
                <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2">{it.text}</p>
                <Link to={it.to} className="btn btn-ink mt-6 md:mt-8">Explore {it.name}</Link>
              </Reveal>
              <div className={`tile ${TONE[it.tone].soft} p-5 md:hidden`}>{it.detail}</div>
              <Stage name={it.shot} alt={it.alt} title={it.win} tone={it.tone === 'sand' ? 'med' : it.tone} tilt="r" callouts={it.co} only="desktop" className="hidden md:block" sizes="(min-width: 1200px) 640px, 90vw" />
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  )
}
