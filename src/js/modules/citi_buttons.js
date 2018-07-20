import '../../scss/modules/citi_buttons/citi_buttons.scss';

document.addEventListener('DOMContentLoaded', function () {
    const isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice) {
        const buttons = document.querySelectorAll('.citi-btn');
        for (const btn of buttons) {
            btn.classList.add('touch-device');
        }
        // document.querySelectorAll('.citi-btn').forEach(element => {
        //     element.classList.add('touch-device');
        // });
    }
}, false);