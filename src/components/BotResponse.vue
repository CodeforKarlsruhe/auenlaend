<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { onMounted, ref } from 'vue';

const zoomed = ref(false);

const props = defineProps<{
  text?: string | null;
  src?: string | null;
  audioSrc?: string | null;
  link?: string | null;
  options?: string[] | null;
  idx: number;
  last: boolean;
}>();

const emit = defineEmits<{
  (e: 'optionSelected', option: string): void;
  (e: 'indexClicked', idx: number): void;
}>();

const zoom = () => {
  console.log("Zooming image:", props.src);
  zoomed.value = true;
};

const idxClicked = () => {
  console.log("Index clicked:", props.idx);
  emit('indexClicked', props.idx);  
}

onMounted(() => {
  console.log("BotResponse mounted with props:", props);
});

</script>

<template>
  <!--
    <div class="bot-pane">
    <p v-if="text">{{ text }}</p>
    <va-img v-if="src" :src="src"  />
    <div v-if="options && options.length > 0" class="options-pane mt-4">
    <va-button v-for="(option, idx) in options" :key="idx" class="m-2" color="primary"
        @click="emit('optionSelected', option)">
        {{ option }}
    </va-button>
    </div>
    </div>
-->
  <va-chip @click="idxClicked">{{ idx }}</va-chip>
  <VaCard class="bot-pane">
    <VaCardBlock class="flex-nowrap" horizontal>
      <div class="flex-auto">
        <VaCardContent v-if="text && !link">
          <span class="bot-text">
            {{ text }}
          </span>
        </VaCardContent>
        <VaCardContent v-if="audioSrc" class="audio">
          <audio :src="audioSrc" controls autoplay />
        </VaCardContent>
        <VaCardContent v-if="text && link">
          <a :href="link" target="_blank" rel="noopener noreferrer" class="bot-link">
            {{ text }}
          </a>
          <VaIcon name="open_in_new" class="ml-1" size="1.5rem" :color='"var(--va-info)"' :alt="t('openNew')" />
        </VaCardContent>
        <VaCardContent v-if="options && options.length > 0">
          <div class="options-pane mt-4">
            <va-button v-for="(option, idx) in options" :key="idx" class="m-2 mr-2" color="primary"
              @click="emit('optionSelected', option)" :disabled="!last">
              {{ option }}
            </va-button>
          </div>
        </VaCardContent>
      </div>
      <VaImage v-if="src" class="flex-grow-0 flex-shrink-0 basis-52 bot-image" :src="src" @click="zoom"/>
    </VaCardBlock>
  </VaCard>

 <VaModal v-if="src"
    v-model="zoomed"
    fullscreen
    hide-default-actions
    :close-button="true"
  >
    <div class="flex flex-col gap-2">
      <VaImage
        :src="props.src || ''"
      />
      </div>
  </VaModal>

</template>

<style scoped>
.bot-pane {
  padding: 4px;
  border-radius: 8px;
  height: 100%;
  width: 90%;
  box-sizing: border-box;
  color: var(--va-info);
  background-color: var(--va-background-primary);
  /*, #f8d7da);*/
  margin-right: 1rem;
}

.bot-text {
  color: var(--va-info);
}

.bot-image {
    min-width:30%;
}

img {
  display: block;
  margin-top: 12px;
  max-width: 100%;
  min-width: 30%;
  height: auto;
  max-height: 50%;
  margin-left: auto;
  margin-right: auto;
}

label {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>

<style scoped lang="scss">
@use "sass:color";
@use '@/style/colors.scss';

.va-card {
  background-color: light-dark(colors.$dash-bg2-light, colors.$dash-bg2-dark);
}
</style>

<style>
.va-modal__close {
  color: var(--va-danger);
  background-color:var(--va-background-primary);
}

</style>