import { useAuth } from "../context/AuthContext";
import { useRouter } from "../context/AuthContext";
import { PROPERTIES } from "../data/constants";
import { Btn } from "./common";

export function Navbar() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  const pendingCount = PROPERTIES.filter(p => !p.approved).length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-xl font-bold font-serif text-[#1B2B4B]">
          Stay<span className="text-[#E8634A]">Ease</span>
        </button>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Btn variant="ghost" size="sm" onClick={() => navigate("/become-host")}>Become a Host</Btn>
              <Btn variant="outline" size="sm" onClick={() => navigate("/login")}>Log In</Btn>
              <Btn variant="primary" size="sm" onClick={() => navigate("/register")}>Sign Up</Btn>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500 hidden sm:inline">{greeting}, {user.name?.split(" ")[0]}</span>
              {user.role === "host"
                ? <Btn variant="outline" size="sm" onClick={() => navigate("/host/dashboard")}>My Listings</Btn>
                  : user.role === "admin"
                    ? <Btn variant="outline" size="sm" onClick={() => navigate("/admin/dashboard")}>
                        Admin {pendingCount > 0 && <span className="bg-[#E8634A] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center ml-1">{pendingCount}</span>}
                      </Btn>
                  : <>
                      <Btn variant="ghost" size="sm" onClick={() => navigate("/become-host")}>Become a Host</Btn>
                      <Btn variant="outline" size="sm" onClick={() => navigate("/dashboard")}>My Bookings</Btn>
                    </>
              }
              <Btn variant="outline" size="sm" onClick={() => navigate("/profile")}>Profile</Btn>
              <Btn variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>Log Out</Btn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
