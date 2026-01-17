<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emit = defineEmits<{
    (e: 'start'): void;
}>();

</script>
<template>
    <div class="intro-page card">
        <h2>{{ t('introContent.title') }}</h2>
        <va-card>
            <VaCardContent>
                {{ t('introContent.text') }}
            </VaCardContent>
        </va-card>
        <va-card>
            <va-card-title>{{ t('intro.imprint') }}</va-card-title>
            <VaCardContent>
                {{ t('introContent.imprint') }}
            </VaCardContent>
        </va-card>
        <va-card>
            <va-card-title>{{ t('intro.privacy') }}</va-card-title>
            <VaCardContent>
                {{ t('introContent.privacy') }}
            </VaCardContent>
        </va-card>
        <va-card>
            <va-card-title>{{ t('intro.usage') }}</va-card-title>
            <VaCardContent>
                {{ t('introContent.usage') }}
            </VaCardContent>
        </va-card>
        <va-card>
            <va-card-title>{{ t('intro.help') }}</va-card-title>    
            <VaCardContent>
                {{ t('introContent.help') }}
            </VaCardContent>
        </va-card>
        <va-card>
            <VaCardContent>
                <va-button @click="emit('start')" color="primary" class="ml-2">
                    {{ t('introContent.start') }}
                </va-button>
            </VaCardContent>
        </va-card>
    </div>
</template>
<style scoped>
.intro-page {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--va-background-primary, #fff);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
</style>
