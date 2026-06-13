import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import Input from "../components/common/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { messageFromError } from "../services/api.js";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const credentials = form.identifier.includes("@")
        ? { email: form.identifier, password: form.password }
        : { username: form.identifier, password: form.password };
      await login(credentials);
      toast.success("Welcome back", "You are signed in.");
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (requestError) {
      setError(messageFromError(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Sign in</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Use your username or email to continue.</p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Username or email"
          value={form.identifier}
          onChange={(event) => setForm((current) => ({ ...current, identifier: event.target.value }))}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          placeholder="Enter your password"
          required
        />
        {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</p> : null}
        <Button className="w-full" icon={LogIn} isLoading={isLoading} type="submit">
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        New here?{" "}
        <Link className="font-semibold text-brand-700 hover:text-brand-600 dark:text-brand-500" to="/register">
          Create account
        </Link>
      </p>
    </Card>
  );
}


