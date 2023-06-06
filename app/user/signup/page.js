"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const passwordRef = React.useRef(null);

  const { toast } = useToast();

  const saveToDb = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error, message } = await res.json();
    if (error) {
      setError(error);
      setLoading(false);
      toast({
        title: "Error",
        description: error,
      });
      return;
    }
    toast({
      title: "Success",
      description: message,
    });
    setError(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    });
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (true) {
      case !form.firstName:
        setError("First name is required");
        break;
      case !form.email:
        setError("Email is required");
        break;
      case !form.password:
        setError("Password is required");
        break;
      case !form.terms:
        setError("Terms is required");
        break;
      default:
        setError(null);
        break;
    }
    if (error) return;
    saveToDb();
  };
  const handlePasswordVisibility = () => {
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };

  return (
    <div className="pl-14 pr-7">
      <form
        className="max-w-sm flex flex-col gap-2 bg-[#f9ffc5] p-3 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row flex-wrap gap-2 w-full">
          <div className="flex flex-col flex-1 justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
              id="firstName"
              placeholder="john"
            />
          </div>
          <div className="flex flex-col flex-1 justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
              id="lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
            id="email"
            placeholder="abc@gmail.com"
          />
        </div>
        <div className="flex flex-col relative justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
          <Label htmlFor="password">Password</Label>
          <Input
            ref={passwordRef}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="relative appearance-none bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
            id="password"
            placeholder="password"
          />
          <EyeIcon
            onClick={handlePasswordVisibility}
            className="z-20 absolute right-7 top-11 w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-start space-x-2">
          <Checkbox
            id="terms"
            className="ml-2 w-3.5 h-3.5"
            checked={form.terms}
          />
          <label
            htmlFor="terms"
            className="text-xs my-2 font-semibold font-inter ml-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            onClick={(e) =>
              setForm({
                ...form,
                terms: !form.terms,
              })
            }
          >
            Accept terms and conditions
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="text-sm font-inter px-5 py-3 rounded-lg duration-150 text-[#ecf976] bg-[#151802] hover:bg-[#e6f560] hover:text-[#151802] font-semibold w-full"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </div>
        <div className="flex items-center justify-end my-3 mr-2 space-x-1">
          <p className="text-xs font-inter">Already have an account?</p>
          <Link
            href={"/user/login"}
            className="font-inter text-xs font-semibold"
          >
            Login
          </Link>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Page;
