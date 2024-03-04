<template>
  <div class="products-container">
    <h1 class="page-title">Products</h1>
    
    <div class="category-buttons">
      <el-button
        @click="showAllProducts"
        :class="{ 'active-category': selectedCategory === 'all' }"
        class="category-button"
      >
        All Categories
      </el-button>
      <el-button
        v-for="category in categories"
        :key="category.id"
        @click="filterProducts(category.id)"
        :class="{ 'active-category': selectedCategory === category.id }"
        class="category-button"
      >
        {{ category.name }}
      </el-button>
    </div>
    
    <div class="create-button-container">
      <el-button @click="showModal = true" type="primary" round>Create Product</el-button>
    </div>
    
    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="name" label="Name" width="350"></el-table-column>
      <el-table-column prop="description" label="Description" width="1050"></el-table-column>
      <el-table-column prop="price" label="Price" width="250"></el-table-column>
      <el-table-column label="Actions" width="220">
        <template #default="scope">
          <el-button @click="editProduct(scope.row)" type="warning" round>Edit</el-button>
          <el-button @click="deleteProduct(scope.row.id)" type="danger" round>Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    
      <modal-component
        :show-modal="showModal"
        :is-editing="isEditing"
        :product-data="editingProduct"
        @close-modal="closeModal"
        @create-product="createProduct"
        @update-product="updateProduct"
      ></modal-component>
    
  </div>
</template>


<script>
import axios from "axios";
import ModalComponent from './ModalComponent.vue';


export default {
  components: {
    ModalComponent
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      isEditing: false,
      editingProduct: {},
      products: [],
      categories: [],
      filteredProducts: [],
      selectedCategory: "all", 
    };
  }, 

  mounted() {
    this.fetchCategories();
    this.fetchProducts();
  },

  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },


    filterProducts(categoryId) {
      this.selectedCategory = categoryId; 
      if (categoryId === "all") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => product.category_id === categoryId
        );
      }
    },

    showAllProducts() {
      this.selectedCategory = "all"; 
      this.filteredProducts = this.products;
    },

    fetchProducts() {
      axios
        .get("http://localhost:8080/api/products")
        .then((response) => {
          this.products = response.data;
          this.filteredProducts = response.data; 
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },

    editProduct(product) {
      this.editingProduct = {...product}; 
      this.isEditing = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.editingProduct = null;
    },

    cancelEdit() {
      this.editingProduct = null;
      this.showEditModal = false;
    },

    updateProduct(formData) {
      axios
        .put(`http://localhost:8080/api/products/update/${this.editingProduct.id}`, formData)
        .then(() => {
          console.log("Product updated successfully");
          this.fetchProducts();
          this.showModal = false;
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        }).finally(() => {
        this.isLoading = false;
      });
    },

    createProduct(formData) {
      axios
        .post("http://localhost:8080/api/products/create", formData)
        .then(() => {
          console.log("Product created successfully");
          this.fetchProducts();
          this.showModal = false;
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        }).finally(() => {
        this.isLoading = false;
      });
    },

    deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        axios
          .delete(`http://localhost:8080/api/products/delete/${productId}`)
          .then(() => {
            this.products = this.products.filter(
              (product) => product.id !== productId
            );
            this.fetchProducts();
            console.log("Product deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          }).finally(() => {
        this.isLoading = false;
      });
      }
    },
  },
};

</script>

<style>
.row{
  justify-content: center;

}
.products-container {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.product-card{
  margin: 20px;
  text-align: center;
}

.products-container h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.products-container p {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}


.product-container button:hover {
  background-color: #0056b3;
}

.description {
  margin-top: 20px;
}

.price {
  margin-top: 20px;
  font-weight: bold;
}
.name{
  margin-top: 10px;
  padding-bottom: 20px;
}
.page-title {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 20px;
  justify-content: space-between;

}
.category-buttons {
  text-align: center;
}
.category-button:hover {
  background-color: #45a049;
}
.create-button-container {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}
.product-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.active-category {
  background-color: #ff9800;
}

.active-category:hover {
  background-color: #f57c00;
}
</style>
