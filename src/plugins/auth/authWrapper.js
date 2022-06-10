import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () => {
    window.history.replaceState({}, '/login');
}
let instance;

export const getInstance = () => instance;

export const useAuth0 = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin + '/login',
    ...options
}) => {
    if (instance) return instance;

    instance = new Vue({
        data() {
            return {
                loading: true,
                isAuthenticated: false,
                user: {},
                auth0Client: null,
                popupOpen: false,
                error: null
            };
        },
        methods: {
            async loginWithPopup(options, config) {
                this.popupOpen = true;

                try {
                    await this.auth0Client.loginWithPopup(options, config);
                    this.user = await this.auth0Client.getUser();
                    this.isAuthenticated = await this.auth0Client.isAuthenticated();
                    this.error = null;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    this.error = e;
                } finally {
                    this.popupOpen = false;
                }
            },
            async handleRedirectCallback() {
                this.loading = true;
                try {
                    await this.auth0Client.handleRedirectCallback();
                    this.user = await this.auth0Client.getUser();
                    this.isAuthenticated = true;
                    this.error = null;
                } catch (e) {
                    this.error = e;
                } finally {
                    this.loading = false;
                }
            },
            loginWithRedirect(o) {
                // eslint-disable-next-line no-console
                console.log(o)
                    // eslint-disable-next-line no-debugger
                    // debugger;
                let login = this.auth0Client.loginWithRedirect(o)
                window.localStorage.setItem("app_login", JSON.stringify(login))
                return login;
            },
            getIdTokenClaims(o) {
                return this.auth0Client.getIdTokenClaims(o);
            },
            getTokenSilently(o) {
                return this.auth0Client.getTokenSilently(o);
            },
            getTokenWithPopup(o) {
                return this.auth0Client.getTokenWithPopup(o);
            },
            logout(o) {
                return this.auth0Client.logout(o);
            }
        },
        async created() {
            this.auth0Client = await createAuth0Client({
                ...options,
                client_id: options.clientId,
                redirect_uri: redirectUri
            });
            window.app_auth0Client = this.auth0Client
            try {
                if (
                    window.location.search.includes("code=") &&
                    window.location.search.includes("state=")
                ) {
                    const {
                        appState
                    } = await this.auth0Client.handleRedirectCallback();
                    this.error = null;
                    onRedirectCallback(appState);
                }
            } catch (e) {
                this.error = e;
            } finally {
                this.isAuthenticated = await this.auth0Client.isAuthenticated();
                this.user = await this.auth0Client.getUser();
                this.loading = false;
            }
        }
    });

    return instance;
};

export const Auth0Plugin = {
    install: (Vue, options) => {
        Vue.prototype.$auth = useAuth0(options);
    }
};