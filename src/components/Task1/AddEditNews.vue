<template>
  <div class="card text-center mt-5">
      <div class="card-header"><span>{{newsId ? 'Edit' : 'Add'}} News</span></div>
        <div class="card-body">
          <div class="container">
              <div class="row text-white">
                  <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                      <div class="px-2">
                          <form class="justify-content-center" @submit.prevent="onSubmit">
                              <div class="form-group mb-2">
                                <input type="title" v-model="news.title" class="form-control" id="inputTitle" placeholder="Title">
                              </div>
                              <div class="form-group mb-2">
                                <textarea type="body" v-model="news.body" class="form-control" id="inputBody" placeholder="Body"></textarea>
                              </div>
                              <div class="form-group mb-2">
                                <input type="author" v-model="news.author" class="form-control" id="inputAuthor" placeholder="Author">
                              </div>
                              <button class="btn btn-primary btn-lg mt-3 add-edit-btn">{{newsId ? 'Edit' : 'Add'}} News</button>
                              <router-link to="/news" tag="button" class="btn btn-lg bg-danger mt-3 text-white">Cancel</router-link>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {
  name: 'AddEditNews',
  data() {
    return {
      news:{
        title:'',
        body:'',
        author:''
      },
      newsId:null
    }
  },
  computed: {
    ...mapGetters(['getNewsById'])
  },
  mounted() {
    if(this.newsId){
      this.news = this.getNewsById(this.newsId);
    }
  },
  methods: {
    ...mapActions(["addEditNews"]),
    onSubmit() {
      this.addEditNews(this.news);
      this.$router.push('/news');
    }
  },
  created(){
    this.newsId = this.$route.params.id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-edit-btn{
  margin-right: 10px;
}
</style>
