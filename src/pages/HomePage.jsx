import { useState } from "react";
import { useRouter } from "../context/AuthContext";
import { PROPERTIES, LOCATIONS } from "../data/constants";
import { Btn, PropertyCard } from "../components/common";

export function HomePage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Handler for property card click - opens gallery if images exist
  const handlePropertyClick = (property) => {
    if (property.images && property.images.length > 0) {
      setSelectedProperty(property);
    } else {
      navigate(`/properties/${property.id}`);
    }
  };

  return (
    <div>
      {/* ─── HERO SECTION WITH IMAGE ──────────────────────────────────────── */}
      <div className="relative">
        {/* Hero Image - Full width with overlay */}
        <div 
          className="h-125 sm:h-150 w-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Gradient overlay from navbar color to transparent */}
          <div className="absolute inset-0 bg-linear-to-b from-[#1B2B4B]/90 via-[#1B2B4B]/60 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
            {/* Small tag with StayEase color */}
            <p className="text-[#E8634A] text-sm font-semibold tracking-widest uppercase mb-4">
              Kenya's Rental Platform
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight mb-4">
              Find Your Perfect <span className="text-[#E8634A]">Stay</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl">
              Discover unique homes, villas, and cottages across Kenya — from the coast to the highlands.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full flex items-center gap-2 px-5 py-2 max-w-2xl w-full shadow-2xl">
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && navigate("/properties")}
                placeholder="Search by location or property name…"
                className="flex-1 text-[#1B2B4B] text-sm outline-none bg-transparent py-2 px-2 w-full"
              />
              <Btn variant="primary" size="sm" onClick={() => navigate("/properties")}>
                Search
              </Btn>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 mt-8 text-white/80 text-sm">
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">50+</span>
                <span>Properties</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">100+</span>
                <span>Happy Guests</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">4.8★</span>
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* ─── OFFER BANNER ────────────────────────────────────────────────── */}
        <div className="bg-linear-to-r from-[#E8634A] to-[#c84f38] text-white rounded-2xl p-8 text-center mb-12 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-1">Summer Special — Up to 30% Off</h3>
              <p className="text-white/80">Book any stay of 5+ nights before 31st August</p>
            </div>
            <Btn variant="dark" onClick={() => navigate("/properties")} className="whitespace-nowrap">
              Browse Deals
            </Btn>
          </div>
        </div>

        {/* ─── LOCATIONS ───────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif text-[#1B2B4B]">Recommended Locations</h2>
            <span className="text-xs text-gray-400">Click to explore</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOCATIONS.map(l => (
              <button 
                key={l} 
                onClick={() => { setSearch(l); navigate("/properties"); }}
                className="bg-white border border-gray-100 rounded-xl py-4 px-3 text-sm font-medium text-[#1B2B4B] hover:-translate-y-1 transition-all shadow-sm text-center hover:shadow-md hover:border-[#E8634A]"
              >
                {l}
              </button>
            ))}
          </div>
        </section>

        {/* ─── POPULAR ACCOMMODATIONS ────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#1B2B4B]">Popular Accommodations</h2>
              <p className="text-xs text-gray-400 mt-1">Most booked properties this month</p>
            </div>
            <Btn variant="outline" size="sm" onClick={() => navigate("/properties")}>View All</Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROPERTIES.slice(0, 4).map(p => (
              <PropertyCard key={p.id} property={p} onClick={() => handlePropertyClick(p)} />
            ))}
          </div>
        </section>

        {/* ─── NEW ACCOMMODATIONS ─────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#1B2B4B]">New Accommodations</h2>
              <p className="text-xs text-gray-400 mt-1">Fresh listings just added</p>
            </div>
            <Btn variant="outline" size="sm" onClick={() => navigate("/properties")}>View All</Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {PROPERTIES.slice(4).map(p => (
              <PropertyCard key={p.id} property={p} onClick={() => handlePropertyClick(p)} />
            ))}
          </div>
        </section>

        {/* ─── FEATURES SECTION ───────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="font-semibold text-[#1B2B4B] mb-1">Quality Properties</h3>
            <p className="text-sm text-gray-500">Handpicked homes verified for quality and comfort</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="font-semibold text-[#1B2B4B] mb-1">Secure Payments</h3>
            <p className="text-sm text-gray-500">M-Pesa and card payments with full protection</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="font-semibold text-[#1B2B4B] mb-1">24/7 Support</h3>
            <p className="text-sm text-gray-500">Our team is always here to help you</p>
          </div>
        </section>

        {/* ─── BECOME HOST CTA ────────────────────────────────────────────── */}
        <section className="bg-linear-to-r from-[#1B2B4B] to-[#2d4a7a] rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold font-serif mb-2">Own a property in Kenya?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            List your space on StayEase and start earning from travellers across Kenya and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Btn variant="primary" size="lg" onClick={() => navigate("/become-host")}>
              Start Hosting Today
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate("/properties")} 
              className="border-white text-white hover:bg-white/10">
              Browse Properties
            </Btn>
          </div>
          <p className="text-white/50 text-xs mt-4">Join 50+ active hosts earning monthly income</p>
        </section>

        {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-[#1B2B4B] mb-3">StayEase</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#E8634A]">About Us</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Careers</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1B2B4B] mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#E8634A]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Safety</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1B2B4B] mb-3">Host</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#E8634A]">Become a Host</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Host Resources</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1B2B4B] mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#E8634A]">Twitter</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#E8634A]">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            © 2025 StayEase. All rights reserved. Made with  in Kenya
          </div>
        </footer>
      </div>

      {/* ─── IMAGE GALLERY MODAL ───────────────────────────────────────────── */}
      {selectedProperty && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E8634A] transition-colors text-3xl font-light"
            >
              ✕
            </button>

            {/* Title with View Details button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">{selectedProperty.title}</h3>
              <Btn 
                variant="primary" 
                size="sm"
                onClick={() => {
                  setSelectedProperty(null);
                  navigate(`/properties/${selectedProperty.id}`);
                }}
              >
                View Details →
              </Btn>
            </div>

            {/* Main Image with Gallery */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img 
                src={selectedProperty.images[0]} 
                alt={selectedProperty.title}
                className="w-full h-[60vh] object-contain"
              />

              {/* Image count badge */}
              {selectedProperty.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
                  1 / {selectedProperty.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {selectedProperty.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Open full gallery with all images
                      navigate(`/properties/${selectedProperty.id}`);
                    }}
                    className="shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#E8634A] transition-all"
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}