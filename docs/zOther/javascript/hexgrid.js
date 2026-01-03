// Modal functions for hex grid
function showRepeaterInfo(hexId, info) {
    const modal = document.getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    const contactLink = info.contact_url 
        ? `<a href="${info.contact_url}" class="hex-contact-btn">Add Contact</a>` 
        : '<span class="hex-no-contact">No Contact Available</span>';
    
    const stateClass = info.state.toLowerCase().replace(/\s+/g, '-');
    
    // Format height and power if available
    const antennaDisplay = info.antenna ? `${info.antenna}` : 'N/A';
    const heightDisplay = info.height_metre ? `${info.height_metre}m` : 'N/A';
    const powerDisplay = info.power_watt ? `${info.power_watt}W` : 'N/A';
    
    modalBody.innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-used-badge">${hexId}</span>
                <span class="hex-state-badge hex-state-${stateClass}">${info.state}</span>
            </div>
            <h2 class="hex-info-title">${info. name}</h2>
            <div class="hex-info-grid">
                <div class="hex-info-item">
                    <span class="hex-info-label">📡 Antenna</span>
                    <span class="hex-info-value">${antennaDisplay}</span>
                </div>
                <div class="hex-info-item">
                    <span class="hex-info-label">📍 Location</span>
                    <span class="hex-info-value">${info.location}</span>
                </div>
                <div class="hex-info-row">
                    <div class="hex-info-item hex-info-half">
                        <span class="hex-info-label">📏 Height</span>
                        <span class="hex-info-value">${heightDisplay}</span>
                    </div>
                    <div class="hex-info-item hex-info-half">
                        <span class="hex-info-label">⚡ Power</span>
                        <span class="hex-info-value">${powerDisplay}</span>
                    </div>
                </div>
                <div class="hex-info-item">
                    <span class="hex-info-label">🕐 Last Heard</span>
                    <span class="hex-info-value">${info. last_heard}</span>
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
    const modal = document. getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    let entriesHtml = '';
    infoArray.forEach((info, idx) => {
        const contactLink = info.contact_url 
            ? `<a href="${info.contact_url}" class="hex-contact-btn-small">Add Contact</a>` 
            : '<span class="hex-no-contact-small">No Contact</span>';
        
        const stateClass = info.state.toLowerCase().replace(/\s+/g, '-');
        const heightDisplay = info.height_metre ? `${info.height_metre}m` : 'N/A';
        const powerDisplay = info.power_watt ? `${info.power_watt}W` : 'N/A';
        
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
                        <span class="hex-info-label">📏</span>
                        <span class="hex-info-value">${heightDisplay}</span>
                    </div>
                    <div class="hex-info-item-small">
                        <span class="hex-info-label">⚡</span>
                        <span class="hex-info-value">${powerDisplay}</span>
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
            <p class="hex-duplicate-warning">Multiple repeaters are using the same ID.   This must be resolved! </p>
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
    
    modalBody. innerHTML = `
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

function showBackboneInfo(hexId, info) {
    const modal = document. getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    const contactLink = info. contact_url 
        ? `<a href="${info.contact_url}" class="hex-contact-btn">Add Contact</a>` 
        : '<span class="hex-no-contact">No Contact Available</span>';
    
    const stateClass = info.state.toLowerCase().replace(/\s+/g, '-');
    const heightDisplay = info.height_metre ? `${info.height_metre}m` : 'N/A';
    const powerDisplay = info.power_watt ? `${info.power_watt}W` : 'N/A';
    
    modalBody. innerHTML = `
        <div class="hex-info-card">
            <div class="hex-info-header">
                <span class="hex-id-badge hex-backbone-badge">${hexId}</span>
                <span class="hex-state-badge hex-state-${stateClass}">Backbone Reserved</span>
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
                <div class="hex-info-row">
                    <div class="hex-info-item hex-info-half">
                        <span class="hex-info-label">📏 Height</span>
                        <span class="hex-info-value">${heightDisplay}</span>
                    </div>
                    <div class="hex-info-item hex-info-half">
                        <span class="hex-info-label">⚡ Power</span>
                        <span class="hex-info-value">${powerDisplay}</span>
                    </div>
                </div>
                <div class="hex-info-item">
                    <span class="hex-info-label">🕐 Last Heard</span>
                    <span class="hex-info-value">${info. last_heard}</span>
                </div>
            </div>
            <div class="hex-info-contact">
                ${contactLink}
            </div>
        </div>
    `;
    
    modal.style. display = 'block';
}

// Key generation using pure JS Ed25519 implementation (no external dependencies)
async function generateKeyForPrefix(prefix) {
    const targetPrefix = prefix.toUpperCase();
    
    // Convert bytes to hex
    const toHex = (bytes) => {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    };
    
    let attempts = 0;
    const startTime = Date.now();
    
    // Load the offline implementation (pure JS, no external dependencies)
    const noble = await import('./noble-ed25519-offline-simple.js');
    
    while (true) {
        attempts++;
        
        try {
            // RFC 8032 Ed25519 key generation
            // Step 1: Generate 32-byte random seed
            const seed = crypto.getRandomValues(new Uint8Array(32));
            
            // Step 2: SHA-512 hash the seed
            const digest = await crypto.subtle.digest('SHA-512', seed);
            const digestArray = new Uint8Array(digest);
            
            // Step 3: Get first 32 bytes and create clamped version
            const unclamped = new Uint8Array(digestArray.slice(0, 32));
            const clamped = new Uint8Array(unclamped);
            clamped[0] &= 248;  // Clear bottom 3 bits
            clamped[31] &= 63;  // Clear top 2 bits
            clamped[31] |= 64;  // Set bit 6
            
            // Step 4: Generate public key using offline implementation
            const publicKeyBytes = noble.getPublicKeyFromScalar(clamped);
            
            // Step 5: Create MeshCore 64-byte private key
            // Format: [clamped_scalar (32 bytes)][sha512_second_half (32 bytes)]
            const meshcorePrivateKey = new Uint8Array(64);
            meshcorePrivateKey.set(clamped, 0);                    // First 32 bytes: clamped scalar
            meshcorePrivateKey.set(digestArray.slice(32, 64), 32); // Second 32 bytes: SHA-512(seed)[32:64]
            
            const publicKeyHex = toHex(publicKeyBytes);
            const privateKeyHex = toHex(meshcorePrivateKey);
            
            // Check if it matches
            if (publicKeyHex.startsWith(targetPrefix)) {
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                return {
                    publicKey: publicKeyHex,
                    privateKey: privateKeyHex,
                    attempts: attempts,
                    timeSeconds: elapsedTime
                };
            }
            
            // Update progress every 100 attempts and yield to UI
            if (attempts % 100 === 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                const rate = Math.floor(attempts / elapsed);
                updateKeygenProgress(attempts, rate);
                // Yield to browser to prevent freezing
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        } catch (error) {
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
    const modal = document. getElementById('hex-modal');
    const modalBody = document.getElementById('hex-modal-body');
    
    modalBody.innerHTML = `
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
            <div id="keygen-status" style="margin-top: 12px; display: none;">
                <p id="keygen-progress"></p>
            </div>
            <div id="keygen-result" style="display: none; margin-top: 12px;">
                <div class="hex-keygen-results">
                    <div class="hex-key-section">
                        <div class="hex-key-header">
                            <span class="hex-info-label">🔑 Public Key</span>
                            <button onclick="copyToClipboard('public-key-output')" class="copy-btn-inline">📋 Copy</button>
                        </div>
                        <textarea readonly id="public-key-output" class="key-output-compact" rows="1"></textarea>
                    </div>
                    <div class="hex-key-section">
                        <div class="hex-key-header">
                            <span class="hex-info-label">🔐 Private Key</span>
                            <button onclick="copyToClipboard('private-key-output')" class="copy-btn-inline">📋 Copy</button>
                        </div>
                        <textarea readonly id="private-key-output" class="key-output-compact" rows="1"></textarea>
                    </div>
                </div>
                <div class="hex-key-stats-inline">
                    <span id="keygen-stats"></span>
                </div>
                <div class="hex-info-contact" style="margin-top: 12px;">
                    <button onclick="downloadKeyJSON('${hexId}')" class="hex-contact-btn">💾 Download JSON</button>
                </div>
            </div>
            <div class="hex-keygen-footer">
                <span class="hex-keygen-credit">Based on <a href="https://github.com/agessaman/meshcore-web-keygen" target="_blank">github.com/agessaman/meshcore-web-keygen</a></span>
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
            document. getElementById('private-key-output').value = result.privateKey;
            document.getElementById('keygen-stats').textContent = 
                `✓ Generated in ${result.timeSeconds}s (${result.attempts. toLocaleString()} attempts)`;
            
            // Store for download
            window.generatedKey = result;
        } catch (error) {
            alert('Error generating key: ' + error.message);
            btn.disabled = false;
            btn.textContent = '🔑 Generate Key';
            document.getElementById('keygen-status').style.display = 'none';
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
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL. createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `meshcore_${prefix}_${timestamp}.json`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

// Close modal when X is clicked
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('hex-modal');
    const closeBtn = document.querySelector('.hex-modal-close');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    // Search functionality
    const searchInput = document.getElementById('hex-search');
    const searchClear = document.getElementById('hex-search-clear');
    const searchResults = document.getElementById('hex-search-results');
    const hexTable = document.getElementById('repeater-hex-grid');
    
    if (!searchInput || !hexTable) return;
    
    // Store original repeater data in data attributes
    const cells = hexTable.querySelectorAll('td[onclick]');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        // Show/hide clear button
        if (query.length > 0) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
            clearSearch();
            return;
        }
        
        // Perform search
        if (query.length >= 2) {
            performSearch(query);
        }
    });
    
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchClear.style.display = 'none';
        clearSearch();
        searchInput.focus();
    });
    
    function performSearch(query) {
        let matchCount = 0;
        let totalSearchable = 0;
        
        cells.forEach(cell => {
            const onclick = cell.getAttribute('onclick');
            
            // Skip reserved cells (they don't have repeater info)
            if (onclick.includes('showReservedInfo')) {
                cell.classList.remove('hex-highlighted', 'hex-dimmed');
                return;
            }
            
            // Skip free cells
            if (onclick.includes('showKeygenModal')) {
                cell.classList.add('hex-dimmed');
                return;
            }
            
            totalSearchable++;
            
            // Extract the info JSON from onclick
            let matched = false;
            
            // For single repeaters:  showRepeaterInfo or showBackboneInfo
            if (onclick.includes('showRepeaterInfo') || onclick.includes('showBackboneInfo')) {
                // Extract JSON between the quotes after the hex ID
                const regex = /show(?:Repeater|Backbone)Info\("([^"]+)",\s*({[^}]+})\)/;
                const match = onclick.match(regex);
                if (match && match[2]) {
                    const infoStr = match[2].replace(/&quot;/g, '"');
                    try {
                        const info = JSON.parse(infoStr);
                        matched = searchInInfo(info, query);
                    } catch (e) {
                        console.error('Parse error for single:', e, infoStr);
                    }
                }
            }
            
            // For duplicates: showDuplicateInfo
            if (onclick.includes('showDuplicateInfo')) {
                // Extract JSON array
                const regex = /showDuplicateInfo\("([^"]+)",\s*(\[[^\]]+\])\)/;
                const match = onclick.match(regex);
                if (match && match[2]) {
                    const infoStr = match[2].replace(/&quot;/g, '"');
                    try {
                        const infoArray = JSON.parse(infoStr);
                        matched = infoArray.some(info => searchInInfo(info, query));
                    } catch (e) {
                        console.error('Parse error for duplicate:', e, infoStr);
                    }
                }
            }
            
            if (matched) {
                cell.classList.add('hex-highlighted');
                cell.classList.remove('hex-dimmed');
                matchCount++;
            } else {
                cell.classList.add('hex-dimmed');
                cell.classList.remove('hex-highlighted');
            }
        });
        
        // Update results
        if (matchCount > 0) {
            searchResults.textContent = `Found ${matchCount} matching repeater${matchCount !== 1 ? 's' :  ''} out of ${totalSearchable}`;
            searchResults.style.color = '#a8d68c';
        } else {
            searchResults.textContent = `No matches found for "${query}"`;
            searchResults.style.color = '#ff9999';
        }
    }
    
    function searchInInfo(info, query) {
        const searchableFields = [
            info.name,
            info.location,
            info.antenna,
            info.state,
            info.height_metre,
            info.power_watt
        ];
        
        return searchableFields.some(field => {
            if (field === undefined || field === null) return false;
            return String(field).toLowerCase().includes(query);
        });
    }
    
    function clearSearch() {
        cells.forEach(cell => {
            cell.classList.remove('hex-highlighted', 'hex-dimmed');
        });
        searchResults.textContent = '';
    }
});
