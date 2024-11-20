<template>
    <div>
      <v-btn @click="addorder">Add Order</v-btn>
      <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
          <v-card-text>
            <v-text-field v-model="bookName" label="Book Name"></v-text-field>
            <v-text-field v-model="author" label="Author"></v-text-field>
            <v-text-field v-model="accessionNo" label="Accession No"></v-text-field>
            <v-text-field v-model="category" label="category"></v-text-field>
            <v-text-field v-model="userName" label="User Name"></v-text-field>
            <v-text-field v-model="cardNumber" label="Card Number"></v-text-field>
            <v-text-field v-model="houseName" label="House Name"></v-text-field>
            <v-text-field v-model="phoneNumber" label="Phone No"></v-text-field>
            <v-text-field v-model="wardNumber" label="Ward No"></v-text-field>
            <v-text-field v-model="wardName" label="Ward Name"></v-text-field>
            <v-text-field v-model="postOffice" label="Post Office"></v-text-field>
            <v-text-field v-model="pincode" label="Pin Code"></v-text-field>
            <v-text-field v-model="district" label="District"></v-text-field>
            <v-text-field v-model="barcode" label="Barcode"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="acceptorder">Accept</v-btn>
            <v-btn @click="dialogVisible = false">Close</v-btn>
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
        bookName: "",
        author: "",
        accessionNo: "",
        barcode:"",
        category: "",
        userName: "",
        cardNumber: "",
        houseName: "",
        phoneNumber: "",
        wardNumber: "",
        wardName:"",
        postOffice:"",
        pincode: "",
        district:"",
        tableData:"",
        dialogVisible: false,
      };
    },
    methods: {
      addorder() {
         this.dialogVisible = true;
       },
     async acceptorder() {
        try{
  const orderData ={
     bookName: this.bookName,
     author: this.author,
     accessionNo: this.accessionNo,
     barcode:this.barcode,
     subjectHeading: this.category,
     userName:this.userName,
     cardNumber:this.cardNumber,
     houseName:this.houseName,
     phoneNumber:this.phoneNumber,
     wardNumber:this.wardNumber,
     wardName:this.wardName,
     pincode:this.pincode,
     postOffice:this.postOffice,
     district:this.district
  };
  const response = await axios.post(`${process.env.apiUrl}admin/add_new_order`,orderData);
  if(response.status === 200){
    this.saveToLocalStorage(tableData);
      console.log("Item added", response.data);
      alert("Data added successfully");
      this.$emit("item-added");
  }
         }
      catch (error) {
        console.error('Error adding orders', error);
      }
    }
    }
  }
  </script>
  