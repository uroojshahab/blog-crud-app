//Article.jsx
export default function Article({ article, onEdit, onDelete }) {
    if (!article) return <div>Select an article</div>
  
    return (
      <div>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    )
  }