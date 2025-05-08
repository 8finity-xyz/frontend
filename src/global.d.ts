import { TStat } from './components/Primary/Primary';

declare global {
    interface Window {
        __STATS__?: TStat;
    }
}
