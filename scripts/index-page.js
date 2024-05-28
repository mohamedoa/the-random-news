function displayTopHeadlines(stories) {
  const containerEl = document.querySelector(".news__container");
  console.log(stories);
  containerEl.replaceChildren();

  for (const story of stories) {
    const articleEl = document.createElement("article");
    articleEl.classList.add("news__article");

    const linkEl = document.createElement("a");
    linkEl.classList.add("news__link");
    linkEl.href = story.url;

    const divEl = document.createElement("div");
    divEl.classList.add("news__card");

    const picEl = document.createElement("img");
    picEl.classList.add("news__figure");
    picEl.src = story.urlToImage;
    divEl.appendChild(picEl);

    const headerEl = document.createElement("h2");
    headerEl.classList.add("news__title");
    headerEl.innerText = story.title;
    divEl.appendChild(headerEl);

    const paragraphEl = document.createElement("p");
    paragraphEl.classList.add("news__info");
    paragraphEl.innerText = story.description;
    divEl.appendChild(paragraphEl);

    linkEl.appendChild(divEl);

    articleEl.appendChild(linkEl);

    containerEl.appendChild(articleEl);
  }
}

const borderSearchEl = document.querySelector(".nav__input");
const formEl = document.querySelector(".nav__form");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target.query.value;

  if (query.length === 0) {
    borderSearchEl.classList.add("search__error");
    return;
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apikey=bd6901a3ccf04dd492d2a3ec13981860`
    );
    const articles = response.data.articles;
    const filteredResponse = articles.filter((element) => element !== null);
    displayTopHeadlines(filteredResponse);
  } catch (error) {
    console.error(`Error fetching Top Headlines: ${error}`);
  }

  borderSearchEl.classList.remove("search__error");
  event.target.reset();
});

const renderTopHeadlines = async () => {
  try {
    const data = await myApi.getTopHeadlines();
    displayTopHeadlines(data);
  } catch (error) {
    console.log(`Error fetching Top Headlines: ${error}`);
  }
};

renderTopHeadlines();
