const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const dialog = document.getElementById("details");
const detailsBody = document.getElementById("details-body");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function coverEl(book) {
  const img = el("img", "cover");
  img.src = book.cover;
  img.alt = `${book.title} cover`;
  img.loading = "lazy";
  return img;
}

function cardEl(book) {
  const card = el("button", "card");

  const frame = el("div", "cover-frame");
  frame.append(coverEl(book));

  const caption = el("div", "caption");
  caption.append(el("div", "t", book.title), el("div", "y", book.year));

  card.append(frame, caption);
  card.addEventListener("click", () => showDetails(book));
  return card;
}

function showDetails(book) {
  const info = el("div", "info");
  info.append(
    el("h2", "", book.title),
    el("div", "year", book.year),
    el("div", "author", "Written by"),
    el("div", "author-name", book.author),
    el("p", "", book.blurb)
  );

  const wrap = el("div", "detail");
  wrap.append(coverEl(book), info);
  detailsBody.replaceChildren(wrap);
  dialog.showModal();
}

// Oldest first, then alphabetical within a year
const SORTED = [...BOOKS].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));

function render() {
  const q = search.value.trim().toLowerCase();
  const matches = SORTED.filter((b) =>
    [b.title, b.year, b.author].join(" ").toLowerCase().includes(q)
  );
  grid.replaceChildren(...matches.map(cardEl));
  empty.hidden = matches.length > 0;
}

search.addEventListener("input", render);
document.getElementById("close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

render();
