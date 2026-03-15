import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// DOM Elements
const trendingGrid = document.getElementById('trendingGrid');
const latestGrid = document.getElementById('latestGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Player Modal Elements
const playerModal = document.getElementById('playerModal');
const closePlayerBtn = document.getElementById('closePlayerBtn');
const videoPreviewIframe = document.getElementById('videoPreviewIframe');
const customPlayAction = document.getElementById('customPlayAction');
const playerTitle = document.getElementById('playerTitle');
const videoContainer = document.getElementById('videoContainer');

let allVideos = [];
let currentCategory = 'All';
let currentSearch = '';

// Currently selected video data for the player
let activeVideoData = null;

// Initialize
async function init() {
    await fetchVideos();
    renderVideos();
    setupEventListeners();
}

// Fetch Videos from Firestore
async function fetchVideos() {
    try {
        const videosCollection = collection(db, 'videos');
        const q = query(videosCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        allVideos = [];
        querySnapshot.forEach((docSnap) => {
            allVideos.push({ id: docSnap.id, ...docSnap.data() });
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

// Render Videos
function renderVideos() {
    let filteredVideos = allVideos.filter(video => {
        const matchCategory = currentCategory === 'All' || video.category === currentCategory;
        const matchSearch = video.title.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Dummy trending logic (shuffled slice)
    let trendingVideos = [...filteredVideos].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Latest upload logic
    let latestVideos = [...filteredVideos].sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);

    // Render Trending
    trendingGrid.innerHTML = '';
    if (trendingVideos.length === 0) {
        trendingGrid.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">No trending videos found.</p>';
    } else {
        trendingVideos.forEach(video => {
            trendingGrid.appendChild(createVideoCard(video));
        });
    }

    // Render Latest
    latestGrid.innerHTML = '';
    if (latestVideos.length === 0) {
        latestGrid.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">No latest uploads found.</p>';
    } else {
        latestVideos.forEach(video => {
            latestGrid.appendChild(createVideoCard(video));
        });
    }
}

// Create Card
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    // Lazy loaded image
    card.innerHTML = `
        <div class="thumbnail-container">
            <img src="${video.thumbnailUrl}" alt="${video.title}" class="thumbnail" loading="lazy">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-meta">
                <span>${video.category || 'General'}</span> <span style="margin: 0 5px;">•</span> 
                <span>${new Date(video.timestamp || Date.now()).toLocaleDateString()}</span>
            </div>
        </div>
    `;

    // Ads System Logic Step 1
    // Click on Thumbnail -> Open Promo Direct Link -> Open Preview Player
    card.addEventListener('click', () => {
        // Validation check
        let promoDirect = video.promoDirectLink || video.adsDirectLink;
        if(promoDirect) {
            window.open(promoDirect, '_blank'); // Promo opens in new tab
        }

        // Show player
        openPlayerMode(video);
    });

    return card;
}

// Player Modals Logic
function openPlayerMode(video) {
    activeVideoData = video;
    playerTitle.textContent = video.title;
    
    // Load Preview Link
    videoPreviewIframe.src = video.previewLink;
    
    // Show overlay play action
    customPlayAction.style.display = 'flex';
    
    // Reveal Modal
    playerModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Setup Listeners
function setupEventListeners() {
    
    // Promo System Logic Step 2
    // Click on Play Overlay -> Open Video Promo Direct Link -> Play actual video
    customPlayAction.addEventListener('click', () => {
        if (!activeVideoData) return;

        // Open Second Promo in new Tab
        let vpDirect = activeVideoData.videoPromoDirectLink || activeVideoData.videoAdsDirectLink;
        if (vpDirect) {
            window.open(vpDirect, '_blank');
        }

        // Hide Play Action Overlay
        customPlayAction.style.display = 'none';

        // Load Main Video Link
        // Instead of typical iframe src toggle, if videoLink is an MP4 we can inject a <video> tag
        // If it's an embed URL we replace iframe. Built logic supports switching.
        
        let vLink = activeVideoData.videoLink.toLowerCase();
        if (vLink.endsWith('.mp4') || vLink.endsWith('.webm') || vLink.endsWith('.ogg')) {
            // It's a direct video file
            let videoElement = document.createElement('video');
            videoElement.src = activeVideoData.videoLink;
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.position = 'absolute';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.className = 'dynamic-player';
            
            videoContainer.appendChild(videoElement);
            videoPreviewIframe.style.display = 'none'; // Hide iframe preview
        } else {
            // It's probably an embed link (like YouTube full structure with autoplay)
            // Add autoplay parameter to the URL if not present
            let finalLink = activeVideoData.videoLink;
            if(!finalLink.includes('autoplay')) {
                finalLink += finalLink.includes('?') ? '&autoplay=1' : '?autoplay=1';
            }
            videoPreviewIframe.src = finalLink;
        }
    });

    // Close Modal
    closePlayerBtn.addEventListener('click', () => {
        playerModal.style.display = 'none';
        videoPreviewIframe.src = ''; // Stop playing
        document.body.style.overflow = 'auto'; // allow scrolling again
        
        // Remove dynamically created <video> tags if any
        const dynamicVideos = document.querySelectorAll('.dynamic-player');
        dynamicVideos.forEach(v => v.remove());
        videoPreviewIframe.style.display = 'block'; // Reset iframe visibility
    });

    // Filter Categories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.category;
            
            // Update UI Active State
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            renderVideos();
        });
    });

    // Search Logic
    const doSearch = () => {
        currentSearch = searchInput.value;
        renderVideos();
    };
    
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('input', (e) => {
        // Optional live search debouncing
        currentSearch = e.target.value;
        renderVideos();
    });
}

// Start app
document.addEventListener('DOMContentLoaded', init);
