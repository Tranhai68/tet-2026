// ========================================
// APP LOGIC — Trang Lắc Quẻ Chính
// ========================================

let isShaking = false;
let lastWishIndex = -1;

// =================== SHAKE DETECTION ===================
let lastAccX = 0, lastAccY = 0, lastAccZ = 0;
let lastShakeTime = 0;
let shakeReady = false;
let motionSamples = 0;
const SHAKE_THRESHOLD = 25; // Total acceleration change threshold
const SHAKE_COOLDOWN = 2000;

function initShakeDetection() {
    // Only on mobile / touch devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!isSecure) {
        console.log('Shake requires HTTPS');
        return;
    }

    if (!('DeviceMotionEvent' in window)) return;

    // Show the enable button on mobile
    const enableBtn = document.getElementById('enableShakeBtn');
    if (enableBtn) enableBtn.style.display = 'block';
}

// Called by the "BẬT LẮC" button
function enableShake() {
    const statusEl = document.getElementById('shakeStatus');
    const enableBtn = document.getElementById('enableShakeBtn');

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS — must request permission from user gesture
        DeviceMotionEvent.requestPermission()
            .then(permission => {
                if (permission === 'granted') {
                    activateShake(statusEl, enableBtn);
                } else {
                    showToast('❌ Bạn cần cho phép truy cập cảm biến!');
                    if (statusEl) {
                        statusEl.style.display = 'inline-block';
                        statusEl.textContent = '❌ Chưa cấp quyền';
                        statusEl.style.color = '#ff6b6b';
                    }
                }
            })
            .catch(err => {
                showToast('❌ Lỗi: ' + err.message);
                console.error(err);
            });
    } else {
        // Android — no permission needed
        activateShake(statusEl, enableBtn);
    }
}

function activateShake(statusEl, enableBtn) {
    window.addEventListener('devicemotion', handleMotion, true);
    shakeReady = true;

    if (enableBtn) {
        enableBtn.textContent = '✅ ĐÃ BẬT LẮC';
        enableBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        enableBtn.disabled = true;
    }
    if (statusEl) {
        statusEl.style.display = 'inline-block';
        statusEl.textContent = '📱 Lắc điện thoại để gieo quẻ!';
        statusEl.style.color = '#2ecc71';
    }
    showToast('📱 Đã bật! Lắc mạnh điện thoại để gieo quẻ!');
}

function handleMotion(event) {
    if (!shakeReady) return;

    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;

    // Skip the first few samples (calibration)
    motionSamples++;
    if (motionSamples < 5) {
        lastAccX = x; lastAccY = y; lastAccZ = z;
        return;
    }

    const deltaX = Math.abs(x - lastAccX);
    const deltaY = Math.abs(y - lastAccY);
    const deltaZ = Math.abs(z - lastAccZ);
    const totalDelta = deltaX + deltaY + deltaZ;

    lastAccX = x;
    lastAccY = y;
    lastAccZ = z;

    // Detect shake
    const now = Date.now();
    if (totalDelta > SHAKE_THRESHOLD && now - lastShakeTime > SHAKE_COOLDOWN) {
        lastShakeTime = now;
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        shakeForFortune();
    }
}

// =================== INIT ===================
document.addEventListener('DOMContentLoaded', () => {
    updateSpinCounter();
    initShakeDetection();
});

// =================== CORE LOGIC ===================

function shakeForFortune() {
    if (isShaking) return;
    isShaking = true;

    const btn = document.getElementById('shakeBtn');
    const card = document.getElementById('fortuneCard');
    const icon = document.getElementById('fortuneIcon');

    // Shake animation
    btn.classList.add('shaking');
    card.style.animation = 'shakeAnimation 0.6s ease-in-out';
    if (icon) {
        icon.classList.remove('shaking');
        void icon.offsetWidth; // reflow to restart animation
        icon.classList.add('shaking');
    }

    // After shake animation completes
    setTimeout(() => {
        btn.classList.remove('shaking');
        card.style.animation = '';
        if (icon) icon.classList.remove('shaking');

        // Get random wish
        const wish = getRandomWish();

        // Check for lucky money
        const settings = getSettings();
        const luckyMoney = checkLuckyMoney(settings);

        // Record the spin
        recordSpin(wish, luckyMoney);
        updateSpinCounter();

        // Show result
        showResult(wish, luckyMoney);

        isShaking = false;
    }, 700);
}

