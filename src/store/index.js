import { createStore } from "vuex";
import news from './modules/news';

// Create store
export default new createStore({
  modules: {
    news
  }
})