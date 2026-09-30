/**
 * OMNISYNERGY ULTRAPORTAL 3000™ - MASTER INTERACTION TORTURE ENGINE
 * Deliberately violating all usability conventions since 2026.
 */

(function () {
  'use strict';

  // ==================== STATE MANAGEMENT ====================
  const state = {
    clicksWasted: 0,
    popupsEndured: 0,
    runawayDodges: 0,
    errorsTriggered: 0,
    patience: 19,
    soundEnabled: true,
    currentStep: 1,
    totalSteps: 5,
    escapeKeysCount: 0,
    escapeKeyTimer: null,
    captchaHoldPassed: false,
    captchaTilesPassed: false,
    termsScrolled: false,
    finalSubmitAttempts: 0,
    isZenMode: false
  };

  // ==================== PROCEDURAL WEB AUDIO SYNTH ====================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.1) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  function playBoing() {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  }

  function playErrorBuzz() {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  }

  function playDing() {
    playTone(987.77, 'sine', 0.5, 0.12);
  }

  function playChime() {
    // Angelic peaceful chord for Zen mode
    if (!state.soundEnabled) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 1.2, 0.1), i * 160);
    });
  }

  // ==================== GLOBAL CLICK & STATS TRACKER ====================
  document.addEventListener('click', (e) => {
    state.clicksWasted++;
    const clickDisp = document.getElementById('clickCounterDisplay');
    if (clickDisp) clickDisp.textContent = state.clicksWasted;

    // Slowly drain patience
    if (state.patience > 1 && Math.random() > 0.4) {
      state.patience = Math.max(1, state.patience - 1);
      const patienceEl = document.getElementById('patienceCounter');
      if (patienceEl) patienceEl.textContent = `🧠 Patience: ${state.patience}%`;
    }

    // Occasional click sound
    if (Math.random() > 0.6) {
      playTone(350 + Math.random() * 200, 'square', 0.05, 0.04);
    }
  });

  // Sound toggle button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundStatusText = document.getElementById('soundStatusText');
  if (soundToggleBtn && soundStatusText) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundStatusText.textContent = state.soundEnabled ? 'ENABLED' : 'MUTED';
      soundToggleBtn.title = state.soundEnabled ? 'Deafen yourself' : 'Peaceful silence';
      if (state.soundEnabled) playDing();
    });
  }

  // Real-time cursor speed tracker
  let lastX = 0, lastY = 0, lastTime = Date.now();
  const speedDisp = document.getElementById('cursorSpeedDisplay');
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dt = (now - lastTime) / 1000;
    if (dt > 0.1) {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      const speed = Math.round(dist / dt);
      if (speedDisp) speedDisp.textContent = `${speed} px/s`;
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    }
  });

  // ==================== ANNOYING SHUFFLING NAVBAR ====================
  const navList = document.getElementById('navList');
  if (navList) {
    // Shuffle nav links every 14 seconds or when any nav link is clicked
    function shuffleNav() {
      const items = Array.from(navList.children).filter(el => !el.classList.contains('nested-dropdown-container'));
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        navList.insertBefore(items[j], items[i]);
      }
    }

    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        playBoing();
        showToast('Nav item displaced for optimal algorithmic feng shui.');
        shuffleNav();
      }
    });

    setInterval(shuffleNav, 14000);
  }

  // Deeply nested link shortcut
  const deepJumpLink = document.getElementById('deepJumpLink');
  if (deepJumpLink) {
    deepJumpLink.addEventListener('click', (e) => {
      e.preventDefault();
      goToStep(3);
      showToast('Shortcut took you to Step 3... probably.');
    });
  }

  // ==================== RUNAWAY BUTTON MECHANISM ====================
  function makeRunaway(btn, maxDodges = 5) {
    let dodges = 0;
    btn.addEventListener('mouseenter', () => {
      if (dodges >= maxDodges) {
        btn.textContent = 'FINE! CLICK ME THEN!';
        return;
      }
      dodges++;
      state.runawayDodges++;
      playBoing();

      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 100;
      btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      showToast(`Button escaped! (Attempt ${dodges}/${maxDodges})`);
    });
  }

  const ramDownloadBtn = document.getElementById('ramDownloadBtn');
  if (ramDownloadBtn) {
    makeRunaway(ramDownloadBtn, 4);
    ramDownloadBtn.addEventListener('click', () => {
      showModal(
        'DOWNLOAD ERROR',
        'Your computer already has infinite virtual RAM, but it is currently being used to store this popup.',
        () => {}
      );
    });
  }

  const btnFinalSubmit = document.getElementById('btnFinalSubmit');
  if (btnFinalSubmit) {
    makeRunaway(btnFinalSubmit, 4);
  }

  // ==================== REVERSED SATISFACTION SURVEY ====================
  const starRating = document.getElementById('starRating');
  const surveyFeedback = document.getElementById('surveyFeedback');
  if (starRating && surveyFeedback) {
    starRating.addEventListener('click', (e) => {
      const star = e.target.closest('.star');
      if (star) {
        const val = star.getAttribute('data-val');
        playBoing();
        surveyFeedback.textContent = `You selected ${val} Star(s). Our algorithms have converted this to -${val * 10} happiness points.`;
      }
    });
  }

  // Worse Tip Generator
  const tips = [
    "If the page freezes, gently blow into your USB port and recite the alphabet backwards.",
    "Pro Tip: Pressing Ctrl+W closes all problems in life.",
    "Did you know? 9 out of 10 dentists recommend not clicking on random buttons.",
    "Keep your screen at a 47-degree angle to read the fine print clearly.",
    "Caution: Staring directly at Comic Sans for 8 seconds may alter your destiny.",
    "Tip: Typing faster makes our server feel rushed and anxious."
  ];
  let tipIdx = 0;
  const tipText = document.getElementById('tipText');
  const tipNumber = document.getElementById('tipNumber');
  const nextTipBtn = document.getElementById('nextTipBtn');
  if (nextTipBtn && tipText && tipNumber) {
    nextTipBtn.addEventListener('click', () => {
      tipIdx = (tipIdx + 1) % tips.length;
      tipText.textContent = tips[tipIdx];
      tipNumber.textContent = 400 + Math.floor(Math.random() * 99);
      playDing();
    });
  }

  // Clippy Anti-Assistant
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendChatBtn = document.getElementById('sendChatBtn');
  const clippyResponses = [
    "I have forwarded your complaint directly to /dev/null.",
    "Have you considered that the form is not wrong, you are?",
    "I could help you, but doing so would violate my core programming.",
    "Error 0xDEADBEEF: Sympathy not found.",
    "I'm an AI, and even I find your typing technique concerning.",
    "Try clicking the button that doesn't say what you want it to say."
  ];

  function sendClippyMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-bubble bot';
      botMsg.textContent = clippyResponses[Math.floor(Math.random() * clippyResponses.length)];
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      playDing();
    }, 600);
  }

  if (sendChatBtn && chatInput) {
    sendChatBtn.addEventListener('click', sendClippyMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendClippyMessage();
    });
  }

  // ==================== FORM STEP 1 CONTROLS ====================
  const ageSlider = document.getElementById('ageSlider');
  const ageDisplay = document.getElementById('ageDisplay');
  if (ageSlider && ageDisplay) {
    ageSlider.addEventListener('input', () => {
      ageDisplay.textContent = ageSlider.value;
    });
  }

  const hexPicker = document.getElementById('hexPicker');
  const favHex = document.getElementById('favHex');
  const hexFeedback = document.getElementById('hexFeedback');
  if (hexPicker && favHex && hexFeedback) {
    hexPicker.addEventListener('input', () => {
      favHex.value = hexPicker.value;
      evaluateHex(favHex.value);
    });
    favHex.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(favHex.value)) {
        hexPicker.value = favHex.value;
      }
      evaluateHex(favHex.value);
    });
  }

  function evaluateHex(val) {
    if (!hexFeedback) return;
    if (val.toLowerCase().includes('00')) {
      hexFeedback.textContent = 'Color status: Dangerously gloomy. Consider more magenta.';
    } else if (val.toLowerCase().includes('ff')) {
      hexFeedback.textContent = 'Color status: Blindingly aggressive. Recommended.';
    } else {
      hexFeedback.textContent = 'Color status: Acceptably confusing.';
    }
  }

  // ==================== FORM STEP 2: PASSWORD & SENSORY ====================
  const passwordInput = document.getElementById('passwordInput');
  const ruleLen = document.getElementById('ruleLen');
  const ruleRoman = document.getElementById('ruleRoman');
  const ruleChem = document.getElementById('ruleChem');
  const ruleEmoji = document.getElementById('ruleEmoji');
  const ruleVowel = document.getElementById('ruleVowel');
  const pwMeterFill = document.getElementById('pwMeterFill');
  const pwMeterLabel = document.getElementById('pwMeterLabel');

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      let validCount = 0;

      // Rule 1: Length >= 11
      const isLen = val.length >= 11;
      updateRule(ruleLen, isLen, 'At least 11.5 characters long');
      if (isLen) validCount++;

      // Rule 2: Roman Numeral
      const isRoman = /[IVXLCDM]/i.test(val);
      updateRule(ruleRoman, isRoman, 'Must contain a valid Roman Numeral (I, V, X, L, C, M)');
      if (isRoman) validCount++;

      // Rule 3: Chemical element
      const isChem = /(He|Li|Be|Fe|Au|Ag|Cu|Zn|Pb|Na|Cl|Ne|Ar|Kr)/i.test(val);
      updateRule(ruleChem, isChem, 'Must contain a periodic element symbol (e.g. He, Fe, Au)');
      if (isChem) validCount++;

      // Rule 4: Emoji of anxiety
      const isEmoji = /[\u{1F600}-\u{1F64F}\u{1F972}\u{1F974}\u{1F928}\u{1F630}\u{1F62C}\u{1FAE0}\u{1F631}]/u.test(val);
      updateRule(ruleEmoji, isEmoji, 'Must contain an emoji depicting mild anxiety (e.g. 😰, 😬, 🫠)');
      if (isEmoji) validCount++;

      // Rule 5: No vowels at even indices (2, 4, 6...)
      let vowelViolated = false;
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      for (let i = 1; i < val.length; i += 2) {
        if (vowels.includes(val[i].toLowerCase())) {
          vowelViolated = true;
          break;
        }
      }
      const isVowelOk = val.length > 2 && !vowelViolated;
      updateRule(ruleVowel, isVowelOk, 'No vowels allowed in even-numbered positions');
      if (isVowelOk) validCount++;

      // Inverted strength meter: More rules passed = "Dangerous Vulnerability"
      const pct = (validCount / 5) * 100;
      if (pwMeterFill && pwMeterLabel) {
        pwMeterFill.style.width = `${Math.max(5, pct)}%`;
        if (validCount <= 1) {
          pwMeterFill.style.background = '#ff0000';
          pwMeterLabel.textContent = 'STRENGTH: CATASTROPHICALLY WEAK';
        } else if (validCount <= 3) {
          pwMeterFill.style.background = '#ff9900';
          pwMeterLabel.textContent = 'STRENGTH: HAZARDOUSLY MEDIOCRE';
        } else {
          pwMeterFill.style.background = '#00ff66';
          pwMeterLabel.textContent = 'STRENGTH: UNACCEPTABLY RIGID';
        }
      }
    });
  }

  function updateRule(el, isValid, text) {
    if (!el) return;
    if (isValid) {
      el.className = 'rule-item valid';
      el.textContent = `✔️ ${text}`;
    } else {
      el.className = 'rule-item';
      el.textContent = `❌ ${text}`;
    }
  }

  // Volume Decibel Calibration
  const volumeSlider = document.getElementById('volumeSlider');
  const volDisplay = document.getElementById('volDisplay');
  const playToneBtn = document.getElementById('playToneBtn');
  if (volumeSlider && volDisplay) {
    volumeSlider.addEventListener('input', () => {
      volDisplay.textContent = `${volumeSlider.value} dB`;
    });
  }
  if (playToneBtn && volumeSlider) {
    playToneBtn.addEventListener('click', () => {
      const db = parseInt(volumeSlider.value, 10);
      const freq = 120 + db * 8;
      playTone(freq, 'sawtooth', 0.4, 0.2);
      showToast(`Emitting ${db} dB acoustic frequency test...`);
    });
  }

  // 10-Digit Phone Slider
  const phoneSlider = document.getElementById('phoneSlider');
  const phoneDisplay = document.getElementById('phoneDisplay');
  if (phoneSlider && phoneDisplay) {
    phoneSlider.addEventListener('input', () => {
      const val = phoneSlider.value.toString();
      const formatted = `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6)}`;
      phoneDisplay.textContent = `Selected: ${formatted}`;
    });
  }

  // ==================== FORM STEP 3: CAPTCHA OF AGONY ====================
  // Precision 3.00s Hold Test
  const holdTestBtn = document.getElementById('holdTestBtn');
  const holdTimerDisplay = document.getElementById('holdTimerDisplay');
  const holdStatus = document.getElementById('holdStatus');
  let holdStart = 0;
  let holdRaf = null;

  if (holdTestBtn && holdTimerDisplay && holdStatus) {
    function startHold(e) {
      e.preventDefault();
      holdStart = performance.now();
      holdStatus.textContent = 'Status: Measuring neural electrical impedance...';
      holdStatus.style.color = '#ffff00';

      function updateTimer() {
        const elapsed = (performance.now() - holdStart) / 1000;
        holdTimerDisplay.textContent = `${elapsed.toFixed(2)}s`;
        holdRaf = requestAnimationFrame(updateTimer);
      }
      holdRaf = requestAnimationFrame(updateTimer);
    }

    function endHold(e) {
      e.preventDefault();
      if (!holdStart) return;
      cancelAnimationFrame(holdRaf);
      const elapsed = (performance.now() - holdStart) / 1000;
      holdStart = 0;

      // Strict tolerance: between 2.95s and 3.05s!
      if (elapsed >= 2.90 && elapsed <= 3.10) {
        state.captchaHoldPassed = true;
        holdStatus.textContent = `PASSED! Precision hold duration: ${elapsed.toFixed(2)}s!`;
        holdStatus.style.color = '#00ff66';
        playDing();
      } else {
        state.captchaHoldPassed = false;
        playErrorBuzz();
        const diff = (elapsed - 3.00).toFixed(2);
        const direction = diff > 0 ? `+${diff}s too long` : `${diff}s too short`;
        holdStatus.textContent = `FAILED! Held for ${elapsed.toFixed(2)}s (${direction}). Window is 2.90s - 3.10s!`;
        holdStatus.style.color = '#ff3333';
      }
    }

    holdTestBtn.addEventListener('mousedown', startHold);
    holdTestBtn.addEventListener('mouseup', endHold);
    holdTestBtn.addEventListener('mouseleave', endHold);
    holdTestBtn.addEventListener('touchstart', startHold);
    holdTestBtn.addEventListener('touchend', endHold);
  }

  // Captcha Tile Grid
  const captchaGrid = document.getElementById('captchaGrid');
  const captchaTileStatus = document.getElementById('captchaTileStatus');
  if (captchaGrid && captchaTileStatus) {
    captchaGrid.addEventListener('click', (e) => {
      const tile = e.target.closest('.captcha-tile');
      if (!tile) return;
      tile.classList.toggle('selected');
      playTone(200 + Math.random() * 300, 'sine', 0.1, 0.05);

      const selected = captchaGrid.querySelectorAll('.captcha-tile.selected');
      captchaTileStatus.textContent = `Selected: ${selected.length} tiles. Algorithm is calculating existential alignment...`;

      // Tile 2 and Tile 5 are considered the valid dread tiles
      const selectedIndices = Array.from(selected).map(t => t.getAttribute('data-index'));
      state.captchaTilesPassed = selectedIndices.includes('2') || selectedIndices.includes('5');
    });
  }

  // ==================== FORM STEP 4: TERMS & INVERTED SCROLL ====================
  const invertedTermsBox = document.getElementById('invertedTermsBox');
  const scrollStatus = document.getElementById('scrollStatus');
  if (invertedTermsBox && scrollStatus) {
    invertedTermsBox.addEventListener('scroll', () => {
      const maxScroll = invertedTermsBox.scrollHeight - invertedTermsBox.clientHeight;
      const current = invertedTermsBox.scrollTop;
      const pct = Math.min(100, Math.round((current / (maxScroll || 1)) * 100));
      scrollStatus.textContent = `Scroll Progress: ${pct}% (Must read 100% to proceed)`;
      if (pct >= 95) {
        state.termsScrolled = true;
        scrollStatus.textContent = `Scroll Progress: 100%! Surrender accepted.`;
        scrollStatus.style.color = '#00ff66';
      }
    });
  }

  // Double Negative Checkboxes
  const negCheck1 = document.getElementById('negCheck1');
  const negCheck2 = document.getElementById('negCheck2');
  if (negCheck1 && negCheck2) {
    negCheck1.addEventListener('change', () => {
      showToast('You have affirmatively not declined our non-optional terms.');
    });
    negCheck2.addEventListener('change', () => {
      showToast('Preference inverted. Faxes will now arrive every 3 hours instead.');
    });
  }

  // ==================== MULTI-STEP NAVIGATION ENGINE ====================
  const stepNumberDisplay = document.getElementById('stepNumberDisplay');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const btnNext = document.getElementById('btnNext');
  const btnDeceptive = document.getElementById('btnDeceptive');
  const btnBack = document.getElementById('btnBack');
  const errorBanner = document.getElementById('errorBanner');
  const errorTitle = document.getElementById('errorTitle');
  const errorMessage = document.getElementById('errorMessage');
  const dismissErrorBtn = document.getElementById('dismissErrorBtn');
  const trollingTooltip = document.getElementById('trollingTooltip');

  // Deceptive progress bar percentages per step
  const stepProgress = {
    1: { width: '14%', text: '14% (Stalled)' },
    2: { width: '78.4%', text: '78.4% (Pre-accelerated)' },
    3: { width: '31.2%', text: '31.2% (Recalibrated)' },
    4: { width: '99.1%', text: '99.1% (Near Completion)' },
    5: { width: '99.98%', text: '99.98% (Critical Deadlock)' }
  };

  function updateStepUI() {
    for (let i = 1; i <= state.totalSteps; i++) {
      const stepEl = document.getElementById(`formStep${i}`);
      if (stepEl) {
        stepEl.classList.toggle('active', i === state.currentStep);
      }
    }
    if (stepNumberDisplay) stepNumberDisplay.textContent = state.currentStep;

    const prog = stepProgress[state.currentStep] || { width: '50%', text: '50%' };
    if (progressBar && progressText) {
      progressBar.style.width = prog.width;
      progressText.textContent = prog.text;
    }

    // Step 5 specific controls
    if (btnFinalSubmit && btnNext && btnDeceptive) {
      if (state.currentStep === 5) {
        btnNext.style.display = 'none';
        btnDeceptive.style.display = 'none';
        btnFinalSubmit.style.display = 'inline-block';
        populateSummary();
      } else {
        btnNext.style.display = 'inline-block';
        btnDeceptive.style.display = 'inline-block';
        btnFinalSubmit.style.display = 'none';
      }
    }

    // Randomize button labels for confusing UX
    const confusingLabels = [
      'Next Step (Maybe) ➔',
      'Proceed Forthwith ➔',
      'Do It ➔',
      'Perchance Advance ➔',
      'Don\'t Not Continue ➔'
    ];
    if (btnNext) {
      btnNext.textContent = confusingLabels[Math.floor(Math.random() * confusingLabels.length)];
    }
  }

  function goToStep(step) {
    state.currentStep = Math.max(1, Math.min(state.totalSteps, step));
    updateStepUI();
  }

  // Trolling tooltip blocking clicks
  if (btnNext && trollingTooltip) {
    btnNext.addEventListener('mouseenter', () => {
      if (Math.random() > 0.4) {
        trollingTooltip.style.display = 'block';
        playDing();
        setTimeout(() => {
          trollingTooltip.style.display = 'none';
        }, 2200);
      }
    });
  }

  // Confusing "Are You Sure?" on Next Button
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      // 40% chance of throwing a harmless "Are you sure?" confirmation
      if (Math.random() > 0.6) {
        showModal(
          'ARE YOU SURE?',
          'Are you definitively certain you wish to proceed? Advancing may consume 1.8 milliwatts of electricity and slightly alter local gravity.',
          () => validateAndAdvance()
        );
      } else {
        validateAndAdvance();
      }
    });
  }

  // Visually identical deceptive button: CLEARS CURRENT STEP!
  if (btnDeceptive) {
    btnDeceptive.addEventListener('click', () => {
      playErrorBuzz();
      state.errorsTriggered++;
      // Clear inputs in active step
      const activeStepEl = document.querySelector('.form-step.active');
      if (activeStepEl) {
        activeStepEl.querySelectorAll('input[type="text"], input[type="password"]').forEach(inp => inp.value = '');
      }
      showToast('⚠️ "Continue & Save" executed: All current fields successfully reset to zero!');
    });
  }

  // Misleading Back Button
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      playBoing();
      showModal(
        'TEMPORAL DISPLACEMENT WARNING',
        'Reversing direction in this portal violates the second law of thermodynamics. Do you still wish to risk chronological inversion?',
        () => {
          if (state.currentStep > 1) {
            goToStep(state.currentStep - 1);
            showToast('Rewound backwards. Mind the paradoxes.');
          } else {
            showToast('You are already at the beginning of time.');
          }
        }
      );
    });
  }

  // Validate step requirements (with deliberately absurd/vague error rules)
  function validateAndAdvance() {
    hideError();

    if (state.currentStep === 1) {
      const last = document.getElementById('inputLastName')?.value.trim();
      const first = document.getElementById('inputFirstName')?.value.trim();
      const salutation = document.getElementById('salutationSelect')?.value;

      if (!last || !first) {
        triggerAbsurdError(
          'Error 847: Something Isn\'t Quite Right',
          'Please ensure both legal identities are entered in opposite order.'
        );
        return;
      }
      if (!salutation) {
        triggerAbsurdError(
          'Error 102: Sovereign Title Undefined',
          'You must declare an ambiguous honour before entering the realm.'
        );
        return;
      }
      goToStep(2);
      playDing();
    } else if (state.currentStep === 2) {
      const pw = document.getElementById('passwordInput')?.value;
      if (!pw || pw.length < 5) {
        triggerAbsurdError(
          'Error 909: Algorithmic Inadequacy',
          'Password does not meet Rule 37-B of the Galactic Cipher Association.'
        );
        return;
      }
      goToStep(3);
      playDing();
    } else if (state.currentStep === 3) {
      if (!state.captchaHoldPassed) {
        triggerAbsurdError(
          'Turing Test Incomplete',
          'You must hold the capacitor button for precisely 3.00 seconds. Status: Not verified.'
        );
        return;
      }
      goToStep(4);
      playDing();
    } else if (state.currentStep === 4) {
      if (!state.termsScrolled) {
        triggerAbsurdError(
          'Surrender Unconfirmed',
          'You have not scrolled to the end of the inverted terms of surrender.'
        );
        return;
      }
      goToStep(5);
      playDing();
    }
  }

  function triggerAbsurdError(title, msg) {
    state.errorsTriggered++;
    playErrorBuzz();
    if (errorBanner && errorTitle && errorMessage) {
      errorTitle.textContent = title;
      errorMessage.textContent = msg;
      errorBanner.style.display = 'flex';
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function hideError() {
    if (errorBanner) errorBanner.style.display = 'none';
  }

  if (dismissErrorBtn) {
    dismissErrorBtn.addEventListener('click', hideError);
  }

  // Populate Step 5 Summary
  function populateSummary() {
    const lastName = document.getElementById('inputLastName')?.value || 'N/A';
    const firstName = document.getElementById('inputFirstName')?.value || 'N/A';
    const salutation = document.getElementById('salutationSelect')?.value || 'None';
    const age = document.getElementById('ageSlider')?.value || '42.7';
    const hex = document.getElementById('favHex')?.value || '#ff007f';
    const vol = document.getElementById('volumeSlider')?.value || '50';
    const phone = document.getElementById('phoneSlider')?.value || '5551234567';

    const sumName = document.getElementById('sumName');
    const sumTitle = document.getElementById('sumTitle');
    const sumAge = document.getElementById('sumAge');
    const sumHex = document.getElementById('sumHex');
    const sumVol = document.getElementById('sumVol');
    const sumPhone = document.getElementById('sumPhone');

    if (sumName) sumName.textContent = `${lastName}, ${firstName} [CONFIRMED UNCONFIRMED]`;
    if (sumTitle) sumTitle.textContent = salutation;
    if (sumAge) sumAge.textContent = `${age} Dog Years`;
    if (sumHex) sumHex.textContent = hex;
    if (sumVol) sumVol.textContent = `${vol} dB`;
    if (sumPhone) sumPhone.textContent = phone;
  }

  // ==================== STEP 5: FINAL SUBMIT & GAUNTLET RESETS ====================
  if (btnFinalSubmit) {
    btnFinalSubmit.addEventListener('click', () => {
      state.finalSubmitAttempts++;
      // Show Fake Slow Loading Modal
      showFakeLoading(() => {
        if (state.finalSubmitAttempts === 1) {
          // Evil UX anti-pattern: Reset a field and throw an unexpected error!
          triggerAbsurdError(
            'Error 847: We Can\'t Tell You What Happened',
            'Unexpected unexpected error. Your mother\'s pet\'s maiden name was invalidly sanitized. Field has been cleared. Please try something else.'
          );
          const petInput = document.getElementById('petMaiden');
          if (petInput) petInput.value = '';
          const hexInput = document.getElementById('favHex');
          if (hexInput) hexInput.value = '';

          // Force user back to Step 1 to fix it!
          goToStep(1);
          showToast('Field reset due to parity discrepancy. You have been transported to Step 1.');
        } else {
          // Success! Show absurd voucher code
          showModal(
            '🎉 CLAIM DISPATCHED! 🎉',
            'Your $0.00 Digital Coffee Voucher has been queued into our quantum ledger.\n\nVoucher Code: 0000-VOID-ERROR-NULL\nEstimated Delivery: 47 years, 3 months.\n\nThank you for choosing OmniSynergy.',
            () => {}
          );
          playDing();
        }
      });
    });
  }

  // Fake Slow Loading Screen with Recalculating Stalls
  const loadingModal = document.getElementById('loadingModal');
  const modalProgressBar = document.getElementById('modalProgressBar');
  const modalProgressPercent = document.getElementById('modalProgressPercent');
  const loadingStatusTicker = document.getElementById('loadingStatusTicker');

  function showFakeLoading(onComplete) {
    if (!loadingModal) return onComplete();
    loadingModal.style.display = 'flex';
    state.popupsEndured++;
    playTone(400, 'sine', 0.2, 0.1);

    const phases = [
      { pct: 24, text: 'Resolving DNS over Carrier Pigeon...', delay: 600 },
      { pct: 68, text: 'Encrypting cookies with 0.5-bit key...', delay: 1400 },
      { pct: 99, text: 'Stalled at 99.4% (Polishing pixels)...', delay: 2400 },
      { pct: 41, text: 'Recalculating hypercube trajectories...', delay: 3600 },
      { pct: 98, text: 'Negotiating with server demons...', delay: 4400 },
      { pct: 100, text: 'Synthesis complete!', delay: 5200 }
    ];

    phases.forEach((p) => {
      setTimeout(() => {
        if (modalProgressBar && modalProgressPercent) {
          modalProgressBar.style.width = `${p.pct}%`;
          modalProgressPercent.textContent = `${p.pct}%`;
        }
        if (loadingStatusTicker) {
          loadingStatusTicker.textContent = p.text;
        }
        playTone(300 + p.pct * 5, 'sine', 0.1, 0.05);
      }, p.delay);
    });

    setTimeout(() => {
      loadingModal.style.display = 'none';
      if (onComplete) onComplete();
    }, 5600);
  }

  // ==================== POPUPS & INTERRUPTION ENGINE ====================
  // 1. Mandatory Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const btnAcceptCookies = document.getElementById('btnAcceptCookies');
  const btnRejectCookies = document.getElementById('btnRejectCookies');
  const btnCustomizeCookies = document.getElementById('btnCustomizeCookies');
  const cookieTabContent = document.getElementById('cookieTabContent');

  if (btnAcceptCookies && cookieBanner) {
    btnAcceptCookies.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
      playDing();
      showToast('Thank you! 842 advertising cookies successfully embedded.');
    });
  }

  if (btnRejectCookies) {
    btnRejectCookies.addEventListener('click', () => {
      playErrorBuzz();
      showToast('Reject button disabled due to compliance directive 440-Z.');
    });
  }

  if (btnCustomizeCookies && cookieTabContent) {
    btnCustomizeCookies.addEventListener('click', () => {
      playBoing();
      // Generate 25 ridiculous checkboxes
      let html = '<p class="micro-text">Granular Preference Center (Scroll to toggle 450 partners):</p>';
      for (let i = 1; i <= 25; i++) {
        html += `<label><input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''}> Partner #${i * 19}: Track eyeball velocity</label><br>`;
      }
      cookieTabContent.innerHTML = html;
    });
  }

  // Cookie Tabs
  const cookieTabs = document.querySelectorAll('.cookie-tab-btn');
  cookieTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cookieTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTone(400, 'square', 0.05, 0.04);
    });
  });

  // 2. Promotional Survey Flyout (Triggers after 12s)
  const flyoutPromo = document.getElementById('flyoutPromo');
  const flyoutCloseBtn = document.getElementById('flyoutCloseBtn');
  const flyoutAcceptBtn = document.getElementById('flyoutAcceptBtn');
  const flyoutDismissLink = document.getElementById('flyoutDismissLink');

  setTimeout(() => {
    if (flyoutPromo && !state.isZenMode) {
      flyoutPromo.style.display = 'block';
      state.popupsEndured++;
      playDing();
    }
  }, 12000);

  if (flyoutCloseBtn) {
    makeRunaway(flyoutCloseBtn, 3);
    flyoutCloseBtn.addEventListener('click', () => {
      if (flyoutPromo) flyoutPromo.style.display = 'none';
    });
  }

  if (flyoutAcceptBtn && flyoutPromo) {
    flyoutAcceptBtn.addEventListener('click', () => {
      flyoutPromo.style.display = 'none';
      showModal('SURVEY INITIALIZED', 'Question 1 of 4,000: Do you prefer pencils or paperclips? Think carefully.', () => {});
    });
  }

  if (flyoutDismissLink && flyoutPromo) {
    flyoutDismissLink.addEventListener('click', (e) => {
      e.preventDefault();
      flyoutPromo.style.display = 'none';
      showToast('Survey dismissed. We will ask again in 8 seconds.');
    });
  }

  // 3. Generic "Are You Sure?" Modal
  const confirmModal = document.getElementById('confirmModal');
  const confirmModalText = document.getElementById('confirmModalText');
  const modalBtnYes = document.getElementById('modalBtnYes');
  const modalBtnNo = document.getElementById('modalBtnNo');
  const modalBtnMaybe = document.getElementById('modalBtnMaybe');
  let currentModalCallback = null;

  function showModal(title, text, onYes) {
    if (!confirmModal) return;
    state.popupsEndured++;
    const header = confirmModal.querySelector('.modal-header');
    if (header) header.textContent = title;
    if (confirmModalText) confirmModalText.textContent = text;
    currentModalCallback = onYes;
    confirmModal.style.display = 'flex';
    playDing();
  }

  if (modalBtnYes && confirmModal) {
    modalBtnYes.addEventListener('click', () => {
      confirmModal.style.display = 'none';
      if (currentModalCallback) currentModalCallback();
    });
  }

  if (modalBtnNo && confirmModal) {
    modalBtnNo.addEventListener('click', () => {
      confirmModal.style.display = 'none';
      playBoing();
      showToast('Action was cancel-ished.');
    });
  }

  if (modalBtnMaybe && confirmModal) {
    modalBtnMaybe.addEventListener('click', () => {
      confirmModal.style.display = 'none';
      showToast('Decision postponed indefinitely.');
    });
  }

  // 4. Toast Notifications Stream (Every 11 seconds)
  const toastContainer = document.getElementById('toastContainer');
  const uselessToasts = [
    "Alert: Battery is 100% full. Unplug to avoid excess electricity.",
    "Did you know? Clicking buttons consumes 0.0002 calories.",
    "Notice: Your session will not expire, but we thought we'd tell you.",
    "System Status: Everything is fine. Do not panic.",
    "Telemetry: 4 other users are currently staring at this exact dropdown.",
    "Tip: The escape hatch is somewhere on this screen... or is it?",
    "Notice: Cloud temperature currently at optimal room temperature."
  ];

  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4500);
  }

  setInterval(() => {
    if (!state.isZenMode) {
      const msg = uselessToasts[Math.floor(Math.random() * uselessToasts.length)];
      showToast(msg);
    }
  }, 11000);

  // ==================== THE SECRET ESCAPE HATCH & ZEN MODE ====================
  const secretEscapeHatch = document.getElementById('secretEscapeHatch');
  const zenModal = document.getElementById('zenModal');
  const zenStayBtn = document.getElementById('zenStayBtn');
  const zenReturnBtn = document.getElementById('zenReturnBtn');
  const statClicks = document.getElementById('statClicks');
  const statPopups = document.getElementById('statPopups');
  const statDodges = document.getElementById('statDodges');
  const statErrors = document.getElementById('statErrors');

  function activateEscapeHatch() {
    state.isZenMode = true;
    playChime();

    // Populate Trauma Stats
    if (statClicks) statClicks.textContent = state.clicksWasted;
    if (statPopups) statPopups.textContent = state.popupsEndured;
    if (statDodges) statDodges.textContent = state.runawayDodges;
    if (statErrors) statErrors.textContent = state.errorsTriggered;

    // Show Zen Modal
    if (zenModal) zenModal.style.display = 'flex';
  }

  if (secretEscapeHatch) {
    secretEscapeHatch.addEventListener('click', activateEscapeHatch);
  }

  // Keyboard shortcut: Press Escape 3 times in 1.5 seconds!
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      state.escapeKeysCount++;
      clearTimeout(state.escapeKeyTimer);
      if (state.escapeKeysCount >= 3) {
        state.escapeKeysCount = 0;
        activateEscapeHatch();
      } else {
        state.escapeKeyTimer = setTimeout(() => {
          state.escapeKeysCount = 0;
        }, 1500);
      }
    }
  });

  // Zen Mode Action Buttons
  if (zenStayBtn && zenModal) {
    zenStayBtn.addEventListener('click', () => {
      zenModal.style.display = 'none';
      document.body.className = '';
      document.body.style.background = '#f4f6f4';
      document.body.style.color = '#2c3e50';
      document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      document.body.innerHTML = `
        <div style="max-width: 600px; margin: 100px auto; text-align: center; padding: 40px; background: #fff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.06);">
          <div style="font-size: 54px; margin-bottom: 15px;">🕊️</div>
          <h1 style="font-size: 32px; color: #27ae60; margin-bottom: 10px;">Absolute Serenity</h1>
          <p style="color: #7f8c8d; line-height: 1.6; margin-bottom: 25px;">
            The nightmare has been permanently dismantled. You navigated the gauntlet of bad UX, evaded runaway buttons, deciphered inverted terms, and discovered the hidden sanctuary.
          </p>
          <div style="background: #f8faf9; padding: 15px; border-radius: 10px; margin-bottom: 25px; font-size: 14px; color: #555;">
            <strong>Trauma Score:</strong> ${state.clicksWasted} clicks wasted · ${state.popupsEndured} popups endured · ${state.runawayDodges} button chases.
          </div>
          <button onclick="location.reload()" style="background: #27ae60; color: #fff; border: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
            Re-enter Nightmare (Reload)
          </button>
        </div>
      `;
      playDing();
    });
  }

  if (zenReturnBtn && zenModal) {
    zenReturnBtn.addEventListener('click', () => {
      zenModal.style.display = 'none';
      state.isZenMode = false;
      playBoing();
      showToast('Welcome back to the agony. We missed you.');
    });
  }

  // Initial startup
  updateStepUI();
  console.log("%c⚠️ OMNISYNERGY ULTRAPORTAL 3000 INITIALIZED ⚠️", "color: #39ff14; font-size: 20px; font-weight: bold; background: #000; padding: 8px;");
  console.log("PS: The escape hatch is the subtle dot in the footer copyright, or press Escape 3 times!");

})();
