import {
    getInstance
} from "./authWrapper";

export const authGuard = (to, from, next) => {
    const authService = getInstance();

    const fn = () => {
        if (authService.isAuthenticated) {
            return next();
        }
        // eslint-disable-next-line no-debugger
        debugger;
        authService.loginWithRedirect({
            appState: {
                targetUrl: to.fullPath
            }
        });
        return next(false);
    };

    if (!authService.loading) {
        return fn();
    }

    authService.$watch("loading", loading => {

        // eslint-disable-next-line no-console
        console.log(loading)
        if (loading === false) {
            return fn();
        }

        return next(false);
    });
};