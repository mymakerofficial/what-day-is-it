import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            theme: '',
            shareUrl: '',
            pageTitle: ''
        },
        mutations: {
            initialiseStore(state) {
                if(localStorage && localStorage.getItem('theme') != null){
                    state.theme = localStorage.getItem('theme')
                }else {
                    state.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                }
                document.documentElement.className = state.theme
            },
            updateTheme(state, payload) {
                state.theme = payload
                localStorage.setItem('theme', payload);
                document.documentElement.className = payload
            },
            updateShareUrl(state, payload) {
                state.shareUrl = payload
            },
            updatePageTitle(state, payload) {
                state.pageTitle = payload

                document.title = payload === "what's the day?" ? payload : `${payload} | what's the day?`
            }
        }
    });
}

export default createStore;
