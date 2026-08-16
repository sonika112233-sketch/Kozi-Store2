import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const perks = [
  "Free shipping across Cambodia",
  "Easy 30-day returns",
  "Track every order in real time",
];

function firebaseErrorMessage(err) {
  const map = {
    "auth/email-already-in-use": "That email is already registered — try logging in instead.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts — please wait a moment and try again.",
    "auth/operation-not-allowed":
      "Email/Password sign-in isn't turned on for this project yet — enable it in Firebase console > Authentication > Sign-in method.",
    "auth/network-request-failed":
      "Couldn't reach Firebase — check your internet connection or firewall/ad-blocker settings.",
    "auth/configuration-not-found":
      "Firebase Authentication isn't set up for this project yet — open Authentication in the Firebase console and click Get Started.",
  };
  if (map[err?.code]) return map[err.code];
  // Unknown error — show the raw code/message so it's never a silent dead end.
  return err?.code
    ? `Something went wrong (${err.code}). Please try again.`
    : "Something went wrong. Please try again.";
}

function PasswordField({ id, label, placeholder, value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-cozy-brown">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={visible ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-3 pr-12 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-cozy-brown/50 hover:text-cozy-terracotta transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!form.password) {
      setError("Please enter a password.");
      return;
    }
    if (form.password !== form.confirm_password) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const displayName = `${form.first_name} ${form.last_name}`.trim();
      await signUp(form.email, form.password, displayName);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(firebaseErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-cozy-brown">
            First name
          </label>
          <input
            type="text"
            id="first_name"
            value={form.first_name}
            onChange={update("first_name")}
            className="mt-1 block w-full px-4 py-3 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-cozy-brown">
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            value={form.last_name}
            onChange={update("last_name")}
            className="mt-1 block w-full px-4 py-3 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup_email" className="block text-sm font-medium text-cozy-brown">
          Email
        </label>
        <input
          type="email"
          id="signup_email"
          value={form.email}
          onChange={update("email")}
          className="mt-1 block w-full px-4 py-3 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
          placeholder="john.doe@gmail.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-cozy-brown">
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          value={form.phone}
          onChange={update("phone")}
          className="mt-1 block w-full px-4 py-3 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
          placeholder="(123) 456-7890"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PasswordField
          id="signup_password"
          label="Password"
          placeholder="••••••••••••"
          value={form.password}
          onChange={update("password")}
        />
        <PasswordField
          id="confirm_password"
          label="Confirm password"
          placeholder="••••••••••••"
          value={form.confirm_password}
          onChange={update("confirm_password")}
        />
      </div>

      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 text-cozy-terracotta border-cozy-tan rounded focus:ring-cozy-terracotta"
        />
        <label htmlFor="terms" className="ml-3 text-sm text-cozy-brown">
          I agree to the{" "}
          <a href="#" className="text-cozy-terracotta hover:text-cozy-terracotta-dark transition-colors">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-cozy-terracotta hover:text-cozy-terracotta-dark transition-colors">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-cozy-terracotta text-white font-semibold py-3 rounded-xl hover:bg-cozy-terracotta-dark focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

function LoginForm() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      await logIn(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Log in failed:", err);
      setError(firebaseErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="login_email" className="block text-sm font-medium text-cozy-brown">
          Email
        </label>
        <input
          type="email"
          id="login_email"
          value={form.email}
          onChange={update("email")}
          className="mt-1 block w-full px-4 py-3 border border-cozy-tan rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta transition-colors"
          placeholder="john.doe@gmail.com"
        />
      </div>

      <PasswordField
        id="login_password"
        label="Password"
        placeholder="••••••••••••"
        value={form.password}
        onChange={update("password")}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-cozy-brown">
          <input
            type="checkbox"
            className="h-4 w-4 text-cozy-terracotta border-cozy-tan rounded focus:ring-cozy-terracotta"
          />
          Remember me
        </label>
        <a href="#" className="text-cozy-terracotta hover:text-cozy-terracotta-dark transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-cozy-terracotta text-white font-semibold py-3 rounded-xl hover:bg-cozy-terracotta-dark focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-60"
      >
        {submitting ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

function Account() {
  const [mode, setMode] = useState("signup"); // "signup" | "login"

  return (
    <main className="bg-cozy-cream">
      <div className="flex items-center justify-center min-h-fit py-12 px-4">
        <div className="flex w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-xl border border-cozy-tan/40 xl:flex-row flex-col">
          {/* Left: brand panel with shoelace-tag signature */}
          <div className="relative hidden xl:flex xl:w-2/5 flex-col justify-between bg-cozy-dark text-cozy-cream p-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)",
              }}
            />

            <div className="relative">
              <p className="text-sm tracking-[0.3em] uppercase text-cozy-tan mb-8">
                Kozi Store
              </p>
              <h2 className="text-3xl font-bold leading-snug mb-3">
                Step into
                <br />
                something cozy.
              </h2>
              <p className="text-cozy-cream/70 text-sm leading-relaxed max-w-xs">
                One account gets you faster checkout, saved sizes, and order
                tracking for every pair.
              </p>
            </div>

            {/* Signature: a simple laced sneaker line-art */}
            <div className="relative flex justify-center py-6">
              <svg viewBox="0 0 220 120" className="w-56 h-auto text-cozy-tan">
                <path
                  d="M20 92c0-6 4-10 10-12l26-9c6-2 10-6 14-12l10-16c4-6 10-9 17-9 5 0 8 3 8 8v14c0 6 3 11 8 14l24 14c7 4 11 9 11 16v6c0 4-3 7-7 7H27c-4 0-7-3-7-7z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 92h118"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M77 43l6 10M89 34l7 11M101 27l7 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="60" r="3" fill="currentColor" />
                <circle cx="163" cy="68" r="3" fill="currentColor" />
                <circle cx="173" cy="78" r="3" fill="currentColor" />
              </svg>
            </div>

            <ul className="relative space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-cozy-cream/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-cozy-terracotta shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form panel */}
          <div className="w-full xl:w-3/5 p-8 sm:p-12">
            {/* Pill toggle */}
            <div className="relative flex bg-cozy-beige rounded-full p-1 mb-8 max-w-xs">
              <div
                className="absolute inset-y-1 w-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
                style={{
                  transform: mode === "signup" ? "translateX(0%)" : "translateX(100%)",
                }}
              />
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors ${
                  mode === "signup" ? "text-cozy-brown" : "text-cozy-brown/50"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors ${
                  mode === "login" ? "text-cozy-brown" : "text-cozy-brown/50"
                }`}
              >
                Log in
              </button>
            </div>

            <h1 className="text-3xl font-bold text-cozy-brown mb-2">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-cozy-brown/60 mb-8">
              {mode === "signup"
                ? "Let's get you set up so you can start shopping."
                : "Log in to pick up right where you left off."}
            </p>

            {mode === "signup" ? <SignUpForm /> : <LoginForm />}

            <div className="mt-8 text-center text-sm text-cozy-brown/60">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-cozy-terracotta font-medium hover:underline transition-colors"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  New to Kozi Store?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-cozy-terracotta font-medium hover:underline transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
