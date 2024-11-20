<template>
  <div>
    <v-card-title class="headline">Delivery Partners Request</v-card-title>
    <v-list three-line class="pa-6" v-if="filteredMembershipReq.length > 0">
      <v-list-item v-for="item in filteredMembershipReq" :key="item.phoneNumber">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.wardNumber"></v-list-item-subtitle>
        </v-list-item-content>
        <v-btn color="#27374D" @click="approveDeliveryPerson(item)">View</v-btn>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>

    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-text>
          <v-text-field v-model="selectedDeliveryPerson.name" label="Name"></v-text-field>
          <v-text-field v-model="selectedDeliveryPerson.address" label="Address"></v-text-field>
          <v-text-field v-model="selectedDeliveryPerson.phoneNumber" label="Phone Number"></v-text-field>
          <v-text-field v-model="selectedDeliveryPerson.wardNumber" label="Ward"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="approveDeliveryPersonRequest">Approve</v-btn>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filteredMembershipReq: [], // Array to store delivery persons
      dialogVisible: false, // Boolean to control the visibility of the dialog
      selectedDeliveryPerson: {
        name: '',
        address: '',
        phoneNumber: '',
        wardNumber: '',
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${process.env.apiUrl}dp/get_delivery_person_applications`);
        this.filteredMembershipReq = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // Method to handle the "Approve" button click
    approveDeliveryPerson(item) {
      this.dialogVisible = true;
      this.selectedDeliveryPerson = { ...item };
    },
    async approveDeliveryPersonRequest() {
      try {
        await axios.post(`${process.env.apiUrl}dp/approve_delivery_person`, {
          phoneNumber: this.selectedDeliveryPerson.phoneNumber,
          wardNumber: this.selectedDeliveryPerson.wardNumber,
          status: "T",
        
        });

        await this.fetchData();

        this.dialogVisible = false;

        this.selectedDeliveryPerson = {
          phoneNumber: '',
          wardNumber: '',
        };
      } catch (error) {
        console.error('Error approving delivery person:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during request setup:', error.message);
        }
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>