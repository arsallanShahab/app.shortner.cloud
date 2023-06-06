// pages/dashboard.js
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DataTable } from "@/components/data-table";
import DashboardInfo from "@/components/ui/dashboard-info-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { isValidURL } from "@/lib/utils";
import {
  ActivityIcon,
  Link,
  Loader2,
  MousePointer2,
  PlusCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function Dashboard() {
  const { data: session, status } = useSession();
  const [userUrls, setUserUrls] = useState({
    urls: [],
    totalURLs: 0,
    totalClicks: 0,
    activeLinks: 0,
    loading: true,
  });
  const [url, setUrl] = useState({
    url: "",
    name: "",
    loading: false,
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const [disableds, setDisableds] = useState({
    name: true,
    email: true,
    password: true,
  });

  const fetchData = async (session) => {
    try {
      const res = await fetch("/api/user-stats", {
        body: JSON.stringify({
          userId: session.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { ok, urls, totalURLs, totalClicks, activeLinks, message } =
        await res.json();
      if (!ok) {
        toast({
          title: message,
        });
        setUserUrls({
          urls: [],
          totalURLs: 0,
          totalClicks: 0,
          activeLinks: 0,
          loading: false,
        });
        return;
      }
      console.log(urls);
      setUserUrls({
        urls,
        totalURLs,
        totalClicks,
        activeLinks,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch user statistics",
      });
    }
  };

  useEffect(() => {
    if (session) {
      fetchData(session);
    }
  }, [session]);

  if (status === "loading") {
    // Handle loading state
    return <Loader />;
  }

  if (!session || status === "unauthenticated") {
    // User is not authenticated, redirect to login page
    // You can customize this behavior based on your requirements
    return (
      <div className="flex items-center flex-col gap-3 justify-center py-12 ">
        <span className="ml-2">You are not authenticated</span>
        <NextLink href="/user/login" className="button button__primary">
          {" "}
          Login{" "}
        </NextLink>
      </div>
    );
  }

  const saveUrl = async (e) => {
    // prevent default form submit
    e.preventDefault();

    //check if url is empty
    if (url.url === "") {
      toast({
        title: "Error",
        description: "Please enter a url",
      });
      return;
    }

    // valide the url
    if (!isValidURL(url.url)) {
      console.log("invalid url");
      toast({
        title: "Invalid url",
        description: "Please enter a valid url",
      });
      return;
    }

    // save the url to the database and show a toast
    setUrl({ ...url, loading: true });
    const res = await fetch("/api/save-url", {
      body: JSON.stringify({
        url: url.url,
        userId: session.user.id,
        name: url.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const { ok, message } = await res.json();
    setUrl({ ...url, loading: false });
    if (ok) {
      setUrl({ ...url, url: "", name: "" });
      fetchData(session);
      setUserUrls({ ...userUrls, loading: true });
      toast({
        title: "Success",
        description: message,
      });
    } else {
      toast({
        title: "Error",
        description: message,
      });
      return;
    }
  };

  // User is authenticated, access session properties
  const { user } = session;
  const { id, name } = user;

  const updateProfile = async (e) => {
    console.log(id);
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        name: form.name,
        email: form.email,
      }),
    });
    const { ok, message } = await res.json();
    toast({
      title: ok ? "Success" : "Error",
      description: message,
    });
  };

  return (
    <div className="px-10 py-5">
      <h1 className="mb-5 text-3xl font-bold">Dashboard</h1>
      <div>
        <Tabs defaultValue="overview">
          <div className="flex justify-between">
            <TabsList className="grid grid-cols-2 w-[400px] mb-2.5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
              <TabsTrigger value="settings">settings</TabsTrigger>
            </TabsList>

            <Dialog>
              <DialogTrigger>
                <span className="button button__primary">
                  <PlusCircle className="w-4 h-4 mr-0.5 align-middle inline-block" />{" "}
                  Create Link
                </span>
              </DialogTrigger>
              <DialogContent className="bg-[#f9ffc5] shadow-none ring-[#151802] p-5 dark:bg-secondary border-none ring-1 ring-opacity-25">
                <DialogHeader>
                  <DialogTitle>Enter the url</DialogTitle>
                  <DialogDescription className="text-muted">
                    Enter the url you want to shorten below.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
                    <Label htmlFor="url" className="text-left px-2 pt-1">
                      Enter URL
                    </Label>
                    <Input
                      id="url"
                      value={url.url}
                      onChange={(e) => setUrl({ ...url, url: e.target.value })}
                      placeholder={`https://example.com`}
                      className="col-span-3 bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl">
                    <Label htmlFor="name" className="text-left px-2 pt-1">
                      Enter Custom Name (Optional)
                    </Label>
                    <Input
                      id="name"
                      value={url.name}
                      onChange={(e) => setUrl({ ...url, name: e.target.value })}
                      placeholder={`example`}
                      className="col-span-3 bg-[#ecf976] placeholder:text-[#151802] text-[#151802] hover:opacity-95 duration-150 focus:bg-[#ecf976]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={saveUrl}
                      className="button button__primary"
                    >
                      {url.loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="overview">
            <Card className="border-none shadow-none bg-secondary-light p-5">
              <div className="grid grid-cols-4 gap-4 items-center mb-4">
                <DashboardInfo
                  heading="Total Links"
                  value={userUrls.totalURLs}
                  loading={userUrls.loading}
                  stats={`${userUrls.totalURLs} links created`}
                  icon={<Link className="w-4 h-4" />}
                />

                <DashboardInfo
                  heading="Total Clicks"
                  value={userUrls.totalClicks}
                  loading={userUrls.loading}
                  stats={`${userUrls.totalClicks} clicks`}
                  icon={<MousePointer2 className="w-4 h-4" />}
                />
                <DashboardInfo
                  heading="Active Links"
                  value={userUrls.activeLinks}
                  loading={userUrls.loading}
                  stats={`${userUrls.activeLinks} active links`}
                  icon={<ActivityIcon className="w-4 h-4" />}
                />
              </div>
              <DataTable
                data={userUrls.urls}
                session={session}
                fetchData={fetchData}
                setUserUrls={setUserUrls}
                userUrls={userUrls}
              />
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="border-none shadow-none bg-secondary-light">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="border-none shadow-none bg-secondary-light">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Personal details and application settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex-row gap-2 bg-[#f4ff8f] p-3 rounded-xl flex items-center justify-between px-2">
                    <Label htmlFor="name" className="w-full ml-4">
                      Name
                    </Label>
                    <Input
                      className="input__primary"
                      placeholder="Enter your name"
                      id="name"
                      defaultValue={user.name}
                      disabled
                    />
                    <Button disabled variant="text">
                      Edit
                    </Button>
                    <Button name="name" variant="text" disabled>
                      Save
                    </Button>
                    <Button variant="text" disabled>
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex-row gap-2 bg-[#f4ff8f] p-3 rounded-xl flex items-center justify-between px-2">
                    <Label htmlFor="name" className="w-full ml-4">
                      Email Address
                    </Label>
                    <Input
                      className="input__primary"
                      id="name"
                      defaultValue={user.email}
                      disabled
                    />
                    <Button disabled variant="text">
                      Edit
                    </Button>
                    <Button name="email" disabled variant="text">
                      Save
                    </Button>
                    <Button variant="text" disabled>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
