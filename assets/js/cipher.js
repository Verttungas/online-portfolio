class ROT13Cipher {
  constructor(containerId, lang = 'es') {
    this.container = document.getElementById(containerId);
    this.lang = lang;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const texts = this.lang === 'es' ? {
      title: 'ROT13 Cipher/Decoder',
      description: 'ROT13 es un cifrado por sustitución simple tipo Caesar. Cada letra se reemplaza por la letra 13 posiciones adelante en el alfabeto. Es simétrico: aplicarlo dos veces devuelve el texto original.',
      inputLabel: 'Texto de entrada',
      inputPlaceholder: 'Escribe tu mensaje aquí...',
      outputLabel: 'Resultado',
      encode: 'Codificar',
      decode: 'Decodificar',
      copy: 'Copiar',
      clear: 'Limpiar',
      copied: '¡Copiado!',
      example: 'Ejemplo: "Hola Mundo" → "Ubyn Zhaqb"'
    } : {
      title: 'ROT13 Cipher/Decoder',
      description: 'ROT13 is a simple Caesar substitution cipher. Each letter is replaced by the letter 13 positions ahead in the alphabet. It\'s symmetric: applying it twice returns the original text.',
      inputLabel: 'Input text',
      inputPlaceholder: 'Type your message here...',
      outputLabel: 'Result',
      encode: 'Encode',
      decode: 'Decode',
      copy: 'Copy',
      clear: 'Clear',
      copied: 'Copied!',
      example: 'Example: "Hello World" → "Uryyb Jbeyq"'
    };

    this.container.innerHTML = `
      <div class="cipher-card">
        <div class="cipher-header">
          <span class="cipher-icon">🔐</span>
          <h3>${texts.title}</h3>
        </div>
        <p class="cipher-description">${texts.description}</p>
        <p class="cipher-example">${texts.example}</p>
        
        <div class="cipher-content">
          <div class="cipher-input-section">
            <label for="cipherInput">${texts.inputLabel}</label>
            <textarea 
              id="cipherInput" 
              class="cipher-textarea" 
              placeholder="${texts.inputPlaceholder}"
              rows="6"
            ></textarea>
          </div>
          
          <div class="cipher-buttons">
            <button id="encodeBtn" class="btn-cipher btn-encode">
              ${texts.encode}
            </button>
            <button id="decodeBtn" class="btn-cipher btn-decode">
              ${texts.decode}
            </button>
          </div>
          
          <div class="cipher-output-section">
            <div class="cipher-output-header">
              <label for="cipherOutput">${texts.outputLabel}</label>
              <div class="cipher-output-actions">
                <button id="copyOutput" class="btn-copy-cipher" disabled>
                  ${texts.copy}
                </button>
                <button id="clearAll" class="btn-clear-cipher">
                  ${texts.clear}
                </button>
              </div>
            </div>
            <textarea 
              id="cipherOutput" 
              class="cipher-textarea cipher-output" 
              readonly
              rows="6"
            ></textarea>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const inputArea = document.getElementById('cipherInput');
    const outputArea = document.getElementById('cipherOutput');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const copyBtn = document.getElementById('copyOutput');
    const clearBtn = document.getElementById('clearAll');

    encodeBtn.addEventListener('click', () => {
      const input = inputArea.value;
      if (input.trim()) {
        const encoded = this.rot13(input);
        outputArea.value = encoded;
        copyBtn.disabled = false;
        this.animateTransform();
      }
    });

    decodeBtn.addEventListener('click', () => {
      const input = inputArea.value;
      if (input.trim()) {
        // ROT13 es simétrico, así que decodificar es lo mismo que codificar
        const decoded = this.rot13(input);
        outputArea.value = decoded;
        copyBtn.disabled = false;
        this.animateTransform();
      }
    });

    copyBtn.addEventListener('click', () => {
      this.copyToClipboard(outputArea.value, copyBtn);
    });

    clearBtn.addEventListener('click', () => {
      inputArea.value = '';
      outputArea.value = '';
      copyBtn.disabled = true;
    });
  }

  rot13(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
    });
  }

  animateTransform() {
    const outputArea = document.getElementById('cipherOutput');
    outputArea.classList.add('transform-animation');
    setTimeout(() => {
      outputArea.classList.remove('transform-animation');
    }, 500);
  }

  async copyToClipboard(text, button) {
    const originalText = button.textContent;
    
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = this.lang === 'es' ? '¡Copiado!' : 'Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      button.textContent = this.lang === 'es' ? '¡Copiado!' : 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const cipherContainer = document.getElementById('rot13Cipher');
  if (cipherContainer) {
    const lang = document.documentElement.lang || 'es';
    new ROT13Cipher('rot13Cipher', lang);
  }
});
