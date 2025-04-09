 //ArticleEntry.jsx
 import { useState, useEffect } from "react"

 export default function ArticleEntry({ addArticle, updateArticle, editingArticle }) {
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
 
   useEffect(() => {
     if (editingArticle) {
       setTitle(editingArticle.title)
       setBody(editingArticle.body)
     }
   }, [editingArticle])
 
   function submit(e) {
     e.preventDefault()
     if (!title.trim() || !body.trim()) return
 
     if (editingArticle) {
       updateArticle(editingArticle._id, { title, body })
     } else {
       addArticle({ title, body })
     }
 
     setTitle("")
     setBody("")
   }
 
   return (
     <form onSubmit={submit}>
       <input
         placeholder="Title"
         value={title}
         onChange={e => setTitle(e.target.value)}
       />
       <textarea
         placeholder="Body"
         rows="8"
         value={body}
         onChange={e => setBody(e.target.value)}
       ></textarea>
       <button type="submit">{editingArticle ? "Update" : "Create"}</button>
     </form>
   )
 }
 