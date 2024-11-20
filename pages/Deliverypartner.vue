<!-- <template>
    <v-row class="px-8 pt-8">
        <v-col lg="6" cols="6" >
            <v-card class="mx-auto"
            max-width="400"
            >
            <v-card-text >
                <v-img :src="require('@/components/images/deliverypartner.jpg')"></v-img>
                    </v-card-text>
                    <v-card  color="#33691E">
                        <router-link to="/deliverypartnerlist" style="text-decoration :none">
                        <v-btn fab color="#8BC34A" elevation="0">
                            <v-icon class="my-icon-style-2">mdi-truck-delivery</v-icon>
                        </v-btn>
                        <v-list-item-title class="headline ml-1 mt-3 white--text">
                               Delivery Partner List
                              </v-list-item-title>
                        </router-link>
                    </v-card>
            </v-card>
            </v-col>
            <v-col lg="6" cols="6" >
            <v-card class="mx-auto"
            max-width="400"
            >
            <v-card-text >
                <v-img :src="require('@/components/images/deliveryrequests.jpg')"></v-img>
                    </v-card-text>
                    <v-card  color="#33691E">
                        <router-link to="/deliveryrequest" style="text-decoration :none">
                        <v-btn fab color="#8BC34A" elevation="0">
                            <v-icon class="my-icon-style-2">mdi-book</v-icon>
                        </v-btn>
                        </router-link>
                        <v-list-item-title class="headline ml-1 mt-3 white--text">
                              Delivery Partner Request
                              </v-list-item-title>
                    </v-card>
            </v-card>
            </v-col>
        </v-row>
    </template>

    <script>
  
    export default{
      
        data(){

        }
    }
</script> -->









<template>
    <v-row class="px-8 pt-8">
      <v-col lg="6" cols="6">
        <router-link to="/deliverypartnerlist" style="text-decoration: none">
          <v-card class="mx-auto card-hover custom-card" max-width="400">
            <v-img :src="require('@/components/images/deliverypartner.jpg')" class="image-overlay">
              <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)">
                <v-card-title class="overlay-title">Delivery Partner List</v-card-title>
              </div>
            </v-img>
              <v-card-text class="card-description white--text grey-bg">
                Delivery Partners List and their Details.
            </v-card-text>
            </v-card>
         
        </router-link>
      </v-col>
  
      <v-col lg="6" cols="6">
        <router-link to="/deliveryrequest" style="text-decoration: none">
          <v-card class="mx-auto card-hover custom-card" max-width="400">
            <v-img :src="require('@/components/images/deliveryrequests.jpg')" class="image-overlay">
              <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)">
                <v-card-title class="overlay-title">Delivery Partner Request</v-card-title>
              </div>
            </v-img>
              <v-card-text class="card-description white--text grey-bg">
             Delivery Partners Requests.
            </v-card-text>
            </v-card>
          
        </router-link>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    methods: {
      toggleOverlay(showOverlay) {
        const overlay = document.querySelector('.overlay');
        overlay.style.backgroundColor = showOverlay ? 'rgba(0, 0, 0, 0.8)' : 'transparent';
      },
    },
  };
  </script>
  
  <style scoped>
  .card-hover:hover .overlay {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .custom-card {
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .image-overlay {
    position: relative;
  }
  
  .overlay-title {
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .card-description {
    padding: 16px;
  }
  
  .white--text {
    color: #fff !important;
  }
  
  .grey-bg {
    background-color: grey;
  }
  
  .custom-card:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    pointer-events: none;
  }
  </style>
  