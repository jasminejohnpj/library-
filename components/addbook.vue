<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Book Details</span>
        </v-card-title>
        <v-card-text>
          <v-avatar size="62"> </v-avatar>
          <v-row>
              <v-col cols="12" sm="6">
              <v-text-field label="Title" v-model="title" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Author" v-model="author" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                    label="Category"
                    v-model="category"
                    :items="categoryOptions"
                    required
                  ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Subject" v-model="subject" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Language" v-model="language" ></v-text-field>
            </v-col> 
            <v-col cols="12" sm="6">
              <v-text-field label="Publisher" v-model="publisher" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Place & Year" v-model="placeyear" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Edition" v-model="edition" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Volume" v-model="volume" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Accession No" v-model="accessionno" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Shelf No" v-model="shelfNo"></v-text-field>
            </v-col>
            
            <v-col cols="12" sm="6">
              <v-text-field label="Call No" v-model="callno" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="ISBN" v-model="Isbn" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Price" v-model="price" ></v-text-field>
            </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close </v-btn>
          <v-btn color="blue darken-1" text @click="additem">ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col>
      <div class="pt-13">
        <v-btn color="secondary" @click="openDialog">Add A New Book</v-btn>
      </div>
    </v-col>
  </div>
</template>
<script>
import axios from "axios";

export default {
data() {
  return {
    snackAlert: false,
    dialog: false,
    title: "",
    author: "",
    category: "",
    categoryOptions: [],
    subject: "",
    language: "",
    publisher: "",
    placeyear: "",
    edition: "",
    volume: "",
    accessionno:"",
    shelfNo:"",
    callno:"",
    Isbn:"",
    price:"",
  };
},

methods: {
  async additem() {
    const requiredFields = ['title', 'author', 'category', 'subject', 'language', 'publisher', 'placeyear', 'edition', 'volume','accessionno','shelfNo','callno','Isbn','price'];

    for (const field of requiredFields) {
      if (!this[field]) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }

    try {
      const newitem = {
        bookTitle: this.title,
        author: this.author,
        category: this.category,
        publisherName: this.publisher,
        accessionNo: this.accessionno,
        shelfNo: this.shelfNo,
        publication: this.publication,
        language: this.language,
        callno: this.callno,
      };

      const response = await axios.post( `${process.env.apiUrl}admin/add_new_book`, newitem);
      this.saveToLocalStorage(newitem);
      console.log("Item added", response.data);
      alert("Data added successfully");
      this.$emit("item-added");
    } catch (error) {
      console.error("Error adding data", error);
      alert("Failed to add data. Please try again.");
    }
  },

  saveToLocalStorage(data) {
    const existingData = JSON.parse(localStorage.getItem("bookDetails")) || [];
    existingData.push(data);
    localStorage.setItem("bookDetails", JSON.stringify(existingData));
  },

  openDialog() {
    this.fetchcategory(); 
    this.dialog = true;
  },

  async fetchcategory() {
    try {
      const response = await axios.get(`${process.env.apiUrl}books/get_all_category`);
      this.categoryOptions = response.data;
    } catch (error) {
      console.error("Error fetching categories", error);
      alert("Failed to fetch categories. Please try again.");
    }
  },
},
};
</script>
