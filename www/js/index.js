/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    // Initialize ${appConfig.displayName}
    initializeApp();
}

function initializeApp() {
    console.log('${appConfig.displayName} initialized successfully!');

    // Hide splash screen
    if (navigator.splashscreen) {
        navigator.splashscreen.hide();
    }

    // Set status bar style
    if (window.StatusBar) {
        StatusBar.styleDefault();
    }

    // App-specific initialization
    setupEventListeners();
    loadAppContent();
}

function setupEventListeners() {
    // Add your event listeners here
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showToast('Welcome to ${appConfig.displayName}!');
        });
    }

    // Handle back button (Android)
    document.addEventListener('backbutton', onBackKeyDown, false);
}

function onBackKeyDown() {
    // Handle back button press
    if (confirm('Exit ${appConfig.displayName}?')) {
        navigator.app.exitApp();
    }
}

function loadAppContent() {
    // Load app-specific content
    console.log('Loading ${appConfig.displayName} content...');

    // Update app info in the UI
    updateAppInfo();
}

function updateAppInfo() {
    const appTitle = document.querySelector('.app-title');
    const appSubtitle = document.querySelector('.app-subtitle');

    if (appTitle) {
        appTitle.textContent = '${appConfig.displayName}';
    }

    if (appSubtitle) {
        appSubtitle.textContent = '${appConfig.description}';
    }
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 1000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Hide and remove toast
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Utility functions
function getDeviceInfo() {
    if (window.device) {
        return {
            platform: device.platform,
            version: device.version,
            model: device.model,
            manufacturer: device.manufacturer
        };
    }
    return null;
}

function isOnline() {
    return navigator.connection && navigator.connection.type !== Connection.NONE;
}

// Export functions for global access
window.appFunctions = {
    showToast,
    getDeviceInfo,
    isOnline,
    updateAppInfo
};