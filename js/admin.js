// ========================================
// ADMIN LOGIC — Trang Quản Trị
// ========================================

let currentAmounts = [];

// =================== INIT ===================
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// =================== AUTH ===================

function checkAuth() {
    const authed = sessionStorage.getItem('adminAuth');
    if (authed === 'true') {
        showAdmin();
    }
}

function attemptLogin() {
    const input = document.getElementById('loginPassword');
    const error = document.getElementById('loginError');
    const settings = getSettings();
    const password = settings.adminPassword || 'admin';

    if (input.value === password) {
        sessionStorage.setItem('adminAuth', 'true');
        error.style.display = 'none';
        showAdmin();
    } else {
        error.style.display = 'block';
        input.value = '';
        input.focus();
    }
}

function showAdmin() {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    loadSettings();
    loadWishes();
    loadStats();
    loadHistory();
}

// =================== SETTINGS ===================

function loadSettings() {
    const settings = getSettings();

    // Chance slider
    const slider = document.getElementById('chanceSlider');
    slider.value = settings.luckyMoneyChance;
    updateChanceDisplay();

    // Amounts
    currentAmounts = [...(settings.luckyMoneyAmounts || [20000, 50000, 100000])];
    renderAmountTags();

    // Spin limit
    const spinLimitInput = document.getElementById('spinLimitInput');
    if (spinLimitInput) {
        spinLimitInput.value = settings.spinLimit || 0;
    }
}

function updateChanceDisplay() {
    const slider = document.getElementById('chanceSlider');
    document.getElementById('chanceDisplay').textContent = slider.value + '%';
}

function renderAmountTags() {
    const container = document.getElementById('amountTags');
    if (currentAmounts.length === 0) {
        container.innerHTML = '<span style="color:#666; font-size:0.85rem">Chưa có mệnh giá nào</span>';
        return;
    }

    container.innerHTML = currentAmounts
        .sort((a, b) => a - b)
        .map((amount, i) => `
      <span class="amount-tag">
        ${formatMoney(amount)}
        <button class="remove-amount" onclick="removeAmount(${i})">×</button>
      </span>
    `).join('');
}

function addAmount() {
    const input = document.getElementById('newAmountInput');
    const value = parseInt(input.value);

    if (!value || value < 1000) {
        showToast('❌ Mệnh giá phải từ 1,000đ trở lên!');
        return;
    }

    if (currentAmounts.includes(value)) {
        showToast('⚠️ Mệnh giá này đã tồn tại!');
        return;
    }

    currentAmounts.push(value);
    renderAmountTags();
    input.value = '';
    showToast('✅ Đã thêm mệnh giá ' + formatMoney(value));
}

function removeAmount(index) {
    currentAmounts.splice(index, 1);
    renderAmountTags();
}

function saveSettingsClick() {
    const settings = getSettings();
    settings.luckyMoneyChance = parseInt(document.getElementById('chanceSlider').value);
    settings.luckyMoneyAmounts = [...currentAmounts];

    // Spin limit
    const spinLimitInput = document.getElementById('spinLimitInput');
    settings.spinLimit = parseInt(spinLimitInput?.value || '0', 10);

    saveSettings(settings);
    showToast('✅ Đã lưu cài đặt!');
}

// =================== WISH MANAGEMENT ===================

function loadWishes() {
    const wishes = getWishes();
    const list = document.getElementById('wishList');
    const count = document.getElementById('wishCount');

    count.textContent = `(${wishes.length} lời chúc)`;

    if (wishes.length === 0) {
        list.innerHTML = '<li style="color:#666; padding:16px; text-align:center">Chưa có lời chúc nào. Hãy thêm lời chúc!</li>';
        return;
    }

    list.innerHTML = wishes.map((wish, i) => `
    <li class="wish-item">
      <span class="wish-index">${i + 1}.</span>
      <span class="wish-text">${escapeHtml(wish)}</span>
      <div class="wish-actions">
        <button class="btn btn-outline btn-sm" onclick="editWish(${i})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteWish(${i})">🗑</button>
      </div>
    </li>
  `).join('');
}

function addWish() {
    const input = document.getElementById('newWishInput');
    const text = input.value.trim();

    if (!text) {
        showToast('❌ Vui lòng nhập lời chúc!');
        return;
    }

    const wishes = getWishes();
    wishes.push(text);
    saveWishes(wishes);
    loadWishes();
    input.value = '';
    showToast('✅ Đã thêm lời chúc!');
}

function editWish(index) {
    const wishes = getWishes();
    const newText = prompt('Sửa lời chúc:', wishes[index]);

    if (newText !== null && newText.trim()) {
        wishes[index] = newText.trim();
        saveWishes(wishes);
        loadWishes();
        showToast('✅ Đã cập nhật lời chúc!');
    }
}

function deleteWish(index) {
    if (!confirm('Bạn có chắc muốn xóa lời chúc này?')) return;

    const wishes = getWishes();
    wishes.splice(index, 1);
    saveWishes(wishes);
    loadWishes();
    showToast('✅ Đã xóa lời chúc!');
}

// =================== INPUT MODE ===================

