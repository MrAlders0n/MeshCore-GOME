// Modal functions for hex grid
function showRepeaterInfo(hexId, info) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    const contactLink = info.contact_url 
        ? `<a href="${info. contact_url}" class="hex-contact-btn">Add Contact</a>` 
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
    
    modal.style. display = 'block';
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
                    <span class="hex-state-badge hex-state-${stateClass}">${info.state}</span>
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
    const modal = document.getElementById('hex-modal');
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
    
    modal.style. display = 'block';
}

function showBackboneInfo() {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    modalBody.innerHTML = `
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
    
    modal.style. display = 'block';
}

// Key generation using Web Crypto API
async function generateKeyForPrefix(prefix) {
    const targetPrefix = prefix.toUpperCase();
    
    // Convert bytes to hex
    const toHex = (bytes) => {
        return Array.from(bytes)
            .map(b => b. toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    };
    
    let attempts = 0;
    const startTime = Date.now();
    
    while (true) {
        attempts++;
        
        try {
            // Generate Ed25519 keypair using Web Crypto
            const keypair = await crypto. subtle.generateKey(
                { name: 'Ed25519' },
                true,
                ['sign', 'verify']
            );
            
            // Export public key
            const publicKeyJwk = await crypto.subtle.exportKey('jwk', keypair.publicKey);
            const publicKeyBytes = Uint8Array.from(
                atob(publicKeyJwk.x. replace(/-/g, '+').replace(/_/g, '/')), 
                c => c.charCodeAt(0)
            );
            
            // Export private key
            const privateKeyJwk = await crypto.subtle.exportKey('jwk', keypair. privateKey);
            const privateKeyBytes = Uint8Array. from(
                atob(privateKeyJwk. d.replace(/-/g, '+').replace(/_/g, '/')), 
                c => c. charCodeAt(0)
            );
            
            // MeshCore uses 64-byte private key format (32-byte seed + 32-byte public key)
            const meshcorePrivateKey = new Uint8Array(64);
            meshcorePrivateKey.set(privateKeyBytes, 0);
            meshcorePrivateKey.set(publicKeyBytes, 32);
            
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
            
            // Update progress every 100 attempts (Ed25519 generation is slower)
            if (attempts % 100 === 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                const rate = Math.floor(attempts / elapsed);
                updateKeygenProgress(attempts, rate);
            }
        } catch (error) {
            // Skip this attempt if there's an error
            console.error('Key generation error:', error);
            continue;
        }
    }
}

function updateKeygenProgress(attempts, rate) {
    const progressEl = document.getElementById('keygen-progress');
    if (progressEl) {
        progressEl.textContent = `Attempts: ${attempts. toLocaleString()} | Speed: ${rate.toLocaleString()}/sec`;
    }
}

// Show keygen modal
function showKeygenModal(hexId) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    modalBody. innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-free-badge">${hexId}</span>
                <span class="hex-state-badge hex-state-available">Available</span>
            </div>
            <h2 class="hex-info-title">Generate Private Key</h2>
            <p class="hex-keygen-description">
                Generate a MeshCore-compatible Ed25519 keypair with this ID prefix.
            </p>
            <div class="hex-info-contact">
                <button id="generate-key-btn" class="hex-contact-btn">🔑 Generate Key</button>
            </div>
            <div id="keygen-status" style="margin-top: 12px; display:  none;">
                <p id="keygen-progress"></p>
            </div>
            <div id="keygen-result" style="display: none; margin-top: 12px;">
                <div class="hex-keygen-actions">
                    <button id="regenerate-key-btn" class="hex-contact-btn">🔑 Generate Key</button>
                    <button onclick="downloadKeyJSON('${hexId}')" class="hex-download-btn" title="Download JSON">💾</button>
                </div>
                <div class="hex-key-stats-inline">
                    <span id="keygen-stats"></span>
                </div>
                <div class="hex-keygen-results">
                    <div class="hex-key-section">
                        <div class="hex-key-header">
                            <span class="hex-info-label">🔑 Public Key</span>
                            <button onclick="copyToClipboard('public-key-output')" class="copy-btn-inline">📋 Copy</button>
                        </div>
                        <div class="key-preview" id="public-key-preview"></div>
                        <textarea readonly id="public-key-output" class="key-output-compact" rows="3" style="display: none;"></textarea>
                        <button onclick="toggleKey('public')" class="key-toggle-btn" id="public-toggle">Show Full Key</button>
                    </div>
                    <div class="hex-key-section">
                        <div class="hex-key-header">
                            <span class="hex-info-label">🔐 Private Key</span>
                            <button onclick="copyToClipboard('private-key-output')" class="copy-btn-inline">📋 Copy</button>
                        </div>
                        <div class="key-preview" id="private-key-preview"></div>
                        <textarea readonly id="private-key-output" class="key-output-compact" rows="3" style="display: none;"></textarea>
                        <button onclick="toggleKey('private')" class="key-toggle-btn" id="private-toggle">Show Full Key</button>
                    </div>
                </div>
            </div>
            <div class="hex-keygen-footer">
                <span class="hex-keygen-credit">Based on <a href="https://github.com/agessaman/meshcore-web-keygen" target="_blank">github.com/agessaman/meshcore-web-keygen</a></span>
            </div>
        </div>
    `;    
    
    modal.style. display = 'block';
    
    // Function to handle key generation
    async function generateKey() {
        const btn = document.getElementById('generate-key-btn');
        const regenBtn = document. getElementById('regenerate-key-btn');
        const activeBtn = btn && btn.offsetParent !== null ?  btn : regenBtn;
        
        activeBtn.disabled = true;
        activeBtn.textContent = '⏳ Generating...';
        
        document. getElementById('keygen-status').style.display = 'block';
        
        try {
            const result = await generateKeyForPrefix(hexId);
            
            // Show results
            document.getElementById('keygen-status').style.display = 'none';
            document.getElementById('keygen-result').style.display = 'block';
            
            // Set full keys
            document.getElementById('public-key-output').value = result.publicKey;
            document.getElementById('private-key-output').value = result.privateKey;
            
            // Set preview keys (first 8 + ...  + last 10 characters)
            const publicPreview = result.publicKey.substring(0, 8) + '...' + result.publicKey.substring(result.publicKey.length - 10);
            const privatePreview = result.privateKey.substring(0, 8) + '...' + result.privateKey.substring(result.privateKey.length - 10);
            
            document. getElementById('public-key-preview').textContent = publicPreview;
            document.getElementById('private-key-preview').textContent = privatePreview;
            
            document.getElementById('keygen-stats').textContent = 
                `✓ Generated in ${result.timeSeconds}s (${result.attempts.toLocaleString()} attempts)`;
            
            // Hide initial generate button
            if (btn) btn.parentElement.style. display = 'none';
            
            // Reset regenerate button
            if (regenBtn) {
                regenBtn.disabled = false;
                regenBtn. textContent = '🔑 Generate Key';
            }
            
            // Store for download
            window.generatedKey = result;
        } catch (error) {
            alert('Error generating key:  ' + error.message);
            activeBtn.disabled = false;
            activeBtn.textContent = '🔑 Generate Key';
            document.getElementById('keygen-status').style.display = 'none';
        }
    }
    
    // Attach event listener to initial generate button
    document.getElementById('generate-key-btn').addEventListener('click', generateKey);
    
    // Attach event listener to regenerate button (for after first generation)
    setTimeout(() => {
        const regenBtn = document.getElementById('regenerate-key-btn');
        if (regenBtn) {
            regenBtn.addEventListener('click', generateKey);
        }
    }, 0);
}

// Toggle key visibility
function toggleKey(type) {
    const preview = document.getElementById(`${type}-key-preview`);
    const textarea = document.getElementById(`${type}-key-output`);
    const toggleBtn = document.getElementById(`${type}-toggle`);
    
    if (textarea.style.display === 'none') {
        // Show full key
        preview.style.display = 'none';
        textarea.style.display = 'block';
        toggleBtn.textContent = 'Hide Full Key';
    } else {
        // Show preview
        preview.style.display = 'block';
        textarea. style.display = 'none';
        toggleBtn.textContent = 'Show Full Key';
    }
}
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn. textContent = '✓ Copied! ';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

function downloadKeyJSON(prefix) {
    if (!window.generatedKey) return;
    
    const data = {
        public_key: window.generatedKey.publicKey,
        private_key: window.generatedKey.privateKey,
        generated_at: new Date().toISOString(),
        prefix: prefix
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `meshcore_${prefix}_${timestamp}.json`;
    
    const a = document. createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

// Close modal when X is clicked
document. addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('hex-modal');
    const closeBtn = document.querySelector('.hex-modal-close');
    
    if (closeBtn) {
        closeBtn. onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style. display = 'none';
        }
    };
});