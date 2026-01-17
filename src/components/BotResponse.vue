<script setup lang="ts">

const props = defineProps<{
    text?: string | null;
    src?: string | null;
    options?: string[] | null;
    idx: number;
    last: boolean;
}>();

const emit = defineEmits<{
    (e: 'optionSelected', option: string): void;
}>();


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
    <va-chip>{{ idx }}</va-chip>
    <VaCard class="bot-pane" >
      <VaCardBlock
        class="flex-nowrap"
        horizontal
      >
        <div class="flex-auto">
          <VaCardContent v-if="text">
            <span class="bot-text">
            {{ text }}
            </span>
          </VaCardContent>
          <VaCardContent v-if="options && options.length > 0">
            <div  class="options-pane mt-4">
            <va-button v-for="(option, idx) in options" :key="idx" class="m-2 mr-2" color="primary"
                @click="emit('optionSelected', option)" :disabled="!last">
                {{ option }}
            </va-button>
            </div>
          </VaCardContent>
        </div>
        <VaImage v-if="src"
          class="flex-grow-0 flex-shrink-0 basis-52"
          :src="src"
        />
      </VaCardBlock>
    </VaCard>

</template>

<style scoped>
.bot-pane {
    padding: 4px;
    border-radius: 8px;
    height: 100%;
    width: 90%;
    box-sizing: border-box;
    color:var(--va-info);
    background-color: var(--va-background-primary); /*, #f8d7da);*/
    margin-right: 1rem;
}
.bot-text {
    color: var(--va-info);
}

img {
    display: block;
    margin-top: 12px;
    max-width: 100%;
    min-width:30%;
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
        background-color: light-dark(colors.$dash-bg2-light,colors.$dash-bg2-dark);
    }
</style>