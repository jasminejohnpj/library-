<!-- <template>
    <v-row class="px-8 pt-8">
      <v-col lg="6" cols="6">
        <v-card class="mx-auto" max-width="400">
          <v-card-text>
            <v-img :src="require('@/components/images/memberslist.jpg')"></v-img>
          </v-card-text>
          <v-card color="#33691E">
            <router-link to="/memberslist" style="text-decoration: none">
      <v-btn fab color="#8BC34A" elevation="0" @click="storeData('Members List')">
        <v-icon class="my-icon-style-2">mdi-truck-delivery</v-icon>
      </v-btn>
      </router-link>
      <v-list-item-title class="headline ml-1 mt-3 white--text">
        Members List
      </v-list-item-title>

  </v-card>
        </v-card>
      </v-col>
  
      <v-col lg="6" cols="6">
        <v-card class="mx-auto" max-width="400">
          <v-card-text>
            <v-img :src="require('@/components/images/membershiprequest.jpg')"></v-img>
          </v-card-text>
          <v-card color="#33691E">
            <router-link to="/membershipreq" style="text-decoration: none">
              <v-btn fab color="#8BC34A" elevation="0" @click="storeData('Membership Request')">
                <v-icon class="my-icon-style-2">mdi-book</v-icon>
              </v-btn>
            </router-link>
            <v-list-item-title class="headline ml-1 mt-3 white--text">
              Membership Request
            </v-list-item-title>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  
  <script>
  export default {
    methods: {
      storeData(title) {
        localStorage.setItem('clickedButton', title);
      },
    },
  };
  </script>
   -->



   <template>
    <v-row class="px-8 pt-8">
      <v-col lg="6" cols="6">
        <router-link to="/memberslist" style="text-decoration: none">
          <v-card class="mx-auto card-hover custom-card" color="#607274" max-width="400">
            <v-img :src="require('@/components/images/memberslist.jpg')" class="image-overlay">
              <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)"></div>
              <v-card-title class="overlay-title">Members List</v-card-title>
            </v-img>
            <v-card-text class="card-description white--text grey-bg">
              Registered Members List and their Details.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
  
      <v-col lg="6" cols="6">
        <router-link to="/membershipreq" style="text-decoration: none">
          <v-card class="mx-auto card-hover custom-card" color="darkgrey" max-width="400">
            <v-img :src="require('@/components/images/membershiprequest.jpg')" class="image-overlay">
              <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)"></div>
              <v-card-title class="overlay-title">Membership Request</v-card-title>
            </v-img>
            <v-card-text class="card-description white--text grey-bg">
              Membership Requests to Admin.
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
        overlay.style.backgroundColor = showOverlay ? 'hsla(0, 0%, 0%, 0.55)' : 'transparent';
      },
    },
  };
  </script>
  
  <style scoped>
  .card-hover:hover .overlay {
    background-color: hsla(0, 0%, 0%, 0.55);
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
    bottom: 50px;
    left: 16px;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0 0 50px hsla(0, 0%, 0%, .1);
    background-color: hsla(0, 0%, 0%, 0.4);
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
  
  .card-hover:hover .overlay-button {
    display: block;
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
  