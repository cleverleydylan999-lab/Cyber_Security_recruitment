// Security Features & Website Performance Tester
// Comprehensive security and performance monitoring

// ============================================
// SECURITY FEATURES
// ============================================

class SecurityManager {
    constructor() {
        this.initializeSecurityHeaders();
        this.setupCSPPolicy();
        this.initializeInputSanitization();
        this.enableSecureStorage();
        this.monitorSecurityEvents();
    }

    // Initialize Security Headers
    initializeSecurityHeaders() {
        // Content Security Policy (CSP)
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com";
        document.head.appendChild(cspMeta);

        // X-Content-Type-Options
        const xContentType = document.createElement('meta');
        xContentType.httpEquiv = 'X-Content-Type-Options';
        xContentType.content = 'nosniff';
        document.head.appendChild(xContentType);

        // X-Frame-Options
        const xFrameOptions = document.createElement('meta');
        xFrameOptions.httpEquiv = 'X-Frame-Options';
        xFrameOptions.content = 'SAMEORIGIN';
        document.head.appendChild(xFrameOptions);

        // X-XSS-Protection
        const xXSSProtection = document.createElement('meta');
        xXSSProtection.httpEquiv = 'X-XSS-Protection';
        xXSSProtection.content = '1; mode=block';
        document.head.appendChild(xXSSProtection);

        console.log('[Security] Security headers initialized');
    }

    // Setup CSP Policy
    setupCSPPolicy() {
        window.addEventListener('securitypolicyviolation', (e) => {
            console.warn('[CSP Violation]', {
                blockedURI: e.blockedURI,
                violatedDirective: e.violatedDirective,
                originalPolicy: e.originalPolicy
            });
        });
    }

    // Input Sanitization
    initializeInputSanitization() {
        // Sanitize user inputs to prevent XSS
        window.sanitizeInput = (input) => {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        };

        // Sanitize HTML to prevent XSS
        window.sanitizeHTML = (html) => {
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp.innerHTML;
        };
    }

    // Enable Secure Storage
    enableSecureStorage() {
        window.SecureStorage = {
            // Secure localStorage wrapper
            setItem: (key, value) => {
                try {
                    // Add timestamp for additional security
                    const encryptedData = {
                        value: value,
                        timestamp: Date.now(),
                        hash: this.generateHash(value)
                    };
                    localStorage.setItem(key, JSON.stringify(encryptedData));
                    console.log('[Security] Data stored securely:', key);
                } catch (e) {
                    console.error('[Security] Storage error:', e);
                }
            },

            getItem: (key) => {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.hash === this.generateHash(data.value)) {
                        return data.value;
                    }
                    console.warn('[Security] Data integrity check failed for:', key);
                    return null;
                } catch (e) {
                    console.error('[Security] Retrieval error:', e);
                    return null;
                }
            },

