<template>
    <div>
      <v-btn @click="openDialog" color="primary">Add Delivery Person</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>Add Delivery Person</v-card-title>
          <v-card-text>
            <v-text-field v-model="memberId" label="Member ID"></v-text-field>
            <v-text-field v-model="name" label="Name"></v-text-field>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="address" label="Address"></v-text-field>
            <v-text-field v-model="phoneNumber" label="Phone Number"></v-text-field>
            <v-text-field v-model="wardNumber" label="Ward"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addDeliveryPerson" color="primary">Save</v-btn>
            <v-btn @click="closeDialog" color="error">Cancel</v-btn>
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
        dialog: false,
        memberId: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        wardNumber: '',
      };
    },
    methods: {
      openDialog() {
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      async addDeliveryPerson() {
        // Check if any required field is empty
        if (!this.memberId || !this.name || !this.email || !this.address || !this.phoneNumber || !this.wardNumber) {
          alert("Please fill in all the required fields");
          return;
        }
  
        try {
          const newDeliveryPerson = {
            memberId: this.memberId,
            name: this.name,
            email: this.email,
            address: this.address,
            phoneNumber: this.phoneNumber,
            wardNumber: this.wardNumber,
          };
  
          const response = await axios.post(
            "http://localhost:5000/api/v1/amc/admin/add_new_dp",
            newDeliveryPerson
          );
  
          console.log("Delivery person added:", response.data);
          alert("Delivery person added successfully");
          // You can add additional logic if needed
        } catch (error) {
          console.error("Error adding delivery person", error);
          alert("Failed to add delivery person. Please try again.");
        } finally {
          this.closeDialog();
        }
      },
    },
  };
  </script>