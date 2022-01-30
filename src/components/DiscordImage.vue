<template>
    <div class="avatar" v-if="objectHasImage">
        <div class="rounded-full w-full h-full">
            <img :src="image" alt=""/>
        </div>
    </div>
    <div class="avatar placeholder" v-else>
        <div class="bg-primary-focus text-neutral-content rounded-full w-full h-full">
            <span>{{ firstLetter }}</span>
        </div>
    </div>
</template>

<script setup>
const DISCORD_CDN_URI = "https://cdn.discordapp.com/";

const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return ['guild', 'user'].includes(value);
        }
    },
    user: {
        type: Object,
        required: false
    },
    guild: {
        type: Object,
        required: false
    }
})

</script>


<script>
export default {
    name: "UserAvatar",
    computed: {
        objectHasImage() {
            switch (this.type) {
                case 'user':
                    return !this.user.avatar.includes('/.webp');
                case 'guild':
                   return !this.guild.icon.includes('/.webp');
            }
        },
        firstLetter() {
            switch (this.type) {
                case 'user':
                    return this.user.name[0];
                case 'guild':
                    return this.guild.name[0];
            }
        },
        image() {
            let image;

            switch (this.type) {
                case 'user':
                    image = this.user.avatar;
                    break;
                case 'guild':
                    image = this.guild.icon;
                    break;
            }

            return image;
        }
    }
}
</script>

<style scoped>

</style>