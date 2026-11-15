import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../site'

function Doc({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-20 pt-10 md:pt-16">
      <div className="wrap max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="h2 mt-4">{title}</h1>
        <p className="mt-4 text-ink-3">Last updated {updated}</p>
        <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-ink-2 [&_h2]:mb-3 [&_h2]:text-[1.15rem] [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-ember [&_a]:underline [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  )
}

export function Privacy() {
  return (
    <Doc title="Privacy Policy" updated="15 November 2026">
      <section>
        <h2>Who we are</h2>
        <p>{SITE.name} (“STDN”, “we”) runs stdn.in. We are an Udyam-registered MSME ({SITE.udyam}) based in {SITE.place}, India.</p>
      </section>
      <section>
        <h2>What this website collects</h2>
        <p>This website has no accounts, no tracking cookies and no advertising or analytics scripts. The contact page does not store or send anything to us: it opens WhatsApp with your message filled in, and you choose whether to send it.</p>
        <p className="mt-3">Our hosting provider keeps standard server logs, such as IP address, browser type and the pages requested, to run and protect the site.</p>
      </section>
      <section>
        <h2>When you contact us</h2>
        <p>If you message us on WhatsApp or by email, we receive what you send: usually your name, number or email address and your message. We use it only to reply, prepare a quote or support you. WhatsApp handles messages under its own privacy policy.</p>
      </section>
      <section>
        <h2>Our products</h2>
        <p>MedDesk and Hotel ERP store business data on the customer’s own computer. School ERP stores school data on servers we operate for the school. Each product’s data is used only to provide that product to the customer. Product-specific terms are shared with customers when they sign up.</p>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>We do not sell personal data. We share it only with service providers we need to operate (for example hosting or payment processing) or when the law requires it.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>You can ask us what we hold about you, or ask us to correct or delete it, by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We follow India’s Digital Personal Data Protection Act, 2023.</p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>If this policy changes, we will update this page and its date.</p>
      </section>
    </Doc>
  )
}

export function Terms() {
  return (
    <Doc title="Terms of Use" updated="15 November 2026">
      <section>
        <h2>Using this website</h2>
        <p>This website describes the products and services of {SITE.name}. You may browse it and contact us for any lawful purpose.</p>
      </section>
      <section>
        <h2>Information on the site</h2>
        <p>We keep product descriptions accurate, but features and availability can change. Screenshots show demo data. A written quote or agreement from us is what defines any engagement.</p>
      </section>
      <section>
        <h2>Our work</h2>
        <p>The STDN name, logo, product names, text and screenshots on this site belong to {SITE.name}. Please ask before reusing them.</p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>This site is provided as is. To the extent the law allows, we are not liable for losses arising from use of the website itself.</p>
      </section>
      <section>
        <h2>Law</h2>
        <p>These terms follow the laws of India. Questions? See <Link to="/contact">Contact</Link>.</p>
      </section>
    </Doc>
  )
}

export function NotFound() {
  return (
    <section className="pb-40 pt-24">
      <div className="wrap text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-5">This page isn’t here.</h1>
        <p className="lede mx-auto mt-6 max-w-md">It may have moved when we rebuilt the site.</p>
        <Link to="/" className="btn btn-ink mt-10">Go to the home page</Link>
      </div>
    </section>
  )
}
