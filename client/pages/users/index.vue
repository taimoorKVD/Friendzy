<template>
    <div>
        <navbar></navbar>
        <div class="container mt-5">
            <div class="card border-secondary">
                <div class="card-header" style="background-color:#343a40;">
                    <h6 class="card-title text-white">
                        Users
                    </h6>
                </div>
                <div class="card-body">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Profile</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!loading">
                                <td colspan="6" class="text-center text-secondary font-weight-bold">
                                    Loading, please wait...
                                </td>
                            </tr>
                            <tr v-else v-for="user in users.users" :key="user.id">
                                <th scope="row">{{ user.id }}</th>
                                <td scope="col">
                                    <img class="rounded-circle" src="http://lorempixel.com/400/200/sports" alt="..." width="60px"/>
                                </td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.created_at | formatDate  }}</td>
                                <td>
                                    <NuxtLink :to="`/users/${user.id}`" class="text-secondary">View</NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>    
    </div>
    

</template>
<script>
import Navbar from '../../components/Navbar.vue';
export default {
    middleware: ['auth'],
    head: {
        title: '| Users',
        meta: [
            { hid: 'description', name: 'description', content: 'Users' }
        ],
    },
    
    components: { Navbar },
    data: () => ({
  
        users:[],
        loading: false,
    }),
    
    mounted() {
        this.getUsers();
    },

    methods: {
        getUsers() {
            this.loading = false;
            this.$axios.get('/api/users')
            .then((resp) => {
                this.users = resp.data;
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },

}
</script>
