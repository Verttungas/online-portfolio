class PasswordGenerator {
  constructor(containerId, lang = 'es') {
    this.container = document.getElementById(containerId);
    this.lang = lang;
    this.currentPassword = '';
    
    // Sílabas pronunciables en español
    this.syllables = [
      'fo', 'res', 'tri', 'sol', 'me', 'tran', 'dul', 'ki', 'lo', 'mar',
      'ca', 'se', 'ra', 'ti', 'no', 'pa', 'le', 'mi', 'do', 'fa',
      'la', 'si', 'te', 'mo', 'ru', 'na', 've', 'so', 'ri', 'ta',
      'bu', 'co', 'de', 'fi', 'ga', 'hu', 'jo', 'li', 'mu', 'pi',
      'que', 'ro', 'sa', 'tu', 'va', 'xe', 'yo', 'zu', 'be', 'cha',
      'da', 'en', 'go', 'ha', 'je', 'ka', 'lu', 'ne', 'po', 'qui'
    ];
    
    this.symbols = ['!', '@', '#', '$', '%', '&', '*', '?'];
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const texts = this.lang === 'es' ? {
      title: 'Generador de Contraseñas Seguras',
      description: 'Genera contraseñas seguras pronunciables basadas en sílabas',
      length: 'Longitud',
      generate: 'Generar Contraseña',
      copy: 'Copiar',
      copied: '¡Copiado!',
      strength: 'Fortaleza',
      strong: 'Fuerte'
    } : {
      title: 'Secure Password Generator',
      description: 'Generate secure pronounceable passwords based on syllables',
      length: 'Length',
      generate: 'Generate Password',
      copy: 'Copy',
      copied: 'Copied!',
      strength: 'Strength',
      strong: 'Strong'
    };

    this.container.innerHTML = `
      <div class="password-generator-card">
        <div class="password-generator-header">
          <span class="password-icon">🔒</span>
          <h3>${texts.title}</h3>
        </div>
        <p class="password-description">${texts.description}</p>
        
        <div class="password-controls">
          <div class="password-length-control">
            <label for="passwordLength">${texts.length}: <span id="lengthValue">12</span></label>
            <input type="range" id="passwordLength" min="12" max="16" value="12" class="password-slider">
          </div>
          
          <button id="generatePassword" class="btn-generate">
            ${texts.generate}
          </button>
        </div>
        
        <div class="password-display-container">
          <div class="password-display" id="passwordDisplay">
            <span class="password-placeholder">••••••••••••</span>
          </div>
          <button id="copyPassword" class="btn-copy" disabled>
            ${texts.copy}
          </button>
        </div>
        
        <div class="password-strength">
          <div class="strength-label">${texts.strength}:</div>
          <div class="strength-bar">
            <div class="strength-fill" id="strengthFill"></div>
          </div>
          <div class="strength-text" id="strengthText">${texts.strong}</div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generatePassword');
    const copyBtn = document.getElementById('copyPassword');

    lengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
    });

    generateBtn.addEventListener('click', () => {
      const length = parseInt(lengthSlider.value);
      this.generatePassword(length);
    });

    copyBtn.addEventListener('click', () => {
      this.copyToClipboard();
    });
  }

  generatePassword(totalLength) {
    // Parte pronunciable: longitud total - 3
    const pronounceableLength = totalLength - 3;
    let pronounceable = '';
    
    // Generar parte pronunciable usando sílabas
    while (pronounceable.length < pronounceableLength) {
      const syllable = this.syllables[Math.floor(Math.random() * this.syllables.length)];
      if (pronounceable.length + syllable.length <= pronounceableLength) {
        pronounceable += syllable;
      }
    }
    
    // Asegurar que sea exactamente del largo correcto
    pronounceable = pronounceable.substring(0, pronounceableLength);
    
    // Últimos 3 caracteres:
    // 1. Una mayúscula
    const uppercase = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    
    // 2 y 3. Un número y un símbolo en orden aleatorio
    const number = Math.floor(Math.random() * 10).toString();
    const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    
    // Orden aleatorio para número y símbolo
    const last2 = Math.random() < 0.5 ? [number, symbol] : [symbol, number];
    
    // Construir contraseña final
    this.currentPassword = pronounceable + uppercase + last2.join('');
    
    // Mostrar contraseña
    this.displayPassword();
  }

  displayPassword() {
    const display = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyPassword');
    const strengthFill = document.getElementById('strengthFill');
    
    display.innerHTML = `<span class="password-text">${this.currentPassword}</span>`;
    copyBtn.disabled = false;
    
    // Animación de fortaleza
    strengthFill.style.width = '100%';
    strengthFill.classList.add('strong');
  }

  async copyToClipboard() {
    const copyBtn = document.getElementById('copyPassword');
    const originalText = copyBtn.textContent;
    
    try {
      await navigator.clipboard.writeText(this.currentPassword);
      copyBtn.textContent = this.lang === 'es' ? '¡Copiado!' : 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = this.currentPassword;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      copyBtn.textContent = this.lang === 'es' ? '¡Copiado!' : 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const passwordGenContainer = document.getElementById('passwordGenerator');
  if (passwordGenContainer) {
    const lang = document.documentElement.lang || 'es';
    new PasswordGenerator('passwordGenerator', lang);
  }
});
