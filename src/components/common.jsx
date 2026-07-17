import { KES } from "../data/constants";
import { useState } from "react";

// ─── BUTTON ────────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = "primary", size = "md", disabled, full, type = "button", className = "" }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const sizes = { 
    sm: "px-3 py-1.5 text-sm", 
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base" 
  };
  const variants = {
    primary: "bg-[#E8634A] hover:bg-[#d4563f] text-white focus:ring-[#E8634A]",
    outline: "border border-[#1B2B4B] text-[#1B2B4B] hover:bg-[#1B2B4B] hover:text-white focus:ring-[#1B2B4B]",
    ghost: "border border-gray-200 text-gray-500 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500",
    dark: "bg-[#1B2B4B] hover:bg-[#243660] text-white focus:ring-[#1B2B4B]",
    white: "bg-white text-[#1B2B4B] hover:bg-gray-50 focus:ring-gray-300 border border-gray-200",
  };
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  onKeyDown, 
  onBlur,
  min, 
  max, 
  maxLength, 
  rows,
  required = false,
  error = "",
  touched = false,
  className = "",
  disabled = false,
  readOnly = false,
  icon = null,
  iconPosition = "left"
}) {
  const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
  
  let borderClass = "border-gray-200 focus:border-[#E8634A]";
  if (touched && error) {
    borderClass = "border-red-500 focus:border-red-500 ring-2 ring-red-200";
  } else if (touched && !error && value) {
    borderClass = "border-green-500 focus:border-green-500";
  }

  const inputClasses = `${base} ${borderClass} ${className} ${icon && iconPosition === "left" ? "pl-10" : ""} ${icon && iconPosition === "right" ? "pr-10" : ""}`;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {rows ? (
          <textarea 
            rows={rows} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses + " resize-y"} 
            disabled={disabled}
            readOnly={readOnly}
          />
        ) : (
          <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            min={min} 
            max={max} 
            maxLength={maxLength}
            className={inputClasses}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {touched && error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
      {touched && !error && value && (
        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
          <span>✓</span> Valid
        </p>
      )}
    </div>
  );
}

// ─── SELECT ───────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, children, required = false, error = "", touched = false }) {
  const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
  let borderClass = "border-gray-200 focus:border-[#E8634A]";
  if (touched && error) {
    borderClass = "border-red-500 focus:border-red-500 ring-2 ring-red-200";
  } else if (touched && !error && value) {
    borderClass = "border-green-500 focus:border-green-500";
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select 
        value={value} 
        onChange={onChange}
        className={`${base} ${borderClass}`}
      >
        {children}
      </select>
      {touched && error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>{children}</div>;
}

// ─── BADGE ──────────────────────────────────────────────────────────────────
export function Badge({ children, color = "gray", className = "" }) {
  const colors = {
    gray: "bg-gray-100 text-gray-600",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    coral: "bg-[#fdf0ed] text-[#E8634A]",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray} ${className}`}>
      {children}
    </span>
  );
}

// ─── ALERT ──────────────────────────────────────────────────────────────────
export function Alert({ children, type = "success", className = "" }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    error: "bg-red-50 text-red-800 border border-red-200",
    info: "bg-blue-50 text-blue-800 border border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  };
  return <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${styles[type] || styles.info} ${className}`}>{children}</div>;
}

// ─── TOGGLE ─────────────────────────────────────────────────────────────────
export function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <button 
        onClick={onChange} 
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${checked ? "bg-[#E8634A]" : "bg-gray-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
export function StarRating({ value, onChange, size = "text-2xl", readonly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <span 
          key={s} 
          onClick={() => !readonly && onChange && onChange(s)}
          className={`${size} ${!readonly ? "cursor-pointer" : ""} ${s <= value ? "text-amber-400" : "text-gray-200"} transition-colors`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── STATUS BADGE ──────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = { 
    confirmed: "green", 
    pending: "orange", 
    cancelled: "gray", 
    completed: "blue",
    active: "green",
    inactive: "gray"
  };
  const labels = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
    completed: "Completed",
    active: "Active",
    inactive: "Inactive"
  };
  return <Badge color={map[status] || "gray"}>{labels[status] || status}</Badge>;
}

// ─── STAT CARD ──────────────────────────────────────────────────────────────
export function StatCard({ value, label, icon = null, className = "" }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <div className="text-2xl font-bold text-[#E8634A] font-serif">{value}</div>
          <div className="text-gray-500 text-sm mt-0.5">{label}</div>
        </div>
      </div>
    </Card>
  );
}

// ─── PROPERTY CARD ──────────────────────────────────────────────────────────
export function PropertyCard({ property, onClick }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div onClick={onClick}>
        <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
          {property.mainImage && !imageError ? (
            <img 
              src={property.mainImage} 
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-5xl font-bold font-serif text-[#1B2B4B]/20"
              style={{ background: `hsl(${property.id * 47}, 35%, 93%)` }}
            >
              {property.title[0]}
            </div>
          )}
          
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"/>
                <path d="M8 2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1h1z"/>
              </svg>
              {property.images.length} photos
            </div>
          )}

          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="text-amber-400">★</span>
            {property.rating}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-[#1B2B4B] font-serif mb-0.5 truncate">{property.title}</h3>
          <p className="text-gray-400 text-xs mb-2 truncate">{property.location}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {property.smoking && <Badge color="gray">Smoking OK</Badge>}
            {property.petFriendly && <Badge color="green">Pet Friendly</Badge>}
            {property.disabilityAccess && <Badge color="blue">Accessible</Badge>}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-[#E8634A] font-bold text-sm">
              {KES(property.price)}
              <span className="text-gray-400 font-normal text-xs">/night</span>
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-0.5">
              <span className="text-amber-400">★</span>
              {property.rating} ({property.reviews})
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── LOADING SPINNER ──────────────────────────────────────────────────────
export function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-[#E8634A] border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}

// ─── EMPTY STATE ────────────────────────────────────────────────────────────
export function EmptyState({ title, description, icon = "📭", action = null }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export function Avatar({ name, size = "md", className = "" }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-20 h-20 text-xl"
  };
  const initial = name?.[0]?.toUpperCase() || "?";
  
  return (
    <div className={`rounded-full bg-[#E8634A] flex items-center justify-center text-white font-bold ${sizes[size]} ${className}`}>
      {initial}
    </div>
  );
}

// ─── BREADCRUMB ──────────────────────────────────────────────────────────────
export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-[#E8634A] transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-[#1B2B4B] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export function Divider({ className = "" }) {
  return <hr className={`border-gray-200 my-6 ${className}`} />;
}

// ─── PRICE DISPLAY ──────────────────────────────────────────────────────────
export function PriceDisplay({ amount, period = "night", className = "" }) {
  return (
    <span className={`font-bold text-[#E8634A] ${className}`}>
      {KES(amount)}
      {period && <span className="text-gray-400 font-normal text-sm">/{period}</span>}
    </span>
  );
}

// ─── TAG ────────────────────────────────────────────────────────────────────
export function Tag({ children, color = "gray", removable = false, onRemove }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}>
      {children}
      {removable && (
        <button 
          onClick={onRemove}
          className="hover:text-red-500 transition-colors ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  );
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
export function Tooltip({ children, text, position = "top" }) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div className={`absolute ${positions[position]} hidden group-hover:block bg-[#1B2B4B] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50`}>
        {text}
      </div>
    </div>
  );
}

// ─── PAGINATION ──────────────────────────────────────────────────────────────
export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ←
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border text-sm transition-colors ${
            page === currentPage 
              ? "bg-[#E8634A] text-white border-[#E8634A]" 
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  );
}

// ─── MODAL ──────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children, size = "md", actions = null }) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl"
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl w-full ${sizes[size]} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-[#1B2B4B]">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              ✕
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
        {actions && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
