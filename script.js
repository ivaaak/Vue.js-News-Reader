const GUARDIAN_API_URL = `https://content.guardianapis.com/search?q=world&api-key=82e312b6-a7f5-4ac4-9121-9b7108bb1736`;
const NEWSAPI_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e90fdebf2c4747b6b5a407a19bf0ad6c`;
const NYTIMES_API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=VOanODDhGP7Dni2Uore8Qx1AVLAEYCwQ`;

new Vue({
  el: "#app",
  data: {
    items: [
      { id: 0, name: `The Guardian`, news: [] },
      { id: 1, name: `News API`, news: [] },
      { id: 2, name: `New York Times`, news: [] }
    ],
    getNews: [],
    active: 0
  },

  methods: {
    selectNews(i) {
      this.active = i;
      this.getNews = this.items[i].news;
    },

    formatDate(date) {
      const buildDate = new Date(date);

      return buildDate.toLocaleString("en-US", {
        weekday: "short",
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: '2-digit',
        minute:'2-digit',
      });
    }
  },

  created() {
    fetch(GUARDIAN_API_URL)
      .then((res) => res.json())
      .then((res) => {
        this.items[1].news = res.response.results;
      })
      .catch((err) => console.log(err));

    fetch(NEWSAPI_API_URL)
      .then((res) => res.json())
      .then((res) => {
        this.items[1].news = res.response.results;
      })
      .catch((err) => console.log(res.json));
    
      fetch(NYTIMES_API_URL)
      .then((res) => res.json())
      .then((res) => {
        this.items[0].news = res.results;
        this.getNews = this.items[0].news;
      })
      .catch((err) => console.log(err));
  }
});