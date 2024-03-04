<template>
  <div class="modal" :class="{ 'show': showModal }">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="title" v-if="isEditing">Edit Product</h2>
      <h2 class="title" v-else>Create Product</h2>
      <el-form label-width="100px" :model="formData" @submit.prevent="submitForm">
      <el-form-item label="Name" prop="name">
        <el-input v-model="formData.name" required></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="formData.description" required></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input-number v-model="formData.price" :min="0" required></el-input-number>
      </el-form-item>
      <el-form-item v-if="!isEditing" label="Category" prop="category">
        <el-select v-model="formData.category" placeholder="Category" required>
          <el-option label="Geci" value="1"></el-option>
          <el-option label="Tricouri" value="2"></el-option>
          <el-option label="Pantaloni" value="3"></el-option>
          <el-option label="Adidasi" value="4"></el-option>
          <el-option label="Bluze" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ isEditing ? 'Update' : 'Create' }}</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    isEditing: Boolean,
    productData: Object
  },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        price: 0,
        category: null,
      }
    };
  },
  watch: {
    productData: {
      handler(newValue) {
        this.formData.name = newValue?.name || '';
        this.formData.description = newValue?.description || '';
        this.formData.price = newValue?.price || 0;
        this.formData.category = newValue?.category || null;
      },
      immediate: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    submitForm() {
      if (this.isEditing) {
        this.$emit('update-product', this.formData);
      } else {
        this.$emit('create-product', this.formData);
      }
    }
  }
};
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal.show {
  display: block;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.title{
  text-align: center;
}

</style>