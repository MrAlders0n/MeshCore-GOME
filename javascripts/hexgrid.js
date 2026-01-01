// Modal functions for hex grid
function showRepeaterInfo(hexId, info) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    const contactLink = info.contact_url 
        ? `<a href="${info.contact_url}" class="hex-contact-btn">Add Contact</a>` 
        : '<span class="hex-no-contact">No Contact Available</span>';
    
    const stateClass = info.state. toLowerCase().replace(/\s+/g, '-');
    
    modalBody.innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-used-badge">${hexId}</span>
                <span class="hex-state-badge hex-state-${stateClass}">${info.state}</span>
            </div>
            <h2 class="hex-info-title">${info.name}</h2>
            <div class="hex-info-grid">
                <div class="hex-info-item">
                    <span class="hex-info-label">📡 Antenna</span>
                    <span class="hex-info-value">${info.antenna}</span>
                </div>
                <div class="hex-info-item">
                    <span class="hex-info-label">📍 Location</span>
                    <span class="hex-info-value">${info.location}</span>
                </div>
                <div class="hex-info-item">
                    <span class="hex-info-label">🕐 Last Heard</span>
                    <span class="hex-info-value">${info.last_heard}</span>
                </div>
            </div>
            <div class="hex-info-contact">
                ${contactLink}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showDuplicateInfo(hexId, infoArray) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    let entriesHtml = '';
    infoArray.forEach((info, idx) => {
        const contactLink = info.contact_url 
            ? `<a href="${info.contact_url}" class="hex-contact-btn-small">Add Contact</a>` 
            : '<span class="hex-no-contact-small">No Contact</span>';
        
        const stateClass = info.state. toLowerCase().replace(/\s+/g, '-');
        
        entriesHtml += `
            <div class="hex-duplicate-entry">
                <div class="hex-info-header">
                    <span class="hex-entry-number">Entry ${idx + 1}</span>
                    <span class="hex-state-badge hex-state-${stateClass}">${info. state}</span>
                </div>
                <h3 class="hex-duplicate-name">${info.name}</h3>
                <div class="hex-info-grid-small">
                    <div class="hex-info-item-small">
                        <span class="hex-info-label">📡</span>
                        <span class="hex-info-value">${info.antenna}</span>
                    </div>
                    <div class="hex-info-item-small">
                        <span class="hex-info-label">📍</span>
                        <span class="hex-info-value">${info.location}</span>
                    </div>
                    <div class="hex-info-item-small">
                        <span class="hex-info-label">🕐</span>
                        <span class="hex-info-value">${info.last_heard}</span>
                    </div>
                </div>
                ${contactLink}
            </div>
        `;
    });
    
    modalBody.innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-duplicate-badge">${hexId}</span>
                <span class="hex-warning-badge">⚠️ DUPLICATE CONFLICT</span>
            </div>
            <p class="hex-duplicate-warning">Multiple repeaters are using the same ID.  This must be resolved! </p>
            <div class="hex-duplicates-container">
                ${entriesHtml}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showReservedInfo() {
    const modal = document. getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    modalBody.innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-reserved-badge">Reserved</span>
            </div>
            <h2 class="hex-info-title">MeshCore Reserved ID</h2>
            <p class="hex-reserved-text">
                This ID is reserved by MeshCore and cannot be used for repeaters.
                IDs <strong>00</strong> and <strong>FF</strong> are system reserved.
            </p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showBackboneInfo() {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    modalBody. innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-backbone-badge">Backbone Reserved</span>
            </div>
            <h2 class="hex-info-title">Backbone Link Reserved</h2>
            <p class="hex-reserved-text">
                GOME has reserved these IDs for backbone links between major cities.
            </p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// NEW: Key generation function
async function generateKeyForPrefix(prefix) {
    const targetPrefix = prefix.toUpperCase();
    
    // SHA-512 hash function
    async function sha512(data) {
        const buffer = await crypto.subtle.digest('SHA-512', data);
        return new Uint8Array(buffer);
    }
    
    // Convert bytes to hex
    const toHex = (bytes) => {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    };
    
    let attempts = 0;
    const startTime = Date.now();
    
    while (true) {
        attempts++;
        
        // Generate random 32-byte seed
        const seed = crypto.getRandomValues(new Uint8Array(32));
        
        // Hash the seed
        const digestArray = await sha512(seed);
        
        // Clamp the first 32 bytes
        const clamped = digestArray.slice(0, 32);
        clamped[0] &= 248;
        clamped[31] &= 63;
        clamped[31] |= 64;
        
        // Generate public key using noble-ed25519
        let scalarBigInt = 0n;
        for (let i = 0; i < 32; i++) {
            scalarBigInt += BigInt(clamped[i]) << BigInt(8 * i);
        }
        
        const publicKey = nobleEd25519.Point. BASE.multiply(scalarBigInt);
        const publicKeyBytes = publicKey.toRawBytes();
        
        // Create private key
        const meshcorePrivateKey = new Uint8Array(64);
        meshcorePrivateKey.set(clamped, 0);
        meshcorePrivateKey.set(digestArray. slice(32, 64), 32);
        
        const publicKeyHex = toHex(publicKeyBytes);
        const privateKeyHex = toHex(meshcorePrivateKey);
        
        // Check if it matches
        if (publicKeyHex. startsWith(targetPrefix)) {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
            return {
                publicKey: publicKeyHex,
                privateKey: privateKeyHex,
                attempts: attempts,
                timeSeconds: elapsedTime
            };
        }
        
        // Update progress every 1000 attempts
        if (attempts % 1000 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = Math.floor(attempts / elapsed);
            updateKeygenProgress(attempts, rate);
        }
    }
}

function updateKeygenProgress(attempts, rate) {
    const progressEl = document.getElementById('keygen-progress');
    if (progressEl) {
        progressEl.textContent = `Attempts: ${attempts. toLocaleString()} | Speed: ${rate.toLocaleString()}/sec`;
    }
}

// NEW: Show keygen modal
function showKeygenModal(hexId) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document. getElementById('hex-modal-body');
    
    modalBody.innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-free-badge">Available</span>
                <span class="hex-id-badge">${hexId}</span>
            </div>
            <h2 class="hex-info-title">Generate Private Key</h2>
            <p class="hex-reserved-text">
                Generate a MeshCore-compatible Ed25519 keypair with this ID prefix.
                This may take a few seconds depending on your device.
            </p>
            <div class="hex-info-contact">
                <button id="generate-key-btn" class="hex-contact-btn">🔑 Generate Key</button>
            </div>
            <div id="keygen-status" style="margin-top: 20px; display: none;">
                <p id="keygen-progress" style="color: #a8d68c; text-align: center; font-family: monospace;"></p>
            </div>
            <div id="keygen-result" style="display: none; margin-top: 20px;">
                <div class="hex-info-grid">
                    <div class="hex-info-item">
                        <span class="hex-info-label">🔑 Public Key</span>
                        <textarea readonly id="public-key-output" class="key-output" rows="2"></textarea>
                        <button onclick="copyToClipboard('public-key-output')" class="copy-btn">📋 Copy</button>
                    </div>
                    <div class="hex-info-item">
                        <span class="hex-info-label">🔐 Private Key</span>
                        <textarea readonly id="private-key-output" class="key-output" rows="2"></textarea>
                        <button onclick="copyToClipboard('private-key-output')" class="copy-btn">📋 Copy</button>
                    </div>
                    <div class="hex-info-item">
                        <span class="hex-info-label">📊 Generation Stats</span>
                        <span id="keygen-stats" class="hex-info-value"></span>
                    </div>
                </div>
                <div class="hex-info-contact">
                    <button onclick="downloadKeyJSON('${hexId}')" class="hex-contact-btn">💾 Download JSON</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Attach event listener to generate button
    document.getElementById('generate-key-btn').addEventListener('click', async () => {
        const btn = document.getElementById('generate-key-btn');
        btn.disabled = true;
        btn.textContent = '⏳ Generating...';
        
        document.getElementById('keygen-status').style.display = 'block';
        
        try {
            const result = await generateKeyForPrefix(hexId);
            
            // Show results
            document.getElementById('keygen-status').style.display = 'none';
            document.getElementById('keygen-result').style.display = 'block';
            document.getElementById('public-key-output').value = result.publicKey;
            document.getElementById('private-key-output').value = result.privateKey;
            document.getElementById('keygen-stats').textContent = 
                `Generated in ${result.timeSeconds}s after ${result.attempts. toLocaleString()} attempts`;
            
            // Store for download
            window.generatedKey = result;
        } catch (error) {
            alert('Error generating key: ' + error.message);
            btn.disabled = false;
            btn.textContent = '🔑 Generate Key';
        }
    });
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

function downloadKeyJSON(prefix) {
    if (!window.generatedKey) return;
    
    const data = {
        public_key: window.generatedKey.publicKey,
        private_key: window.generatedKey. privateKey,
        generated_at: new Date().toISOString(),
        prefix: prefix
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type:  'application/json' });
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `meshcore_${prefix}_${timestamp}.json`;
    
    const a = document. createElement('a');
    a.href = url;
    a. download = filename;
    a. click();
    
    URL.revokeObjectURL(url);
}

// Close modal when X is clicked
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('hex-modal');
    const closeBtn = document.querySelector('.hex-modal-close');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal. style.display = 'none';
        };
    }
    
    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});