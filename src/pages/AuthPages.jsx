import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { Card, Btn, Input, Alert } from "../components/common";

// ─── HELPER: Generate username from email ──────────────────────────────────
const generateUsername = (email) => {
  if (!email) return "";
  // Get everything before the @ symbol
  const username = email.split('@')[0];
  // Remove special characters and spaces
  return username.replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase();
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── VALIDATION ──────────────────────────────────────────────────────────
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    switch(field) {
      case 'email':
        if (!value || value.trim() === '') {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value || value.trim() === '') {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
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
    if (generalError) setGeneralError("");
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, form[field]);
  };

  const getFieldClass = (field) => {
    const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
    
    if (touched[field] && errors[field]) {
      return base + " border-red-500 focus:border-red-500 ring-2 ring-red-200";
    }
    if (touched[field] && !errors[field] && form[field]) {
      return base + " border-green-500 focus:border-green-500";
    }
    return base + " border-gray-200 focus:border-[#E8634A]";
  };

  const validateAll = () => {
    let isValid = true;
    const fields = ['email', 'password'];
    
    fields.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
      if (!validateField(field, form[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleSubmit = async () => {
    setGeneralError("");
    
    if (!validateAll()) {
      const firstError = document.querySelector('.ring-red-200');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      setGeneralError("Please fix the highlighted fields above.");
      return;
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    
    // Generate username from email
    const username = generateUsername(form.email);
    const role = form.email.includes("host") ? "host" : "customer";
    
    login({ 
      username: username,
      name: role === "host" ? "Jane Wanjiku" : "Alex Kamau", 
      email: form.email, 
      role 
    });
    navigate(role === "host" ? "/host/dashboard" : "/dashboard");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1 text-center">Welcome back</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Sign in to your StayEase account</p>
          
          {generalError && (
            <Alert type="error">
              {generalError}
            </Alert>
          )}

          <div>
            {/* Email - Required */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={getFieldClass('email')}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
              {touched.email && !errors.email && form.email && (
                <p className="text-xs text-green-500 mt-1">
                  ✓ Username: {generateUsername(form.email)}
                </p>
              )}
            </div>
            
            {/* Password - Required */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => handleFieldChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className={getFieldClass('password')}
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          
          <div className="text-right mb-5">
            <button className="text-[#E8634A] text-sm hover:underline" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </button>
          </div>
          
          <Btn variant="primary" full onClick={handleSubmit} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Btn>
          
          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <p className="text-sm text-gray-400">
              No account? <button className="text-[#E8634A] font-medium hover:underline" onClick={() => navigate("/register")}>Sign up</button>
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Tip: include "host" in email for a host demo account
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export function RegisterPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirm: "", 
    role: "customer" 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── Generate username from email in real-time ──────────────────────────
  const getSuggestedUsername = () => {
    if (!form.email) return "";
    return generateUsername(form.email);
  };

  // ─── VALIDATION ──────────────────────────────────────────────────────────
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    switch(field) {
      case 'name':
        if (!value || value.trim() === '') {
          newErrors.name = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.name = 'Name must be less than 50 characters';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value || value.trim() === '') {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'phone':
        if (value && value.trim() !== '') {
          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number (e.g., +254700000000)';
          } else {
            delete newErrors.phone;
          }
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'password':
        if (!value || value.trim() === '') {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(value)) {
          newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = 'Password must contain at least one number';
        } else {
          delete newErrors.password;
        }
        break;
        
      case 'confirm':
        if (!value || value.trim() === '') {
          newErrors.confirm = 'Please confirm your password';
        } else if (value !== form.password) {
          newErrors.confirm = 'Passwords do not match';
        } else {
          delete newErrors.confirm;
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
    if (generalError) setGeneralError("");
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, form[field]);
  };

  const getFieldClass = (field) => {
    const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
    
    if (touched[field] && errors[field]) {
      return base + " border-red-500 focus:border-red-500 ring-2 ring-red-200";
    }
    if (touched[field] && !errors[field] && form[field]) {
      return base + " border-green-500 focus:border-green-500";
    }
    return base + " border-gray-200 focus:border-[#E8634A]";
  };

  const isFieldRequired = (field) => {
    const requiredFields = ['name', 'email', 'password', 'confirm'];
    return requiredFields.includes(field);
  };

  const validateAll = () => {
    let isValid = true;
    const requiredFields = ['name', 'email', 'password', 'confirm'];
    
    requiredFields.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
      if (!validateField(field, form[field])) {
        isValid = false;
      }
    });
    
    if (form.phone && form.phone.trim() !== '') {
      setTouched(prev => ({ ...prev, ['phone']: true }));
      if (!validateField('phone', form.phone)) {
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    setGeneralError("");
    
    if (!validateAll()) {
      const firstError = document.querySelector('.ring-red-200');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      setGeneralError("Please fix the highlighted fields above.");
      return;
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    
    // Generate username from email
    const username = generateUsername(form.email);
    
    login({ 
      username: username,
      name: form.name, 
      email: form.email, 
      role: form.role, 
      phone: form.phone || "" 
    });
    navigate(form.role === "host" ? "/host/dashboard" : "/dashboard");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1 text-center">Create your account</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Join thousands of hosts and guests on StayEase</p>

          {generalError && (
            <Alert type="error">
              {generalError}
            </Alert>
          )}

          {/* Role Selection */}
          <div className="flex gap-3 mb-6">
            {["customer", "host"].map(r => (
              <button 
                key={r} 
                onClick={() => setForm({...form, role: r})}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  form.role === r 
                    ? "bg-[#1B2B4B] text-white border-[#1B2B4B]" 
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {r === "customer" ? "I'm a Guest" : "I'm a Host"}
              </button>
            ))}
          </div>

          <div>
            {/* Name - Required */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Alex Kamau"
                value={form.name}
                onChange={e => handleFieldChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={getFieldClass('name')}
              />
              {touched.name && errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email - Required - Username generated from this */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={getFieldClass('email')}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
              {touched.email && !errors.email && form.email && (
                <div className="mt-1 text-xs">
                  <span className="text-green-600">✓ Valid email</span>
                  <span className="text-gray-400 ml-2">
                    Username: <span className="font-mono text-[#1B2B4B] font-medium">{getSuggestedUsername()}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Phone - Optional */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <input
                placeholder="+254 700 000 000"
                value={form.phone}
                onChange={e => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={getFieldClass('phone')}
              />
              {touched.phone && errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
              {touched.phone && !errors.phone && form.phone && (
                <p className="text-xs text-green-500 mt-1">✓ Valid phone number</p>
              )}
            </div>

            {/* Username Display - Auto-generated, read-only */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Username <span className="text-gray-400 text-xs font-normal">(Auto-generated)</span>
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1B2B4B]">
                {getSuggestedUsername() || "Will be generated from email"}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Your username is automatically created from your email address
              </p>
            </div>

            {/* Password - Required */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters with uppercase, lowercase & number"
                value={form.password}
                onChange={e => handleFieldChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className={getFieldClass('password')}
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
              {touched.password && !errors.password && form.password && (
                <p className="text-xs text-green-500 mt-1">✓ Strong password</p>
              )}
            </div>

            {/* Confirm Password - Required */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => handleFieldChange('confirm', e.target.value)}
                onBlur={() => handleBlur('confirm')}
                className={getFieldClass('confirm')}
              />
              {touched.confirm && errors.confirm && (
                <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>
              )}
              {touched.confirm && !errors.confirm && form.confirm && (
                <p className="text-xs text-green-500 mt-1">✓ Passwords match</p>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 mb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="text-red-500">*</span> Required field
            </span>
            <span className="flex items-center gap-1">
              <span className="text-gray-400">(Optional)</span> Not required
            </span>
            <span className="flex items-center gap-1">
              <span className="text-gray-400">(Auto-generated)</span> From email
            </span>
          </div>

          <Btn variant="primary" full onClick={handleSubmit} disabled={loading || Object.keys(errors).length > 0}>
            {loading ? "Creating account…" : "Create Account"}
          </Btn>
          
          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <p className="text-sm text-gray-400">
              Have an account? <button className="text-[#E8634A] font-medium hover:underline" onClick={() => navigate("/login")}>Sign in</button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState("");

  // ─── VALIDATION ──────────────────────────────────────────────────────────
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateCode = () => {
    if (!code || code.trim() === '') {
      setErrors({ code: 'Verification code is required' });
      return false;
    }
    if (code.length < 4) {
      setErrors({ code: 'Please enter a valid 6-digit code' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePassword = () => {
    if (!password || password.trim() === '') {
      setErrors({ password: 'Password is required' });
      return false;
    }
    if (password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrors({ password: 'Password must contain at least one uppercase letter' });
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setErrors({ password: 'Password must contain at least one lowercase letter' });
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setErrors({ password: 'Password must contain at least one number' });
      return false;
    }
    setErrors({});
    return true;
  };

  const getFieldClass = (field) => {
    const base = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors bg-white text-[#1B2B4B]";
    if (touched[field] && errors[field]) {
      return base + " border-red-500 focus:border-red-500 ring-2 ring-red-200";
    }
    if (touched[field] && !errors[field]) {
      return base + " border-green-500 focus:border-green-500";
    }
    return base + " border-gray-200 focus:border-[#E8634A]";
  };

  const next = async () => {
    setGeneralError("");
    
    if (step === 1) {
      setTouched({ email: true });
      if (!validateEmail()) {
        setGeneralError("Please fix the highlighted field above.");
        return;
      }
    } else if (step === 2) {
      setTouched({ code: true });
      if (!validateCode()) {
        setGeneralError("Please fix the highlighted field above.");
        return;
      }
    } else if (step === 3) {
      setTouched({ password: true });
      if (!validatePassword()) {
        setGeneralError("Please fix the highlighted field above.");
        return;
      }
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setStep(s => s + 1);
    setLoading(false);
  };

  const steps = [
    "Enter your email to receive a reset code.",
    "Enter the 6-digit code sent to your email.",
    "Set your new password.",
    "All done!"
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1">Reset Password</h2>
          <p className="text-gray-400 text-sm mb-6">{steps[step - 1]}</p>

          <div className="flex gap-1.5 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${step > s ? "bg-[#E8634A]" : step === s ? "bg-[#1B2B4B]" : "bg-gray-200"}`} />
            ))}
          </div>

          {generalError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600">{generalError}</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setTouched({ email: true });
                  validateEmail();
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => validateEmail()}
                className={getFieldClass('email')}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
              <Btn variant="primary" full onClick={next} disabled={loading || !email}>
                {loading ? "Sending…" : "Send Reset Code"}
              </Btn>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="123456"
                value={code}
                onChange={e => {
                  setCode(e.target.value);
                  setTouched({ code: true });
                  validateCode();
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => validateCode()}
                maxLength={6}
                className={getFieldClass('code')}
              />
              {touched.code && errors.code && (
                <p className="text-xs text-red-500 mt-1">{errors.code}</p>
              )}
              <Btn variant="primary" full onClick={next} disabled={loading || code.length < 4}>
                {loading ? "Verifying…" : "Verify Code"}
              </Btn>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters with uppercase, lowercase & number"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setTouched({ password: true });
                  validatePassword();
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => validatePassword()}
                className={getFieldClass('password')}
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
              {touched.password && !errors.password && password && (
                <p className="text-xs text-green-500 mt-1">✓ Strong password</p>
              )}
              <Btn variant="primary" full onClick={next} disabled={loading || password.length < 8}>
                {loading ? "Saving…" : "Set New Password"}
              </Btn>
            </div>
          )}

          {step === 4 && (
            <div>
              <Alert type="success">Your password has been updated successfully.</Alert>
              <Btn variant="primary" full onClick={() => navigate("/login")}>Back to Sign In</Btn>
            </div>
          )}

          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <button className="text-[#E8634A] text-sm hover:underline" onClick={() => navigate("/login")}>
              ← Back to login
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}