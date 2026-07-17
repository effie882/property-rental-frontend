import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { PROPERTIES, BOOKINGS, KES } from "../data/constants";
import { Card, Btn, Input, Badge, Alert, StarRating, StatusBadge, PropertyCard } from "../components/common";

// ─── IMAGE GALLERY MODAL ──────────────────────────────────────────────────────
function ImageGalleryModal({ images, title, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Close on escape key
  useState(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-6xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-[#E8634A] transition-colors text-3xl font-light"
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>

        {/* Main Image */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <img 
            src={images[currentIndex]} 
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-[60vh] object-contain"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors text-2xl"
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors text-2xl"
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-[#E8634A] shadow-lg shadow-[#E8634A]/20' 
                    : 'border-transparent hover:border-gray-400'
                }`}
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
  );
}

// ─── PROPERTIES PAGE ──────────────────────────────────────────────────────────
export function PropertiesPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState("");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [pet, setPet] = useState("");
  const [smoke, setSmoke] = useState("");
  const [sort, setSort] = useState("rating");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const results = PROPERTIES.filter(p => {
    if (search && !p.location.toLowerCase().includes(search.toLowerCase()) && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (minP && p.price < +minP) return false;
    if (maxP && p.price > +maxP) return false;
    if (smoke === "true" && !p.smoking) return false;
    if (pet === "true" && !p.petFriendly) return false;
    return true;
  }).sort((a,b) => sort==="price_asc"?a.price-b.price:sort==="price_desc"?b.price-a.price:b.rating-a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">Browse Accommodations</h1>

      {/* ─── FILTERS ────────────────────────────────────────────────────────── */}
      <Card className="mb-6 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Search</label>
            <input 
              placeholder="Location or name…" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Min (KES)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={minP} 
              onChange={e => setMinP(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Max (KES)</label>
            <input 
              type="number" 
              placeholder="50000" 
              value={maxP} 
              onChange={e => setMaxP(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Smoking</label>
            <select 
              value={smoke} 
              onChange={e => setSmoke(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="">Any</option>
              <option value="true">Allowed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Pets</label>
            <select 
              value={pet} 
              onChange={e => setPet(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="">Any</option>
              <option value="true">Friendly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Sort By</label>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </Card>

      <p className="text-sm text-gray-400 mb-4">{results.length} {results.length === 1 ? "property" : "properties"} found</p>
      
      {/* ─── PROPERTY GRID ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map(p => (
          <PropertyCard 
            key={p.id} 
            property={p} 
            onClick={() => {
              // If property has images, open gallery, else go to detail page
              if (p.images && p.images.length > 0) {
                setSelectedProperty(p);
              } else {
                navigate(`/properties/${p.id}`);
              }
            }}
          />
        ))}
      </div>
      
      {results.length === 0 && (
        <p className="text-center text-gray-400 py-16">No properties match your filters.</p>
      )}

      {/* ─── IMAGE GALLERY MODAL ───────────────────────────────────────────── */}
      {selectedProperty && (
        <ImageGalleryModal
          images={selectedProperty.images}
          title={selectedProperty.title}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}

// ─── PROPERTY DETAIL PAGE ──────────────────────────────────────────────────────
export function PropertyDetailPage({ params }) {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const property = PROPERTIES.find(p => p.id === params.id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [booked, setBooked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice Wambua", rating: 5, comment: "Absolutely stunning! Would book again.", date: "2025-06-15" },
    { id: 2, name: "Brian Mwangi", rating: 4, comment: "Great location and very clean.", date: "2025-05-20" },
  ]);

  if (!property) {
    return <div className="max-w-7xl mx-auto px-4 py-10"><p>Property not found.</p></div>;
  }

  const nights = checkIn && checkOut ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (86400000)) : 0;
  const subtotal = nights * property.price;
  const fee = Math.round(subtotal * 0.1);
  const total = subtotal + fee;
  const DEFAULT = ["WiFi", "Kitchen"];
  const EXTRAS = property.amenities.filter(a => !DEFAULT.includes(a));

  // Image gallery functions
  const openGallery = (index = 0) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button className="text-sm text-gray-400 hover:text-[#1B2B4B] mb-6 flex items-center gap-1" 
        onClick={() => navigate("/properties")}>
        ← Back to listings
      </button>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* ─── LEFT COLUMN ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {/* ─── IMAGE GALLERY GRID ────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {/* Main Image - spans 2 cols and 2 rows */}
            <div 
              className="col-span-2 row-span-2 h-64 rounded-lg overflow-hidden cursor-pointer relative group"
              onClick={() => openGallery(0)}
            >
              <img 
                src={property.mainImage || property.images?.[0]} 
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                  View Gallery
                </span>
              </div>
            </div>

            {/* Thumbnail 1 */}
            {property.images && property.images.length > 1 && (
              <div 
                className="h-32 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openGallery(1)}
              >
                <img 
                  src={property.images[1]} 
                  alt={`${property.title} - 1`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Thumbnail 2 */}
            {property.images && property.images.length > 2 && (
              <div 
                className="h-32 rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => openGallery(2)}
              >
                <img 
                  src={property.images[2]} 
                  alt={`${property.title} - 2`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Thumbnail 3 with +N overlay */}
            {property.images && property.images.length > 3 && (
              <div 
                className="h-32 rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => openGallery(3)}
              >
                <img 
                  src={property.images[3]} 
                  alt={`${property.title} - 3`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {property.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">+{property.images.length - 4}</span>
                  </div>
                )}
              </div>
            )}

            {/* If only 1 image or no more images */}
            {(!property.images || property.images.length <= 1) && (
              <>
                <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No more photos
                </div>
                <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No more photos
                </div>
              </>
            )}

            {/* If only 2 images */}
            {property.images && property.images.length === 2 && (
              <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No more photos
              </div>
            )}

            {/* If only 3 images */}
            {property.images && property.images.length === 3 && (
              <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No more photos
              </div>
            )}
          </div>

          {/* ─── PROPERTY INFO ──────────────────────────────────────────────── */}
          <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1">{property.title}</h1>
          <p className="text-gray-400 text-sm mb-3">{property.location} · Hosted by {property.host}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {property.smoking && <Badge color="gray">Smoking Allowed</Badge>}
            {property.petFriendly && <Badge color="green">Pet Friendly</Badge>}
            {property.disabilityAccess && <Badge color="blue">Disability Access</Badge>}
          </div>

          <div className="flex gap-6 text-sm mb-6">
            <div><span className="font-bold text-[#1B2B4B]">{property.bedrooms}</span> <span className="text-gray-400">Bedrooms</span></div>
            <div><span className="font-bold text-[#1B2B4B]">{property.bathrooms}</span> <span className="text-gray-400">Bathrooms</span></div>
            <div><span className="font-bold text-[#1B2B4B]">{property.maxGuests}</span> <span className="text-gray-400">Max Guests</span></div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{property.description}</p>

          {/* ─── AMENITIES ──────────────────────────────────────────────────── */}
          <h3 className="font-bold text-[#1B2B4B] mb-3">Amenities</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Default Services</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {DEFAULT.map(a => (
              <span key={a} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">{a}</span>
            ))}
          </div>
          {EXTRAS.length > 0 && (
            <>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Extras</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {EXTRAS.map(a => (
                  <span key={a} className="px-3 py-1.5 bg-[#fdf0ed] rounded-lg text-xs text-[#E8634A] border border-[#f5c9bf]">{a}</span>
                ))}
              </div>
            </>
          )}

          {/* ─── REVIEWS ────────────────────────────────────────────────────── */}
          <div className="border-t border-gray-100 mt-6 pt-6">
            <h3 className="font-bold text-[#1B2B4B] mb-4">Reviews ({reviews.length})</h3>
            {reviews.map(r => (
              <div key={r.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-[#1B2B4B]">{r.name}</strong>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <StarRating value={r.rating} />
                <p className="text-sm text-gray-600 mt-1.5">{r.comment}</p>
              </div>
            ))}

            {user?.role === "customer" && (
              <Card className="p-5 mt-4">
                <h4 className="font-semibold text-[#1B2B4B] mb-3">Leave a Review</h4>
                <StarRating value={rating} onChange={setRating} />
                <div className="mt-3 mb-3">
                  <textarea rows={3} placeholder="Share your experience…" value={comment} 
                    onChange={e => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A] resize-none" />
                </div>
                <Btn variant="primary" size="sm" disabled={!rating || !comment}
                  onClick={() => {
                    setReviews([...reviews, { 
                      id: Date.now(), 
                      name: user.name, 
                      rating, 
                      comment, 
                      date: new Date().toISOString().split("T")[0] 
                    }]);
                    setRating(0);
                    setComment("");
                  }}>
                  Post Review
                </Btn>
              </Card>
            )}
          </div>
        </div>

        {/* ─── RIGHT COLUMN - BOOKING CARD ────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <Card className="p-6">
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-2xl font-bold text-[#E8634A]">
                  {KES(property.price)}<span className="text-sm text-gray-400 font-normal">/night</span>
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-amber-400">★</span>{property.rating} ({property.reviews})
                </span>
              </div>

              {booked ? (
                <Alert type="success">Booking confirmed! Check your dashboard.</Alert>
              ) : (
                <>
                  {/* ─── DATE SELECTION ────────────────────────────────────── */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-in</label>
                      <input 
                        type="date" 
                        value={checkIn} 
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-out</label>
                      <input 
                        type="date" 
                        value={checkOut} 
                        min={checkIn || new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
                      />
                    </div>
                  </div>

                  {/* ─── GUESTS SELECTION ──────────────────────────────────── */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Guests</label>
                    <select 
                      value={guests} 
                      onChange={e => setGuests(+e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  {/* ─── PRICE BREAKDOWN ───────────────────────────────────── */}
                  {nights > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-500">{KES(property.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
                        <span>{KES(subtotal)}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Service fee (10%)</span>
                        <span>{KES(fee)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-[#E8634A]">{KES(total)}</span>
                      </div>
                    </div>
                  )}

                  {/* ─── BOOK BUTTON ───────────────────────────────────────── */}
                  <Btn variant="primary" full disabled={!checkIn || !checkOut || nights <= 0}
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }
                      setBooked(true);
                    }}>
                    {user ? "Reserve Now" : "Sign in to Book"}
                  </Btn>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* ─── IMAGE GALLERY MODAL ────────────────────────────────────────────── */}
      {showGallery && property.images && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#E8634A] transition-colors text-3xl font-light"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-white text-lg font-semibold mb-4">{property.title}</h3>

            {/* Main Image */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img 
                src={property.images[galleryIndex]} 
                alt={`${property.title} - Image ${galleryIndex + 1}`}
                className="w-full h-[60vh] object-contain"
              />

              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setGalleryIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors text-2xl"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setGalleryIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors text-2xl"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
                {galleryIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === galleryIndex 
                        ? 'border-[#E8634A] shadow-lg shadow-[#E8634A]/20' 
                        : 'border-transparent hover:border-gray-400'
                    }`}
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