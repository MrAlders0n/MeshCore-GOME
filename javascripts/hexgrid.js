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
    
    modal.style.display = 'block';
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