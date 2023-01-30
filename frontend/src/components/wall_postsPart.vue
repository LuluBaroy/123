<template>
  <section class="flex flex-col m-auto">
    <!--NO POST-->
    <article v-if="posts.length === 0" class="flex flex-col items-center justify-between allPosts">
      <h3 class="pt-3">Aucun post pour le moment, Lancez-vous !</h3>
      <p>(si vous ne savez pas comment faire, vous pouvez consulter nos astuces dans la rubrique <router-link :to="{name: 'faq'}" class="p-2 text-lg hover:bg-blue-300 rounded-xl">FAQ</router-link> !)</p>
      <img src="../assets/img/hello.gif" alt="hello gif" class="imgPosts max-w-full max-h-48 mr-auto ml-auto rounded-xl mb-5">
    </article>
    <article>
      <!--ALL POSTS-->
      <div id="postPart" class="flex flex-col items-center mt-2 pb-2" v-for="(post, indexPost) in posts" :key="post.id">
        <posts :post="post" :index-post="indexPost" class="w-full sm:w-9/12 xl:w-6/12"></posts>
      </div>
    </article>
  </section>
</template>

<script>
import Posts from "@/components/posts.vue";
export default {
  name: 'postsPart',
  components: {Posts},
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
    posts() {
      return this.$store.state.posts.allPosts
    },
    comments() {
      return this.$store.state.posts.allComments
    }
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
  .formPart{
    border: 4px solid rgba(44, 63, 95, 0.66);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
    background-color: #f6f5f5;
  }
  .btn-comment{
    background-color: #2C3F5F !important;
  }
  .btn-comment:hover{
    background-color: rgba(44, 63, 95, 0.6) !important;
  }
  .userPhotoPosts{
    width: 50px;
    height: 50px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
    object-fit: cover;
    border-radius: 100%;
    border: 4px solid rgba(44, 63, 95, 0.66);
  }
  .postAuthor{
    border-bottom: 1px solid rgba(21, 20, 20, 0.13);
  }
  .imgPosts{
    max-width: 350px;
    max-height: 350px;
    object-fit: cover;
  }
  i span{
    margin-left: 5%;
    font-family: Poppins, sans-serif;
    font-weight: normal;
  }
  h1{
    font-size: 25px;
  }
  h3, h4{
    font-size: 20px;
  }
  label, input{
    margin-bottom: 5%;
  }

</style>
