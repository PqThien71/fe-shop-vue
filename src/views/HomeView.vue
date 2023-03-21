<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to the PC shop
        </p>
        <p class="subtitle">
          The best PC store online
        </p>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>
      <div 
      class="colums is-3"
      v-for="product in latestProducts"
      v-bind:key="product.id"
      >
        <div class="box">
          <figure class="image mb-4">
            <img v-bind:src="product.get_thumbnail">
          </figure>
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">{{ product.price }} Tr </p>
          
          <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View detais</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: []
    }
  },
  mounted() {
    this.getLatestProducts()
    console.log(this.latestProducts.get_absolute_url)
  },
  methods: {
    getLatestProducts() {
      axios.get('/api/v1/latest-products/')
      .then(response => {
        this.latestProducts = response.data
        console.log(this.latestProducts)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>
