import { Badge, FeatureList, FinalCta, Reveal, SectionHead, Shot, Todo, WhatsAppButton, Pic } from '../components/ui'
import { Story } from '../components/Story'
import { BillScan, BillingCard, Detail, ExpiryCard, FeatureRail, Phone, Rail } from '../components/mobile'
import { PRICES } from '../site'

const DEMO_MSG = 'Namaste STDN, mujhe MedDesk ka demo chahiye. Shop name:'

const features = [
  { title: 'Fast counter billing', text: 'Keyboard-first. Search by name, generic, manufacturer or batch. F1 to F4 for cash, UPI, card or credit.' },
  { title: 'Strips or loose', text: 'Sell a full strip, a few tablets or a bottle. Stock is tracked in the smallest unit, so it always adds up.' },
  { title: 'Udhaar, tracked', text: 'Credit and part payments go to the customer’s ledger. Supplier balances are tracked the same way.' },
  { title: 'Batch-wise stock & expiry', text: 'Every batch with its expiry and MRP. Near-expiry, dead stock and out-of-stock in one view.' },
  { title: 'Smart reorder levels', text: 'Low-stock levels that adjust to how fast each medicine sells, plus a ready order list for your supplier.' },
  { title: 'Purchase & returns', text: 'Purchase entry, sale returns and purchase returns, with the stock corrected every time.' },
  { title: 'GST reports', text: 'GST summaries and Excel exports your CA can use directly.' },
  { title: 'Revenue & P&L', text: 'Revenue, cost of goods and profit for today, this month or any range you pick.' },
  { title: 'Prescription photos', text: 'Attach the prescription to any bill, even from your phone over the shop’s Wi-Fi.' },
  { title: 'Automatic backups', text: 'Daily backups, verified after they are written. Restore when you need to.' },
  { title: 'Works without internet', text: 'MedDesk runs on your shop PC. Billing doesn’t stop when the internet does. AI scan needs a connection.' },
  { title: 'Bring your old stock', text: 'Import your existing stock from Excel instead of typing it all again.' },
]

const steps = [
  {
    kicker: 'Dashboard',
    title: 'Aaj ki dukaan, ek nazar mein.',
    text: 'Today’s sales, purchases, low stock and medicines expiring soon, all on the first screen you see.',
    shot: 'md-dashboard',
    alt: 'MedDesk dashboard (demo shop)',
    short: 'Today’s sales, low stock and expiry, first thing.',
    detail: <Detail name="d-md-sales" alt="MedDesk dashboard tile: today’s sales ₹1,292.45 from 9 bills (demo shop)" />,
  },
  {
    kicker: 'Billing',
    title: 'Customer wait nahi karega.',
    text: 'Type a few letters, press Enter, set the quantity. The bill totals, GST and payment mode are on the same screen.',
    shot: 'md-billing',
    alt: 'MedDesk billing with three items in the bill',
    short: 'Type a few letters, Enter, done.',
    detail: <BillingCard />,
  },
  {
    kicker: 'Stock',
    title: 'Expiry se pehle pata chalega.',
    text: 'Every batch with its expiry, plus near-expiry and dead-stock filters and stock value at cost and MRP.',
    shot: 'md-expiry',
    alt: 'MedDesk Expiring Soon list: medicine, batch, days left and status (demo shop)',
    short: 'Every batch with its expiry, flagged early.',
    detail: <ExpiryCard />,
  },
  {
    kicker: 'Reports',
    title: 'Hisaab saaf.',
    text: 'Sales, purchases, stock, expiry and GST reports, with Excel export for your CA.',
    shot: 'md-reports',
    alt: 'MedDesk sales report for this month',
    short: 'Profit, GST and Excel for your CA.',
    detail: <Detail name="d-md-profit" alt="MedDesk Revenue and P&L: net profit ₹2,109.18, margin 24.17% (demo shop)" />,
  },
]

