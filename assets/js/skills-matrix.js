class SkillsMatrix {
  constructor(containerId, lang = 'es') {
    this.container = document.getElementById(containerId);
    this.lang = lang;
    this.currentFilter = 'all';
    this.skills = this.getSkillsData();
    this.init();
  }

  getSkillsData() {
    return {
      'languages': {
        name: this.lang === 'es' ? 'Lenguajes & Frameworks' : 'Languages & Frameworks',
        skills: [
          { name: 'Python', level: 5, years: '5 años', icon: '🐍' },
          { name: 'Flask', level: 4, years: '3 años', icon: '🌶️' },
          { name: 'SQL', level: 5, years: '5 años', icon: '🗄️' },
          { name: 'JavaScript', level: 4, years: '4 años', icon: '📜' }
        ]
      },
      'cloud': {
        name: this.lang === 'es' ? 'Cloud & DevOps' : 'Cloud & DevOps',
        skills: [
          { name: 'AWS S3', level: 4, years: '2 años', icon: '☁️' },
          { name: 'AWS EC2', level: 4, years: '2 años', icon: '🖥️' },
          { name: 'Google Workspace', level: 5, years: '5 años', icon: '🔧' },
          { name: 'Microsoft 365', level: 5, years: '5 años', icon: '💼' },
          { name: 'Linux (RHEL)', level: 4, years: '3 años', icon: '🐧' }
        ]
      },
      'security': {
        name: this.lang === 'es' ? 'Ciberseguridad' : 'Cybersecurity',
        skills: [
          { name: 'GRC', level: 4, years: '1 año', icon: '🔒' },
          { name: 'InfoSec', level: 4, years: '2 años', icon: '🛡️' },
          { name: 'Cyberhaven', level: 3, years: '6 meses', icon: '🔐' },
          { name: 'ZenGRC', level: 3, years: '6 meses', icon: '📋' },
          { name: 'Cisco CCNA', level: 3, years: '2 años', icon: '🌐' }
        ]
      },
      'automation': {
        name: this.lang === 'es' ? 'IA & Automatización' : 'AI & Automation',
        skills: [
          { name: 'n8n', level: 5, years: '2 años', icon: '🤖' },
          { name: this.lang === 'es' ? 'IA Integration' : 'AI Integration', level: 4, years: '2 años', icon: '🧠' },
          { name: 'AppSheet', level: 4, years: '3 años', icon: '📱' },
          { name: 'Power Query', level: 5, years: '3 años', icon: '⚡' }
        ]
      },
      'bi': {
        name: this.lang === 'es' ? 'BI & Análisis' : 'BI & Analysis',
        skills: [
          { name: 'Power BI', level: 5, years: '3 años', icon: '📊' },
          { name: 'SharePoint', level: 4, years: '2 años', icon: '📂' },
          { name: 'Oracle DB', level: 3, years: '1 año', icon: '🗃️' },
          { name: 'MongoDB', level: 3, years: '2 años', icon: '🍃' }
        ]
      },
      'certifications': {
        name: this.lang === 'es' ? 'Certificaciones' : 'Certifications',
        skills: [
          { name: 'Google IT', level: 5, years: 'Certificado', icon: '🎓' },
          { name: 'Google Cybersecurity', level: 5, years: 'Certificado', icon: '🏅' },
          { name: 'Cisco', level: 4, years: 'Certificado', icon: '📜' },
          { name: 'NDG Linux', level: 4, years: 'Certificado', icon: '🐧' }
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
    const levelText = this.lang === 'es' 
      ? ['Básico', 'Intermedio', 'Intermedio+', 'Avanzado', 'Experto'][skill.level - 1]
      : ['Basic', 'Intermediate', 'Intermediate+', 'Advanced', 'Expert'][skill.level - 1];

    return `
      <div class="skill-hexagon" style="animation-delay: ${index * 0.1}s" data-level="${skill.level}">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level-bar">
          <div class="skill-level-fill" style="width: ${skill.level * 20}%"></div>
        </div>
        <div class="skill-tooltip">
          <strong>${skill.name}</strong><br>
          ${levelText}<br>
          ${skill.years}
        </div>
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
