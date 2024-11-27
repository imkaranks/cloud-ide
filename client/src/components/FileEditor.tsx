import React, { useEffect, useState } from "react";

type Props = {
  initialContent: string;
  selectedFilePath: string | undefined;
};

const getLines = (text: string) => {
  return text.split("\n");
};

export default function FileEditor({
  initialContent,
  selectedFilePath,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [didEdit, setDidEdit] = useState(false);

  // TODO: instead of sending whole content just send the diff
  // this will help in multiple people collaborating and send
  // less data overall instead of sending whole file

  useEffect(() => {
    const handleSaveFile = async () => {
      if (!selectedFilePath?.trim() || !didEdit) return;

      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: encodeURIComponent(selectedFilePath),
          content,
        }),
      })
        .then((raw) => raw.json())
        .then((res) => {
          if (!res.success) throw new Error("Failed to save the file");
          console.log("saved");
          setDidEdit(false);
        })
        .catch(console.error);
    };

    const timer = setTimeout(() => {
      handleSaveFile();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [didEdit, content, selectedFilePath]);

  return (
    <div className="file-editor-container">
      <h2 className="file-editor-title panel-title">File Editor</h2>
      <div className="file-editor-wrapper">
        <div className="file-editor-line-numbers">
          {getLines(content).map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>

        <textarea
          className="file-editor-textarea"
          value={content}
          onChange={(e) => {
            if (!didEdit) {
              setDidEdit(true);
            }
            setContent(e.target.value);
          }}
          spellCheck="false"
        />
      </div>
    </div>
  );
}
