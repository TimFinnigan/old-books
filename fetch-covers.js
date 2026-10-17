// Downloads missing covers from Open Library into covers/. No API key needed.
// Usage: node fetch-covers.js [--force]
const fs = require("fs");
const path = require("path");

const root = __dirname;
const force = process.argv.includes("--force");

const BOOKS = new Function(`${fs.readFileSync(path.join(root, "books.js"), "utf8")}; return BOOKS;`)();

async function findCoverId(book) {
  const search = async (params) => {
    const url = new URL("https://openlibrary.org/search.json");
    for (const [k, v] of Object.entries({ fields: "title,author_name,first_publish_year,cover_i", limit: "10", ...params })) {
      url.searchParams.set(k, v);
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Open Library ${res.status} ${res.statusText}`);
    return (await res.json()).docs.find((d) => d.cover_i);
  };

  // Strict title and author first, then a looser free-text search on title and surname.
  const surname = book.author.split(" ").pop();
  return (await search({ title: book.title, author: book.author })) || (await search({ q: `${book.title} ${surname}` }));
}

(async () => {
  fs.mkdirSync(path.join(root, "covers"), { recursive: true });

  for (const book of BOOKS) {
    const file = path.join(root, book.cover);
    if (fs.existsSync(file) && !force) {
      console.log(`skip     ${book.title} (already have ${book.cover})`);
      continue;
    }

    const hit = book.coverId ? { cover_i: book.coverId, title: "(coverId)" } : await findCoverId(book);
    if (!hit) {
      console.log(`no match ${book.title} (${book.year})`);
      continue;
    }

    const img = await fetch(`https://covers.openlibrary.org/b/id/${hit.cover_i}-L.jpg`);
    if (!img.ok) throw new Error(`Image download failed for ${book.title}: ${img.status}`);
    fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    console.log(`saved    ${book.title} -> ${book.cover} (Open Library: ${hit.title}, ${hit.first_publish_year})`);
  }
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
