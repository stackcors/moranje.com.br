"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.includes("@")) e.email = "E-mail inválido";
    if (form.password.length < 8) e.password = "Mínimo 8 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: replace with your register logic
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/");
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Fraca", "Razoável", "Boa", "Forte"][strength];
  const strengthColor = ["", "bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <aside className="hidden lg:flex lg:w-[300px] flex-col justify-between bg-primary p-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-white text-lg">Purchases</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading font-bold text-white text-2xl leading-snug">
            Comece a organizar suas compras hoje.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Crie sua conta gratuitamente e tenha controle total sobre as requisições do seu time.
          </p>
          <ul className="space-y-2 pt-2">
            {[
              "Configuração em menos de 2 minutos",
              "Sem necessidade de cartão de crédito",
              "Suporte dedicado incluído",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-4 h-4 rounded-full bg-green-400/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/30 text-xs">© {new Date().getFullYear()} Purchases. Todos os direitos reservados.</p>
      </aside>

      {/* Right panel */}
      <main className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-foreground text-lg">Purchases</span>
          </div>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-foreground text-2xl mb-1">Crie sua conta</h1>
            <p className="text-muted-foreground text-sm">Preencha os dados abaixo para começar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full name */}
            <Field
              id="name"
              label="Nome completo"
              icon={<User className="w-4 h-4" />}
              error={errors.name}
            >
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="João da Silva"
                className={inputCls(!!errors.name)}
              />
            </Field>

            {/* Email */}
            <Field
              id="email"
              label="E-mail"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
            >
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                className={inputCls(!!errors.email)}
              />
            </Field>

            {/* Password */}
            <Field
              id="password"
              label="Senha"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password}
            >
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 8 caracteres"
                  className={inputCls(!!errors.password) + " pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength ? strengthColor : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Força da senha: <span className="font-medium text-foreground">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Criando conta...
                </span>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
            Ao criar uma conta, você concorda com os{" "}
            <Link href="/terms" className="text-primary hover:underline">Termos de Uso</Link>{" "}
            e a{" "}
            <Link href="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

/* ---- helpers ---- */

function inputCls(hasError: boolean) {
  return [
    "w-full h-10 px-3 bg-secondary border rounded-md text-sm text-foreground",
    "placeholder-muted-foreground focus:outline-none focus:ring-2 transition-all",
    hasError
      ? "border-destructive focus:ring-destructive/30 focus:border-destructive"
      : "border-border focus:ring-primary/40 focus:border-primary",
  ].join(" ");
}

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}