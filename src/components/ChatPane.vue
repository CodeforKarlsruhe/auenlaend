<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import BotResponse from './BotResponse.vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref<boolean>(false);

type Message = {
    text: string;
    type: 'user' | 'bot' | string;
    idx?: number;
    last?: boolean;
    link?: string | null;
    src?: string | null;
    audioSrc?: string | null;
    options?: string[] | null;
};

const chatMessages = ref<Message[]>([]);
const chatInput = ref<string>("");

const historyPane = ref<HTMLElement | null>(null);


const emit = defineEmits<{
    (e: 'message', message: { text: string; type: string }): void;
    (e: 'showImage', src: string, more?: string): void;
    (e: 'showFrame', src: string, more?: string): void;
    (e: 'playAudio', src: string, more?: string): void;
    (e: 'clear'): void;
}>();



const scrollHistoryToBottom = async () => {
    await nextTick();
    const el = historyPane.value;
    if (el) {
        const height = el.scrollHeight + 200;
        console.log("Scrolling history pane to bottom, height:", height);
        el.scrollTop = height;
    }
};



const appendChatMessage = (message: { text: string; type: string }) => {
    if (!message.text) {
        console.log("Empty message, not appending.");
        emit("clear")
        //chatMessages.value = [];
        return;
    }
    loading.value = true;
    console.log("Appending chat message:", message);
    chatMessages.value.push(message);

    // includes stuff for autobot processing
    let autoBot = true;
    const botMsg: Message = { text: "This is an automated response.", type: "bot" };
    if ("image" === message.text.toLowerCase()) {
        //emit("showImage", "/img/auen_ref.jpg","Fantasy");
        botMsg.text = "Here is an image of Auenländ.";
        botMsg.src = "/img/auen_ref.jpg";
    }
    if ("wiki" === message.text.toLowerCase()) {
        //emit("showImage", "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/c\/c6\/Abeille_charpentiere_1024.jpg\/330px-Abeille_charpentiere_1024.jpg","Wiki Bee");
        botMsg.text = "Wiki Bee.";
        botMsg.src = "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/c\/c6\/Abeille_charpentiere_1024.jpg\/330px-Abeille_charpentiere_1024.jpg";
    }
    if ("audio" === message.text.toLowerCase()) {
        // emit("playAudio", "https:\/\/www.deutsche-digitale-bibliothek.de\/item\/4S5THRPVERDH2DCDJR3WKXJBAPW4EXEP?isThumbnailFiltered=true&query=Tonaufnahme+Eisvogel&rows=20&offset=0&viewType=list&hitNumber=2");
        //emit("playAudio", "https://api.deutsche-digitale-bibliothek.de/binary/aaedf5bc-6ac4-4112-aa42-f4556c5f8ce2.mpeg","Eisvogel Tonaufnahme");
        botMsg.text =  "Eisvogel Tonaufnahme";
        botMsg.audioSrc =  "https://api.deutsche-digitale-bibliothek.de/binary/aaedf5bc-6ac4-4112-aa42-f4556c5f8ce2.mpeg";
    }
    if ("frame" === message.text.toLowerCase()) {
        emit("showFrame", 'https://www.youtube.com/embed/QGbPBJxLg6I', "Rheinauen mit Hund" );
    }
    if ("link" === message.text.toLowerCase()) {
        botMsg.text =  "Nazka Anreise"
        botMsg.link =  "https://nazka.de/anreise";
        //chatMessages.value.push(botMsg);
        //autoBot = false;
    }
    if (message.text && message.text.toLowerCase().startsWith("options")) {
        const items = message.text.split(" ");
        const options = items.slice(1);
        console.log("Parsed options:", options);
        botMsg.text = "Please choose an option:";
        botMsg.options = options;
    }

    // <iframe width="1470" height="827" src="https://www.youtube.com/embed/QGbPBJxLg6I" title="Husky Wanderung durch die Rheinauen bei Karlsruhe" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//<iframe width="1470" height="827" src="https://www.youtube.com/embed/iip-zeX2uFw" title="Die Rheinauen bei Karlsruhe und Au am Rhein" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    scrollHistoryToBottom();
    if (autoBot) {
        setTimeout(async () => {
            console.log("Appending autobot message:", botMsg);
            chatMessages.value.push(botMsg);
            await scrollHistoryToBottom();
            loading.value = false;
        }, 1000);
    }

    emit('message', message);
};

watch(chatInput, (newInput) => {
    console.log("Chat input changed to:", newInput);
});

const botOption = (opt:string) => {
    console.log("Bot option selected:", opt);
    appendChatMessage({ text: opt, type: 'user' });
}

onMounted(() => {
    console.log("ChatPane mounted");
});

</script>

<template>
    <div class="chat-pane">
        <div class="history-pane" ref="historyPane">
            <div v-for="(msg, idx) in chatMessages" class="history" :key="idx">
                <VaInput v-if="msg.type == 'user'" :disabled="true" :stateful="true" :placeholder="msg.text" :class="msg.type"/>
                <BotResponse v-else :text="msg.text" 
                :src="msg.src"  
                :audioSrc="msg.audioSrc"
                :link="msg.link"
                :options="msg.options"
                @optionSelected="(option: string) => botOption(option)"
                :idx="idx"
                :last="idx === chatMessages.length -1"
                />
            </div> 
        </div>

        <VaInput v-model="chatInput" class="mb-6 input" :placeholder="t('input')"
            :autofocus="true"
            :disabled="loading"
            @keyup.enter="appendChatMessage({ text: chatInput, type: 'user' }); chatInput = ''" 
            >
            <template #append>
                <VaIcon v-if="loading" name="refresh" spin class="mr-4 ml-4" color="secondary"
                />
                <VaIcon v-else name="send" class="mr-4 ml-4" color="secondary"
                    @click="appendChatMessage({ text: chatInput, type: 'user' }); chatInput = ''" 
                />
            </template>
        </VaInput>
    </div>

</template>

<style scoped>
.chat-pane {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: unset;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.history-pane {
    /*
    height: calc(100% - 5rem);
    */
    max-height: calc(80% - 6rem);
    width: 100%;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
    position:absolute;
    bottom: 5rem;
}

.input {
    width: 100%;
    color:var(--va-on-background-primary, #000);
    background-color:var(--va-background-primary, #fff);
    border-radius: 8px;
    position: absolute;
    bottom: 1rem;
    left: 0;
    opacity:1.0;
}

.history {
    width: 90%;
    margin-bottom: 8px;
    border-radius: 8px;
    box-sizing: border-box;
}

.user {
    color:var(--va-primary);
    background-color: var(--va-background-primary);
    margin-left: 1rem;
    width:90%;
    margin-bottom: 8px;
    border-radius: 8px;
    box-sizing: border-box;
    padding:4px;
}
.bot {
    margin-right: 1rem;
    width:90%;
    box-sizing: border-box;
}
.va-input-wrapper--disabled {
    opacity:1.0;
}

</style>