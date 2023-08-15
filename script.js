<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Libros Clásicos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #search-form {
            text-align: center;
            margin: 20px;
        }
        #results {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        .book-card {
            border: 1px solid #ccc;
            margin: 10px;
            padding: 10px;
            max-width: 300px;
        }
        .book-title {
            font-size: 1.2em;
            margin-bottom: 5px;
        }
        .book-author {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 10px;
        }
        .book-link {
            display: block;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Consulta de Libros Clásicos</h1>
    <div id="search-form">
        <label for="search">Buscar Libro Clásico:</label>
        <input type="text" id="search" placeholder="Título del libro">
        <button onclick="searchClassicBooks()">Buscar</button>
    </div>
    <div id="results"></div>

    <script>
        function searchClassicBooks() {
            const searchTerm = document.getElementById("search").value;
            const apiUrl = `https://openlibrary.org/search.json?q=${searchTerm}&subject=classics`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => displayClassicBooks(data.docs))
                .catch(error => console.error("Error al obtener los datos:", error));
        }

        function displayClassicBooks(books) {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = "";

            books.forEach(book => {
                const title = book.title;
                const author = book.author_name
                    ? book.author_name.join(", ")
                    : "Autor desconocido";

                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");

                const titleElement = document.createElement("h2");
                titleElement.classList.add("book-title");
                titleElement.textContent = title;

                const authorElement = document.createElement("p");
                authorElement.classList.add("book-author");
                authorElement.textContent = author;

                const readOnlineLink = `https://openlibrary.org${book.key}`;
                const readOnlineAnchor = document.createElement("a");
                readOnlineAnchor.classList.add("book-link");
                readOnlineAnchor.href = readOnlineLink;
                readOnlineAnchor.textContent = "Leer en Línea";

                bookCard.appendChild(titleElement);
                bookCard.appendChild(authorElement);
                bookCard.appendChild(readOnlineAnchor);

                resultsContainer.appendChild(bookCard);
            });
        }
    </script>
</body>
</html>
