"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        // Refresh the page or redirect to update the list of todos
        router.refresh(); // or router.push('/todos') if you have a dedicated page
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-pink-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-cyan-600 font-bold text-white py-3 px-6 w-fit rounded-lg"
      >
        Add Todo
      </button>
    </form>
  );
}
