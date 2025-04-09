//rticleService.jsx 
// src/service/articleServices.js

const BASE_URL = "http://localhost:5000/articles"

export async function fetchArticles() {
  const res = await fetch(BASE_URL)
  return await res.json()
}

export async function createArticle(article) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  })
  return await res.json()
}

export async function updateArticle(id, article) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  })
  return await res.json()
}

export async function deleteArticle(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
}


