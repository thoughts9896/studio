import { Badge } from '../components/ui'
import { Detail } from '../components/mobile'
import { PRICES } from '../site'
import { ProductPage } from './ProductPage'

export default function SchoolErp() {
  return (
    <ProductPage
      name="School ERP"
      badge={<Badge>Live at erp.stdn.in</Badge>}
      tone="sch"
      shortLede="Fee ledgers, online payments, receipts and reminders, with a parent portal."
      heroDetail={<div className="grid gap-3 px-2"><Detail eager name="d-school-dues" alt="School ERP: 57 pending dues (demo school)" /><Detail eager name="d-school-revenue" alt="School ERP: ₹91.7K revenue in November (demo school)" /></div>}
      title="School fees, collected on time."
      lede="Students, monthly fee ledgers, online payments, receipts and reminders, with a portal where parents see and pay their dues."
      heroShot="school-dashboard"
      heroAlt="School ERP principal dashboard with total students, pending dues and monthly revenue (demo school)"
      heroNote="Shown with a demo school and made-up students."
      secondary={<a href="https://erp.stdn.in" target="_blank" rel="noopener" className="btn btn-ghost">Open erp.stdn.in</a>}
      storyTitle="From admission to receipt."
      steps={[
        { kicker: 'Overview', title: 'The whole school, one screen.', text: 'Students, pending dues, this month’s collection and today’s activity, the moment the principal signs in.', shot: 'school-dashboard', alt: 'School ERP dashboard', short: 'Students, dues and collection, at sign-in.', detail: <Detail name="d-school-dues" alt="School ERP: 57 pending dues (demo school)" /> },
        { kicker: 'Fee ledgers', title: 'Every rupee, every month.', text: 'Ledgers are created for each student every month. Late fees are applied on their own and defaulters are easy to see.', shot: 'school-ledgers', alt: 'School ERP fee ledgers by class with collected and pending amounts', short: 'Monthly ledgers and late fees, on their own.', detail: <Detail name="d-school-revenue" alt="School ERP: ₹91.7K collected in November (demo school)" /> },
        { kicker: 'Payments', title: 'Online or at the counter.', text: 'Parents pay online through Razorpay, or the office records cash, UPI or bank payments. Every payment gets a receipt.', shot: 'school-payments', alt: 'School ERP payments list with method, source and receipt numbers', short: 'Razorpay or the counter. A receipt every time.', detail: <Detail name="d-school-pay" alt="School ERP payments: monthly fees paid by Razorpay and cash (demo students)" /> },
        { kicker: 'Students', title: 'Records that stay tidy.', text: 'Students by class and section, linked to their parents, carried forward each academic year.', shot: 'school-students', alt: 'School ERP students list grouped by class' },
      ]}
      featuresTitle="Everything the fee office does, done for it."
      features={[
        { title: 'Monthly fee ledgers', text: 'Generated for every student each month, from fee structures you set per class.' },
        { title: 'Automatic late fees', text: 'Applied after the due date, so nobody has to remember.' },
        { title: 'Online payments', text: 'Razorpay checkout for parents, matched to the right ledger automatically.' },
        { title: 'Receipts', text: 'A receipt for every payment, online or recorded by the office.' },
        { title: 'Reminders', text: 'Due-fee reminders on WhatsApp and email.' },
        { title: 'Parent portal', text: 'Parents sign in with their phone number to see dues, pay online and get receipts.' },
        { title: 'Reports', text: 'Monthly collection, class-wise reports and defaulter lists as PDF or Excel.' },
        { title: 'Attendance', text: 'Teachers mark attendance, and the office sees the reports.' },
        { title: 'Roles & audit log', text: 'Principal, clerk and teacher access, with a log of every change.' },
        { title: 'Discounts & exam fees', text: 'Sibling discounts and exam fees by class and month.' },
        { title: 'Academic year rollover', text: 'Move to the new session without losing the past year’s records.' },
        { title: 'Works on any device', text: 'A web app: the office uses a computer, parents use their phones.' },
      ]}
      price={PRICES.schoolErp}
      priceLabel="School ERP price"
      waMessage="Hi STDN, I want to know more about the School ERP for our school."
      ctaTitle="Bring your school’s fees online."
      ctaText="Message us and we’ll walk you through the School ERP with a demo school."
    />
  )
}
