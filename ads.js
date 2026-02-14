/**
 * Ad Manager
 * Handles placement of ad containers and responsiveness.
 */

const Ads = {
    init: function() {
        console.log("Ads: Initializing placeholders...");
        this.loadBanner('ad-header', 'Leaderboard Ad (728x90)');
        this.loadSidebar('ad-sidebar', 'Skyscraper Ad (160x600)');
    },

    loadBanner: function(id, text) {
        const el = document.getElementById(id);
        if(el) {
            el.innerHTML = `<div style="text-align:center;">
                <span>${text}</span>
                <div style="font-size:10px; color:#666;">Google AdSense Placeholder</div>
            </div>`;
        }
    },

    loadSidebar: function(id, text) {
        const el = document.getElementById(id);
        if(el) {
            el.innerHTML = `<div style="text-align:center; writing-mode: vertical-rl; transform: rotate(180deg);">
                <span>${text}</span>
            </div>`;
        }
    }
};
