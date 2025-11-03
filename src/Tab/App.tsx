import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import * as teamsJs from "@microsoft/teams-js";
import data from "@/app/dashboard/data.json";

export default function App() {
  const [content, setContent] = React.useState("");
  const [userName, setUserName] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      teamsJs.app.initialize().then(() => {
        teamsJs.app.getContext().then((context: teamsJs.app.Context) => {
          if (context?.app?.host?.name) {
            setContent(`Your app is running in ${context.app.host.name}!`);
          }
          console.log(context);
          const name =
            context.user?.userPrincipalName ??
            (context.user as { userPrincipalName?: string })
              ?.userPrincipalName ??
            // fallback to id if nothing else is available
            context.user?.id;
          if (name) {
            setUserName(name);
          }
        });
      });
    })();
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {(content || userName) && (
                <div className="px-4 lg:px-6">
                  {content && (
                    <p className="text-sm text-muted-foreground">{content}</p>
                  )}
                  {userName && (
                    <p className="text-sm text-muted-foreground">
                      Signed in as{" "}
                      <span className="font-medium">{userName}</span>
                    </p>
                  )}
                </div>
              )}
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