export default function MedDesk() {
  return (
    <>
      {/* Phones: hero */}
      <section className="overflow-hidden pt-7 md:hidden">
        <div className="wrap">
          <div className="flex items-center gap-2.5">
            <span className="text-[0.95rem] font-semibold text-med">MedDesk</span>
            <Badge tone="new">Now launching</Badge>
          </div>
          <h1 className="m-display mt-3">Your medical store, finally in order.</h1>
          <p className="mt-4 text-[1.06rem] leading-snug text-ink-2">Billing, stock, expiry and GST, plus AI that reads your supplier bills.</p>
          <div className="mt-6"><WhatsAppButton label="WhatsApp pe demo book karein" message={DEMO_MSG} className="!h-[52px] w-full justify-center" /></div>
          <div className="tile mt-9 bg-med-soft px-5 pb-7 pt-6">
            <div className="mx-auto max-w-[250px] -rotate-2"><Detail eager name="d-md-sales" alt="MedDesk dashboard tile: today’s sales ₹1,292.45 from 9 bills (demo shop)" /></div>
            <div className="relative -mt-3"><ExpiryCard /></div>
          </div>
          <p className="mt-3 text-[0.8rem] text-ink-3">MedDesk with a demo shop.</p>
        </div>
      </section>

      {/* Hero */}
      <section className="hidden overflow-hidden md:block md:pt-12 lg:pt-14">
        <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Reveal now className="flex items-center gap-3">
              <span className="text-[0.95rem] font-semibold">MedDesk</span>
              <Badge tone="new">Now launching</Badge>
            </Reveal>
            <Reveal now delay={70}>
              <h1 className="display mt-4 max-w-[13ch] !text-[clamp(2rem,2.6vw+1.35rem,4rem)]">Your medical store, finally in order.</h1>
            </Reveal>
            <Reveal now delay={140}>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-2 sm:mt-5 sm:text-[1.06rem] md:text-[1.18rem]">
                Billing, stock, expiry, purchases and GST in one fast Windows app, plus an AI that reads your supplier’s bill so you don’t have to type it.
              </p>
            </Reveal>
            <Reveal now delay={210} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <WhatsAppButton label="WhatsApp pe demo book karein" short="Demo book karein" message={DEMO_MSG} />
              <a href="#features" className="btn btn-ghost"><span className="sm:hidden">Explore</span><span className="hidden sm:inline">See features</span></a>
            </Reveal>
          </div>
          <Reveal now delay={160}>
            <Shot name="md-dashboard" alt="MedDesk dashboard with today’s sales, expiring stock and today’s bills (demo shop)" sizes="(min-width: 1024px) 680px, 100vw" eager only="desktop" />
          </Reveal>
        </div>
      </section>

      {/* Phones: the bill-scan story */}
      <section className="pt-16 md:hidden">
        <div className="wrap">
          <p className="eyebrow">AI bill scan</p>
          <h2 className="h2 mt-3">Bill ki photo lo. Baaki MedDesk sambhaal lega.</h2>
          <div className="mt-4"><BillScan /></div>
          <p className="mt-6 text-[0.95rem] text-ink-2">Anything unclear is marked yellow for you to check. Also reads PDF, Excel and CSV.</p>
        </div>
      </section>

      {/* Bill scan */}
      <section className="hidden md:block md:pt-28">
        <div className="wrap">
          <SectionHead
            eyebrow="AI bill scan"
            title={<>Bill ki photo lo.<br />Baaki MedDesk sambhaal lega.</>}
            lede="Typing a 30-line supplier bill takes time and invites mistakes. With MedDesk you take a photo and check the result."
          />
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,8fr)]">
            <Reveal>
              <figure>
                <div className="overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(15,15,13,0.08),0_20px_50px_-15px_rgba(15,15,13,0.25)] [transform:rotate(-1.5deg)]">
                  <Pic name="bill" sizes="(min-width: 1024px) 400px, 92vw" alt="A printed supplier tax invoice with five medicine lines (demo bill)" />
                </div>
                <figcaption className="mt-4 text-[0.82rem] text-ink-3">Demo bill.</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100} className="hidden text-[2rem] text-ink-3 lg:block" aria-hidden="true">→</Reveal>
            <Reveal delay={160}>
              <figure>
                <Shot name="md-scan" alt="MedDesk Import Bill: 5 items found, all matched to stock, lines add up to the bill’s printed grand total of ₹3291" sizes="(min-width: 1024px) 780px, 92vw" />
                <figcaption className="mt-4 text-[0.82rem] text-ink-3">The result in MedDesk: 5 lines read, and they add up to the printed total.</figcaption>
              </figure>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ['Reads every column', 'Medicine, batch, expiry, quantity, pack, free, MRP, rate, GST and discount, for every line.'],
              ['Checks the maths', 'The lines are matched against the bill’s printed grand total before you save.'],
              ['Asks, never guesses', 'If the bill doesn’t show a value, MedDesk marks it in yellow and asks you.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 70} className="border-t border-line pt-5">
                <h3 className="text-[1.05rem] font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-8">
            <p className="text-ink-3">Also imports bills as PDF, Excel or CSV.</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Inside MedDesk" title="Counter, shelf and books. Sorted." />
          <Story steps={steps} tone="med" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Features" title="Built around a real medical store’s day." />
          <div className="mt-7 md:hidden"><FeatureRail items={features} tone="med" /></div>
          <div className="mt-12 hidden md:block"><FeatureList items={features} /></div>
        </div>
      </section>

      {/* Phones: Owner View, the real phone screens (demo shop) */}
      <section className="pt-16 md:hidden">
        <div className="wrap">
          <div className="tile bg-med-soft px-5 pb-7 pt-6">
            <Badge tone="soon">Coming soon</Badge>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">Owner View. Your shop, on your phone.</h2>
            <p className="mt-2 text-[1rem] leading-snug text-ink-2">Sales, bills, stock and dues, from anywhere.</p>
            <div className="mt-6">
              <Rail label="Owner View screens" width="w-[66%]">
                <Phone name="ov-today" alt="Owner View, Today: net sales, bills and how customers paid (demo shop)" />
                <Phone name="ov-stock" alt="Owner View, Stock: medicines that need ordering (demo shop)" />
                <Phone name="ov-dues" alt="Owner View, Dues: what the shop owes suppliers and is owed (demo shop)" />
              </Rail>
            </div>
            <div className="mt-6"><WhatsAppButton label="Notify me" message="Hi STDN, please tell me when MedDesk Owner View is ready." className="w-full justify-center" /></div>
          </div>
        </div>
      </section>

      {/* Owner view */}
      <section className="hidden md:block md:pt-28">
        <div className="wrap">
          <Reveal>
            <div className="grid gap-8 rounded-[28px] bg-ink p-8 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-14">
              <div>
                <Badge tone="soon">Coming soon</Badge>
                <h2 className="h3 mt-5 !text-[clamp(1.6rem,2.4vw+0.8rem,2.6rem)]">Owner View. Your shop, on your phone.</h2>
                <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-paper/75">
                  Check today’s sales, stock and expiry from anywhere, without calling the counter.
                </p>
              </div>
              <WhatsAppButton label="Notify me" message="Hi STDN, please tell me when MedDesk Owner View is ready." className="!bg-paper !text-ink" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Pricing" title="Simple pricing for your store." />
          <Reveal className="mt-8 rounded-[22px] border border-line p-6 md:mt-10 md:p-10">
            {PRICES.meddesk ? (
              <p className="h3">{PRICES.meddesk}</p>
            ) : (
              <Todo>MedDesk price and plans</Todo>
            )}
            <p className="mt-4 max-w-xl text-ink-2">Ask us on WhatsApp for a demo on your own bills first.</p>
            <div className="mt-7"><WhatsAppButton label="Price aur demo ke liye WhatsApp karein" message={DEMO_MSG} /></div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-20 md:pt-28">
        <div className="wrap max-w-3xl">
          <SectionHead title="Questions" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {[
              ['Does MedDesk need the internet?', 'No for daily work. Billing, stock and reports run on your shop PC. The AI bill scan and updates need a connection.'],
              ['Which computer do I need?', 'A Windows PC at the counter. Send us its details and we’ll confirm it will run well.'],
              ['Can I bring my existing stock?', 'Yes. MedDesk imports stock from Excel, so you don’t start from zero.'],
              ['Where is my data kept?', 'On your shop PC, with automatic daily backups. Sharing anonymous usage data is optional and off unless you allow it.'],
              ['Which bills can it read?', 'Printed supplier invoices as a photo or PDF, plus Excel and CSV files. Anything unclear is marked for you to check.'],
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[1.08rem] font-semibold">
                  {q}
                  <span className="text-ink-3 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-2">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="See MedDesk on your own bills." text="Send us a message and we’ll show you MedDesk working on your own supplier bills." message={DEMO_MSG} />
    </>
  )
}
