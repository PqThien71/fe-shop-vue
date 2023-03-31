<template>
    <div class="page-signup">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label>UserName</label>
                <div class="control">
                    <input type="text" class="input" v-model="username">
                </div>
            </div>
            <div class="field">
                <label>Password</label>
                <div class="control">
                    <input type="password" class="input" v-model="password">
                </div>
            </div>
            <div class="field">
                <label>Re-Password</label>
                <div class="control">
                    <input type="password" class="input" v-model="password2">
                </div>
            </div>
            
            <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-dark"> SignUp </button>
                </div>
            </div>

            <hr>

            Or <router-link to="/log-in" >Click here</router-link> to login
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import { toast } from 'bulma-toast';
export default{
    name: 'SignUp',
    data(){
        return{
            username: '',
            password: '',
            password2: '',
            errors: [],
        }
    },
    methods: {
        submitForm(){
            this.errors = []
            if(this.username === ''){
                this.errors.push('Username is required')
            }
            if(this.password === ''){
                this.errors.push('Password is required')
            }
            if(this.password2 === ''){
                this.errors.push('Re-Password is required')
            }
            if(this.password !== this.password2){
                this.errors.push('Password and Re-Password must be the same')
            }
            if(!this.errors.length){
                const data = {
                    username: this.username,
                    password: this.password,
                }
                axios
                .post('/api/v1/users/', data)
                .then(response => {
                    toast({
                        message: 'Sign up successfully',
                        type: 'is-success',
                        position: 'bottom-right',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 3000,
                    })
                    this.$router.push('/log-in')
                })
                .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')
                            
                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}

</script>