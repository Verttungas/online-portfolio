class InteractiveTerminal {
  constructor(containerId, lang = 'es') {
    this.container = document.getElementById(containerId);
    this.lang = lang;
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="terminal-output" id="terminalOutputInteractive"></div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">verttigo@portfolio:~$</span>
        <input type="text" class="terminal-input" id="terminalInput" autocomplete="off" spellcheck="false" />
      </div>
    `;

    this.output = document.getElementById('terminalOutputInteractive');
    this.input = document.getElementById('terminalInput');

    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.input.focus({ preventScroll: true });

    this.container.addEventListener('click', () => this.input.focus({ preventScroll: true }));

    this.printWelcome();
  }

  printWelcome() {
    const welcome = this.lang === 'es' 
      ? `Bienvenido a la terminal interactiva de Carlos Vertti
Escribe 'help' para ver los comandos disponibles.
`
      : `Welcome to Carlos Vertti's interactive terminal
Type 'help' to see available commands.
`;
    this.print(welcome, 'system');
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.input.value.trim();
      if (command) {
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.executeCommand(command);
        this.input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete();
    }
  }

  autocomplete() {
    const input = this.input.value.toLowerCase();
    const commands = Object.keys(this.getCommands());
    const matches = commands.filter(cmd => cmd.startsWith(input));
    
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.print(`\n${matches.join('  ')}`, 'system');
    }
  }

  executeCommand(command) {
    this.print(`verttigo@portfolio:~$ ${command}`, 'command');
    
    const [cmd, ...args] = command.split(' ');
    const commands = this.getCommands();
    
    if (commands[cmd.toLowerCase()]) {
      commands[cmd.toLowerCase()](args);
    } else {
      const notFound = this.lang === 'es' 
        ? `Comando no encontrado: ${cmd}. Escribe 'help' para ver los comandos disponibles.`
        : `Command not found: ${cmd}. Type 'help' to see available commands.`;
      this.print(notFound, 'error');
    }
    
    this.scrollToBottom();
  }

  getCommands() {
    if (this.lang === 'es') {
      return {
        help: () => this.showHelp(),
        about: () => this.showAbout(),
        skills: () => this.showSkills(),
        experience: () => this.showExperience(),
        projects: () => this.showProjects(),
        education: () => this.showEducation(),
        contact: () => this.showContact(),
        clear: () => this.clear(),
        whoami: () => this.print('Carlos Vertti - IT Engineering Student · CTO @ 1927'),
        ls: () => this.listSections(),
        pwd: () => this.print('/home/verttigo/portfolio'),
        date: () => this.print(new Date().toLocaleString('es-ES')),
        echo: (args) => this.print(args.join(' '))
      };
    } else {
      return {
        help: () => this.showHelp(),
        about: () => this.showAbout(),
        skills: () => this.showSkills(),
        experience: () => this.showExperience(),
        projects: () => this.showProjects(),
        education: () => this.showEducation(),
        contact: () => this.showContact(),
        clear: () => this.clear(),
        whoami: () => this.print('Carlos Vertti - IT Engineering Student · CTO @ 1927'),
        ls: () => this.listSections(),
        pwd: () => this.print('/home/verttigo/portfolio'),
        date: () => this.print(new Date().toLocaleString('en-US')),
        echo: (args) => this.print(args.join(' '))
      };
    }
  }

  showHelp() {
    const help = this.lang === 'es' ? `
Comandos disponibles:
  help        - Muestra esta ayuda
  about       - Información sobre Carlos Vertti
  skills      - Lista de habilidades técnicas
  experience  - Experiencia laboral
  projects    - Proyectos principales
  education   - Formación académica
  contact     - Información de contacto
  clear       - Limpia la terminal
  whoami      - Muestra información del usuario
  ls          - Lista las secciones disponibles
  pwd         - Muestra la ruta actual
  date        - Muestra la fecha y hora actual
  echo [text] - Repite el texto ingresado
` : `
Available commands:
  help        - Shows this help
  about       - Information about Carlos Vertti
  skills      - List of technical skills
  experience  - Work experience
  projects    - Main projects
  education   - Academic background
  contact     - Contact information
  clear       - Clears the terminal
  whoami      - Shows user information
  ls          - Lists available sections
  pwd         - Shows current path
  date        - Shows current date and time
  echo [text] - Repeats the entered text
`;
    this.print(help);
  }

  showAbout() {
    const about = this.lang === 'es' ? `
Sobre Carlos Vertti
--------------------
Estudiante de Ingeniería en Sistemas y TI en la Universidad Anáhuac México Norte,
con un minor en Seguridad e Inteligencia Estratégica.

Actualmente CTO en 1927 y GRC & InfoSec Intern en Clip, con 5 años de experiencia
desarrollando soluciones tecnológicas que optimizan procesos mediante automatización,
IA y ciberseguridad.

Especializado en crear sistemas que combinan inteligencia artificial, automatización
y seguridad para resolver problemas empresariales complejos.
` : `
About Carlos Vertti
-------------------
Systems and IT Engineering student at Universidad Anáhuac México Norte,
with a minor in Security and Strategic Intelligence.

Currently CTO at 1927 and GRC & InfoSec Intern at Clip, with 5 years of experience
developing technology solutions that optimize processes through automation,
AI, and cybersecurity.

Specialized in creating systems that combine artificial intelligence, automation,
and security to solve complex business problems.
`;
    this.print(about);
  }

  showSkills() {
    const skills = this.lang === 'es' ? `
Habilidades Tecnicas
--------------------
> Lenguajes & Frameworks:
  Python, JavaScript, TypeScript, HTML/CSS, PHP, Java,
  Kotlin, Dart, Flutter, Go, C/C++, Visual Basic, R,
  SQL, Bash/Shell, Flask

> Cloud & DevOps:
  AWS S3, AWS EC2, Google Cloud, GWS Admin, Microsoft 365,
  Ubuntu Server, Linux (RHEL), Arquitectura HA,
  Cloudflare Tunnels, Tailscale

> Data & BI:
  Power BI, Streamlit, Apache Superset, SharePoint,
  Oracle DB, MongoDB

> IA & Automatizacion:
  n8n, Claude Code, Copilot CLI, Gemini, AppSheet,
  Power Query

> Ciberseguridad:
  GRC, InfoSec, Cyberhaven, ZenGRC, Cisco CCNA

> Certificaciones:
  Google IT Support, NVIDIA Deep Learning, AWS Cloud Dev,
  CCNAv7 Switching & Routing, CCNAv7 Intro to Networks,
  NDG Linux, R Visualizacion (Coursera), Platzi SQL
` : `
Technical Skills
----------------
> Languages & Frameworks:
  Python, JavaScript, TypeScript, HTML/CSS, PHP, Java,
  Kotlin, Dart, Flutter, Go, C/C++, Visual Basic, R,
  SQL, Bash/Shell, Flask

> Cloud & DevOps:
  AWS S3, AWS EC2, Google Cloud, GWS Admin, Microsoft 365,
  Ubuntu Server, Linux (RHEL), HA Architecture,
  Cloudflare Tunnels, Tailscale

> Data & BI:
  Power BI, Streamlit, Apache Superset, SharePoint,
  Oracle DB, MongoDB

> AI & Automation:
  n8n, Claude Code, Copilot CLI, Gemini, AppSheet,
  Power Query

> Cybersecurity:
  GRC, InfoSec, Cyberhaven, ZenGRC, Cisco CCNA

> Certifications:
  Google IT Support, NVIDIA Deep Learning, AWS Cloud Dev,
  CCNAv7 Switching & Routing, CCNAv7 Intro to Networks,
  NDG Linux, R Visualization (Coursera), Platzi SQL
`;
    this.print(skills);
  }

  showExperience() {
    const exp = this.lang === 'es' ? `
Experiencia Profesional
-----------------------
[Actual] Chief Technology Officer (CTO) - 1927
         Ago 2025 - Presente
         Dirección de arquitectura tecnológica, desarrollo de plataforma
         ecommerce, administración de Google Workspace, gestión de
         ciberseguridad, servidor Ubuntu, automatizaciones con n8n e
         integración de IA en operaciones.

[Actual] GRC & InfoSec Intern - Clip (PayClip)
         Jul 2025 - Presente
         Desarrollo de automatizaciones con IA integrada para procesos
         de gobernanza, riesgo y cumplimiento (GRC) y seguridad de la
         información.

         BI & Automation Intern - Daimler Truck México
         May 2024 - May 2025
         Desarrollo de soluciones de datos automatizadas en la nube
         para seguimiento de KPIs.

         App Developer - Azteca Construcciones Industriales
         Ene 2021 - Ago 2021
         Diseño y desarrollo de sistema de monitoreo con Google Sheets,
         Drive y AppSheet.

         Freelance IT Support & Automation - Techno Boost MX
         2020 - Presente
         5 años ofreciendo soporte técnico, automatización de procesos
         y consultoría TI.
` : `
Professional Experience
-----------------------
[Current] Chief Technology Officer (CTO) - 1927
          Aug 2025 - Present
          Technology architecture leadership, ecommerce platform
          development, Google Workspace administration, cybersecurity
          management, Ubuntu server operations, n8n automations, and
          AI integration in operations.

[Current] GRC & InfoSec Intern - Clip (PayClip)
          Jul 2025 - Present
          Development of AI-integrated automations for governance,
          risk, and compliance (GRC) and information security processes.

          BI & Automation Intern - Daimler Truck México
          May 2024 - May 2025
          Developed automated cloud data solutions for KPI tracking.

          App Developer - Azteca Construcciones Industriales
          Jan 2021 - Aug 2021
          Designed and developed monitoring system using Google Sheets,
          Drive, and AppSheet.

          Freelance IT Support & Automation - Techno Boost MX
          2020 - Present
          5 years providing technical support, process automation,
          and IT consulting.
`;
    this.print(exp);
  }

  showProjects() {
    const projects = this.lang === 'es' ? `
Proyectos Principales
---------------------
🚀 1927 - Plataforma Ecommerce
   Arquitectura y desarrollo completo de plataforma ecommerce.
   Stack: Ecommerce, Google Workspace, Ubuntu Server, n8n, AI
   Link: https://1927brand.com

🔒 GRC Drive-Slack Sentinel
   Sistema automatizado de gobernanza de documentos GRC con IA.
   Stack: Google Apps Script, Gemini AI, Slack API, Google Drive

📊 RiskPulse - Sistema de Análisis de Riesgos
   Sistema integral para análisis de KPIs de riesgo.
   Stack: Power BI, SharePoint, Excel, Power Query, SQL

🔍 SICOM Data Miner
   Aplicación de escritorio para consolidación masiva de reportes.
   Stack: Python, Data Processing, Desktop App

Para ver más detalles, visita: /projects.html
` : `
Main Projects
-------------
🚀 1927 - Ecommerce Platform
   Complete architecture and development of ecommerce platform.
   Stack: Ecommerce, Google Workspace, Ubuntu Server, n8n, AI
   Link: https://1927brand.com

🔒 GRC Drive-Slack Sentinel
   Automated GRC document governance system with AI.
   Stack: Google Apps Script, Gemini AI, Slack API, Google Drive

📊 RiskPulse - Risk Analysis System
   Comprehensive system for risk KPI analysis.
   Stack: Power BI, SharePoint, Excel, Power Query, SQL

🔍 SICOM Data Miner
   Desktop application for massive report consolidation.
   Stack: Python, Data Processing, Desktop App

For more details, visit: /en/projects.html
`;
    this.print(projects);
  }

  showEducation() {
    const edu = this.lang === 'es' ? `
Formación Académica
-------------------
🎓 Ingeniería en Sistemas y Tecnologías de la Información
   Universidad Anáhuac México Norte
   Minor en Seguridad e Inteligencia Estratégica
   En curso

📜 Certificaciones:
   • Google IT Support Professional Certificate
   • Google Cybersecurity Certificate
   • Cisco CCNA
   • NDG Linux Essentials
` : `
Academic Background
-------------------
🎓 Systems and Information Technology Engineering
   Universidad Anáhuac México Norte
   Minor in Security and Strategic Intelligence
   In progress

📜 Certifications:
   • Google IT Support Professional Certificate
   • Google Cybersecurity Certificate
   • Cisco CCNA
   • NDG Linux Essentials
`;
    this.print(edu);
  }

  showContact() {
    const contact = this.lang === 'es' ? `
Información de Contacto
-----------------------
📧 Email:     verttigo@proton.me
💼 LinkedIn:  linkedin.com/in/carlos-vertti-824b9a2a0
🐙 GitHub:    github.com/Verttungas
🌐 Portfolio: Verttungas.github.io/online-portfolio
` : `
Contact Information
-------------------
📧 Email:     verttigo@proton.me
💼 LinkedIn:  linkedin.com/in/carlos-vertti-824b9a2a0
🐙 GitHub:    github.com/Verttungas
🌐 Portfolio: Verttungas.github.io/online-portfolio
`;
    this.print(contact);
  }

  listSections() {
    const sections = this.lang === 'es' ? `
about/      experience/      projects/      contact/
skills/     education/
` : `
about/      experience/      projects/      contact/
skills/     education/
`;
    this.print(sections);
  }

  clear() {
    this.output.innerHTML = '';
  }

  print(text, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line terminal-${type}`;
    line.textContent = text;
    this.output.appendChild(line);
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
}

// Initialize terminal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const terminalContainer = document.getElementById('interactiveTerminal');
  if (terminalContainer) {
    const lang = document.documentElement.lang || 'es';
    new InteractiveTerminal('interactiveTerminal', lang);
  }
});