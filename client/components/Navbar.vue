<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <NuxtLink class="navbar-brand" to="/">
        Kingdom Vision
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <template v-if="this.$auth.loggedIn">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <NuxtLink to="/users/" class="nav-link">Users</NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink to="/friends/" class="nav-link">Friends</NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link text-uppercase mr-5">
                Welcome,  {{ this.$auth.user.username }}
              </a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link" @click.prevent="logout">
              Logout
              </a>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="navbar-nav mr-auto">
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink to="/auth/login" class="nav-link">Login</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/auth/register" class="nav-link">Register</NuxtLink>
            </li>
          </ul>
        </template>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    }
  },
}
</script>
