<template>
    <div>
        <navbar> </navbar>
        <div class="container mt-5">
            <div class="row  d-flex justify-content-center">
                <div class="col-md-6">
                    <div class="card border-secondary" v-if="!loading">
                        <div class="card-header" style="background-color:#343a40;">
                            <h6 class="card-title float-left text-white">
                                View User
                            </h6>
                            <NuxtLink to="/users" class="float-right text-white">Back</NuxtLink>
                        </div>
                        <p class="text-center text-secondary font-weight-bold mt-4">
                                Loading, please wait...
                        </p>
                    </div>
                    <div class="card border-secondary" v-else>
                        <div class="card-header" style="background-color:#343a40;">
                            <h6 class="card-title float-left text-white">
                                View User
                            </h6>
                            <NuxtLink to="/users" class="float-right text-white">Back</NuxtLink>
                        </div>
                        <img class="rounded mr-auto ml-auto mt-2" src="http://lorempixel.com/400/200/sports" width="40%" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="text-center text-uppercase">
                                {{ user.username }}
                            </h5>
                            <template v-if="friendRequestSentFrom">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-4">
                                        <form @submit.prevent="acceptFriend">
                                            <button class="btn btn-success btn-block btn-sm">
                                                Accept <i class="bi bi-check-circle-fill"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="col-md-4">
                                        <form @submit.prevent="denyFriend">
                                            <button class="btn btn-danger btn-block btn-sm">
                                                Ignore <i class="bi bi-trash2-fill"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>    
                            </template>
                            <template v-else-if="isFriendWith">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-4">
                                        <form @submit.prevent="deleteFriend">
                                            <button class="btn btn-danger btn-block btn-sm">
                                                Unfriend <i class="bi bi-trash2-fill"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>    
                            </template>
                            <template v-else-if="friendRequestSentTo">
                                <p class="text-center text-info font-weight-bold">
                                    Pending
                                </p>    
                            </template>
                            <template v-else-if="this.$auth.user.id != this.user.id">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-4">
                                        <form @submit.prevent="addFriend">
                                            <button class="btn btn-primary btn-block btn-sm">
                                                Add Friend <i class="bi bi-person-plus-fill"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </template>
                            <hr>
                            <table class="table table-hover table-striped table-borderless">
                                <thead>
                                    <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Created at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.created_at | formatDate }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>    
                </div>
            </div>    
        </div>    
    </div>
    
</template>
<script>
import Navbar from '../../components/Navbar.vue';
export default {
    middleware: ['auth'],
    components: { Navbar },
    data: () => ({
        user:{},
        isFriendWith: '',
        friendRequestSentTo: '',
        friendRequestSentFrom: '',
        loading: false,
        sending: false,
    }),
    
    created() {
        this.getUser();
    },

    methods: {
        getUser() {
            this.loading = false;
            this.$axios.get('/api/users/'+this.$route.params.id)
            .then((resp) => {
                this.user = resp.data.user;
                this.isFriendWith = resp.data.isFriendWith;
                this.friendRequestSentTo = resp.data.friendRequestSentTo;
                this.friendRequestSentFrom = resp.data.friendRequestSentFrom;
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            });
        },

        addFriend() {
            this.$axios.$post( '/api/friends/' + this.$route.params.id )
            .then((resp) => {
                this.getUser();
            })
            .catch((error) => {
                console.log(error);
            })
        },

        acceptFriend() {
            this.$axios.$patch( '/api/friends/' + this.$route.params.id )
            .then((resp) => {
                this.getUser();
            })
            .catch((error) => {
                console.log(error);
            })
        },

        denyFriend() {
            this.$axios.$get( '/api/friends/' + this.$route.params.id )
            .then((resp) => {
                this.getUser();
            })
            .catch((error) => {
                console.log(error);
            })
        },

        deleteFriend() {
            this.$axios.$delete( '/api/friends/' + this.$route.params.id )
            .then((resp) => {
                this.getUser();
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
}
</script>
