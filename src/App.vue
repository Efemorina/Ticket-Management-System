<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/tickets">Tickets</router-link>
      <router-link to="/tickets/create">Create Ticket</router-link>
    </nav>
    <main>
      <router-view />
      <Homepage />
    </main>
  </div>
</template>

<script setup>
import Homepage from './components/Homepage.vue';
</script>

<style>
nav {
  padding: 10px;
  background-color: #f8f9fa;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>