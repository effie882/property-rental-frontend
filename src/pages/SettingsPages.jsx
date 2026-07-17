import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { PROPERTIES } from "../data/constants";
import { Card, Btn, Input, Alert, Toggle, Badge } from "../components/common";

// ─── BECOME A HOST ────────────────────────────────────────────────────────────
export function BecomeHostPage() {
  const { user, upgradeToHost } = useAuth();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = ["How it works", "Requirements", "Agreement", "Activate"];

  const handleActivate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (user) {
      upgradeToHost();
      setStep(5);
    } else {
      navigate("/register");
    }
    setLoading(false);
  };

  const benefits = [
    { title: "Set your own price", desc: "You decide how much to charge per night. Adjust anytime based on season or demand." },
    { title: "Flexible availability", desc: "Open your calendar when you want. Block dates you need the space yourself." },
    { title: "Secure payments", desc: "Guests pay upfront via M-Pesa or card. Funds released to you after check-in." },
    { title: "Host protection", desc: "StayEase covers property damage up to KES 500,000 under our Host Guarantee." },
  ];

  const requirements = [
    "Valid Kenyan national ID or passport",
    "Property must be located within Kenya",
    "At least one clear photo of the property",
    "Accurate description of amenities and capacity",
    "Responsive to guest inquiries within 24 hours",
    "Clean, safe, and habitable condition at all times",
  ];

  if (step === 5) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6 font-bold text-[#E8634A] font-serif">Done!</div>
        <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-3">You are now a Host</h2>
        <p className="text-gray-500 mb-8">Your account has been upgraded. Start by creating your first listing.</p>
        <Btn variant="primary" size="lg" onClick={() => navigate("/host/properties/new")}>Create Your First Listing</Btn>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-serif text-[#1B2B4B] mb-2">Become a StayEase Host</h1>
        <p className="text-gray-500">Earn income from your property on Kenya's leading rental platform.</p>
      </div>

      <div className="flex items-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0
              ${step > i + 1 ? "bg-[#E8634A] text-white" : step === i + 1 ? "bg-[#1B2B4B] text-white" : "bg-gray-200 text-gray-500"}`}>
              {i + 1}
            </div>
            <span className={`ml-2 text-xs hidden sm:inline ${step === i + 1 ? "text-[#1B2B4B] font-semibold" : "text-gray-400"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? "bg-[#E8634A]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <Card className="mb-6">
        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-6">How hosting works</h2>
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {benefits.map((b, i) => (
                  <div key={b.title} className="border border-gray-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-[#fdf0ed] text-[#E8634A] font-bold text-sm flex items-center justify-center mb-3">{i + 1}</div>
                    <h4 className="font-semibold text-[#1B2B4B] mb-1">{b.title}</h4>
                    <p className="text-sm text-gray-500">{b.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#f7f3ee] rounded-xl p-5 mb-6">
                <p className="text-sm text-[#1B2B4B] font-medium mb-1">Average host earnings on StayEase</p>
                <p className="text-3xl font-bold font-serif text-[#E8634A]">KES 45,000<span className="text-base text-gray-400 font-normal">/month</span></p>
                <p className="text-xs text-gray-400 mt-1">Based on active hosts listing 1–2 properties in Nairobi</p>
              </div>
              <Btn variant="primary" size="lg" full onClick={() => setStep(2)}>Continue</Btn>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Host requirements</h2>
              <p className="text-sm text-gray-500 mb-6">Make sure you meet these requirements before listing your property.</p>
              <ul className="space-y-3 mb-8">
                {requirements.map(r => (
                  <li key={r} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn>
                <Btn variant="primary" full onClick={() => setStep(3)}>I Meet These Requirements</Btn>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Host Agreement</h2>
              <p className="text-sm text-gray-500 mb-5">Please read and accept our hosting terms before activating your account.</p>
              <div className="h-48 overflow-y-auto bg-gray-50 rounded-xl p-5 text-xs text-gray-500 leading-relaxed mb-5 border border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">StayEase Host Terms & Conditions</p>
                <p className="mb-3">By becoming a host on StayEase, you agree to maintain your property in a clean, safe, and habitable condition at all times. You agree to provide accurate descriptions and photographs of your property and to honour confirmed bookings except in cases of genuine emergency.</p>
                <p className="mb-3">StayEase charges a 10% service fee on each completed booking. Payouts are processed within 24 hours of guest check-in via M-Pesa or bank transfer to your registered account.</p>
                <p className="mb-3">Hosts are responsible for complying with all applicable Kenyan laws, including the Tourism Act, local county regulations, and any applicable tax obligations such as Withholding Tax on rental income.</p>
                <p className="mb-3">StayEase reserves the right to remove listings that violate our community standards or receive repeated negative reviews. Disputes between hosts and guests will be mediated by StayEase support.</p>
                <p>The Host Guarantee covers accidental property damage up to KES 500,000 per booking. It does not cover theft, wear and tear, or damage caused by events outside normal guest use.</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#E8634A] w-4 h-4" />
                <span className="text-sm text-gray-600">I have read and agree to the StayEase Host Terms & Conditions.</span>
              </label>
              <div className="flex gap-3">
                <Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn>
                <Btn variant="primary" full onClick={() => setStep(4)} disabled={!agreed}>Continue</Btn>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf0ed] flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl text-[#E8634A] font-bold">H</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Ready to activate?</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
                {user
                  ? `We'll upgrade your account (${user.email}) to a host account right now.`
                  : "You'll need an account first. We'll take you to registration and set you up as a host."}
              </p>
              <div className="flex gap-3 justify-center">
                <Btn variant="ghost" onClick={() => setStep(3)}>Back</Btn>
                <Btn variant="primary" size="lg" onClick={handleActivate} disabled={loading}>
                  {loading ? "Activating…" : user ? "Activate Host Account" : "Create Host Account"}
                </Btn>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ 
    name: user?.name || "", 
    email: user?.email || "", 
    phone: user?.phone || "" 
  });
  const [prefs, setPrefs] = useState({ 
    smoking: false, 
    petFriendly: true, 
    disabilityAccess: false 
  });
  const [saved, setSaved] = useState(false);
  const togP = f => setPrefs(p => ({ ...p, [f]: !p[f] }));

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">My Profile</h1>
      {saved && <Alert type="success">Profile updated.</Alert>}

      <Card className="p-6 mb-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-[#E8634A] flex items-center justify-center text-white text-xl font-bold">
            {form.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-[#1B2B4B]">{form.name || "User"}</p>
            <Badge color={user?.role === "host" ? "coral" : "blue"}>{user?.role === "host" ? "Host" : "Guest"}</Badge>
          </div>
        </div>
        <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Btn variant="primary" onClick={() => { 
          login({ ...user, ...form }); 
          setSaved(true); 
          setTimeout(() => setSaved(false), 2500); 
        }}>
          Save Changes
        </Btn>
      </Card>

      {user?.role === "customer" && (
        <Card className="p-5 mb-4">
          <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">My Preferences</h3>
          <p className="text-xs text-gray-400 mb-3">Used to personalise your search results.</p>
          <Toggle label="Smoking Allowed" checked={prefs.smoking} onChange={() => togP("smoking")} />
          <Toggle label="Pet Friendly" checked={prefs.petFriendly} onChange={() => togP("petFriendly")} />
          <Toggle label="Disability Accessible" checked={prefs.disabilityAccess} onChange={() => togP("disabilityAccess")} />
        </Card>
      )}

      {user?.role === "customer" && (
        <Card className="p-5 mb-4">
          <h3 className="font-bold text-[#1B2B4B] mb-3 text-sm">Become a Host</h3>
          <p className="text-xs text-gray-500 mb-4">Have a property to list? Upgrade your account to start hosting.</p>
          <Btn variant="outline" onClick={() => navigate("/become-host")}>Start the Host Application</Btn>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="font-bold text-[#1B2B4B] mb-3 text-sm">Account Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Btn variant="ghost" size="sm" onClick={() => navigate("/forgot-password")}>Change Password</Btn>
          {user?.role === "customer"
            ? <Btn variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>My Bookings</Btn>
            : <Btn variant="ghost" size="sm" onClick={() => navigate("/host/dashboard")}>My Listings</Btn>
          }
        </div>
      </Card>
    </div>
  );
}

// ─── PROPERTY FORM ────────────────────────────────────────────────────────────
export function PropertyFormPage({ params }) {
  const { navigate } = useRouter();
  const isEdit = !!params?.id;
  const existing = isEdit ? PROPERTIES.find(p => p.id === params.id) : null;
  
  // ─── FORM STATE ──────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    title: existing?.title || "",
    location: existing?.location || "",
    description: existing?.description || "",
    price: existing?.price || "",
    bedrooms: existing?.bedrooms || 1,
    bathrooms: existing?.bathrooms || 1,
    maxGuests: existing?.maxGuests || 2,
    smoking: existing?.smoking || false,
    petFriendly: existing?.petFriendly || false,
    disabilityAccess: existing?.disabilityAccess || false,
    wifi: true,
    kitchen: true,
    ac: existing?.amenities?.includes("AC") || false,
    grill: existing?.amenities?.includes("Grill") || false,
    pool: existing?.amenities?.includes("Pool") || false,
    fireplace: existing?.amenities?.includes("Fireplace") || false,
  });

  // ─── PHOTO UPLOAD STATE ──────────────────────────────────────────────────
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  
  // ─── VALIDATION STATE ─────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const tog = f => setForm(v => ({ ...v, [f]: !v[f] }));

  // ─── PHOTO HANDLING ──────────────────────────────────────────────────────
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) {
        alert(`${file.name} is not supported. Use JPG, PNG, or WEBP.`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum 5MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const previews = validFiles.map(file => URL.createObjectURL(file));
    setPhotos([...photos, ...validFiles]);
    setPhotoPreviews([...photoPreviews, ...previews]);
    setErrors({ ...errors, photos: undefined });
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photoPreviews[index]);
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handlePhotoUpload({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-[#E8634A]', 'bg-[#fdf0ed]');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-[#E8634A]', 'bg-[#fdf0ed]');
  };

  // ─── VALIDATION FUNCTIONS ──────────────────────────────────────────────
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch(field) {
      case 'title':
        if (!value || value.trim().length < 3) {
          newErrors.title = 'Title must be at least 3 characters';
        } else if (value.trim().length > 100) {
          newErrors.title = 'Title must be less than 100 characters';
        } else {
          delete newErrors.title;
        }
        break;
        
      case 'location':
        if (!value || value.trim().length < 2) {
          newErrors.location = 'Please enter a valid location';
        } else {
          delete newErrors.location;
        }
        break;
        
      case 'price':
        if (!value || isNaN(value) || Number(value) <= 0) {
          newErrors.price = 'Please enter a valid price greater than 0';
        } else if (Number(value) > 1000000) {
          newErrors.price = 'Price seems too high. Please verify.';
        } else {
          delete newErrors.price;
        }
        break;
        
      case 'description':
        if (!value || value.trim().length < 10) {
          newErrors.description = 'Description must be at least 10 characters';
        } else {
          delete newErrors.description;
        }
        break;
        
      case 'bedrooms':
        if (!value || Number(value) < 1 || Number(value) > 20) {
          newErrors.bedrooms = 'Please enter 1-20 bedrooms';
        } else {
          delete newErrors.bedrooms;
        }
        break;
        
      case 'maxGuests':
        if (!value || Number(value) < 1 || Number(value) > 50) {
          newErrors.maxGuests = 'Please enter 1-50 guests';
        } else {
          delete newErrors.maxGuests;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setTouched({ ...touched, [field]: true });
    validateField(field, value);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, form[field]);
  };

  const getFieldClass = (field) => {
    const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
    if (touched[field] && errors[field]) {
      return base + " border-red-500 focus:border-red-500 ring-2 ring-red-200 error-field";
    }
    if (touched[field] && !errors[field]) {
      return base + " border-green-500 focus:border-green-500";
    }
    return base + " border-gray-200 focus:border-[#E8634A]";
  };

  const validateAll = () => {
    const fields = ['title', 'location', 'price', 'description', 'bedrooms', 'maxGuests'];
    const allErrors = {};
    let isValid = true;
    
    fields.forEach(field => {
      const value = form[field];
      let error = '';
      
      switch(field) {
        case 'title':
          if (!value || value.trim().length < 3) error = 'Title must be at least 3 characters';
          break;
        case 'location':
          if (!value || value.trim().length < 2) error = 'Please enter a valid location';
          break;
        case 'price':
          if (!value || isNaN(value) || Number(value) <= 0) error = 'Please enter a valid price';
          break;
        case 'description':
          if (!value || value.trim().length < 10) error = 'Description must be at least 10 characters';
          break;
        case 'bedrooms':
          if (!value || Number(value) < 1) error = 'Please enter at least 1 bedroom';
          break;
        case 'maxGuests':
          if (!value || Number(value) < 1) error = 'Please enter at least 1 guest';
          break;
        default:
          break;
      }
      
      if (error) {
        allErrors[field] = error;
        isValid = false;
      }
    });
    
    if (photos.length === 0 && !isEdit) {
      allErrors.photos = 'Please upload at least one photo';
      isValid = false;
    }
    
    setErrors(allErrors);
    return isValid;
  };

  // ─── SAVE ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validateAll()) {
      const firstError = document.querySelector('.error-field');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setSaved(true);
    setLoading(false);
    setTimeout(() => navigate("/host/dashboard"), 1300);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button className="text-sm text-gray-400 hover:text-[#1B2B4B] mb-6" onClick={() => navigate("/host/dashboard")}>
        ← Back
      </button>
      
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">
        {isEdit ? "Edit Listing" : "Create New Listing"}
      </h1>
      
      {saved && <Alert type="success">Listing {isEdit ? "updated" : "created"} successfully. Redirecting…</Alert>}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ─── PHOTO UPLOAD SECTION ──────────────────────────────────────── */}
        <Card className="mb-4 p-6">
          <h3 className="font-bold text-[#1B2B4B] mb-2">
            Photos <span className="text-[#E8634A] text-sm">*</span>
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Upload up to 5 photos (JPG, PNG, WEBP, Max 5MB each)
          </p>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              errors.photos ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#E8634A]'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input 
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <div className="text-4xl mb-3">📸</div>
              <p className="text-sm text-gray-500">
                Drag & drop photos here or <span className="text-[#E8634A] font-medium">click to browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported: JPG, PNG, WEBP (Max 5MB)
              </p>
            </label>
          </div>
          {errors.photos && (
            <p className="text-xs text-red-500 mt-2">{errors.photos}</p>
          )}
          
          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={preview} 
                    alt={`Property photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    ×
                  </button>
                  <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ─── BASIC INFORMATION ──────────────────────────────────────────── */}
        <Card className="mb-4 p-6">
          <h3 className="font-bold text-[#1B2B4B] mb-4">
            Basic Information <span className="text-red-500 text-sm">* Required</span>
          </h3>
          
          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
              Property Title <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g. Sunset Villa with Pool"
              value={form.title}
              onChange={e => handleFieldChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              className={getFieldClass('title')}
            />
            {touched.title && errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="City, Kenya"
              value={form.location}
              onChange={e => handleFieldChange('location', e.target.value)}
              onBlur={() => handleBlur('location')}
              className={getFieldClass('location')}
            />
            {touched.location && errors.location && (
              <p className="text-xs text-red-500 mt-1">{errors.location}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe your property…"
              value={form.description}
              onChange={e => handleFieldChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              className={getFieldClass('description') + " resize-y"}
            />
            {touched.description && errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {form.description.length}/500 characters
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Price/Night <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="10000"
                value={form.price}
                onChange={e => handleFieldChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
                className={getFieldClass('price')}
              />
              {touched.price && errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.bedrooms}
                onChange={e => handleFieldChange('bedrooms', e.target.value)}
                onBlur={() => handleBlur('bedrooms')}
                className={getFieldClass('bedrooms')}
              />
              {touched.bedrooms && errors.bedrooms && (
                <p className="text-xs text-red-500 mt-1">{errors.bedrooms}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Bathrooms
              </label>
              <input
                type="number"
                value={form.bathrooms}
                onChange={e => handleFieldChange('bathrooms', e.target.value)}
                className={getFieldClass('bathrooms')}
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Max Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.maxGuests}
                onChange={e => handleFieldChange('maxGuests', e.target.value)}
                onBlur={() => handleBlur('maxGuests')}
                className={getFieldClass('maxGuests')}
              />
              {touched.maxGuests && errors.maxGuests && (
                <p className="text-xs text-red-500 mt-1">{errors.maxGuests}</p>
              )}
            </div>
          </div>
        </Card>

        {/* ─── AMENITIES ────────────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Card className="p-5">
            <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Default Services</h3>
            <p className="text-xs text-gray-400 mb-3">Always included</p>
            <Toggle label="WiFi" checked={form.wifi} onChange={() => tog("wifi")} />
            <Toggle label="Kitchen" checked={form.kitchen} onChange={() => tog("kitchen")} />
          </Card>
          <Card className="p-5">
            <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Extra Amenities</h3>
            <p className="text-xs text-gray-400 mb-3">Optional add-ons</p>
            <Toggle label="Air Conditioning" checked={form.ac} onChange={() => tog("ac")} />
            <Toggle label="Grill / BBQ" checked={form.grill} onChange={() => tog("grill")} />
            <Toggle label="Pool" checked={form.pool} onChange={() => tog("pool")} />
            <Toggle label="Fireplace" checked={form.fireplace} onChange={() => tog("fireplace")} />
          </Card>
        </div>

        {/* ─── PREFERENCES ──────────────────────────────────────────────────── */}
        <Card className="p-5 mb-6">
          <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Accommodation Preferences</h3>
          <p className="text-xs text-gray-400 mb-3">Let guests know what is allowed</p>
          <Toggle label="Smoking Allowed" checked={form.smoking} onChange={() => tog("smoking")} />
          <Toggle label="Pet Friendly" checked={form.petFriendly} onChange={() => tog("petFriendly")} />
          <Toggle label="Disability Accessible" checked={form.disabilityAccess} onChange={() => tog("disabilityAccess")} />
        </Card>

        {/* ─── VALIDATION SUMMARY ────────────────────────────────────────────── */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-red-800 mb-2">
              Please fix the following errors:
            </p>
            <ul className="text-sm text-red-600 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ─── SUBMIT ────────────────────────────────────────────────────────── */}
        <div className="flex gap-3">
          <Btn 
            variant="primary" 
            onClick={handleSave} 
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? "Saving…" : isEdit ? "Save Changes" : "Publish Listing"}
          </Btn>
          <Btn variant="ghost" onClick={() => navigate("/host/dashboard")}>Cancel</Btn>
        </div>
      </form>
    </div>
  );
}