<template>
    <div>
        <navbar></navbar>
        <div class="container mt-4 w-50">
            <div class="card border-secondary">
                <div class="card-header" style="background-color:#343a40;">
                    <h6 class="text-white">Register</h6>
                </div>
                <div class="card-body">
                    <form @submit.prevent="register">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" class="form-control" placeholder="Enter your name" id="name" v-model="form.name">
                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                        </div>
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" placeholder="Enter your username" id="username"
                            v-model="form.username">
                            <div class="invalid-feedback" v-if="errors.username">{{ errors.username[0] }}</div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" class="form-control" placeholder="Enter email" id="email"
                            v-model="form.email">
                            <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" placeholder="Enter your password" id="password" v-model="form.password">
                            <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Confirm Password:</label>
                            <input type="password" class="form-control" placeholder="Re-type your password" id="password_confirmation" v-model="form.password_confirmation">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-secondary">Register</button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '../../components/Navbar';

export default {
    middleware: ['guest'],
    components: {
        navbar
    },
    head: {
        title: '| Register',
        meta: [
            { hid: 'description', name: 'description', content: 'Register' }
        ],
    },
    data: () => ({
        form: {
            name: '',
            username: '',
            password: '',
            password_confirmation: '',
        },
        errors: '',
    }),
    methods: {
      async register() {
          try {
              let errors = '';
              await this.$axios.$get('sanctum/csrf-cookie');
              await this.$axios.$post('/register', this.form)
              .then((resp) => {})
              .catch((error) => {
                  if(error.response.status == 422) {
                      errors = error.response.data.errors;
                  }
              });
              this.errors = errors;
            await this.$auth.loginWith('laravelSanctum',{data: this.form});
          } catch(error) {

          }
      }
    },    
}
</script>
