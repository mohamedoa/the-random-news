class theRandomApi {
  constructor(apiKey) {
    this.baseUrl = "https://newsapi.org/v2";
    this.apiKey = apiKey;
  }

  async getTopHeadlines() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/top-headlines?sources=techcrunch&apikey=${this.apiKey}`
      );
      return response.data.articles;
    } catch (error) {
      console.error(`Error fetching Top Headlines: ${error}`);
    }
  }
}

const myApi = new theRandomApi("bd6901a3ccf04dd492d2a3ec13981860");
