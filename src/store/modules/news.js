const state = {
  news: [{
    "id":1,
    "title":"check new blog.",
    "body":"Aspernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores aequo tollit.",
    "author":"Terrance Arnold" 
  },
  {
    "id":2,
    "title":"new blog 1.",
    "body":"bspernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores aequo tollit.",
    "author":"Edward Fletcher" 
  },
  {
    "id":3,
    "title":"old blog 2.",
    "body":"cspernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores aequo tollit.",
    "author":"Justin Martin" 
  },
  {
    "id":4,
    "title":"previous new blog 3.",
    "body":"dspernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores aequo tollit.",
    "author":"Terrance Arnold." 
  },
  {
    "id":5,
    "title":"Latest new blog 4.",
    "body":"espernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores aequo tollit.",
    "author":"Heather Harper" 
  }
],
backupNews:[],
noMoreDataAvailable:false
};

const getters = {
  allNews: (state) => {
    return state.news
  },
  getNewsById: state => id => {
    return state.news.find(t => t.id == id)
  },
  noMoreData:(state)=>{
    return state.noMoreDataAvailable
  }
};

const actions = {
  async fetchNews(context,data) {
    context.commit('setNews',data)
  },
  async addEditNews(context,data){
    context.commit('addEditNews',data)
  }
}

const mutations = {
    setNews: (state, data) => {
        switch(data.flag)
        {
          case 'firstTimeLoad':
            state.backupNews = state.news;
            break;
          case 'removeFilter':
            state.news = state.backupNews;
            break;
        }
        const perPageData = 2;
        const indexOfLastNews = data.page * perPageData;
        const indexOfFirstNews = indexOfLastNews - perPageData;
        let filterData = state.backupNews;
        if(data.filter != ''){
          filterData = state.backupNews.filter(news => news.title.toLowerCase().includes(data.filter.toLowerCase()));
        }
        filterData.sort( ( a, b )=>{
          if( data.sortDirection == 'ASC' ){
            return ( ( a[data.sortField] == b[data.sortField] ) ? 0 : ( ( a[data.sortField] > b[data.sortField] ) ? 1 : -1 ) );
          }
          if( data.sortDirection == 'DESC' ){
            return ( ( a[data.sortField] == b[data.sortField]) ? 0 : ( ( a[data.sortField] < b[data.sortField]) ? 1 : -1 ) );
          }
        });
        let latestNews = filterData.slice(indexOfFirstNews, indexOfLastNews);
        
        if(data.page == 1){
         state.news = [...latestNews];
        }else if(data.flag == 'sorting'){
          state.news = filterData.slice(0,state.news.length);
        }else{
          state.news = [...state.news, ...latestNews];
        }
        state.news.length ==  filterData.length ? state.noMoreDataAvailable = true : state.noMoreDataAvailable = false;
      },
    addEditNews:(state,newNews) =>{
      state.news = state.backupNews;
      if(newNews.id){   
        state.news = state.news.map(item => {
          if (item.id == newNews.id) {
            item = newNews;
          }
          return item;
        });
      }else{
        newNews.id = state.news.length + 1;
        state.news = [newNews,...state.news]
      }
    } 
};


export default {
    state,
    getters,
    actions,
    mutations
};