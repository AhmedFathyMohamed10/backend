<template>
  <div id="app">
    <header>
      <h1>Drugs Page</h1>
    </header>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}
h1 {
  margin: 0;
}
</style>
