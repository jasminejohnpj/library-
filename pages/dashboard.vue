<template>
    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" md="6" lg="4">
          <router-link :to="card.route" style="text-decoration:none;">
            <v-card class="elevation-10 card-hover custom-card">
              <v-img :src="card.image" alt="Card Image" class="mx-auto card-image"></v-img>
              <v-card-title class="text-h5 grey--text">{{ card.title }}</v-card-title>
              <v-card-subtitle class="mb-2 white--text">{{ card.subtitle }}</v-card-subtitle>
              <v-card-text>{{ card.description }}</v-card-text>
              <v-card-actions>
                <v-btn class="custom-card-button" color="primary" text>
                  <v-icon>{{ card.icon }}</v-icon>
                  <span class="ml-2">Go to {{ card.title }}</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
        {
            title: 'Book Management',
            subtitle: 'Manage Books',
            image: require('@/components/images/bookmanagement.jpg'),
            icon: 'mdi-book',
            route: '/Managebook',
          },
          {
            title: 'Membership',
            subtitle: 'Manage Members',
            image: require('@/components/images/members.jpg'),
            icon: 'mdi-account-plus',
            route: '/membership',
          },
          {
            title: 'Book Requests',
            subtitle: 'View Book Requests',
            image: require('@/components/images/bookrequest.jpg'),
            icon: 'mdi-book',
            route: '/bookrequest',
          },
          {
            title: 'Order Placed',
            subtitle: 'Manage Orders',
            image: require('@/components/images/orderplaced.jpg'),
            icon: 'mdi-dolly',
            route: '/orderplaced',
          },
          {
            title: 'Book Returns',
            subtitle: 'Manage Returns',
            image: require('@/components/images/bookreturn.jpg'),
            icon: 'mdi-refresh',
            route: '/bookreturn',
          },
          {
            title: 'Delivery Partner',
            subtitle: 'Manage Deliveries',
            image: require('@/components/images/deliverypartner.jpg'),
            icon: 'mdi-truck-delivery',
            route: '/Deliverypartner',
          },
         
          {
            title: 'Mobile Managements',
            subtitle: 'Explore New Releases',
            image: require('@/components/images/mobilemanagement.jpg'),
            icon: 'mdi-book',
            route: '/Mobilemanagement',
          },
          {
            title: 'Report ',
            subtitle: 'Download The Details',
            image: require('@/components/images/report.jpg'),
            icon: 'mdi-book',
            route: '/report',
          },
        ],
      };
    },
    mounted(){
      console.log('mounted')
    if(!window.localStorage.getItem("userName")){
      return this.$router.push("/");
    }
    }
  };
  </script>
  <style scoped>
  .card-hover:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    background-color: #1e1e26;
  }
  
  .custom-card-button:hover {
    color: white !important;
    cursor: pointer;
  }
  
  .custom-card-button {
    background-color: transparent;
    border: none;
    color: inherit;
  }
  
  .custom-card {
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-image {
    width: 100%;
    height: 250px; /* Adjust the desired height */
    object-fit: cover;
  }
  </style>