const mbtiTraits = [
    { pct: 64, left: 'Extraverted',  right: 'Introverted', color: '#4A90C4', label: 'Extravertet' },
    { pct: 81, left: 'Intuitive',    right: 'Observant',   color: '#B8993A', label: 'Intuitive'  },
    { pct: 60, left: 'Thinking',     right: 'Feeling',     color: '#4A8C5C', label: 'Thinking'   },
    { pct: 74, left: 'Judging',      right: 'Prospecting', color: '#7B5EA7', label: 'Judging'    },
    { pct: 69, left: 'Assertive',    right: 'Turbulent',   color: '#C9614A', label: 'Assertive'  },
  ];

  const mbtiRoot = document.getElementById('mbti-root');
  mbtiTraits.forEach(function(t) {
    const gap = 100 - t.pct; // ← the empty space on the left
    mbtiRoot.innerHTML += `
      <div class="mbti-trait">
        <div class="mbti-label" style="color:${t.color}">
          ${t.pct}% <span class="trait-name">${t.label}</span>
        </div>
        <div class="mbti-row">
          <div class="mbti-side left">${t.left}</div>
         <div class="mbti-track" style="background:${t.color}">
  <div class="mbti-dot" style="left:${gap}%"></div>
</div>
          <div class="mbti-side right">${t.right}</div>
      </div>`;
  });