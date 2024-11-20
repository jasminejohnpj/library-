<template>
  <div>
    <v-card-title class="headline">Delivery Partners  </v-card-title>
    <v-list three-line class="pa-6" v-if="getmembershipreq.length > 0">
      <v-list-item v-for="(item, index) in getmembershipreq" :key="item.phoneNumber">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <h6>Ward No :</h6>
          <v-list-item-subtitle v-text="item.wardNumber"></v-list-item-subtitle>
        </v-list-item-content>
        <v-btn color="#27374D" @click="deleteDeliveryPerson(item)">Delete</v-btn>&nbsp;&nbsp;
        <v-btn color="#27374D" @click="openDialog(item)">View</v-btn>
      </v-list-item>
      <v-divider :key="index" :inset="true"></v-divider>
    </v-list>
    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-text>
          <h2>
            <v-text-field v-model="selectedDeliveryPerson.name" label=" Name"></v-text-field>
            <v-text-field v-model="selectedDeliveryPerson.address" label="Address"></v-text-field>
          </h2>
          &nbsp;
          <v-text-field v-model="selectedDeliveryPerson.phoneNumber" label="Phone Number"></v-text-field>
          <v-text-field v-model="selectedDeliveryPerson.wardNumber" label=" Ward"></v-text-field>
        </v-card-text>
        <v-card-actions>
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
      memberStatus: 0,
      getmembershipreq: [],
      dialogVisible: false,
      selectedDeliveryPerson: {},
    };
  },
  methods: {
    async getMemberShip() {
      try {
        const response = await axios.get(`${process.env.apiUrl}dp/get_all_valid_delivery_persons`);
        this.getmembershipreq = response.data;
      } catch (error) {
        console.error("Error fetching membership requests", error);
      }
    },

    openDialog(item) {
      this.selectedDeliveryPerson = { ...item }; 
      this.dialogVisible = true;
    },
    
    closeDialog() {
      this.dialogVisible = false;
    },

    async deleteDeliveryPerson(item) {
      try {
        const response = await axios.get(`${process.env.apiUrl}dp/delete/${item.phoneNumber}`);
        if (response.status === 200) {
          this.getmembershipreq = this.getmembershipreq.filter(
            (deliveryPerson) => deliveryPerson.phoneNumber !== item.phoneNumber
          );
          this.closeDialog(); 
          this.getMemberShip();
        } else {
          console.error("Error deleting delivery person", response.data);
        }
      } catch (error) {
        console.error("Error deleting delivery person", error);
      }
    },
  },
  mounted() {
    this.getMemberShip();
  },
};
</script>