<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import {onErrorCaptured, onMounted} from "vue";
import router from "./router";

onErrorCaptured(() => {
    this.$router.push('error')
})
onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || null;
    if (token) {
        localStorage.setItem('token', token)
        window.history.pushState({}, document.title, "/");
        router.push('/')
    } else {
        const token = localStorage.getItem('token') || null;
        if (token) {

        }
        router.push('/')
    }
})

</script>

<script>
import {onMounted} from "vue";


</script>

<template>

    <div class="navbar col-span-1 shadow-lg xl:col-span-3 bg-neutral-focus text-neutral-content rounded-box">
        <div class="flex-none px-2 mx-2">
            <router-link to="/" class="text-lg font-bold">
                ROGUE DRONE
            </router-link>
        </div>
        <div class="flex-1 px-2 mx-2">
            <div class="items-stretch hidden lg:flex">
                <router-link to="/srp/new" class="btn btn-ghost btn-sm rounded-btn">
                    Submit SRP request
                </router-link>
                <router-link to="/srp/list" class="btn btn-ghost btn-sm rounded-btn">
                    View SRP list
                </router-link>
            </div>
        </div>
        <div class="flex-none">
            <button class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     class="inline-block w-6 h-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
            </button>
        </div>
        <div class="flex-none">
            <button class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     class="inline-block w-6 h-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    </div>
    <div class="container mx-auto">
        <router-view/>
    </div>
</template>
