"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const route = useRouter();

  const signInUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!form.email || !form.password) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    console.log(res);
    if (res.ok) {
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      route.push("/dashboard");
      setForm({
        email: "",
        password: "",
      });
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };
  return (
    <div className="w-full pl-14 pr-7">
      <form className="max-w-sm flex flex-col gap-2 bg-[#f9ffc5] p-3 rounded-xl">
        {/* <div className="input-group bg-[#f9ffc5] p-2 rounded-xl">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            id="email"
            placeholder="abc@gmail.com"
          />
        </div> */}
        <div className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
          <Label htmlFor="url" className="text-left px-2 pt-1">
            Email
          </Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            id="email"
            placeholder="abc@gmail.com"
            className="bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
          <Label htmlFor="url" className="text-left px-2 pt-1">
            Password
          </Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            id="password"
            placeholder="password"
            className="bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
          />
        </div>
        {/* <div className="input-group">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            id="password"
            placeholder="password"
          />
        </div> */}
        <div className="flex items-center justify-end space-x-2">
          <Link
            href={"/user/forgot-password"}
            className="text-xs my-2 font-semibold font-inter mr-2"
          >
            Forgot your password?
          </Link>
        </div>
        <button
          onClick={(e) => signInUser(e)}
          className="button mb-2 w-full text-center bg-[#f4ff8f]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin inline-block" />
          ) : (
            "Signin"
          )}
        </button>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="text-sm font-inter px-5 py-3 rounded-lg duration-150 text-[#ecf976] bg-[#151802] hover:bg-[#e6f560] hover:text-[#151802] font-semibold w-full"
          >
            Signin with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="text-sm font-inter px-5 py-3 rounded-lg duration-150 text-[#ecf976] bg-[#151802] hover:bg-[#e6f560] hover:text-[#151802] font-semibold w-full"
          >
            Signin with Github
          </button>
        </div>

        <div className="flex items-center justify-end my-3 mr-2 space-x-1">
          <p className="text-xs font-inter">Don&apos;t have an account?</p>
          <Link
            href={"/user/signup"}
            className="font-inter text-xs font-semibold"
          >
            Signup
          </Link>
        </div>
        {
          error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          ) // eslint-disable-line
        }
      </form>
    </div>
  );
};

export default Login;
