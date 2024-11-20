<!-- <template>
    <v-container class="my-custom-container">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="my-custom-card" max-width="400">
            <v-card-text>
            </v-card-text>             
             <v-img :src="require('@/components/images/bookdownload.jpg')" class="my-custom-image"></v-img>

            <v-card color="#1976D2" dark>
              <router-link to="/bookdwld" class="my-custom-link">
                <v-btn fab color="#grey" elevation="12">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-list-item-title class="headline ml-2 mt-3 white--text">
                  Book Details
                </v-list-item-title>
              </router-link>
            </v-card>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card class="my-custom-card" max-width="400">
            <v-card-text>
              <v-img :src="require('@/components/images/memberdownload.jpg')" class="my-custom-image"></v-img>
            </v-card-text>
            <v-card color="grey" dark>
              <router-link to="/memberdwld" class="my-custom-link">
                <v-btn fab color="#2196F3" elevation="12">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-list-item-title class="headline ml-2 mt-3 white--text">
                  Member Details
                </v-list-item-title>
              </router-link>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  .my-custom-container {
    padding: 20px;
  }
  
  .my-custom-card {
    margin: 20px auto;
  }
  
  .my-custom-image {
    max-height: 200px;
  }
  
  .my-custom-link {
    text-decoration: none;
  }
  </style> -->


  <template>
    <v-container class="my-custom-container">
      <v-row>
        <v-col cols="12" md="6">
          <router-link to="/bookdwld" class="my-custom-link">
            <v-card class="mx-auto card-hover my-custom-card" color="#607274" max-width="400">
              <v-img :src="require('@/components/images/bookdownload.jpg')" class="image-overlay">
                <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)"></div>
                <v-card-title class="overlay-title">Book Details</v-card-title>
              </v-img>
             
            </v-card>
          </router-link>
        </v-col>
  
        <v-col cols="12" md="6">
          <router-link to="/memberdwld" class="my-custom-link">
            <v-card class="mx-auto card-hover my-custom-card" color="darkgrey" max-width="400">
              <v-img :src="require('@/components/images/memberdownload.jpg')" class="image-overlay">
                <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)"></div>
                <v-card-title class="overlay-title">Member Details</v-card-title>
              </v-img>
        
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
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
  .my-custom-container {
    padding: 20px;
  }
  
  .card-hover:hover .overlay {
    background-color: hsla(0, 0%, 0%, 0.55);
  }
  
  .my-custom-card {
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
    height: 18rem;
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
  
  .my-custom-link {
    text-decoration: none;
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
  