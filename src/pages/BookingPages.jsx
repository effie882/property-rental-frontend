import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { BOOKINGS, KES } from "../data/constants";
import { Card, Btn, Alert, StatusBadge } from "../components/common";

//booking details//
export function BookingDetailPage({ params }) {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const booking = BOOKINGS.find(b => b.id === params.id);
  const [status, setStatus] = useState(booking?.status || "confirmed");

  if (!booking || booking.userEmail !== user?.email) {
    return <div className="max-w-2xl mx-auto px-4 py-10"><p>Booking not found.</p></div>;
  }
  
  const nights = (new Date(booking.checkOut) - new Date(booking.checkIn)) / 86400000;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button className="text-sm text-gray-400 hover:text-[#1B2B4B] mb-6" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>
      
      <Card>
        <div className="p-8">
          <div className="h-28 rounded-xl flex items-center justify-center text-5xl font-bold font-serif text-[#1B2B4B]/20 mb-6"
            style={{ background: `hsl(${booking.property.id * 47}, 35%, 93%)` }}>
            {booking.property.title[0]}
          </div>
          
          <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-1">{booking.property.title}</h2>
          <p className="text-gray-400 text-sm mb-3">{booking.property.location}</p>
          <StatusBadge status={status} />

          <div className="border-t border-gray-100 my-5" />
          
          <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Check-in</p>
              <strong>{booking.checkIn}</strong>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Check-out</p>
              <strong>{booking.checkOut}</strong>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Guests</p>
              <strong>{booking.guests}</strong>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Nights</p>
              <strong>{nights}</strong>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
            <div className="flex justify-between mb-1.5">
              <span className="text-gray-500">{KES(booking.property.price)} × {nights} nights</span>
              <span>{KES(booking.property.price * nights)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Service fee</span>
              <span>{KES(Math.round(booking.total * 0.1))}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
              <span>Total Paid</span>
              <span className="text-[#E8634A]">{KES(booking.total)}</span>
            </div>
          </div>

          {status === "confirmed" && (
            <Btn variant="danger" full onClick={() => setStatus("cancelled")}>Cancel Booking</Btn>
          )}
          {status === "cancelled" && <Alert type="error">This booking has been cancelled.</Alert>}
        </div>
      </Card>
    </div>
  );
}
