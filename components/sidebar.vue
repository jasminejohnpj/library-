<template>
    <aside>
      <v-navigation-drawer  app>
        <v-list-item class="px-2 py-5">
          <v-img :src="require('@/components/images/lib.jpg')"></v-img>
        </v-list-item>
  
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            @click="navigateTo(item.route)"
            link
            class="custom-list-item"
          >
            <v-list-item-icon>
              <v-icon class="custom-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="custom-text" color="white">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </aside>
  </template>
  
  <script>
  export default {
    data: () => ({
      items: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-book', text: 'Book Management', route: '/Managebook' },
        { icon: 'mdi-account-plus', text: 'Membership', route: '/membership' },
        { icon: 'mdi-dolly', text: 'Orders Placed', route: '/orderplaced' },
        { icon: 'mdi-book', text: 'Book Requests', route: '/bookrequest' },
        { icon: 'mdi-refresh', text: 'Books Return', route: '/bookreturn' },
        { icon: 'mdi-truck-delivery', text: 'Delivery Partner', route: '/deliverypartner' },
        {icon:'mdi-phone', text:'Mobile Management', route:'./Mobilemanagement'},
        { icon: 'mdi-book', text: 'Report', route: '/report' },
      ],
    }),
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-list-item {
    background-color: #0e0e12; /* List item background color */
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
  }
  
  .custom-list-item:hover {
    background-color: #9596a4; /* Hover background color */
  }
  
  .custom-icon {
    color: white; /* Icon color */
  }
  
  .custom-text {
    color: white; /* Text color */
    font-weight: bold; /* Text font-weight */
  }
  </style>