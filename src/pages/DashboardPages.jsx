import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { BOOKINGS, PROPERTIES, KES } from "../data/constants";
import { Card, Btn, Badge, StatusBadge, StatCard, PropertyCard } from "../components/common";

// ─── CUSTOMER DASHBOARD ───────────────────────────────────────────────────────
export function DashboardPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState("upcoming");
  const myBookings = BOOKINGS.filter(b => b.userEmail === user?.email);
  const upcoming = myBookings.filter(b => b.status === "confirmed");
  const past = myBookings.filter(b => b.status === "completed");
  const shown = tab === "upcoming" ? upcoming : past;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">My Bookings</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard value={myBookings.length} label="Total Bookings" />
        <StatCard value={upcoming.length} label="Upcoming Stays" />
        <StatCard value={`KES ${myBookings.reduce((s, b) => s + b.total, 0).toLocaleString()}`} label="Total Spent" />
      </div>

      <div className="flex border-b border-gray-100 mb-6">
        {["upcoming", "past"].map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${
              tab === t ? "border-[#E8634A] text-[#E8634A]" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {t === "upcoming" ? `Upcoming (${upcoming.length})` : `Past Stays (${past.length})`}
          </button>
        ))}
      </div>

      {shown.map(b => (
        <div key={b.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-3 flex-wrap">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold font-serif text-[#1B2B4B]/30 text-lg"
            style={{ background: `hsl(${b.property.id * 47}, 35%, 93%)` }}>
            {b.property.title[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#1B2B4B] text-sm">{b.property.title}</p>
            <p className="text-gray-400 text-xs">{b.property.location}</p>
            <p className="text-gray-400 text-xs">{b.checkIn} → {b.checkOut} · {b.guests} guests</p>
          </div>
          <div className="text-right">
            <StatusBadge status={b.status} />
            <p className="text-[#E8634A] font-bold text-sm mt-1">{KES(b.total)}</p>
          </div>
          <Btn variant="outline" size="sm" onClick={() => navigate(`/bookings/${b.id}`)}>Details</Btn>
        </div>
      ))}
      
      {shown.length === 0 && <p className="text-center text-gray-400 py-12">No {tab} bookings.</p>}

      <div className="border-t border-gray-100 mt-8 pt-6">
        <Btn variant="primary" onClick={() => navigate("/properties")}>Browse Properties</Btn>
      </div>
    </div>
  );
}

// ─── HOST DASHBOARD ───────────────────────────────────────────────────────────
export function HostDashboardPage() {
  const { navigate } = useRouter();
  const [properties, setProperties] = useState(PROPERTIES.slice(0, 2));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#1B2B4B]">My Listings</h1>
        <Btn variant="primary" onClick={() => navigate("/host/properties/new")}>+ Add Listing</Btn>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard value={properties.length} label="Active Listings" />
        <StatCard value="4" label="Pending Requests" />
        <StatCard value="KES 239,200" label="Monthly Revenue" />
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map(p => (
          <Card key={p.id}>
            <div className="h-36 flex items-center justify-center text-5xl font-bold font-serif text-[#1B2B4B]/20"
              style={{ background: `hsl(${p.id * 47}, 35%, 93%)` }}>
              {p.title[0]}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-[#1B2B4B] text-sm">{p.title}</h3>
                <Badge color={p.available ? "green" : "gray"}>{p.available ? "Active" : "Inactive"}</Badge>
              </div>
              <p className="text-gray-400 text-xs mb-1">{p.location}</p>
              <p className="text-[#E8634A] font-bold text-sm mb-3">{KES(p.price)}/night</p>
              <div className="flex gap-2">
                <Btn variant="outline" size="sm" onClick={() => navigate(`/host/properties/${p.id}/edit`)}>Edit</Btn>
                <Btn variant="danger" size="sm" onClick={() => setProperties(properties.filter(x => x.id !== p.id))}>Delete</Btn>
                <Btn variant="ghost" size="sm" onClick={() => navigate(`/properties/${p.id}`)}>View</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
       {properties.length === 0 && (
         <div className="text-center py-16">
           <p className="text-gray-400 mb-4">No listings yet.</p>
           <Btn variant="primary" onClick={() => navigate("/host/properties/new")}>Create Your First Listing</Btn>
         </div>
       )}
     </div>
   );
 }

// ─── ADMIN DASHBOARD ──────────────────────────────────────────
export function AdminDashboardPage() {
   const { navigate } = useRouter();
   const [tab, setTab] = useState("overview");
   const [approvedProps, setApprovedProps] = useState(() =>
     PROPERTIES.map(p => ({ id: p.id, approved: p.approved }))
   );

   const totalProperties = PROPERTIES.length;
   const totalBookings = BOOKINGS.length;
   const totalRevenue = BOOKINGS.reduce((s, b) => s + b.total, 0);
   const activeListings = PROPERTIES.filter(p => p.available).length;
   const pendingCount = approvedProps.filter(p => !p.approved).length;

   const toggleApproval = (id) => {
     setApprovedProps(prev => prev.map(p => p.id === id ? { ...p, approved: !p.approved } : p));
   };

   const isApproved = (id) => approvedProps.find(p => p.id === id)?.approved ?? false;

   return (
     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
       <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">Admin Dashboard</h1>

       <div className="flex border-b border-gray-100 mb-6">
         {["overview", "pending", "properties", "bookings"].map(t => (
           <button 
             key={t} 
             onClick={() => setTab(t)}
             className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${
               tab === t ? "border-[#E8634A] text-[#E8634A]" : "border-transparent text-gray-400 hover:text-gray-600"
             }`}
           >
             {t === "pending" ? `Pending (${pendingCount})` : t}
           </button>
         ))}
        </div>

        {tab === "overview" && (
         <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatCard value={totalProperties} label="Total Properties" />
            <StatCard value={activeListings} label="Active Listings" />
            <StatCard value={pendingCount} label="Pending Approval" />
            <StatCard value={totalBookings} label="Total Bookings" />
            <StatCard value={`KES ${totalRevenue.toLocaleString()}`} label="Total Revenue" />
          </div>

           <Card className="p-6">
             <h3 className="font-bold text-[#1B2B4B] mb-4">Recent Bookings</h3>
             <div className="space-y-3">
               {BOOKINGS.map(b => (
                 <div key={b.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                   <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-serif text-[#1B2B4B]/30 text-sm"
                     style={{ background: `hsl(${b.property.id * 47}, 35%, 93%)` }}>
                     {b.property.title[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-semibold text-[#1B2B4B] text-sm">{b.property.title}</p>
                     <p className="text-gray-400 text-xs">{b.checkIn} → {b.checkOut} · {b.guests} guests</p>
                   </div>
                   <StatusBadge status={b.status} />
                   <p className="text-[#E8634A] font-bold text-sm">{KES(b.total)}</p>
                 </div>
               ))}
             </div>
           </Card>
         </>
       )}

        {tab === "pending" && (
          <Card className="p-6">
            <h3 className="font-bold text-[#1B2B4B] mb-4">Pending Approval</h3>
            <div className="space-y-3">
              {PROPERTIES.filter(p => !isApproved(p.id)).map(p => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl flex-wrap">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-serif text-[#1B2B4B]/30 text-sm"
                    style={{ background: `hsl(${p.id * 47}, 35%, 93%)` }}>
                    {p.title[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1B2B4B] text-sm">{p.title}</p>
                    <p className="text-gray-400 text-xs">{p.location} · Hosted by {p.host}</p>
                  </div>
                  <Badge color="yellow">Pending</Badge>
                  <div className="flex gap-2">
                    <Btn variant="success" size="sm" onClick={() => toggleApproval(p.id)}>Approve</Btn>
                    <Btn variant="danger" size="sm" onClick={() => toggleApproval(p.id)}>Reject</Btn>
                  </div>
                </div>
              ))}
            </div>
            {approvedProps.filter(p => !p.approved).length === 0 && (
              <p className="text-center text-gray-400 py-8">No pending properties.</p>
            )}
          </Card>
        )}

        {tab === "properties" && (
          <Card className="p-6">
            <h3 className="font-bold text-[#1B2B4B] mb-4">All Properties</h3>
            <div className="space-y-3">
              {PROPERTIES.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl flex-wrap">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-serif text-[#1B2B4B]/30 text-sm"
                    style={{ background: `hsl(${p.id * 47}, 35%, 93%)` }}>
                    {p.title[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1B2B4B] text-sm">{p.title}</p>
                    <p className="text-gray-400 text-xs">{p.location} · Hosted by {p.host}</p>
                  </div>
                  <Badge color={isApproved(p.id) ? "green" : "yellow"}>{isApproved(p.id) ? "Approved" : "Pending"}</Badge>
                  <Badge color={p.available ? "green" : "gray"}>{p.available ? "Active" : "Inactive"}</Badge>
                  <p className="text-[#E8634A] font-bold text-sm">{KES(p.price)}/night</p>
                  <Btn variant={isApproved(p.id) ? "outline" : "success"} size="sm" onClick={() => toggleApproval(p.id)}>
                    {isApproved(p.id) ? "Revoke" : "Approve"}
                  </Btn>
                </div>
              ))}
            </div>
          </Card>
        )}

       {tab === "bookings" && (
         <Card className="p-6">
           <h3 className="font-bold text-[#1B2B4B] mb-4">All Bookings</h3>
           <div className="space-y-3">
             {BOOKINGS.map(b => (
               <div key={b.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl flex-wrap">
                 <div className="flex-1 min-w-0">
                   <p className="font-semibold text-[#1B2B4B] text-sm">{b.property.title}</p>
                   <p className="text-gray-400 text-xs">{b.checkIn} → {b.checkOut} · {b.guests} guests</p>
                 </div>
                 <StatusBadge status={b.status} />
                 <p className="text-[#E8634A] font-bold text-sm">{KES(b.total)}</p>
               </div>
             ))}
           </div>
         </Card>
       )}
     </div>
   );
 }