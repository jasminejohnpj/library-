<template>
    <v-container>
 
      <v-row>
        <v-col v-for="book in books" :key="book.id" cols="12" md="4">
          <v-card class="pa-4" elevation="2">
            <v-card-title>{{ book.bookName }}</v-card-title>
            <v-card-subtitle>{{ book.cardNumber }}</v-card-subtitle>
            <v-card-text>
              <v-btn @click="openDialog(book)" color="primary">View</v-btn>
              <v-btn @click="removeBook(book)" color="primary">Delete</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>Book Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Book Name" v-model="selectedBook.bookname" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Author" v-model="selectedBook.author" ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field label="Accession No" v-model="selectedBook.accessionno" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Subject" v-model="selectedBook.subject" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="User Name" v-model="selectedBook.username" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Card Number" v-model="selectedBook.cardnumber" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="House Name" v-model="selectedBook.housename" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Phone no" v-model="selectedBook.phonenumber" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Ward Name" v-model="selectedBook.wardname" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Ward No" v-model="selectedBook.wardnumber" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Pin Code" v-model="selectedBook.pincode" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Post Office" v-model="selectedBook.postoffice" ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="acceptRequest">Accept</v-btn>
            <v-btn @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  

  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        books: [],
        dialog: false,
        holdId: "",
        selectedBook: {
          bookname: "",
          author:"",
          callno:"",
          shelfno:"",
          cardnumber: "",
          housename: "",
          phonenumber: "",
          accessionno: "",
          subject:"",
          booktype:"",
          pincode: "",
          postoffice: "",
          username: "",
          wardname: "",
          wardnumber:"",
         
        },
      };
    },
    mounted() {
      this.getRequestBooks();
    },
    methods: {
      async getRequestBooks() {
      
    try {
      const response = await axios.get(`${process.env.apiUrl}hold/get_list`);
      console.log(response);
      if (response.status === 200) {
        this.books = response.data;    
        localStorage.setItem('bookList', JSON.stringify(this.books));
      }
    } catch (error) {
      console.error('Error fetching new release books', error);
    
  }
      },
      openDialog(book) {
        this.selectedBook = {
          bookname: book.bookName,
          author:book.author,
          cardnumber: book.cardNumber,
          housename: book.houseName,
          phonenumber: book.phoneNumber,
          accessionno: book.accessionNo,
          subject:book.subjectHeading,
          pincode: book.pincode,
          postoffice: book.postOffice,
          username: book.userName,
          wardname: book.wardName,
          wardnumber: book.wardNumber
        };
        this.dialog = true;
      },
      async removeBook(book) {
  const confirmed = confirm("Are you sure you want to delete this book?");
  if (!confirmed) {
    return;
  }

  try {
    const response = await axios.get(`${process.env.apiUrl}hold/cancel_hold_user/${hold_Id}`);
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.dialog = false;
  } catch (error) {
    console.error('Error removing book:', error);
    alert('Error removing book. Please try again later.');
  }
},
async acceptRequest() {
  const data = {
          holdId : this._id,
          bookName: this.selectedBook.bookname,
          author:this.selectedBook.author,
          cardNumber: this.selectedBook.cardnumber,
          houseName: this.selectedBook.housename,
          phoneNumber: this.selectedBook.phonenumber,
          accessionNo: this.selectedBook.accessionno,
          subjectHeading:this.selectedBook.subject,
          pincode: this.selectedBook.pincode,
          postOffice: this.selectedBook.postoffice,
          userName: this.selectedBook.username,
          wardName: this.selectedBook.wardname,
          wardNumber: this.selectedBook.wardnumber
  }
  try {
    const response = await axios.post(
      `${process.env.apiUrl}checkout/place_checkout`,data);
    const orderData = response.data;
    localStorage.setItem('orderData', JSON.stringify(orderData));
    console.log(response);

    const statusCode = response.status;
    console.log('Status Code:', statusCode);

    this.dialog = false;
  } catch (error) {
    console.error(error);
  }
}





    },
  };
  </script>