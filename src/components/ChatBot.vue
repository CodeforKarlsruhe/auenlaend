<script setup lang="ts">
import InfoPane from './InfoPane.vue';
import ChatPane from './ChatPane.vue';
import { ref } from 'vue';

import logo from '@/assets/img/auenlaend_square.png';

const hdr = ref("Information");
const text = ref("This is the info pane");
const src = ref<string | null>(logo);
const alt = ref("Auenlaend Logo");
const audioSrc = ref<string | null>(null);
const frameSrc = ref<string | null>(null);

type MsgType = { text: string; type: string };


const emit = defineEmits<{
    (e: 'message', message: { text: string; type: string }): void;
    (e: 'showImage', input: string, more: string | null): void;
    (e: 'showFrame', input: string, more: string | null): void;
    (e: 'playAudio', src: string, more: string | null): void;
    (e: 'clear'): void;
}>();

const msg = (message: MsgType): void => {
    console.log("BOT: Received message from ChatBot:", message);
    emit('message', message);
};

const image = (payload: string, more?: string): void => {
    console.log("BOT: Received image from ChatBot:", payload);
    audioSrc.value = null;
    text.value = more || "";
    hdr.value = "Image display";
    src.value = payload;
    alt.value = "";
    frameSrc.value = null;
    emit('showImage', payload, more || null);
};

const frame = (payload: string, more?: string): void => {
    console.log("BOT: Received frame from ChatBot:", payload);
    frameSrc.value = payload;
    text.value = more || "";
    audioSrc.value = null;
    src.value = null;
    alt.value = "";
    hdr.value = "Frame display";
    emit('showFrame', payload, more || null);
};

const audio = (payload: string, more?: string): void => {
    console.log("BOT: Received audio from ChatBot:", payload);
    audioSrc.value = payload;
    text.value = more || "";
    hdr.value = "Audio Playback";
    src.value = null;
    alt.value = "";
    frameSrc.value = null;
    emit('playAudio', payload, more || null);
};

const clear = (): void => {
    console.log("BOT: Clear received from ChatBot");
    emit('clear');
    src.value = logo;
    alt.value = "Auenlaend Logo";
    audioSrc.value = null;
    text.value = "Info Pane Cleared";
    hdr.value = "Information";
    frameSrc.value = null;
};


</script>

<template>
    <div class="chatbot-container">
        <div class="info">
            <InfoPane :hdr="hdr" :text="text" :alt="alt" :src="src" :audioSrc="audioSrc" :frameSrc="frameSrc"/>
        </div>
        <div class="chat">
            <ChatPane @message="msg"
            @show-image="image"
            @show-frame="frame"
            @play-audio="audio"
            @clear="clear"
            />
        </div>
    </div>
</template>

<style scoped>
.chatbot-container {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--va-background-primary, #fff);   
    height:100%;
    width:100%;
    box-sizing: border-box;
}

/* Mobile-first: below 700px — info above chat (30% / 70%) */
.chatbot-container {
    display: flex;
    flex-direction: column;
}
.info {
    width:100%;
    height: 30%;
    margin-bottom: 12px;
}
.chat {
    width:100%;
    height: 70%;
    font-size: 16px;
    color: var(--va-on-background-primary, #000);
    overflow: auto;
    background-image: url("/img/auen_4_3.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* Desktop: 700px and up — info left of chat, full height, info width 40% */
@media (min-width: 700px) {
    .chatbot-container {
        flex-direction: row;
        align-items: stretch;
    }
    .info {
        width: 40%;
        height: 100%;
        margin-bottom: 0;
        margin-right: 16px;
    }
    .chat {
        width: 60%;
        height: 100%;
        flex: 1;
        background-image: url("/img/auen_square.jpg");
    }
}

</style>