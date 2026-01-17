<script setup lang="ts">
import { watch, toRefs } from 'vue';


const props = defineProps<{
    hdr?: string | null;
    text?: string | null;
    src?: string | null;
    alt?: string | null;
    audioSrc?: string | null;
    frameSrc?: string | null;
}>();

const { hdr, text, src, alt, audioSrc, frameSrc } = toRefs(props);

watch(src, (newSrc) => {
    console.log("Image source changed to:", newSrc);
});
watch(hdr, (newHdr) => {
    console.log("Header changed to:", newHdr);
});
watch(text, (newText) => {
    console.log("Text changed to:", newText);
});

</script>

<template>
    <div class="card info-pane">
    <h2 v-if="hdr">{{ hdr }}</h2>
    <p v-if="text">{{ text }}</p>
    <div v-if="audioSrc" class="audio"  >
        <audio :src="audioSrc" controls autoplay />
    </div>
    <iframe v-if="frameSrc" style="width:100%;height:50%;" :src="frameSrc"></iframe>
    <img v-if="src" :src="src" :alt="alt || ''" />
    <label v-if="src">{{ alt || '' }}</label>
    </div>
</template>

<style scoped>
.info-pane {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--va-background-primary, #fff);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

img {
    display: block;
    margin-top: 12px;
    max-width: 100%;
    height: auto;
    max-height: 50%;
    margin-left: auto;
    margin-right: auto;
}
label {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: var(--va-on-background-secondary);
}
</style>