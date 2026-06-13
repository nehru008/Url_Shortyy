import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import Input from "../components/common/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { messageFromError } from "../services/api.js";

export default function Register() {
  const [form, setForm] = useState({ username: "", fullName: "", email: "", password: "", profile: null });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(form);
      toast.success("Account created", "You can sign in now.");
      navigate("/login");
    } catch (requestError) {
      setError(messageFromError(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Create account</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your backend requires a profile image during registration.</p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Full name" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} required />
        <Input label="Username" value={form.username} onChange={(event) => update("username", event.target.value)} required />
        <Input label="Email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
        <Input label="Password" type="password" value={form.password} onChange={(event) => update("password", event.target.value)} required />
        <Input
          accept="image/*"
          label="Profile image"
          type="file"
          onChange={(event) => update("profile", event.target.files?.[0] || null)}
          required
        />
        {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</p> : null}
        <Button className="w-full" icon={UserPlus} isLoading={isLoading} type="submit">
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link className="font-semibold text-brand-700 hover:text-brand-600 dark:text-brand-500" to="/login">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
