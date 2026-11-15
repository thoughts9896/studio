import { Badge } from '../components/ui'
import { Detail } from '../components/mobile'
import { PRICES } from '../site'
import { ProductPage } from './ProductPage'

export default function HotelErp() {
  return (
    <ProductPage
      name="Hotel ERP"
      badge={<Badge>Live</Badge>}
      tone="htl"
      shortLede="Check-ins, the room board, table orders, kitchen tickets and GST bills."
      heroDetail={<div className="mx-auto max-w-[260px]"><Detail eager name="d-hotel-room" alt="Hotel ERP room tile: Room 101 occupied, guest, nights and estimated bill (demo data)" /></div>}
      title="Rooms, restaurant and billing. One desk."
      lede="A Windows app for hotels with a restaurant: check-ins, the room board, table orders, kitchen tickets and GST-correct bills."
      heroShot="hotel-rooms"
      heroAlt="Hotel ERP room board with occupied and available rooms (demo data)"
      heroNote="Shown with demo guests and bookings."
      storyTitle="Front desk to checkout."
      steps={[
        { kicker: 'Front desk', title: 'Know every room at a glance.', text: 'Occupied, available or in maintenance. Each room shows the guest, the nights so far and the running bill.', shot: 'hotel-rooms', alt: 'Hotel ERP rooms with guest and estimated bill', short: 'Guest, nights and running bill on every room.', detail: <Detail name="d-hotel-room" alt="Hotel ERP room tile with guest and estimated bill (demo data)" /> },
        { kicker: 'Bookings', title: 'Check-in in a minute.', text: 'Record guests with their ID proof, take an advance and check out with the bill made for you.', shot: 'hotel-bookings', alt: 'Hotel ERP active bookings with advances' },
        { kicker: 'Restaurant', title: 'Tables, orders, kitchen tickets.', text: 'A live floor plan of tables and room service. Orders go to the kitchen as tickets and can be moved to a guest’s room bill.', shot: 'hotel-restaurant', alt: 'Hotel ERP restaurant floor plan with occupied tables', short: 'A live floor plan. Orders go to the kitchen.', detail: <Detail name="d-hotel-tables" alt="Hotel ERP restaurant tables: available and occupied, with open order counts (demo data)" /> },
        { kicker: 'Dashboard', title: 'The day, in numbers.', text: 'Rooms, occupancy, today’s revenue and open orders, plus a day report when you close.', shot: 'hotel-dashboard', alt: 'Hotel ERP dashboard', short: 'Occupancy, revenue and open orders.', detail: <Detail name="d-hotel-occupied" alt="Hotel ERP: 7 rooms occupied, 54% occupancy (demo data)" /> },
      ]}
      featuresTitle="Made for the way a hotel actually runs."
      features={[
        { title: 'Room board', text: 'Live status for every room, with rates, guest and running bill.' },
        { title: 'Guest check-in', text: 'Multiple guests per booking with ID proof details and photos.' },
        { title: 'Advances & checkout', text: 'Take advances, then generate the final bill automatically at checkout.' },
        { title: 'Restaurant & KOT', text: 'Table orders from a menu you manage, with kitchen order tickets.' },
        { title: 'Room transfers', text: 'Move a restaurant bill to a guest’s room and settle it at checkout.' },
        { title: 'GST done right', text: 'Separate GST for rooms and food, inclusive or exclusive, with GST report exports.' },
        { title: 'Thermal printing', text: 'Clean 80 mm receipts and full-page invoices.' },
        { title: 'Voids & credit notes', text: 'Corrections leave a proper trail instead of disappearing.' },
        { title: 'Revenue', text: 'Hotel and restaurant revenue by day and month, with GST collected.' },
        { title: 'Backups & Excel', text: 'Automatic daily backups and Excel exports.' },
        { title: 'Activity log', text: 'Every check-in, bill and change, recorded.' },
        { title: 'Runs offline', text: 'A desktop app on the front-desk PC that keeps working without internet.' },
      ]}
      price={PRICES.hotelErp}
      priceLabel="Hotel ERP price"
      waMessage="Hi STDN, I want to know more about the Hotel ERP for our hotel."
      ctaTitle="Run the front desk from one screen."
      ctaText="Message us and we’ll show you the Hotel ERP with demo rooms and tables."
    />
  )
}