function setInputMode(mode) {
    const singleMode = document.getElementById('singleInputMode');
    const bulkMode = document.getElementById('bulkInputMode');
    const btnSingle = document.getElementById('btnModeSingle');
    const btnBulk = document.getElementById('btnModeBulk');

    if (mode === 'bulk') {
        singleMode.classList.add('hidden');
        bulkMode.classList.remove('hidden');
        btnSingle.style.background = 'transparent';
        btnSingle.style.color = '#ccc';
        btnSingle.style.border = '1px solid rgba(255,255,255,0.2)';
        btnBulk.style.background = 'var(--gold-500)';
        btnBulk.style.color = 'var(--dark)';
        btnBulk.style.border = 'none';
    } else {
        singleMode.classList.remove('hidden');
        bulkMode.classList.add('hidden');
        btnSingle.style.background = 'var(--gold-500)';
        btnSingle.style.color = 'var(--dark)';
        btnSingle.style.border = 'none';
        btnBulk.style.background = 'transparent';
        btnBulk.style.color = '#ccc';
        btnBulk.style.border = '1px solid rgba(255,255,255,0.2)';
    }
}

function addBulkWishes() {
    const textarea = document.getElementById('bulkWishInput');
    const text = textarea.value.trim();

    if (!text) {
        showToast('❌ Vui lòng nhập ít nhất 1 lời chúc!');
        return;
    }

    const newWishes = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (newWishes.length === 0) {
        showToast('❌ Không tìm thấy lời chúc nào hợp lệ!');
        return;
    }

    const wishes = getWishes();
    wishes.push(...newWishes);
    saveWishes(wishes);
    loadWishes();
    textarea.value = '';
    updateBulkPreview();
    showToast(`✅ Đã thêm ${newWishes.length} lời chúc!`);
}

function updateBulkPreview() {
    const textarea = document.getElementById('bulkWishInput');
    const preview = document.getElementById('bulkPreviewCount');
    if (!textarea || !preview) return;

    const text = textarea.value.trim();
    if (!text) {
        preview.textContent = '';
        return;
    }
    const count = text.split('\n').filter(l => l.trim().length > 0).length;
    preview.textContent = `📊 ${count} lời chúc sẽ được thêm`;
}

// Listen for textarea input to update preview
document.addEventListener('DOMContentLoaded', () => {
    const bulkInput = document.getElementById('bulkWishInput');
    if (bulkInput) {
        bulkInput.addEventListener('input', updateBulkPreview);
    }
});

// =================== STATS ===================

function loadStats() {
    const stats = getStats();
    document.getElementById('statSpins').textContent = stats.totalSpins;
    document.getElementById('statLucky').textContent = stats.luckyMoneyCount;
    document.getElementById('statAmount').textContent = formatMoney(stats.totalLuckyMoney);
}

// =================== HISTORY ===================

function loadHistory() {
    const stats = getStats();
    const container = document.getElementById('historyList');

    if (!stats.history || stats.history.length === 0) {
        container.innerHTML = '<p style="color:#666; font-size: 0.85rem;">Chưa có lượt quay nào.</p>';
        return;
    }

    container.innerHTML = stats.history.slice(0, 50).map(entry => `
    <div class="history-item">
      <span class="history-wish">${escapeHtml(entry.wish)}</span>
      ${entry.luckyAmount > 0 ? `<span class="history-lucky">🧧 ${formatMoney(entry.luckyAmount)}</span>` : '<span style="color:#555">—</span>'}
      <span class="history-time">${entry.time}</span>
    </div>
  `).join('');
}

function clearHistory() {
    if (!confirm('Xóa toàn bộ lịch sử quay? Hành động này không thể hoàn tác!')) return;

    const stats = getStats();
    stats.totalSpins = 0;
    stats.totalLuckyMoney = 0;
    stats.luckyMoneyCount = 0;
    stats.history = [];
    saveStats(stats);
    loadStats();
    loadHistory();
    showToast('✅ Đã xóa lịch sử!');
}

// =================== DATA MANAGEMENT ===================

function resetAllData() {
    if (!confirm('⚠️ Reset toàn bộ dữ liệu về mặc định? Tất cả lời chúc tùy chỉnh và cài đặt sẽ bị xóa!')) return;
    if (!confirm('Bạn thực sự chắc chắn?')) return;

    resetToDefaults();
    // Reset stats too
    const stats = { totalSpins: 0, totalLuckyMoney: 0, luckyMoneyCount: 0, history: [] };
    saveStats(stats);

    loadSettings();
    loadWishes();
    loadStats();
    loadHistory();
    showToast('✅ Đã reset về mặc định!');
}

function exportData() {
    const data = {
        wishes: getWishes(),
        settings: getSettings(),
        stats: getStats(),
        exportDate: new Date().toLocaleString('vi-VN')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reo-que-tet-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✅ Đã xuất dữ liệu!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (data.wishes && Array.isArray(data.wishes)) {
                saveWishes(data.wishes);
            }
            if (data.settings) {
                saveSettings(data.settings);
            }
            if (data.stats) {
                saveStats(data.stats);
            }

            loadSettings();
            loadWishes();
            loadStats();
            loadHistory();
            showToast('✅ Đã nhập dữ liệu thành công!');
        } catch (error) {
            showToast('❌ File không hợp lệ!');
        }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
}

// =================== CHANGE PASSWORD ===================

function changePassword() {
    const input = document.getElementById('newPasswordInput');
    const newPass = input.value.trim();

    if (!newPass) {
        showToast('❌ Vui lòng nhập mật khẩu mới!');
        return;
    }

    if (newPass.length < 3) {
        showToast('❌ Mật khẩu phải có ít nhất 3 ký tự!');
        return;
    }

    const settings = getSettings();
    settings.adminPassword = newPass;
    saveSettings(settings);
    input.value = '';
    showToast('✅ Đã đổi mật khẩu!');
}

// =================== HELPERS ===================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Enter key support for inputs
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (e.target.id === 'newWishInput') addWish();
        if (e.target.id === 'newAmountInput') addAmount();
        if (e.target.id === 'newPasswordInput') changePassword();
    }
});
