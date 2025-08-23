import { useEffect, useState } from "react";

export default function DiscussionBoard({ workId }) {
  const storageKey = `comments:${workId}`;
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    setItems(raw ? JSON.parse(raw) : []);
  }, [storageKey]);

  function addComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const next = [
      ...items,
      { id: Date.now(), name: name.trim() || "Anon", text: text.trim() },
    ];
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setText("");
  }

  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-3">Wealth Circle: Discuss this book</h3>
      <form onSubmit={addComment} className="flex flex-col gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="border rounded px-3 py-2"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment…"
          className="border rounded px-3 py-2 min-h-[90px]"
        />
        <button
          type="submit"
          className="self-start bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Post Comment
        </button>
      </form>

      <ul className="space-y-3">
        {items.length === 0 && (
          <li className="text-sm text-neutral-500">No comments yet.</li>
        )}
        {items.map((c) => (
          <li key={c.id} className="bg-neutral-50 border rounded-lg p-3">
            <p className="text-sm">
              <span className="font-medium">{c.name}:</span> {c.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}