import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Theme store with localStorage persistence
function createThemeStore() {
    // Default to dark, will be updated on client init
    const { subscribe, set, update } = writable<'light' | 'dark'>('dark');

    // Initialize on client side
    if (browser) {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            set(stored);
            updateDocument(stored);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            set('light');
            updateDocument('light');
        } else {
            updateDocument('dark');
        }
    }

    function updateDocument(newTheme: 'light' | 'dark') {
        if (browser) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    }

    return {
        subscribe,
        toggle() {
            update(current => {
                const newTheme = current === 'dark' ? 'light' : 'dark';
                updateDocument(newTheme);
                return newTheme;
            });
        },
        set(newTheme: 'light' | 'dark') {
            set(newTheme);
            updateDocument(newTheme);
        }
    };
}

export const themeStore = createThemeStore();
