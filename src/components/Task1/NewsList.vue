<template>
  <div class="container">
    <div class="panel" id="daily-feed">
      <div class="panel-heading">
        <h3 class="panel-title">Daily News</h3>
      </div>
      <div class="panel-body">
        <router-link to="/add-news" tag="button" class="btn btn-lg bg-success mb-3">Add News</router-link>
        <div class="d-flex align-items-center">
        <div class="input-group mb-3 w-75">
          <input type="search" v-model="options.filter" class="form-control rounded" placeholder="Search" aria-label="Search"
            aria-describedby="search-addon" />
            <button class="btn bg-transparent" @click="removeSearch()" style="margin-left: -40px; z-index: 100;" v-if="options.filter">
              <font-awesome-icon icon="times-circle" />
            </button>
          <button type="button" @click="searchNews()" class="btn btn-outline-primary">search</button>
        </div>
        <div class="grid-container d-inline-block sort-section mb-3 w-25">
          <div class="grid-x sort-news">
            <div class="large-3 medium-3 cell sortable-header" @click="sortingNewsBy('title')">
              Title
              <font-awesome-icon icon="sort-up" class="sort-icon" v-if="options.sortField == 'title' && options.sortDirection == 'ASC'"/>
              <font-awesome-icon icon="sort-down" class="sort-icon" v-if="options.sortField == 'title' && options.sortDirection == 'DESC'"/>
            </div>
            <div class="large-2 medium-2 cell sortable-header" @click="sortingNewsBy('body')">
              Body
              <font-awesome-icon icon="sort-up" v-if="options.sortField == 'body' && options.sortDirection == 'ASC'" />
              <font-awesome-icon icon="sort-down" v-if="options.sortField == 'body' && options.sortDirection == 'DESC'" />
            </div>
            <div class="large-2 medium-2 cell sortable-header" v-on:click="sortingNewsBy('author')">
              Author
              <font-awesome-icon icon="sort-up" v-if="options.sortField == 'author' && options.sortDirection == 'ASC'"/>
              <font-awesome-icon icon="sort-down" v-if="options.sortField == 'author' && options.sortDirection == 'DESC'"/>
            </div>
          </div>
        </div>
      </div>
        <ul class="list-group list-group-dividered list-group-full">
          <li  :key="news.id" v-for="news in allNews" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{news.title}}</h5>
              <router-link :to="{ name: 'edit', params: { id: news.id }}" tag="button" class="btn btn-sm btn-danger"><font-awesome-icon icon="pen-square" /></router-link>
            </div>
            <p class="mb-1 text-initial">{{news.body}}</p>
            <small>{{news.author}}</small>
          </li>
        </ul>
        <button type="button" v-if="!noMoreData"  @click="onLoadMore()" class="btn btn-block btn-primary waves-effect waves-light mt-3"><i class="icon md-chevron-down margin-right-5" aria-hidden="true"></i>Show
          More</button>
      </div>
    </div>   
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NewsList',
  data() {
    return {
      options: {
        sortField: 'title',
        sortDirection: 'ASC',
        page: 1, 
        filter:"",
        flag:""
      }
    }
  },
  methods:{
    ...mapActions(["fetchNews"]),
    onLoadMore(){
      this.options.page += 1;
      this.fetchNews(this.options);
    },
    searchNews(){
      this.options.page = 1;
      this.fetchNews(this.options);
    },
    removeSearch(){
      this.options.page=1;
      this.options.filter='';
      let options = {...this.options};
      options.flag = 'removeFilter';
      this.fetchNews(options);
    },
    sortingNewsBy(sortField){
      if(sortField == this.options.sortField ){
        this.options.sortDirection=this.options.sortDirection === 'ASC' ? 'DESC':'ASC'
      }
      if(sortField !== this.options.sortField){
        this.options.sortDirection = 'ASC';
        this.options.sortField = sortField;
      }
      let options = {...this.options};
      options.flag = 'sorting';
      this.fetchNews(options);
    }
  },
  computed: mapGetters(["allNews","noMoreData"]),
  created() {
    let options = {...this.options};
    options.flag = 'firstTimeLoad';
    this.fetchNews(options);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-initial{
  text-align: initial;
}
.sort-news{
  font-family: "Lato", sans-serif;
  font-weight: bold;
  padding-bottom: 10px;
}
.sort-icon{
  display: inline-block;
 }
div.sortable-header{
  cursor: pointer;
}
.sort-section{
  margin-left: 11px;
}
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>
