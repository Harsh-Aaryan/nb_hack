function initOnboarding() {
    const onboardingEl = document.createElement('div');
    onboardingEl.id = 'onboarding-screen';
    onboardingEl.className = 'onboarding-screen loading';
    
    // Create onboarding structure
    onboardingEl.innerHTML = `
        <div id="onboarding-bg" class="onboarding-bg"></div>
        <div class="onboarding-overlay"></div>
        <div id="onboarding-content" class="onboarding-content">
            <!-- Loading State -->
            <div id="loading-box" class="loading-box">
                <h1 class="loading-logo">New Balance</h1>
                <div class="loading-bar">
                    <div id="loading-bar-fill" class="loading-bar-fill"></div>
                </div>
                <p id="loading-text" style="font-family: var(--font-body); font-size: 10px; color: var(--color-navy); text-transform: uppercase; letter-spacing: 2px; margin-top: 20px; font-weight: 700;">Initializing AI</p>
            </div>

            <!-- Steps State -->
            <div id="step-box" class="step-card" style="display: none;">
                <div id="step-1" class="onboarding-step active">
                    <div class="step-header">
                        <span class="step-num">Step 01 / 02</span>
                        <h2 class="step-title">Your Identity</h2>
                        <p class="step-desc">Synchronize with our global heritage archives.</p>
                    </div>
                    <div class="onboarding-form">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" id="user-name" class="form-input" placeholder="e.g. John Doe">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Select Your Aesthetic</label>
                            <div class="selection-grid">
                                <label class="selection-item">
                                    <input type="radio" name="aesthetic" value="minimalist" checked>
                                    <div class="selection-box">
                                        <span class="emoji">⚪</span>
                                        <span class="label">Minimal</span>
                                    </div>
                                </label>
                                <label class="selection-item">
                                    <input type="radio" name="aesthetic" value="vintage">
                                    <div class="selection-box">
                                        <span class="emoji">📻</span>
                                        <span class="label">Retro</span>
                                    </div>
                                </label>
                                <label class="selection-item">
                                    <input type="radio" name="aesthetic" value="performance">
                                    <div class="selection-box">
                                        <span class="emoji">⚡</span>
                                        <span class="label">Sport</span>
                                    </div>
                                </label>
                                <label class="selection-item">
                                    <input type="radio" name="aesthetic" value="tech">
                                    <div class="selection-box">
                                        <span class="emoji">🛠️</span>
                                        <span class="label">Tech</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="nextOnboardingStep(2)">Continue</button>
                    </div>
                </div>

                <div id="step-2" class="onboarding-step">
                    <div class="step-header">
                        <span class="step-num">Step 02 / 02</span>
                        <h2 class="step-title">Heritage Core</h2>
                        <p class="step-desc">Pick the silhouette that defines your rotation.</p>
                    </div>
                    <div class="onboarding-form">
                        <div class="selection-grid">
                            <label class="selection-item">
                                <input type="radio" name="blueprint" value="990" checked>
                                <div class="selection-box">
                                    <span class="emoji">👟</span>
                                    <span class="label">990v Series</span>
                                </div>
                            </label>
                            <label class="selection-item">
                                <input type="radio" name="blueprint" value="550">
                                <div class="selection-box">
                                    <span class="emoji">🏀</span>
                                    <span class="label">550 Archive</span>
                                </div>
                            </label>
                            <label class="selection-item">
                                <input type="radio" name="blueprint" value="2002">
                                <div class="selection-box">
                                    <span class="emoji">🌫️</span>
                                    <span class="label">2002R Tech</span>
                                </div>
                            </label>
                            <label class="selection-item">
                                <input type="radio" name="blueprint" value="574">
                                <div class="selection-box">
                                    <span class="emoji">🌲</span>
                                    <span class="label">574 Classic</span>
                                </div>
                            </label>
                        </div>
                        <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="completeOnboarding()">Sync & Start</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(onboardingEl);

    // Initial Loading Animation
    const progress = document.getElementById('loading-bar-fill');
    const loadingText = document.getElementById('loading-text');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            showOnboardingSteps();
        } else {
            width += 2;
            progress.style.width = width + '%';
            if (width === 40) loadingText.textContent = "Analyzing Wardrobe Patterns...";
            if (width === 80) loadingText.textContent = "Calibrating Style Agents...";
        }
    }, 40);
}

function showOnboardingSteps() {
    const onboardingEl = document.getElementById('onboarding-screen');
    const loadingBox = document.getElementById('loading-box');
    const stepBox = document.getElementById('step-box');
    
    onboardingEl.classList.remove('loading');
    onboardingEl.classList.add('onboarding-steps');
    
    loadingBox.style.display = 'none';
    stepBox.style.display = 'block';
}

function nextOnboardingStep(stepNum) {
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${stepNum}`).classList.add('active');
}

function completeOnboarding() {
    const onboardingEl = document.getElementById('onboarding-screen');
    onboardingEl.classList.add('fade-out');
    
    // Save that onboarding is done
    localStorage.setItem('nb-onboarded', 'true');
    
    setTimeout(() => {
        onboardingEl.remove();
    }, 800);
}

function logout() {
    // Clear onboarding state
    localStorage.removeItem('nb-onboarded');
    
    // Reset to home page
    window.location.hash = '#/home';
    
    // Refresh to trigger onboarding or re-init directly
    window.location.reload();
}

// Global exposure for event listeners
window.nextOnboardingStep = nextOnboardingStep;
window.completeOnboarding = completeOnboarding;
window.logout = logout;

// Check if we should skip onboarding
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nb-onboarded') !== 'true') {
        initOnboarding();
    }
});
