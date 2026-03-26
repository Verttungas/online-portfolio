class SkillsMatrix {
  constructor(containerId, lang = 'es') {
    this.container = document.getElementById(containerId);
    this.lang = lang;
    this.currentFilter = 'all';
    this.icons = this.getSvgIcons();
    this.skills = this.getSkillsData();
    this.init();
  }

  getSvgIcons() {
    const s = (d) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    return {
      python:      s('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
      flask:       s('<path d="M9 3h6v5.586a1 1 0 0 1 .293.707l2.414 2.414a3 3 0 0 1 .879 2.121V18a3 3 0 0 1-3 3H8.414a3 3 0 0 1-3-3v-4.172a3 3 0 0 1 .879-2.121L8.707 9.293A1 1 0 0 0 9 8.586V3z"/><line x1="9" y1="3" x2="15" y2="3"/>'),
      sql:         s('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'),
      javascript:  s('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17V11"/><path d="M12 17c1.5 0 2-1 2-2s-.5-2-2-2-2-1-2-2 .5-2 2-2"/>'),
      cloud:       s('<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'),
      server:      s('<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'),
      grid:        s('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
      briefcase:   s('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
      terminal:    s('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
      shield:      s('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
      lock:        s('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
      eye:         s('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
      clipboard:   s('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>'),
      globe:       s('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
      cpu:         s('<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>'),
      brain:       s('<path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z"/><path d="M12 2v20"/>'),
      smartphone:  s('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>'),
      zap:         s('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
      barChart:    s('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>'),
      folder:      s('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
      database:    s('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'),
      leaf:        s('<path d="M17 8c-4 0-8 2-10 6 1-1 3-2 5-2"/><path d="M6 21s1-6 5-10c4-4 10-5 10-5s-1 6-5 10c-4 4-10 5-10 5z"/>'),
      award:       s('<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>'),
      certificate: s('<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><circle cx="16" cy="16" r="2"/>'),
      layers:      s('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
      link:        s('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
      share:       s('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'),
      code:        s('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
      layout:      s('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'),
      pieChart:    s('<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>'),
      sparkle:     s('<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>'),
      gitBranch:   s('<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'),
      wifi:        s('<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>'),
      hash:        s('<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>'),
      fileCode:    s('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="10" y1="12" x2="8" y2="15"/><line x1="14" y1="12" x2="16" y2="15"/>'),
      box:         s('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'),
    };
  }

  getSkillsData() {
    return {
      'languages': {
        name: this.lang === 'es' ? 'Lenguajes & Frameworks' : 'Languages & Frameworks',
        skills: [
          { name: 'Python', icon: 'python' },
          { name: 'JavaScript', icon: 'javascript' },
          { name: 'TypeScript', icon: 'javascript' },
          { name: 'HTML/CSS', icon: 'code' },
          { name: 'PHP', icon: 'fileCode' },
          { name: 'Java', icon: 'fileCode' },
          { name: 'Kotlin', icon: 'box' },
          { name: 'Dart', icon: 'zap' },
          { name: 'Flutter', icon: 'smartphone' },
          { name: 'Go', icon: 'terminal' },
          { name: 'C/C++', icon: 'cpu' },
          { name: 'Visual Basic', icon: 'fileCode' },
          { name: 'R', icon: 'hash' },
          { name: 'SQL', icon: 'sql' },
          { name: 'Bash/Shell', icon: 'terminal' },
          { name: 'Flask', icon: 'flask' }
        ]
      },
      'cloud': {
        name: this.lang === 'es' ? 'Cloud & DevOps' : 'Cloud & DevOps',
        skills: [
          { name: 'AWS S3', icon: 'cloud' },
          { name: 'AWS EC2', icon: 'server' },
          { name: 'Google Cloud', icon: 'cloud' },
          { name: 'GWS Admin', icon: 'grid' },
          { name: 'Microsoft 365', icon: 'briefcase' },
          { name: 'Ubuntu Server', icon: 'terminal' },
          { name: 'Linux (RHEL)', icon: 'terminal' },
          { name: this.lang === 'es' ? 'Arquitectura HA' : 'HA Architecture', icon: 'layers' },
          { name: 'Cloudflare Tunnels', icon: 'link' },
          { name: 'Tailscale', icon: 'share' }
        ]
      },
      'security': {
        name: this.lang === 'es' ? 'Ciberseguridad' : 'Cybersecurity',
        skills: [
          { name: 'GRC', icon: 'shield' },
          { name: 'InfoSec', icon: 'lock' },
          { name: 'Cyberhaven', icon: 'eye' },
          { name: 'ZenGRC', icon: 'clipboard' },
          { name: 'Cisco CCNA', icon: 'globe' }
        ]
      },
      'automation': {
        name: this.lang === 'es' ? 'IA & Automatización' : 'AI & Automation',
        skills: [
          { name: 'n8n', icon: 'cpu' },
          { name: 'Claude Code', icon: 'terminal' },
          { name: 'Copilot CLI', icon: 'gitBranch' },
          { name: 'Gemini', icon: 'sparkle' },
          { name: 'AppSheet', icon: 'smartphone' },
          { name: 'Power Query', icon: 'zap' }
        ]
      },
      'bi': {
        name: this.lang === 'es' ? 'BI & Análisis' : 'BI & Analysis',
        skills: [
          { name: 'Power BI', icon: 'barChart' },
          { name: 'Streamlit', icon: 'layout' },
          { name: 'Apache Superset', icon: 'pieChart' },
          { name: 'SharePoint', icon: 'folder' },
          { name: 'Oracle DB', icon: 'database' },
          { name: 'MongoDB', icon: 'leaf' }
        ]
      },
      'certifications': {
        name: this.lang === 'es' ? 'Certificaciones' : 'Certifications',
        skills: [
          { name: 'Google IT Support', icon: 'award' },
          { name: 'NVIDIA Deep Learning', icon: 'cpu' },
          { name: 'AWS Cloud Dev', icon: 'cloud' },
          { name: 'CCNAv7 Switching & Routing', icon: 'wifi' },
          { name: 'CCNAv7 Intro to Networks', icon: 'globe' },
          { name: 'NDG Linux', icon: 'terminal' },
          { name: this.lang === 'es' ? 'R Visualización' : 'R Visualization', icon: 'barChart' },
          { name: 'Platzi SQL', icon: 'database' }
        ]
      }
    };
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const filterButtons = this.lang === 'es' ? {
      all: 'Todas',
      languages: 'Lenguajes',
      cloud: 'Cloud',
      security: 'Seguridad',
      automation: 'Automatización',
      bi: 'BI',
      certifications: 'Certificaciones'
    } : {
      all: 'All',
      languages: 'Languages',
      cloud: 'Cloud',
      security: 'Security',
      automation: 'Automation',
      bi: 'BI',
      certifications: 'Certifications'
    };

    let html = `
      <div class="skills-matrix-filters">
        ${Object.entries(filterButtons).map(([key, label]) => `
          <button class="skill-filter-btn ${this.currentFilter === key ? 'active' : ''}" data-filter="${key}">
            ${label}
          </button>
        `).join('')}
      </div>
      <div class="skills-matrix-grid">
    `;

    Object.entries(this.skills).forEach(([categoryKey, category]) => {
      const shouldShow = this.currentFilter === 'all' || this.currentFilter === categoryKey;
      html += `
        <div class="skill-category-matrix ${shouldShow ? 'visible' : 'hidden'}" data-category="${categoryKey}">
          <h4 class="skill-category-title">${category.name}</h4>
          <div class="skill-hexagons">
            ${category.skills.map((skill, index) => this.createSkillCard(skill, index)).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    this.container.innerHTML = html;
  }

  createSkillCard(skill, index) {
    const iconSvg = this.icons[skill.icon] || '';
    return `
      <div class="skill-hexagon" style="animation-delay: ${index * 0.08}s">
        <div class="skill-icon">${iconSvg}</div>
        <div class="skill-name">${skill.name}</div>
      </div>
    `;
  }

  attachEventListeners() {
    const filterButtons = this.container.querySelectorAll('.skill-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.render();
        this.attachEventListeners();
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const skillsMatrixContainer = document.getElementById('skillsMatrix');
  if (skillsMatrixContainer) {
    const lang = document.documentElement.lang || 'es';
    new SkillsMatrix('skillsMatrix', lang);
  }
});