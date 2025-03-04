import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigateTo, createFileOrFolder, deleteItem, renameItem } from "../helper/productSlice";

const FileExplorer = () => {
  const dispatch = useDispatch();
  const { fileSystem, currentPath } = useSelector((state) => state.fileSystem);

  // Navigate inside folders
  let currentDir = fileSystem;
  for (const dir of currentPath.slice(1)) {
    currentDir = currentDir.children.find((item) => item.name === dir);
  }

  // ✅ Create New File/Folder
  const handleCreate = (type) => {
    const name = prompt(`Enter new ${type} name:`);
    if (name) {
      dispatch(createFileOrFolder({ path: currentPath, name, type }));
    }
  };

  // ✅ Delete File/Folder
  const handleDelete = (name) => {
    dispatch(deleteItem({ path: currentPath, name }));
  };

  // ✅ Rename File/Folder
  const handleRename = (oldName) => {
    const newName = prompt("Enter new name:", oldName);
    if (newName && newName !== oldName) {
      dispatch(renameItem({ path: currentPath, oldName, newName }));
    }
  };

  return (
    <div>
      <h2>Current Directory: {currentPath.join(" / ")}</h2>

      {currentPath.length > 1 && (
        <button onClick={() => dispatch(navigateTo(currentPath.slice(0, -1)))}>Go Back</button>
      )}

      <button class="btn btn-secondar" onClick={() => handleCreate("folder")}>📁 Creact New Folder</button>
      <button class="btn btn-primary" onClick={() => handleCreate("file")}>📄 New File</button>

      <ul>
        {currentDir?.children.map((item) => (
          <li key={item.name}>
            {item.type === "folder" ? (
              <strong className="doc" onClick={() => dispatch(navigateTo([...currentPath, item.name]))}>📁 {item.name}</strong>
            ) : (
              <>📄 {item.name}</>
            )}
            <button onClick={() => handleRename(item.name)}>Rename</button>
            <button onClick={() => handleDelete(item.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
