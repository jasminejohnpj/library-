<template>
  <div>
    <v-card-title class="headline">New Release</v-card-title>
    <form @submit.prevent="searchData" class="d-flex">
      <v-text-field
        class="pt-6 px-6 flex-grow-1"
        label="Search Books"
        append-icon="mdi-window-close"
        append-outer-icon="mdi-magnify"
        outlined
        v-model="search"
      ></v-text-field>
     
    </form>
    <v-container>
      <v-row>
        <v-col v-for="book in books" :key="book.id" cols="12" md="4">
          <v-card class="pa-4" elevation="2">
            <v-card-title>{{ book.bookTitle }}</v-card-title>
            <v-card-subtitle>{{ book.author }}</v-card-subtitle>
            <v-card-text>
              <v-btn @click="openRelease(book)" color="primary">View</v-btn>
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
                <v-text-field label="Title" v-model="selectedBook.title" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Author" v-model="selectedBook.author" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Category" v-model="selectedBook.category" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Category Item" v-model="selectedBook.categoryitem" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Publisher" v-model="selectedBook.publisher" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Accession No" v-model="selectedBook.accessionNo" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Publication Place" v-model="selectedBook.publication" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Language" v-model="selectedBook.language" readonly></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-textarea label="Description" v-model="selectedBook.description" readonly></v-textarea>
              </v-col>
              <!-- Add other fields as needed -->
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="additem(selectedBook)">ADD</v-btn>
            <v-btn color="blue darken-1" text @click="remove(selectedBook)">Remove</v-btn>
        </v-card-actions>
         
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      dialog: false,
      selectedBook: {
        title: "",
        author: "",
        category: "",
        publisher: "",
       accessionNo: "",
        publication: "",
        language: "",
        description: ""
      },
      search: "", // Add the search property
    };
  },
  mounted() {
    this.getNewReleaseBooks();
  },
  methods: {
    async getNewReleaseBooks() {
      try {
        const response = await axios.get(`${process.env.apiUrl}books/get_release`);
        if (response.status === 200) {
          this.books = response.data;
          localStorage.setItem('books', JSON.stringify(this.books));
        }
      } catch (error) {
        console.error('Error fetching new release books', error);
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
          this.books = JSON.parse(storedBooks);
        }
      }
    },
    openRelease(book) {
        
        this.selectedBook = {
          title: book.bookTitle,
          author: book.author,
          category:book.category,
          publisher:book.publisherName,
          accessionNo:book.accessionNo,
          categoryitem:book.subjectHeading,
          publication:book.publicationPlace,
          language:book.language,
        };
        this.dialog = true;
      },
    async additem(selectedBook) {
      try {
        const response = await axios.post(`${process.env.apiUrl}books/add_to_release/${selectedBook.accessionNo}`);
        if (response.status === 200) {
          const bookDetails = response.data;
          console.log('Book details:', bookDetails);
          this.dialog = false;
          alert("Book added to new relase");
        } else {
          console.error('Failed to fetch book details. Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    },
    async remove(selectedBook) {
      try {
        const response = await axios.post(`${process.env.apiUrl}books/remove_from_release/${selectedBook.accessionNo}`);
        if (response.status === 200) {
          const bookDetails = response.data;
          console.log('Book details:', bookDetails);
          this.dialog = false;
          alert("Book removed from new relase");
        } else {
          console.error('Failed to fetch book details. Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    },
    async searchData() {
      try {
        const response = await axios.post(`${process.env.apiUrl}admin/search_books`, {
          text: this.search
        });
        if (response.status === 200) {
          this.books = response.data.data;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('searchResults', JSON.stringify(this.books));
          } else {
            console.warn('localStorage is not available. Unable to save search results.');
          }
        }
      } catch (error) {
        console.error('Error searching books:', error);
        alert(error.message);
      }
    },
  }
  
};
</script>