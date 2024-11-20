<template>
  <v-row class="px-8 pt-8">
    <!-- New Release Section -->
    <v-col lg="6" cols="6">
      <router-link to="/newrelease" style="text-decoration: none">
        <v-card class="mx-auto card-hover custom-card" max-width="400">
          <v-img :src="require('@/components/images/newreleasebook.jpg')" class="image-overlay">
            <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)">
              <v-card-title class="overlay-title">New Release</v-card-title>
            </div>
          </v-img>
          <v-card-text class="card-description white--text grey-bg">
                New Releasing Book & their Details.
            </v-card-text>
        </v-card>
      </router-link>
    </v-col>

    <!-- Now Trending Section -->
    <v-col lg="6" cols="6">
      <router-link to="/trends" style="text-decoration: none">
        <v-card class="mx-auto card-hover custom-card" max-width="400">
          <v-img :src="require('@/components/images/trends.jpg')" class="image-overlay">
            <div class="overlay" @mouseover="toggleOverlay(true)" @mouseleave="toggleOverlay(false)">
              <v-card-title class="overlay-title">Now Trending</v-card-title>
            </div>
          </v-img>
          <v-card-text class="card-description white--text grey-bg">
                New Trending Books & their Details.
            </v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newReleaseCount: 0,
      trendingCount: 0,
    };
  },
  mounted() {
    this.getNewReleaseCount();
    this.getTrendingCount();
  },
  methods: {
    async getNewReleaseCount() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/amc/newrelease/count');
        if (response.status === 200) {
          this.newReleaseCount = response.data.count;
        }
      } catch (error) {
        console.error('Error fetching new release count', error);
      }
    },
    async getTrendingCount() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/amc/trends/count');
        if (response.status === 200) {
          this.trendingCount = response.data.count;
        }
      } catch (error) {
        console.error('Error fetching trending count', error);
      }
    },
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
