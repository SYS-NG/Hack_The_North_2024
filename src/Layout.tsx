import { ReactNode } from "react";
import { GetStartedDialog } from "@/GetStarted/GetStartedDialog";
import { Button } from "@/components/ui/button"
import { QuestionSelector } from "@/Navbar/QuestionSelector"
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";

export function Layout({
  menu,
  setRestartCount,
  children,
}: {
  menu?: ReactNode;
  setRestartCount: (count: number) => void;
  children: ReactNode;
}) {
  const startInterview = useMutation(api.interview.startInterview);
  const handleStart = async () => {
    try {
      // Sending the code to backend
      const result = await startInterview();
      setRestartCount((prev) => prev + 1);
      console.log("Start Button Result:", result);
    } catch (error) {
      console.error("Error in Start Button:", error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex min-h-20 border-b bg-background/80 backdrop-blur">
        <nav className="container w-full justify-between flex flex-row items-center gap-6">
          <div className="flex items-center gap-6 md:gap-10">
            <h1 className="text-base font-semibold">Goose Guru</h1>
          </div>
          <div className="flex items-center gap-3">
            <QuestionSelector />
            <Button onClick={handleStart} className="bg-gray-500 text-white hover:bg-blue-600 w-[100px]">Start</Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 w-[100px]">Run</Button>
            <Button className="bg-green-500 text-white hover:bg-green-600 w-[100px]">Submit</Button>
            <GetStartedDialog>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  Help
                </button>
            </GetStartedDialog>
          </div>
          {menu}
        </nav>
      </header>
      <main className="flex grow flex-col overflow-hidden">{children}</main>
      {/* <footer className="border-t hidden sm:block">
        <div className="container py-4 text-sm leading-loose">
          Built with ❤️ by Andy and Steven.{" "}
          Powered by Convex and Cohere.{" "}
        </div>
      </footer> */}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="underline underline-offset-4 hover:no-underline"
      target="_blank"
    >
      {children}
    </a>
  );
}
