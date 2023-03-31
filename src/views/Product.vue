<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>

                <h1 class="title">{{ product.name }}</h1>

                <p>{{ product.description }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Information</h2>

                <p><strong>Price: </strong>{{ product.price }} Tr</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <a class="button is-dark" @click="addToCart()">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
export default{
    name: 'Product',
    data(){
        return{
            product: {},
            quantity: 1,
        }
    },
    mounted(){
        this.getProduct()
    },
    methods:{
        getProduct(){
            const product = this.$route.params.product_slug
            const category_slug = this.$route.params.category_slug
            console.log(category_slug)
            axios
            .get(`/api/v1/products/${category_slug}/${product}/`)
            .then(response => {
                this.product = response.data
                console.log(this.product)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addToCart(){
            if (isNaN(this.quantity) || this.quantity < 1){
                this.quantity = 1
            }
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)

            toast({
                message: `${this.product.name} added to cart`,
                type: 'is-success',
                position: 'bottom-right',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                animate: { in: 'fadeIn', out: 'fadeOut' }
            })
        }
        }
    }

</script>