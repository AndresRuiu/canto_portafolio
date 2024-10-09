let projectsData = [];
let teamData = [];

async function loadData() {
    try {
        const response = await fetch('project-data.json');
        const data = await response.json();
        projectsData = data.projects;
        teamData = data.team;
        displayProjects();
        displayTeamMembers();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function displayProjects() {
    const projectGrid = document.getElementById('project-grid');
    projectGrid.innerHTML = '';

    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => openModal(project.id);

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
            </div>
        `;

        projectGrid.appendChild(projectCard);
    });
}

function displayTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    teamGrid.innerHTML = '';

    teamData.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';

        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <h3>${member.name}</h3>
            <p>${member.profession}</p>
        `;

        teamGrid.appendChild(memberCard);
    });
}

function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const fileContainer = document.getElementById('file-container');

    modal.style.display = 'block';
    modalTitle.textContent = project.title;
    modalBody.innerHTML = `<p>${project.details}</p>`;

    if (project.type === 'pdf') {
        fileContainer.innerHTML = `
            <iframe id="file-viewer" src="${project.file}" type="application/pdf"></iframe>
        `;
    } else if (project.type === 'mp4') {
        fileContainer.innerHTML = `
            <div id="video-container">
                <video id="video-player" controls>
                    <source src="${project.file}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <button class="fullscreen-btn" onclick="toggleFullscreen()">Fullscreen</button>
            </div>
        `;
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('file-container').innerHTML = '';
}

function toggleFullscreen() {
    const videoPlayer = document.getElementById('video-player');
    if (!document.fullscreenElement) {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) { /* Firefox */
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) { /* IE/Edge */
            videoPlayer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', loadData);