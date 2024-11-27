import fs from "fs";
import path from "path";

type FileTreeNode = {
  name: string;
  type: "file" | "directory";
  path: string;
  children?: FileTreeNode[]; // Only directories will have children
};

export const getFileTree = (dir: string): FileTreeNode[] => {
  // Skip node_modules directory
  if (path.basename(dir) === "node_modules") {
    return [];
  }

  const items = fs.readdirSync(dir);

  // const fileTree: FileTreeNode[] = [];
  const directories: FileTreeNode[] = [];
  const files: FileTreeNode[] = [];

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      directories.push({
        name: item,
        type: "directory",
        path: fullPath,
        children: getFileTree(fullPath),
      });
    } else {
      files.push({ name: item, path: fullPath, type: "file" });
    }
  });

  // Sort directories and files alphabetically
  directories.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));

  // Combine directories and files with directories first
  return [...directories, ...files];

  // return fileTree;
};
