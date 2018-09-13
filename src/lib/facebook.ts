import { FB_CLIENT_ID, FB_REDIRECT_URL } from '../env';

export const facebookCookie = 'fb_login';
export const facebookRelogKey = 'auto_relog_facebook';

export const facebookLoginUrl = 'https://www.facebook.com/v2.10/dialog/oauth' +
    `?client_id=${FB_CLIENT_ID}` +
    `&redirect_uri=${FB_REDIRECT_URL}` +
    '&response_type=token' +
    '&scope=public_profile,user_friends';

export function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2)
        return parts.pop()!.split(';').shift();
}

export function shouldRelog() {
    const storageValue = window.localStorage.getItem(facebookRelogKey);
    return storageValue && storageValue === 'true';
}

export function getAccessToken() {
    return getCookie(facebookCookie);
}

export function saveAccessToken(accessToken, expiresIn) {
    const expiredDate = new Date(new Date().getTime() + expiresIn * 1000)['toGMTString']();
    document.cookie = `${facebookCookie}=${accessToken};expires=${expiredDate}`;
    window.localStorage.setItem(facebookRelogKey, JSON.stringify(true));
    window.history.replaceState(null, JSON.stringify(null), window.location.href.split('?')[0]);
}

export function removeAccessToken() {
    const expiredDate = new Date(new Date().getTime() - 1)['toGMTString']();
    document.cookie = `${facebookCookie}=null;expires=${expiredDate}`;
    window.localStorage.setItem(facebookRelogKey, JSON.stringify(false));
}