import { useEffect, useState } from "react";
import FileExplorer from "./components/FileExplorer";
import FileEditor from "./components/FileEditor";
import Terminal from "./components/Terminal";
import "./App.css";

export default function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<
    string | undefined
  >();
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFilePath) return;

    const getFileContent = async () => {
      setLoading(true);

      try {
        const response = await (
          await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/v1/file/${encodeURIComponent(selectedFilePath)}`
          )
        ).json();

        setFileContent(response.data);
      } catch {
        console.log("Error fetching file tree");
      } finally {
        setLoading(false);
      }
    };

    getFileContent();
  }, [selectedFilePath]);

  return (
    <div className="editor-container">
      <FileExplorer setSelectedFilePath={setSelectedFilePath} />
      {!loading && (
        <FileEditor
          initialContent={fileContent}
          selectedFilePath={selectedFilePath}
        />
      )}
      <Terminal />
    </div>
  );
}
