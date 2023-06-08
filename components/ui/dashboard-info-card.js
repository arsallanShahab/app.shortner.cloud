import { Loader2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

const DashboardInfo = ({ heading, value = 0, stats = 0, icon, loading }) => {
  if (loading) {
    return (
      <div className="sm:rounded-lg bg-secondary-lighter ring-secondary hover:ring-secondary ring-offset-0 hover:ring-offset-2 ring-0 hover:ring-2 duration-150">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{heading}</h3>
          {icon}
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge("button__primary duration-150 rounded-xl")}>
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{heading}</h3>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{stats}</p>
      </div>
    </div>
  );
};

export default DashboardInfo;
