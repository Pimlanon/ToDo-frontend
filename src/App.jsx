import React from "react";
import Header from "@/layouts/Header";
import { useState } from "react";
import TodoIndex from "./views/todo/Index";
import Layout from "./layouts/Layout";

function App() {

  return (
  <>
     <Layout>
      <TodoIndex />
    </Layout>
  </>
  );
}

export default App;
