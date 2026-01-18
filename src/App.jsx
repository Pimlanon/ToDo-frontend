import React from "react";
import Header from "@/layouts/Header";
import { useState } from "react";
import TodoIndex from "./views/todo/Index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      {/* This area scrolls horizontally */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <TodoIndex />
      </main>
    </div>
  );
}

export default App;
