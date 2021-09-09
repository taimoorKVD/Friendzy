<template>
    <div>
        <navbar></navbar>
        <div class="container mt-4 w-50">
            <div class="card border-secondary">
                <div class="card-header" style="background-color:#343a40;">
                    <h6 class="text-white">Login</h6>
                </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="card card-danger card-outline alert-card-danger" v-if="errors">
                            <ul class="list-group text-danger">
                                <li class="list-group-item">
                                    {{ $errors }}
                                </li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" class="form-control" placeholder="Enter email" id="email" v-model="form.email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" placeholder="Enter your password" id="password" v-model="form.password">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-secondary">Login</button>
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
    head: {
        title: '| Login',
        meta: [
            { hid: 'description', name: 'description', content: 'Login' }
        ],
    },
    components: {
        navbar
    },
    data: () => ({
        form: {
            email: '',
            password: '',
        },
        errors: ''
    }),
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('laravelSanctum',{data: this.form});
            } catch(error) {
                if(error.response.status == 422) {
                    this.errors = error.response.data.errors;
                }
            }
        },
    },
}
</script>
