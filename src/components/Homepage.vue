<template>
  <div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          <tr>
            <td><input v-model="newBlog.topic" class="form-control topic-input" /></td>
            <td><input v-model="newBlog.description" class="form-control description-input" /></td>
            <td><button @click="addBlog" class="btn btn-primary add-blog">Add</button></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(blog, index) in blogs" :key="index">
            <td v-if="!editing[index]">{{ blog.topic }}</td>
            <td v-if="editing[index]"><input v-model="editedBlog.topic" class="form-control" /></td>
            <td v-if="!editing[index]">{{ blog.description }}</td>
            <td v-if="editing[index]"><input v-model="editedBlog.description" class="form-control" /></td>
            <td>
              <button v-if="!editing[index]" @click="editBlog(index)" class="btn btn-secondary">Edit</button>
              <button v-if="editing[index]" @click="updateBlog(index)" class="btn btn-success">Update</button>
              <button @click="deleteBlog(index)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBlog: {
        topic: '',
        description: '',
      },
      blogs: [],
      editedBlog: {},
      editing: [],
    };
  },
  mounted() {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    this.blogs = storedBlogs;
    this.editing = new Array(this.blogs.length).fill(false);
  },
  methods: {
    addBlog() {
      if (this.newBlog.topic && this.newBlog.description) {
        this.blogs.push({ ...this.newBlog });
        this.newBlog = { topic: '', description: '' };
        this.saveBlogs();
        this.editing.push(false);
      }
    },
    deleteBlog(index) {
      this.blogs.splice(index, 1);
      this.editing.splice(index, 1);
      this.saveBlogs();
    },
    editBlog(index) {
      this.editedBlog = { ...this.blogs[index] };
      this.editing[index] = true;
    },
    updateBlog(index) {
      if (this.editedBlog.topic && this.editedBlog.description) {
        this.blogs[index] = this.editedBlog;
        this.saveBlogs();
        this.editing[index] = false;
      }
    },
    saveBlogs() {
      localStorage.setItem('blogs', JSON.stringify(this.blogs));
    },
  },
};
</script>

<style lang="css">
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }    
  
  .table th,
  .table td {
    padding: 12px 15px;
    text-align: left;
  }
  
  .table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
  }
  
  .table tbody tr {
    border-bottom: 1px solid #e9ecef;
  }
  
  .table tbody tr:last-child {
    border-bottom: none;
  }
  
  .table tbody tr:hover {
    background-color: #f1f3f5;
  }
  
  .form-control {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-danger:hover {
    background-color: #a71d2a;
  }
</style>
