<template>
  <div class="columns-1">
    <div class="card flex-shrink-0 shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="card-title">New SRP Request</div>
        <form ref="srp">
          <div class="form-control w-full max-w-xs">
            <label for="discord-name" class="label">
              <span class="label-text">Discord ID</span>
            </label>
            <input type="text" name="discord-name" id="discord-name" class="input input-bordered" :value="this.user.username+'#'+this.user.discriminator" disabled>
          </div>
          <div class="form-control w-full max-w-xs">
            <label for="game-name" class="label">
              <span class="label-text">IGN</span>
            </label>
            <input type="text" name="game-name" id="game-name" class="input input-bordered" value="Gitolite Okaski" disabled>
          </div>
          <div class="form-control w-full max-w-xs">
            <label for="op-date" class="label">
              <span class="label-text">Date of loss</span>
            </label>
            <input type="date" name="op-date" id="op-date" class="input input-bordered" :value="currentDate.toFormat('dd-MM-YYYY')">
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Fleet Commander</span>
            </label>
            <select class="select select-bordered w-full">
              <option disabled="disabled" selected="selected">Select one...</option>
              <option>[ORC] Ozyer</option>
              <option>[LOST] Phoenix Tasador</option>
              <option>[ORC] Meliodas</option>
            </select>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Ship hull lost</span>
            </label>
            <select class="select select-bordered w-full">
              <option disabled="disabled" selected="selected">Select one...</option>
              <optgroup label="Brawler">
                <option value="1">Typhoon</option>
                <option value="2">Tornado</option>
              </optgroup>
              <optgroup label="Kite">
                <option value="3">Dominix</option>
                <option value="4">Armageddon</option>
              </optgroup>
            </select>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Operation type</span>
            </label>
            <select class="select select-bordered w-full">
              <option disabled="disabled" selected="selected">Select one...</option>
              <option value="1">CTA</option>
              <option value="2">Home Defence</option>
            </select>
          </div>

          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Screenshots</span>
            </label>
            <div class="shrink-0">
            </div>
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input type="file" class="upload-screenshot" multiple/>
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import FileUploader from "../components/FileUploader.vue";
import { DateTime } from "luxon";

export default {
  components: {FileUploader},
  setup() {
    const currentDate = ref(DateTime.now())

    return {
      currentDate
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style scoped>
.upload-screenshot {
  @apply  block
          w-full
          text-sm
          file:mr-4
          file:py-2
          file:px-4
          file:rounded-lg
          file:border-0
          file:font-semibold
          file:btn
          file:btn-primary
          file:btn-sm;
}
</style>