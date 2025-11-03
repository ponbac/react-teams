import React from "react";
import * as teamsJs from "@microsoft/teams-js";

export default function App() {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    (async () => {
      teamsJs.app.initialize().then(() => {
        teamsJs.app.getContext().then((context: teamsJs.app.Context) => {
          if (context?.app?.host?.name) {
            setContent(`Your app is running in ${context.app.host.name}!`);
          }
        });
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800 flex flex-col items-center justify-start pt-16 px-4 overflow-auto">
      <h1 className="text-5xl font-bold text-white mb-8">👋 Welcome</h1>

      {content && (
        <div className="bg-black/40 backdrop-blur-sm text-white px-6 py-4 rounded-lg mb-8 max-w-2xl w-full overflow-auto border border-white/20">
          <pre className="m-0">
            <code className="text-sm">{content}</code>
          </pre>
        </div>
      )}

      <p className="text-white text-lg text-center max-w-2xl">
        For more information, please refer to the{" "}
        <a
          href="https://microsoft.github.io/teams-ai"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-200 hover:text-blue-100 underline underline-offset-2 transition-colors"
        >
          Teams AI documentation
        </a>
        .
      </p>
    </div>
  );
}
