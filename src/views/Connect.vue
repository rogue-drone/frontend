<template>
  <div class="card shadow hover:shadow-2xl compact side bg-base-100" v-for="guild in connectable">
    <div class="flex-row items-center space-x-4 card-body">
      <div>
        <DiscordImage type="guild" :guild="guild" class="w-12 h-12"/>
      </div>
      <div class="w-full">
        <h2 class="card-title text-left">{{ guild.name }}</h2>
        <div class="justify-end card-actions">
          <button class="btn btn-outline btn-primary" @click="connect(guild)" v-if="!isConnected(guild)">Connect</button>
          <button class="btn btn-ghost hover:bg-transparent focus:bg-transparent no-animation" v-else>Connected</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DiscordImage from "../components/DiscordImage.vue";

export default {
  name: "Connect",
  components: {
    DiscordImage
  },
  mounted() {
    this.$store.dispatch('guild/getConnectable');
  },
  beforeUnmount() {
    this.$store.dispatch('guild/clearConnectable')
  },
  computed: {
    connectable() {
      return this.$store.getters['guild/connectable'];
    },
    guilds() {
      return this.$store.getters['guild/guilds'];
    }
  },
  methods: {
    connect(guild) {
      this.$router.push('/guilds/connect/'+guild.id)
    },
    isConnected(connectable) {

      const connected = this.guilds.find(guild => parseInt(guild.discordId) === connectable.id)

      return connected !== undefined;
    }
  }
}
</script>

<style scoped>

</style>