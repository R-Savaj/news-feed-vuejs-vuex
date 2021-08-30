<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/news">News</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/class">Class</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/student">Student</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/teacher">Teacher</router-link>
        </li>
      </ul>  
    </div>
  </nav>
</template>
<script>
export default {
    name: 'Navbar'
}
</script>