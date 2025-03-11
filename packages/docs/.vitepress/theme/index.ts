import type { App } from 'vue'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import DefaultTheme from 'vitepress/theme'
import EasyCollectivUI from 'easy-collective-ui';
import '@vitepress-demo-preview/component/dist/style.css'
import "easy-collective-ui/dist/index.css"

export default {
    ...DefaultTheme,
    enhanceApp({ app }: {app: App}) {
        app.component('demo-preview', AntDesignContainer)
        app.use(EasyCollectivUI)
    }
}