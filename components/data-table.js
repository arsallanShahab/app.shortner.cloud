import { QrCode } from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode.react";
import TimeAgo from "./time-ago";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

export function DataTable({ data, session, fetchData, setUserUrls, userUrls }) {
  const { toast } = useToast();
  const deleteUrl = async (id) => {
    try {
      const res = await fetch("/api/delete-url", {
        body: JSON.stringify({
          urlID: id,
          userID: session.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { ok, message } = await res.json();
      if (ok) {
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
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete url",
      });
    }
  };
  const handleCopy = (id) => () => {
    navigator.clipboard.writeText(`https://shtr.vercel.app/${id}`);
    toast({
      title: "Copied to clipboard",
      description: `https://shtr.vercel.app/${id} copied to clipboard`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleDownload = (nanoId) => {
    const canvas = document.getElementById(`${nanoId}`);
    console.log(canvas);
    const dataURL = canvas?.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `https://shtr.vercel.app/${nanoId}.png`;
    link.click();
    // delete the link just after the use so that it doesn't take up memory and resources when not needed
    link.remove();
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl sm:rounded-lg bg-secondary p-2.5 sm:p-5">
      {data.map((item, i) => (
        <div
          key={i}
          className="w-full flex flex-row items-center bg-secondary-light gap-5 flex-wrap p-5 rounded-xl"
        >
          <div className="flex flex-col items-start gap-3 sm:w-auto w-full">
            <div className="space-y-1 w-full">
              <Link
                target="_blank"
                href={`https://shtr.vercel.app/${item.nanoId}`}
                className="text-sm font-medium break-words max-w-md hover:underline"
              >
                {item.name !== "untitled"
                  ? `https://shtr.vercel.app/${item.nanoId} (${item.name})`
                  : `https://shtr.vercel.app/${item.nanoId}`}
              </Link>
              <p className="w-full text-sm opacity-50 max-w-md break-words">
                {item.url}
              </p>
            </div>
            <div className="flex items-center flex-wrap justify-start gap-2 rounded-3xl">
              <p className="px-3 pr-1  py-2 bg-primary rounded-2xl text-xs">
                <span className="font-semibold rounded-2xl text-secondary">
                  created:
                </span>{" "}
                <span className="font-semibold px-2 py-1 bg-[#ecf976] text-[#151802] rounded-2xl">
                  {/* {} */}
                  <TimeAgo timestamp={new Date(item.createdAt).getTime()} />
                </span>
              </p>
              <p className="px-3 pr-1  py-2 bg-primary rounded-2xl text-xs">
                {/* time and date */}
                <span className="font-semibold rounded-2xl text-secondary">
                  last clicked:
                </span>{" "}
                <span className="font-semibold px-2 py-1 bg-[#ecf976] text-[#151802] rounded-2xl">
                  {item.lastClickedAt ? (
                    <TimeAgo
                      timestamp={new Date(item.lastClickedAt).getTime()}
                    />
                  ) : (
                    "Never"
                  )}
                </span>
              </p>
              <p className="px-3 py-2 bg-[#ecf976] text-[#151802] font-semibold rounded-2xl text-xs">
                {item.isActive ? "Active" : "Inactive"}
              </p>
              <p className="px-3 py-2 bg-[#ecf976] text-[#151802] font-semibold rounded-2xl text-xs">
                {item.clicks} {item.clicks > 1 ? "clicks" : "click"}
              </p>
            </div>
          </div>

          <div className="sm:ml-auto justify-center w-full sm:w-auto flex gap-3">
            <Dialog>
              <DialogTrigger className="button button__primary ring-transparent">
                <QrCode className="inline-block w-5 h-5 mr-1 align-middle" />
              </DialogTrigger>
              <DialogContent className="bg-[#f9ffc5] w-auto shadow-none ring-[#151802] p-5 border-none ring-1 ring-opacity-25">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    <span className="font-semibold text-sm">
                      Scan the QR code to open the link
                    </span>{" "}
                  </DialogTitle>
                  <DialogDescription className="p-5 bg-[#ecf976] rounded-xl flex justify-center w-full h-full">
                    <QRCode
                      id={`${item.nanoId}`}
                      size={240}
                      bgColor="#ecf976"
                      fgColor="#151802"
                      includeMargin={true}
                      className="h-full w-auto"
                      value={`https://shtr.vercel.app/${item.nanoId}`}
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full">
                  <button
                    onClick={() => handleDownload(item.nanoId)}
                    className="w-full button button__primary ring-transparent"
                  >
                    Download
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <button
              onClick={handleCopy(item.nanoId)}
              className="button button__primary ring-transparent"
            >
              Copy
            </button>
            <button
              onClick={() => deleteUrl(item._id)}
              className="button button__primary ring-transparent"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
