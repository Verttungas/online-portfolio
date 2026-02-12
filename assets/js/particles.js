class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.theme = 'dark';
    
    this.init();
  }

  init() {
    this.createCanvas();
    this.setupParticles();
    this.attachEventListeners();
    this.animate();
    this.observeThemeChanges();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particlesCanvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    document.body.insertBefore(this.canvas, document.body.firstChild);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupParticles() {
    this.particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 100;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        this.theme
      ));
    }
  }

  attachEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.setupParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  observeThemeChanges() {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      this.theme = html.getAttribute('data-theme') || 'dark';
      this.particles.forEach(p => p.updateTheme(this.theme));
    });

    observer.observe(html, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });

    this.theme = html.getAttribute('data-theme') || 'dark';
  }

  drawConnections() {
    const maxDistance = 120;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          this.ctx.strokeStyle = this.theme === 'dark' 
            ? `rgba(139, 92, 246, ${opacity})`
            : `rgba(124, 58, 237, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update(this.canvas, this.mouse);
      particle.draw(this.ctx);
    });
    
    this.drawConnections();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(x, y, theme) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 30 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.theme = theme;
    this.updateColor();
  }

  updateTheme(theme) {
    this.theme = theme;
    this.updateColor();
  }

  updateColor() {
    // Alternar entre púrpura y verde
    const isPurple = Math.random() > 0.5;
    if (this.theme === 'dark') {
      this.color = isPurple 
        ? 'rgba(139, 92, 246, 0.8)'   // Púrpura
        : 'rgba(16, 185, 129, 0.8)';  // Verde
    } else {
      this.color = isPurple 
        ? 'rgba(124, 58, 237, 0.6)'   // Púrpura más oscuro
        : 'rgba(5, 150, 105, 0.6)';   // Verde más oscuro
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(canvas, mouse) {
    // Movimiento flotante suave
    this.x += this.vx;
    this.y += this.vy;

    // Rebotar en los bordes
    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

    // Interacción con el mouse
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      
      if (distance < mouse.radius) {
        // Repulsión suave
        const directionX = forceDirectionX * force * this.density * 0.3;
        const directionY = forceDirectionY * force * this.density * 0.3;
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    // Volver suavemente a la posición base
    const dxBase = this.baseX - this.x;
    const dyBase = this.baseY - this.y;
    this.x += dxBase * 0.01;
    this.y += dyBase * 0.01;
  }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializar si no estamos en móvil o si el usuario prefiere animaciones
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new ParticleSystem();
  }
});
