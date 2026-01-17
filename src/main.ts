import { createApp } from 'vue'
import App from './App.vue'

import "@fontsource/roboto/latin-400.css"; // Defaults to weight 400
import "@fontsource/roboto-condensed/latin-400.css"; // Defaults to weight 400
import "@fontsource/roboto/latin-500.css"; // Defaults to weight 400
import "@fontsource/roboto-condensed/latin-500.css"; // Defaults to weight 400
import "@fontsource/roboto/latin-700.css"; // Defaults to weight 400
import "@fontsource/roboto-condensed/latin-700.css"; // Defaults to weight 400

import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/outlined.css';


import { createVuestic } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";

// after vuestic-css
import './style/style.scss'

// internationalization
const defaultLocale = "de"
// globals messages and for App.vue, apart from sidebar
import messagesRaw from '@/locales/lang.json?raw';
const messages = JSON.parse(messagesRaw);
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    messages: {
        ...messages
    },
});

// Set lang attribute dynamically
document.documentElement.lang = i18n.global.locale.value;

const app = createApp(App)

app.use(i18n)
app.use(
    createVuestic(
        {
            config: {
                colors: {
                    presets: {
                        light: {
                            primary: "#048500",
                        },
                        dark: {
                            primary: "#048500",
                        },
                    },
                },
            },
        }
    )
)


app.mount('#app')
