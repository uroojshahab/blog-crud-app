🔁Backend Integration
Created RESTful API using Express.js:

Built endpoints:

GET /articles – fetches all articles

POST /articles – creates a new article

PUT /articles/:id – updates an existing article

DELETE /articles/:id – deletes an article

Connected to MongoDB to store articles persistently.

⚛️ Frontend Changes (React)
Replaced Static Data with Fetch Requests:

Used useEffect() to load all articles from the backend using GET /articles.

Added Article Creation Logic:

Implemented addArticle() function to handle the form submission and call POST /articles.

Enabled Article Updates:

Added updateArticle() function to update article content using PUT /articles/:id.

Enabled Article Deletion:

Added deleteArticle() function to remove articles via DELETE /articles/:id.

Controlled View Switching:

Used state like writing and editingArticle to toggle between article form and detail view.

✅ Result
The final app allows users to:

View all blog posts

Create new articles

Edit existing ones

Delete articles


