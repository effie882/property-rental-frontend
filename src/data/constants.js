// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const KES = (amount) => `KES ${Number(amount).toLocaleString("en-KE")}`;

export const matchRoute = (pattern, path) => {
  const pp = pattern.split("/"), rp = path.split("/");
  if (pp.length !== rp.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(":")) params[pp[i].slice(1)] = rp[i];
    else if (pp[i] !== rp[i]) return null;
  }
  return params;
};

// ─── DATA ────────────────────────────────────────────────────────────────────
export const PROPERTIES = [
  { 
    id:"1", 
    title:"Sunset Villa", 
    location:"Nairobi, Kenya", 
    price:15600, 
    rating:4.8, 
    reviews:24, 
    bedrooms:3, 
    bathrooms:2, 
    maxGuests:6, 
    amenities:["WiFi","Kitchen","AC","Pool"], 
    smoking:false, 
    petFriendly:true, 
    disabilityAccess:true, 
    host:"Jane Wanjiku", 
    available:true, 
    description:"A stunning villa with panoramic views of the Nairobi skyline. Perfect for families seeking a luxurious getaway in the heart of the capital.",
    // ─── ADD IMAGES ──────────────────────────────────────────────────────
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id:"2", 
    title:"Ocean Breeze Apartment", 
    location:"Mombasa, Kenya", 
    price:11050, 
    rating:4.6, 
    reviews:18, 
    bedrooms:2, 
    bathrooms:1, 
    maxGuests:4, 
    amenities:["WiFi","Kitchen","Grill"], 
    smoking:false, 
    petFriendly:false, 
    disabilityAccess:false, 
    host:"Tom Odhiambo", 
    available:true, 
    description:"Wake up to the sound of ocean waves in this beautifully decorated apartment just steps from the beach.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id:"3", 
    title:"Mountain Lodge", 
    location:"Mt. Kenya, Kenya", 
    price:26000, 
    rating:4.9, 
    reviews:31, 
    bedrooms:4, 
    bathrooms:3, 
    maxGuests:8, 
    amenities:["WiFi","Kitchen","Fireplace","Grill"], 
    smoking:true, 
    petFriendly:true, 
    disabilityAccess:false, 
    host:"Sarah Kamau", 
    available:true, 
    description:"Escape to this rustic mountain lodge surrounded by lush forest. Ideal for adventure seekers and nature lovers.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id:"4", 
    title:"City Loft", 
    location:"Nairobi CBD, Kenya", 
    price:8450, 
    rating:4.4, 
    reviews:12, 
    bedrooms:1, 
    bathrooms:1, 
    maxGuests:2, 
    amenities:["WiFi","Kitchen","AC"], 
    smoking:false, 
    petFriendly:false, 
    disabilityAccess:true, 
    host:"Mike Otieno", 
    available:true, 
    description:"A modern loft in the heart of Nairobi's CBD. Walk to restaurants, shops, and major attractions.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id:"5", 
    title:"Lakeside Cottage", 
    location:"Naivasha, Kenya", 
    price:12350, 
    rating:4.7, 
    reviews:9, 
    bedrooms:2, 
    bathrooms:1, 
    maxGuests:4, 
    amenities:["WiFi","Kitchen","Grill","Fireplace"], 
    smoking:false, 
    petFriendly:true, 
    disabilityAccess:false, 
    host:"Emma Njeri", 
    available:true, 
    description:"A charming cottage on the shores of Lake Naivasha. Watch hippos from your private deck.",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id:"6", 
    title:"Safari Bungalow", 
    location:"Maasai Mara, Kenya", 
    price:45500, 
    rating:5.0, 
    reviews:7, 
    bedrooms:2, 
    bathrooms:2, 
    maxGuests:4, 
    amenities:["WiFi","Kitchen","Pool"], 
    smoking:false, 
    petFriendly:false, 
    disabilityAccess:false, 
    host:"Lisa Achieng", 
    available:true, 
    description:"An extraordinary safari experience just minutes from the Maasai Mara reserve. Fall asleep to sounds of the wild.",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

export const BOOKINGS = [
  { id:"b1", property:PROPERTIES[0], checkIn:"2025-08-10", checkOut:"2025-08-15", total:78000, status:"confirmed", guests:3 },
  { id:"b2", property:PROPERTIES[2], checkIn:"2025-07-01", checkOut:"2025-07-04", total:78000, status:"completed", guests:6 },
];

export const LOCATIONS = ["Nairobi","Mombasa","Maasai Mara","Naivasha","Mt. Kenya","Diani Beach"];