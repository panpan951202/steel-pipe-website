"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const productOptions = [
  { label: "Seamless Steel Pipe (SMLS)", value: "SMLS" },
  { label: "ERW Steel Pipe", value: "ERW" },
  { label: "LSAW Steel Pipe", value: "LSAW" },
  { label: "SSAW Steel Pipe", value: "SSAW" },
  { label: "Multiple Products / Other", value: "Other" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) errs.name = "Name is required (min 2 characters)";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email is required";
    if (!message || message.trim().length < 10) errs.message = "Message is required (min 10 characters)";

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your inquiry has been received. Our sales team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us an Inquiry</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Name *" name="name" placeholder="Your full name" error={errors.name} />
        <Input label="Email *" name="email" type="email" placeholder="your@email.com" error={errors.email} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Phone" name="phone" type="tel" placeholder="+Country Code - Number" />
        <Input label="Company" name="company" placeholder="Your company name" />
      </div>

      <Select label="Product Interest" name="product" options={productOptions} />

      <Textarea
        label="Message *"
        name="message"
        placeholder="Please describe your requirements including product type, size, quantity, and any special specifications..."
        error={errors.message}
      />

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          Failed to send your message. Please try again or email us directly.
        </div>
      )}

      <Button type="submit" variant="secondary" size="lg" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
