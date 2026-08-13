const PRODUCTS_URL = "https://fakestoreapi.com/products";
const BOOKS_URL = "https://openlibrary.org/search.json";
const FALLBACK_IMAGE = "https://placehold.co/120x180/png?text=Livro";

export async function getProducts() {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return response.json();
}

export async function getBooks(query = "programação") {
  const response = await fetch(
    `${BOOKS_URL}?q=${encodeURIComponent(query)}&limit=10`
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar os livros.");
  }

  const data = await response.json();

  return (data.docs || []).slice(0, 8).map((doc, index) => {
    const isbn = doc.isbn?.[0];
    const coverUrl = isbn
      ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      : FALLBACK_IMAGE;

    return {
      id: doc.key?.replace("/works/", "") || `${index}-${isbn || "book"}`,
      title: doc.title || "Sem título",
      author: doc.author_name?.join(", ") || "Autor desconhecido",
      price: (Math.random() * 60 + 20).toFixed(2),
      category: doc.subject?.slice(0, 2).join(", ") || "Literatura",
      description:
        doc.first_sentence?.[0] || "Descrição disponível em breve.",
      image: coverUrl,
    };
  });
}