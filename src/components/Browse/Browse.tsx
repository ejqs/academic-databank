"use client";
import { useState, useEffect } from "react";

interface Paper {
  _id: string;
  title: string;
  authors: string[];
  abstract: string;
  tags: string[];
  department: string;
  date: string;
  meta: {
    upvotes: number;
    favorite: number;
  };
  hiddenByAdmin: boolean;
  hiddenByUserUntil?: number;
}

const PapersList = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch("/api/papers", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setPapers(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (loading) return <p>Loading papers...</p>;
  if (error) return <p>Error loading papers: {error}</p>;

  return (
    <div>
      <h1>All Papers</h1>
      {papers.length === 0 ? (
        <p>No papers found.</p>
      ) : (
        <ul>
          {papers.map((paper) => (
            <li key={paper._id} style={{ marginBottom: "20px" }}>
              <h2>{paper.title}</h2>
              <p>
                <strong>Authors:</strong> {paper.authors.join(", ")}
              </p>
              <p>
                <strong>Abstract:</strong> {paper.abstract}
              </p>
              <p>
                <strong>Tags:</strong> {paper.tags.join(", ")}
              </p>
              <p>
                <strong>Department:</strong> {paper.department}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(paper.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Upvotes:</strong> {paper.meta.upvotes}
              </p>
              <p>
                <strong>Favorites:</strong> {paper.meta.favorite}
              </p>
              {paper.hiddenByAdmin && (
                <p style={{ color: "red" }}>
                  This paper is hidden by the admin.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PapersList;
