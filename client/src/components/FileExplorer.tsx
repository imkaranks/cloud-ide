import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

type FileTreeNode = {
  name: string;
  type: "file" | "directory";
  path: string;
  children?: FileTreeNode[];
};

type FileTreeProps = {
  nodes: FileTreeNode[];
  depth: number;
  setSelectedFilePath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const FileTree: React.FC<FileTreeProps> = ({
  nodes,
  depth,
  setSelectedFilePath,
}) => {
  return (
    <ul className="file-tree">
      {nodes.map((node, index) => (
        <li
          key={index}
          className={`file-tree-item ${node.type}`}
          style={{ paddingLeft: `${depth * 5}px` }}
        >
          <span
            onClick={(e) => {
              e.stopPropagation();

              if (node.type === "directory") return;

              // console.log(node.path);
              setSelectedFilePath(node.path);
            }}
          >
            {node.name}
          </span>
          {node.type === "directory" && node.children && (
            <FileTree
              nodes={node.children}
              depth={depth + 1}
              setSelectedFilePath={setSelectedFilePath}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type Props = {
  setSelectedFilePath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function FileExplorer({ setSelectedFilePath }: Props) {
  const { socket } = useSocket();

  const [fileTree, setFileTree] = useState<FileTreeNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!socket) return;

    const fetchFiles = async () => {
      try {
        const response = await (
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/`)
        ).json();

        setFileTree(response.data);
      } catch {
        setError("Error fetching file tree");
      } finally {
        setLoading(false);
      }
    };

    socket.on("files:changed", fetchFiles);

    fetchFiles();

    return () => {
      socket.off("files:changed");
    };
  }, [socket]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="file-tree-viewer">
      <h1 className="panel-title">File Explorer</h1>
      <FileTree
        nodes={fileTree}
        depth={0}
        setSelectedFilePath={setSelectedFilePath}
      />
    </div>
  );
}
