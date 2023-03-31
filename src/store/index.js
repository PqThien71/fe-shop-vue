import { createStore } from 'vuex'

export default createStore({
  state: {
    cart:{
      items: [],
    },
    isAuthenticated: false,
    token:'',
    isloading: false
  },
  mutations: {
    initializeStore(state){
      if(localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'))
      }else{
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
      if(localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      }
      else{
        state.token = ''
        state.isAuthenticated = false
      }
    },
    addToCart(state, item){
      const exits = state.cart.items.filter(i => i.product.id === item.product.id)
      if(exits.length){
        exits[0].quantity = parseInt(exits[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setIsLoading(state, status){
      state.isloading = status
    },
    setToken(state, token){
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state,token){
      state.token = ''
      state.isAuthenticated = false
    },
  },
  actions: {
  },
  modules: {
  },
}) 
