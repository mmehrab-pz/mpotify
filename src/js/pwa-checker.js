const appContent = document.getElementById('app-content');
const installScreen = document.getElementById('install-screen');
const installBtn = document.getElementById('install-btn');
const iosInstall = document.getElementById('ios-install');
const androidInstall = document.getElementById('android-install');
const browserMsg = document.getElementById('browser-msg');
const loadingScreen = document.getElementById('loading-screen');

let deferredPrompt;

// حداقل زمان لودینگ به میلی‌ثانیه
const MIN_LOADING_TIME = 3000;
const startTime = Date.now();

// تشخیص PWA نصب شده
const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

if (!isStandalone) {
    //  اگر مرورگر است → فقط پیام نصب
    installScreen.style.display = 'flex';
    detectPlatform();
} else {
    //  PWA → ابتدا لودینگ نمایش داده شود
    loadingScreen.style.display = 'flex';
    appContent.style.display = 'none';

    // بعد از لود کامل سایت، لودینگ مخفی شود و محتوا نمایش داده شود
    window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsed;

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            appContent.style.display = 'block';
        }, remainingTime > 0 ? remainingTime : 0);
    });
}

// Android: نصب واقعی با beforeinstallprompt
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('User installed the app');
            } else {
                console.log('User dismissed install prompt');
            }
        });
    });
});
// تشخیص پلتفرم
function detectPlatform() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isIOS) {
        iosInstall.style.display = 'flex';
        androidInstall.style.display = 'none';
        browserMsg.style.display = 'none';
    } else if (deferredPrompt) {
        // Android با beforeinstallprompt پشتیبانی می‌شود
        androidInstall.style.display = 'flex';
        iosInstall.style.display = 'none';
        browserMsg.style.display = 'none';
    } else {
        // مرورگر معمولی که PWA نصب نمی‌شود
        androidInstall.style.display = 'none';
        iosInstall.style.display = 'none';
        browserMsg.style.display = 'flex';
    }
}