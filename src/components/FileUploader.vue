<script>
import { ref, computed } from 'vue'
export default {
  // props seem best defined in the Object API style as we're used to
  props: {
    id: { type: String, default: 'drag-and-drop-input' },
    multiple: { type: Boolean, default: false },
    color: { type: String, default: 'gray' },
  },
  // Everything else goes in a setup function
  setup(props, { emit }) {
    // keep up with the files state (think data)
    const files = ref([])

    // display the uploaded file names (think computed)
    const uploadInfo = computed(() => {
      return files.value.length === 1
          ? files.value[0].name
          : `${files.value.length} files selected`
    })

    // handle the file upload event (think methods)
    const handleUpload = (e) => {
      files.value = Array.from(e.target.files) || []
      emit('input', files)
    }

    return { files, uploadInfo, handleUpload }
  },
}
</script>

<template>
  <label :for="id" class="block h-64 relative overflow-hidden rounded-lg border-base-300 border">
    <!--
    * The input has an "overlayed" class which we define using @apply in the style block below
    * This ensures that no matter where you drag inside of the "drop zone" the default browser behavior for file inputs will kick in and assign that file(s) to the input
    * If we didn't do this the browser would instead just attempt to open the file in the window
    -->
    <input
        :id="id"
        :multiple="multiple ? 'multiple' : null"
        @change="handleUpload"
        class="visi"
        type="file"
    />
    <!-- This is where we do the fancy styling with Tailwind CSS and transform this thing from a normal file input to a nicely styled drag and drop dropzone-->

    <!-- The pointer-events-none class here is very important as it allows our drags and clicks to pass through to the input underneath -->
    <span
        :class="`overlayed bg-${color}-100 border-${color}-300 border text-${color}-800 pointer-events-none`"
    >
      <span class="text-center">
        <!-- Let's use a slot here to make our component a little more flexible (maybe the end developer would live to add an icon in there, etc) -->
        <slot>
          <strong>Upload File</strong>
        </slot>

        <!--
        * Print out the file name so the user gets the feedback that the input accepted the file appropriately
        * This is really the only part that relies on Vue,
        the actual drag and drop functionality is handled by the default browser behavior for the input.
        This puts the majority of the functionality on the browser which is great!
        That means we don't have to mess with it
        -->
        <small v-if="files.length" :class="`text-${color}-600 block`">
          <slot name="file" :files="files" :uploadInfo="uploadInfo">
            {{ uploadInfo }}
          </slot>
        </small>
      </span>
    </span>
  </label>
</template>

<style scoped>
/* Finally we use Tailwind CSS to create our overlayed class */
.overlayed {
  @apply  absolute
          top-0
          left-0
          right-0
          bottom-0
          w-full
          h-full
          grid
          bg-base-100
          grid-flow-col
          auto-cols-max
          auto-rows-max
          content-center
          justify-center;
}
</style>