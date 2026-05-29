"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const budgets = ["Under $5k", "$5k - $15k", "$15k - $50k", "$50k+"];

export function LeadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      goals: String(formData.get("goals") ?? ""),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      event.currentTarget.reset();
      setState("success");
      setMessage("Your brief is in. We will respond with a strategic next step.");
    } catch {
      setState("error");
      setMessage("Something interrupted the signal. Try again or email the atelier directly.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
      aria-label="Project inquiry form"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>

      <Field label="Company" name="company" autoComplete="organization" required />

      <div className="input-shell">
        <label htmlFor="budget">Budget Range</label>
        <select id="budget" name="budget" required defaultValue="">
          <option value="" disabled>
            Select range
          </option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <div className="input-shell">
        <label htmlFor="goals">Goals</label>
        <textarea
          id="goals"
          name="goals"
          required
          rows={5}
          placeholder="Tell us what you are building, repositioning, or scaling."
        />
      </div>

      <motion.button
        type="submit"
        disabled={state === "loading"}
        whileHover={state === "loading" ? undefined : { scale: 1.015 }}
        whileTap={state === "loading" ? undefined : { scale: 0.985 }}
        className="group relative mt-3 inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-9 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ink transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-10 flex items-center gap-3">
          {state === "loading" ? (
            <>
              <Spinner /> Sending
            </>
          ) : (
            <>
              Start Your Project
              <span aria-hidden="true">→</span>
            </>
          )}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white via-parchment to-white opacity-30 transition-transform duration-700 group-hover:translate-x-full"
        />
      </motion.button>

      <AnimatePresence>
        {message ? (
          <motion.p
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className={`text-sm ${state === "success" ? "text-white" : "text-smoke"}`}
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", autoComplete, required }: FieldProps) {
  return (
    <div className="input-shell">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
    />
  );
}
