<template>
  <div class="container">
    <h1>:(</h1>
    <br />
    <h2>A <span>404</span> error occured, Page not found, check the URL and try again.</h2>
    <br /><br />
    <h3>
      <router-link to="/">Return to home</router-link>&nbsp;|&nbsp;<a
        href="javascript:history.back()"
        >Go Back</a
      >
    </h3>
  </div>
</template>

<script setup></script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300');
.container {
  @apply p-8 sm:p-0;
  background: #3498db;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  width: 100vw;
  height: 100vh;
  text-align: center;
}
h1 {
  font-size: 30vh;
}
h2 span {
  font-size: 4rem;
  font-weight: 600;
}
a:link,
a:visited {
  text-decoration: none;
  color: #fff;
}
h3 a:hover {
  text-decoration: none;
  background: #fff;
  color: #3498db;
  cursor: pointer;
}
</style>
