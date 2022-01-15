<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import {onErrorCaptured, onMounted} from "vue";
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/vue";

onErrorCaptured((err) => {
    Sentry.captureException(err)
    router.push('error')
})

onMounted(() => {
    store.dispatch('auth/login').then(
        (data) => {
            store.dispatch('guild/getGuilds');
            store.dispatch('app/setLoaded');

        },
        (error) => {
            Sentry.captureException(error)
            router.push('error')
        }
    )
})
</script>

<script>
import {ref} from "vue";
import DiscordImage from "./components/DiscordImage.vue";
import IconDiscord from '~icons/fa-brands/discord';
import IconChevronDown from '~icons/fa-solid/chevron-down';
import IconTimes from '~icons/fa-solid/times';
import IconLogout from '~icons/fa-solid/door-open';
import authHeader from "./services/auth.header";
import logo from './assets/logo.jpg';


export default {
    components: {
        IconDiscord,
        IconTimes,
        IconChevronDown,
        IconLogout,
        DiscordImage
    },
    methods: {
        login() {
            this.$store.dispatch('auth/login').then(
                (data) => {
                    this.$store.dispatch('app/setLoaded');
                },
                (error) => {
                    this.$router.push('/connect');
                }
            )
        },
        logout() {
            this.$store.dispatch('auth/logout')
        },
        selectActiveGuild(guild) {
            this.$store.dispatch('app/setActiveGuild', guild).then(
                (data) => {
                    if (null !== guild) {
                        this.$router.push('/guild')
                        return;
                    }
                    this.$router.push('/')
                }
            )
        }
    },
    computed: {
        isLoaded() {
            return this.$store.getters['app/isLoaded'];
        },
        loggedIn() {
            return this.$store.getters['auth/loggedIn'];
        },
        user() {
            return this.$store.getters['auth/user'];
        },
        activeGuild() {
            return this.$store.getters['app/activeGuild'];
        },
        guildList() {
            if (this.activeGuild !== null) {
                return this.$store.getters['guild/guilds'].filter(guild => guild !== this.activeGuild)
            }
            return this.$store.getters['guild/guilds'];
        }
    },
    data() {
        return {
            logo
        }
    }
}
</script>

<style scoped>
.btn-discord {
    background-color: #5865F2;
}
</style>

<template>

    <div class="navbar shadow-lg bg-neutral-focus text-neutral-content lg:rounded-box col-span-1 md:col-span-3 lg:col-span-4">
        <div class="flex-none px-2 mx-2">
            <router-link
                to="/"
                class="btn btn-ghost no-animation font-bold hover:bg-transparent focus:bg-transparent"
            >
                <div class="">Rogue drone</div>
            </router-link>

        </div>
        <div class="flex-1 px-2 mx-2">
            <div class="items-stretch">
                <router-link to="/srp/new" class="btn btn-ghost rounded-btn">
                    Submit SRP request
                </router-link>
                <router-link to="/srp/list" class="btn btn-ghost rounded-btn">
                    View SRP list
                </router-link>
            </div>
        </div>
        <div class="flex-none" v-if="isLoaded">
            <div class="dropdown dropdown-end">
                <div class="btn  btn-ghost rounded-btn" v-if="activeGuild" @click="selectActiveGuild(null)">
                    <discord-image type="guild" :guild="activeGuild" class="h-10 w-10 mr-2"/>
                    {{activeGuild.name}}
                    <IconTimes class="ml-1 lg:ml-2 w-4 h-4"/>
                </div>
                <div tabindex="1" class="btn btn-ghost rounded-btn" v-else>
                    Select guild
                    <IconChevronDown class="ml-1 lg:ml-2 w-4 h-4" />
                </div>
                <ul tabindex="1" class="shadow menu dropdown-content bg-base-100 text-neutral rounded-box" v-if="!activeGuild">
                    <li v-for="guild in guildList">
                        <a @click="selectActiveGuild(guild)">
                            <div>
                                <discord-image type="guild" :guild="guild" class="h-10 w-10 mr-2"/>
                            </div>
                            <span class="whitespace-nowrap">{{ guild.name }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex-none" v-if="!loggedIn">
            <a @click="login" class="btn   btn-round btn-discord">
                <div class="hidden lg:block">Connect with</div>
                <IconDiscord class="inline-block ml-2 w-6 h-6 stroke-current" />
            </a>
        </div>
        <div class="flex-none" v-else>
            <div class="dropdown dropdown-end" v-if="isLoaded && user">
                <div tabindex="0" class="btn btn-ghost rounded-btn align-middle">
                    <discord-image type="user" :user="user" class="h-10 w-10 mr-2"/>
                    <div class="hidden lg:block">{{ user.username }}<div class="text-neutral inline-block">#{{ user.discriminator }}</div></div>
                    <IconChevronDown class="ml-2 w-4 h-4"/>
                </div>
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 text-neutral rounded-box">
                    <!--                    <li class="divider my-1.5 h-px"></li>-->
                    <li>
                        <a @click="logout">
                            <IconLogout class="mr-2"/>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container mx-auto col-span-1 md:col-span-3 lg:col-span-4">
        <router-view/>
    </div>
</template>
