<template>
    <div>
        <navbar> </navbar>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6">
                    <div class="card border-secondary">
                        <div class="card-header" style="background-color:#343a40;">
                            <h6 class="text-white text-center">Friend Request</h6>
                        </div>
                        <div class="card-body">
                            <template v-if="!loading">
                                <p class="text-center text-secondary font-weight-bold">
                                    Loading, please wait...
                                </p>
                            </template>
                            <template v-else>
                                <template v-if="requests.length">
                                    <ul class="list-group text-secondary" v-for="request in requests" :key="request.id">
                                        <li class="list-group-item mt-1">
                                            <p class="text-center">
                                                <img src="http://lorempixel.com/400/200/sports" class="rounded-circle" alt="" width="100px">
                                            </p>
                                            <p class="text-center">
                                                {{ request.username }}
                                            </p>
                                            <div class="row d-flex justify-content-center">
                                                <div class="col-md-4">
                                                    <form @submit.prevent="acceptFriend(request.id)">
                                                        <button class="btn btn-success btn-block btn-sm">
                                                            Accept <i class="bi bi-check-circle-fill"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                                <div class="col-md-4">
                                                    <form @submit.prevent="denyFriend(request.id)">
                                                        <button class="btn btn-danger btn-block btn-sm">
                                                            Ignore <i class="bi bi-trash2-fill"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div> 
                                        </li>
                                    </ul>
                                </template>
                                <template v-else>
                                    <h4 class="text-center">No friend request yet.</h4>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card border-secondary">
                        <div class="card-header" style="background-color:#343a40;">
                            <h6 class="text-white text-center">Friend List</h6>
                        </div>
                        <div class="card-body">
                            <template v-if="!loading">
                                <p class="text-center text-secondary font-weight-bold">
                                    Loading, please wait...
                                </p>
                            </template>
                            <template v-else>
                                <template v-if="friends.length">
                                    <ul class="list-group text-secondary" v-for="friend in friends" :key="friend.id">
                                        <li class="list-group-item mt-1">
                                            <p class="text-center">
                                                <img src="http://lorempixel.com/400/200/sports" class="rounded-circle" alt="" width="100px">
                                            </p>
                                            <p class="text-center">
                                                {{ friend.username }}
                                            </p>
                                            <div class="row d-flex justify-content-center">
                                                <div class="col-md-4">
                                                    <form @submit.prevent="deleteFriend(friend.id)">
                                                        <button class="btn btn-danger btn-block btn-sm">
                                                            Ignore <i class="bi bi-trash2-fill"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div> 
                                        </li>
                                    </ul>
                                </template>
                                <template v-else>
                                    <h4 class="text-center">Friend list is empty.</h4>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../../components/Navbar.vue'
export default {
    middleware: ['auth'],
    components: { Navbar },
    data: () => ({
        friends: [],
        requests: [],
        loading: false,
    }),

    mounted () {
        this.getFriends();
    },

    methods: {
        getFriends() {
            this.loading = false;
            this.$axios.get('/api/friends')
            .then((resp) => {
                this.friends = resp.data.friends;
                this.requests = resp.data.requests;
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        
        acceptFriend(id) {
            this.loading = false;
            this.$axios.$patch( '/api/friends/' + id )
            .then((resp) => {
                this.getFriends();
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            })
        },

        denyFriend(id) {
            this.loading = false;
            this.$axios.$get( '/api/friends/' + id )
            .then((resp) => {
                this.getFriends();
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            })
        },

        deleteFriend(id) {
            this.loading = false;
            this.$axios.$delete( '/api/friends/' + id )
            .then((resp) => {
                this.getFriends();
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
}
</script>