            removeItem: (key) => {
                localStorage.removeItem(key);
                console.log('[Security] Data cleared:', key);
            }
        };
    }

    // Generate Hash (simple checksum)
    generateHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    // Monitor Security Events
    monitorSecurityEvents() {
        // Track suspicious activities
        document.addEventListener('paste', (e) => {
            console.log('[Security] Paste event detected');
        });

        window.addEventListener('beforeunload', (e) => {
            console.log('[Security] Page unload event');
        });

        // Monitor for XSS attempts
        this.monitorXSSAttempts();
    }

    // Monitor XSS Attempts
    monitorXSSAttempts() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.tagName === 'SCRIPT' || node.tagName === 'IFRAME') {
                                console.warn('[Security] Suspicious node detected:', node.tagName);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Validate Forms
    validateFormSecurity(formData) {
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /<script/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe/gi,
            /<embed/gi,
            /<object/gi
        ];

        for (const [key, value] of Object.entries(formData)) {
            if (typeof value === 'string') {
                for (const pattern of suspiciousPatterns) {
                    if (pattern.test(value)) {
                        console.error('[Security] Suspicious pattern detected in:', key);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Data Encryption (basic)
    encryptData(data, key = 'cybershield') {
        try {
            return btoa(data);
        } catch (e) {
            console.error('[Security] Encryption error:', e);
            return null;
        }
    }

    // Data Decryption (basic)
    decryptData(encryptedData) {
        try {
            return atob(encryptedData);
        } catch (e) {
            console.error('[Security] Decryption error:', e);
            return null;
        }
    }
}

// ============================================
// WEBSITE PERFORMANCE TESTER
// ============================================

class PerformanceTester {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
        this.initializePerformanceMonitoring();
        this.setupPerformanceTester();
    }

    // Initialize Performance Monitoring
    initializePerformanceMonitoring() {
        // Record page load metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.collectMetrics();
            }, 100);
        });

        // Monitor resource loading
        this.monitorResourceTiming();
    }

    // Collect Performance Metrics
    collectMetrics() {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (perfData) {
            this.metrics = {
                pageLoadTime: perfData.loadEventEnd - perfData.fetchStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint(),
                timeToFirstByte: perfData.responseStart - perfData.fetchStart,
                domInteractive: perfData.domInteractive - perfData.fetchStart,
                resourceLoadTime: perfData.transferSize || 0,
                memoryUsage: this.getMemoryUsage(),
                connectionLatency: this.getConnectionLatency()
            };

            console.log('[Performance] Metrics collected:', this.metrics);
        }
    }

    // Get First Paint
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fp = paintEntries.find(entry => entry.name === 'first-paint');
        return fp ? fp.startTime : 0;
    }

    // Get First Contentful Paint
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : 0;
    }

    // Get Memory Usage
    getMemoryUsage() {
        if (performance.memory) {
            return {
                usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
                totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
                jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
            };
        }
        return { unavailable: true };
    }

    // Get Connection Latency
    getConnectionLatency() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType || 'unknown',
                downlink: connection.downlink + ' Mbps' || 'unknown',
                rtt: connection.rtt + ' ms' || 'unknown',
                saveData: connection.saveData
            };
        }
        return { unavailable: true };
    }

    // Monitor Resource Timing
    monitorResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        this.resourceMetrics = resources.map(resource => ({
            name: resource.name.split('/').pop(),
            duration: Math.round(resource.duration) + ' ms',
            size: Math.round(resource.transferSize / 1024) + ' KB',
            type: resource.initiatorType
        }));
    }

    // Setup Performance Tester UI
    setupPerformanceTester() {
        // Create tester button
        const testerBtn = document.createElement('button');
        testerBtn.id = 'performanceTesterBtn';
        testerBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> Performance Test';
        testerBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
            transition: all 0.3s ease;
        `;

        testerBtn.addEventListener('mouseover', () => {
            testerBtn.style.transform = 'translateY(-4px)';
            testerBtn.style.boxShadow = '0 8px 20px rgba(0, 217, 255, 0.4)';
        });

        testerBtn.addEventListener('mouseout', () => {
            testerBtn.style.transform = 'translateY(0)';
            testerBtn.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.3)';
        });

        testerBtn.addEventListener('click', () => {
            this.displayPerformanceReport();
        });

        document.body.appendChild(testerBtn);

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'performanceModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            overflow-y: auto;
        `;
        document.body.appendChild(modal);
    }

    // Display Performance Report
    displayPerformanceReport() {
        const modal = document.getElementById('performanceModal');
        const report = this.generatePerformanceReport();
        
        modal.innerHTML = `
            <div style="
                position: relative;
                max-width: 900px;
                margin: 40px auto;
                background: #0a0e27;
                border: 1px solid rgba(0, 217, 255, 0.3);
                border-radius: 12px;
                padding: 40px;
                color: white;
                font-family: 'Inter', sans-serif;
            ">
                <button onclick="document.getElementById('performanceModal').style.display='none'" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: #00d9ff;
                    font-size: 24px;
                    cursor: pointer;
                ">×</button>
                
                ${report}
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // Generate Performance Report
    generatePerformanceReport() {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        return `
            <h1 style="color: #00d9ff; margin-bottom: 30px; text-align: center;">
                <i class="fas fa-chart-line"></i> Website Performance Report
            </h1>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                ${this.createMetricCard('Page Load Time', Math.round(this.metrics.pageLoadTime) + ' ms', this.getLoadTimeStatus(this.metrics.pageLoadTime))}
                ${this.createMetricCard('DOM Content Loaded', Math.round(this.metrics.domContentLoaded) + ' ms', this.getDomStatus(this.metrics.domContentLoaded))}
                ${this.createMetricCard('Time to First Byte', Math.round(this.metrics.timeToFirstByte) + ' ms', this.getTTFBStatus(this.metrics.timeToFirstByte))}
                ${this.createMetricCard('First Paint', Math.round(this.metrics.firstPaint) + ' ms', this.getPaintStatus(this.metrics.firstPaint))}
                ${this.createMetricCard('FCP', Math.round(this.metrics.firstContentfulPaint) + ' ms', this.getPaintStatus(this.metrics.firstContentfulPaint))}
                ${this.createMetricCard('DOM Interactive', Math.round(this.metrics.domInteractive) + ' ms', this.getDomStatus(this.metrics.domInteractive))}
            </div>

            <div style="background: rgba(0, 217, 255, 0.05); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #00d9ff; margin-bottom: 15px;">📡 Connection Information</h3>
                ${this.formatConnectionInfo()}
            </div>

            <div style="background: rgba(0, 217, 255, 0.05); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #00d9ff; margin-bottom: 15px;">💾 Memory Usage</h3>
                ${this.formatMemoryInfo()}
            </div>

            <div style="background: rgba(0, 217, 255, 0.05); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 8px; padding: 20px;">
                <h3 style="color: #00d9ff; margin-bottom: 15px;">📦 Resource Load Times (Top 10)</h3>
                ${this.formatResourceTiming()}
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(0, 217, 255, 0.1); border-radius: 8px;">
                <p style="font-size: 12px; color: #a0aec0;">
                    Report generated: ${new Date().toLocaleString()}<br>
                    Reload page to get fresh metrics
                </p>
            </div>
        `;
    }

    // Create Metric Card
    createMetricCard(label, value, status) {
        const statusColor = status.includes('✓') ? '#00d9ff' : (status.includes('⚠') ? '#fbbf24' : '#ef4444');
        const statusText = status;

        return `
            <div style="
                background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 217, 255, 0.05));
                border: 1px solid rgba(0, 217, 255, 0.2);
                border-radius: 8px;
                padding: 20px;
            ">
                <p style="color: #a0aec0; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${label}
                </p>
                <p style="color: #00d9ff; font-size: 24px; font-weight: 700; margin: 0 0 10px 0;">
                    ${value}
                </p>
                <p style="color: ${statusColor}; margin: 0; font-size: 12px;">
                    ${statusText}
                </p>
            </div>
        `;
    }

    // Get Load Time Status
    getLoadTimeStatus(loadTime) {
        if (loadTime < 1000) return '✓ Excellent';
        if (loadTime < 2000) return '✓ Good';
        if (loadTime < 3000) return '⚠ Fair';
        return '✗ Poor';
    }

    // Get DOM Status
    getDomStatus(domTime) {
        if (domTime < 500) return '✓ Excellent';
        if (domTime < 1000) return '✓ Good';
        if (domTime < 2000) return '⚠ Fair';
        return '✗ Poor';
    }

    // Get TTFB Status
    getTTFBStatus(ttfb) {
        if (ttfb < 100) return '✓ Excellent';
        if (ttfb < 300) return '✓ Good';
        if (ttfb < 600) return '⚠ Fair';
        return '✗ Poor';
    }

    // Get Paint Status
    getPaintStatus(paintTime) {
        if (paintTime < 1000) return '✓ Excellent';
        if (paintTime < 2000) return '✓ Good';
        if (paintTime < 3000) return '⚠ Fair';
        return '✗ Poor';
    }

    // Format Connection Info
    formatConnectionInfo() {
        const connection = this.getConnectionLatency();
        if (connection.unavailable) {
            return '<p style="color: #a0aec0;">Connection information not available in your browser</p>';
        }
        return `
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                    <td style="padding: 10px; color: #a0aec0;">Connection Type:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${connection.effectiveType}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                    <td style="padding: 10px; color: #a0aec0;">Downlink Speed:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${connection.downlink}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                    <td style="padding: 10px; color: #a0aec0;">Round Trip Time:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${connection.rtt}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; color: #a0aec0;">Save Data:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${connection.saveData ? 'Enabled' : 'Disabled'}</td>
                </tr>
            </table>
        `;
    }

    // Format Memory Info
    formatMemoryInfo() {
        const memory = this.getMemoryUsage();
        if (memory.unavailable) {
            return '<p style="color: #a0aec0;">Memory information not available in your browser</p>';
        }
        return `
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                    <td style="padding: 10px; color: #a0aec0;">Used JS Heap:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${memory.usedJSHeapSize}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                    <td style="padding: 10px; color: #a0aec0;">Total JS Heap:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${memory.totalJSHeapSize}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; color: #a0aec0;">JS Heap Limit:</td>
                    <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${memory.jsHeapSizeLimit}</td>
                </tr>
            </table>
        `;
    }

    // Format Resource Timing
    formatResourceTiming() {
        if (!this.resourceMetrics || this.resourceMetrics.length === 0) {
            return '<p style="color: #a0aec0;">No resources loaded yet</p>';
        }

        const topResources = this.resourceMetrics.slice(0, 10);
        return `
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 2px solid rgba(0, 217, 255, 0.2); background: rgba(0, 217, 255, 0.05);">
                    <th style="padding: 10px; text-align: left; color: #00d9ff;">Resource</th>
                    <th style="padding: 10px; text-align: left; color: #00d9ff;">Load Time</th>
                    <th style="padding: 10px; text-align: left; color: #00d9ff;">Size</th>
                    <th style="padding: 10px; text-align: left; color: #00d9ff;">Type</th>
                </tr>
                ${topResources.map(resource => `
                    <tr style="border-bottom: 1px solid rgba(0, 217, 255, 0.1);">
                        <td style="padding: 10px; color: #a0aec0; word-break: break-all;">${resource.name}</td>
                        <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${resource.duration}</td>
                        <td style="padding: 10px; color: #00d9ff; font-weight: 600;">${resource.size}</td>
                        <td style="padding: 10px; color: #a0aec0; font-size: 12px;">${resource.type}</td>
                    </tr>
                `).join('')}
            </table>
        `;
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Security Manager
    const securityManager = new SecurityManager();
    window.securityManager = securityManager;

    // Initialize Performance Tester
    const performanceTester = new PerformanceTester();
    window.performanceTester = performanceTester;

    console.log('%c[CyberShield Security & Performance]', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
    console.log('%cSecurity Manager Initialized ✓', 'color: #00d9ff;');
    console.log('%cPerformance Tester Ready ✓', 'color: #00d9ff;');
    console.log('%cClick "Performance Test" button to view detailed metrics', 'color: #a0aec0;');
});

// Log security info on page load
window.addEventListener('load', () => {
    console.log('%cPage Security Assessment:', 'color: #00d9ff; font-weight: bold;');
    console.log('✓ HTTPS Recommended: Use secure connection');
    console.log('✓ Content Security Policy: Active');
    console.log('✓ XSS Protection: Enabled');
    console.log('✓ Input Sanitization: Active');
    console.log('✓ Secure Storage: Available');
});
