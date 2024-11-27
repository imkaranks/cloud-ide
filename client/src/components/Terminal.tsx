import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";

type TerminalExecResponse = { error: string; output: string };

type TerminalOutput = { type: "user" | "system"; text: string };

export default function Terminal() {
  const { socket } = useSocket();

  const inputRef = useRef<HTMLInputElement>(null);
  // const didRendered = useRef(false)

  const [command, setCommand] = useState("");
  const [outputs, setOutputs] = useState<TerminalOutput[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!socket) return;

    socket.emit("terminal:in", command);

    setCommand("");
    setOutputs((prevOutputs) => [
      ...prevOutputs,
      { type: "user", text: `$ ${command}` },
    ]);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("terminal:out", (response: TerminalExecResponse) => {
      const newOutput: TerminalOutput = {
        type: "system",
        text: response.output || response.error,
      };

      setOutputs((prevOutputs) => [...prevOutputs, newOutput]);
    });

    return () => {
      socket.off("terminal:out");
    };
  }, [socket]);

  return (
    <div className="terminal">
      <div className="output">
        {outputs.map((line, index) => (
          <div key={index} className={line.type}>
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="command-input">
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
      </form>
    </div>
  );
}