function getRandomWish() {
    const wishes = getWishes();
    if (wishes.length === 0) return "Chúc bạn năm mới vui vẻ! 🎊";

    let index;
    // Avoid same wish consecutive
    if (wishes.length > 1) {
        do {
            index = Math.floor(Math.random() * wishes.length);
        } while (index === lastWishIndex);
    } else {
        index = 0;
    }
    lastWishIndex = index;
    return wishes[index];
}

function checkLuckyMoney(settings) {
    const chance = settings.luckyMoneyChance || 5;
    const roll = Math.random() * 100;

    if (roll < chance) {
        // Won! Pick random amount
        const amounts = settings.luckyMoneyAmounts || [20000, 50000, 100000];
        if (amounts.length === 0) return 0;
        return amounts[Math.floor(Math.random() * amounts.length)];
    }
    return 0;
}

// =================== UI ===================

function showResult(wish, luckyMoney) {
    const modal = document.getElementById('resultModal');
    const emoji = document.getElementById('modalEmoji');
    const wishText = document.getElementById('modalWish');
    const envelopeSection = document.getElementById('envelopeSection');
    const luckyAmountEl = document.getElementById('luckyAmount');

    wishText.textContent = wish;

    if (luckyMoney > 0) {
        // Lucky money winner!
        emoji.textContent = '🎊';
        envelopeSection.classList.remove('hidden');
        luckyAmountEl.textContent = formatMoney(luckyMoney);
        // Extra confetti for winners
        createConfetti(40);
    } else {
        // Just a wish
        const emojis = ['🌸', '🎋', '✨', '🌺', '🎊', '🍀', '🌟', '🎆'];
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        envelopeSection.classList.add('hidden');
        createConfetti(15);
    }

    // Show modal
    modal.classList.add('active');

    // Reset animations in modal content
    const content = modal.querySelector('.modal-content');
    content.style.animation = 'none';
    content.offsetHeight; // trigger reflow
    content.style.animation = '';
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.classList.remove('active');
    // Remove confetti
    document.querySelectorAll('.confetti-piece').forEach(el => el.remove());
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// =================== CONFETTI ===================

function createConfetti(count) {
    // Remove existing confetti
    document.querySelectorAll('.confetti-piece').forEach(el => el.remove());

    const colors = [
        '#FFD700', '#FF6B6B', '#E63946', '#FFA500',
        '#FF1493', '#FFE55C', '#C41E3A', '#FF4500',
        '#FFDAB9', '#DAA520', '#8B0000', '#FF69B4'
    ];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';

        // Random shape
        const shapes = ['circle', 'square', 'rectangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
            confetti.style.width = confetti.style.height = (Math.random() * 8 + 6) + 'px';
        } else if (shape === 'rectangle') {
            confetti.style.width = (Math.random() * 6 + 4) + 'px';
            confetti.style.height = (Math.random() * 14 + 8) + 'px';
        } else {
            confetti.style.width = confetti.style.height = (Math.random() * 8 + 6) + 'px';
        }

        document.body.appendChild(confetti);
    }

    // Auto-cleanup after 5 seconds
    setTimeout(() => {
        document.querySelectorAll('.confetti-piece').forEach(el => el.remove());
    }, 5000);
}

// =================== SPIN COUNTER ===================

function updateSpinCounter() {
    const stats = getStats();
    const counter = document.getElementById('spinCount');
    if (counter) {
        counter.textContent = stats.totalSpins;
    }
}

// =================== TOAST ===================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// =================== KEYBOARD SUPPORT ===================
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        const modal = document.getElementById('resultModal');
        if (modal.classList.contains('active')) {
            closeModal();
        } else {
            shakeForFortune();
        }
        e.preventDefault();
    }
    if (e.code === 'Escape') {
        closeModal();
    }
});
