import { CronJob } from "cron";

//cron job to run every 2 min
const jobTime = "*/2 * * * *";
let runtime = 0;

// Define your cron job logic
const cronJob = new CronJob(jobTime, () => {
  // This code will run every hour (including just after server start)
  const fetchServer = async () => {
    const res = await fetch("https://shtr.vercel.app/api/cron", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };
  fetchServer();
  runtime++;
  console.log(`Cron job run number ${runtime} completed`);
  // Perform your desired tasks here
});

// Start the cron job
cronJob.start();

// Export an empty handler since Next.js requires it
export default function handler(req, res) {
  res.status(200).json({ message: "Cron job started successfully" });
}
