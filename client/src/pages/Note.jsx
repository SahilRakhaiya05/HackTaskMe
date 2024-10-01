import React, { useEffect, useState } from 'react';
import Title from "../components/Title"; // Import the Title component

const Note = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Start with 10 articles
  const MAX_VISIBLE_COUNT = 100; // Max articles to show

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/hackathon');
      const data = await response.json();
      setArticles(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch articles on mount
  }, []);

  const loadMoreArticles = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 10, MAX_VISIBLE_COUNT)); // Load 10 more articles, max 100
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="note-container">
      <Title title="Hackathon Articles" /> {/* Use the Title component */}
      <div className="article-list">
        {articles.slice(0, visibleCount).map((article) => (
          <div className="article-card" key={article.guid}>
            <div className="article-header">
              <h3>{article.title}</h3>
              <p>by {article.author}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        ))}
      </div>
      {visibleCount < Math.min(articles.length, MAX_VISIBLE_COUNT) && (
        <button className="load-more" onClick={loadMoreArticles}>
          Load More Articles
        </button>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        body {
          font-family: 'Roboto', sans-serif; /* Set the font for the entire application */
        }
      `}</style>

      <style jsx>{`
        .note-container {
          padding: 20px;
          max-width: 10000px; /* Adjusted max-width */
          margin: auto;
          min-height: 100vh; /* Ensures a minimum height */
        }
        .article-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .article-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          background: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .article-card:hover {
          transform: translateY(-5px);
        }
        .article-header {
          margin-bottom: 15px;
        }
        .article-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700; /* Bold for titles */
        }
        .article-header p {
          color: #888;
          font-size: 0.9rem;
          margin: 5px 0 10px;
          font-weight: 400; /* Regular for authors */
        }
        .loading, .error {
          text-align: center;
          margin-top: 20px;
        }
        
        .load-more {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          border: none;
          background-color: #0070f3;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
        }
        .load-more:hover {
          background-color: #005bb5;
        }

        /* Responsive styling */
        @media (min-width: 768px) {
          .article-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .article-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Note;
