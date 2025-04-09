//app .jsx 
import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import "./App.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)


  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then(res => res.json())
      .then(setArticles)
  }, [])


  function addArticle({ title, body }) {
    fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    })
      .then(res => res.json())
      .then(newArticle => {
        setArticles([newArticle, ...articles])
        setWriting(false)
      })
  }

 
  function updateArticle(id, { title, body }) {
    fetch(`http://localhost:5000/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    })
      .then(res => res.json())
      .then(updated => {
        setArticles(articles.map(a => (a._id === id ? updated : a)))
        setEditingArticle(null)
        setArticle(updated)
      })
  }

  
  function deleteArticle(id) {
    fetch(`http://localhost:5000/articles/${id}`, { method: "DELETE" })
      .then(() => {
        setArticles(articles.filter(a => a._id !== id))
        setArticle(null)
      })
  }

  return (
    <div className="App">
      <header>
        Blog{" "}
        <button onClick={() => {
          setEditingArticle(null)
          setWriting(true)
        }}>
          New Article
        </button>
      </header>

      <Nav articles={articles} setArticle={setArticle} />

      {writing ? (
        <ArticleEntry
          addArticle={addArticle}
          updateArticle={updateArticle}
          editingArticle={editingArticle}
        />
      ) : article ? (
        <Article
          article={article}
          onEdit={() => {
            setEditingArticle(article)
            setWriting(true)
          }}
          onDelete={() => deleteArticle(article._id)}
        />
      ) : null}
    </div>
  )
}
