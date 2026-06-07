import { useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const ACCENT = {
  customInput:  '#1D9E75',
  customOutput: '#BA7517',
  llm:          '#378ADD',
  text:         '#5a7a9a',
  image:        '#D4537E',
  filter:       '#7F77DD',
  merge:        '#9F6FDD',
  math:         '#1D9E75',
  webhook:      '#BA7517',
  note:         '#5a7a9a',
};

const BADGE_BG = {
  customInput:  '#0a2218',
  customOutput: '#1e1200',
  llm:          '#081828',
  text:         '#0a1828',
  image:        '#1e0a14',
  filter:       '#120e28',
  merge:        '#160e28',
  math:         '#0a2218',
  webhook:      '#1e1200',
  note:         '#0a1828',
};

const LABELS = {
  customInput: 'Input', customOutput: 'Output', llm: 'LLM',
  text: 'Text', image: 'Image', filter: 'Filter',
  merge: 'Merge', math: 'Math', webhook: 'Webhook', note: 'Note',
};

// Responsive text scaling based on node width
function useNodeScale(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const scale = () => {
      const w = el.offsetWidth;
      const base = Math.max(8, Math.min(12, 8 + (w - 120) * (4 / 120)));
      el.style.setProperty('--nfs', base + 'px');
      el.style.setProperty('--nfs-sm', Math.max(7, base * 0.78) + 'px');
      el.style.setProperty('--nfs-badge', Math.max(7, base * 0.82) + 'px');
      el.style.setProperty('--npad', Math.max(3, base * 0.38) + 'px ' + Math.max(5, base * 0.62) + 'px');
      el.style.setProperty('--hdot', Math.max(5, Math.min(8, base * 0.65)) + 'px');
    };
    scale();
    const ro = new ResizeObserver(scale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
}

export const BaseNode = ({
  id, type, children,
  inputHandles = [],
  outputHandles = [],
}) => {
  const ref = useRef(null);
  useNodeScale(ref);
  const accent = ACCENT[type] || '#5a7a9a';
  const badgeBg = BADGE_BG[type] || '#0a1828';
  const label = LABELS[type] || type;

  return (
    <div ref={ref} style={{
      background: '#0c1627',
      border: '0.5px solid #1e2e42',
      borderRadius: 10,
      minWidth: 160,
      position: 'relative',
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      {/* Accent bar */}
      <div style={{ height: 2, borderRadius: '10px 10px 0 0', background: accent }} />

      {/* Input handles */}
      {inputHandles.map((h, i) => {
        const top = h.top || `${((i + 1) / (inputHandles.length + 1)) * 100}%`;
        return (
          <div key={h.id}>
            <Handle type="target" position={h.position || Position.Left}
              id={`${id}-${h.id}`}
              style={{
                background: accent, border: '1.5px solid #050d18',
                width: 'var(--hdot, 7px)', height: 'var(--hdot, 7px)',
                borderRadius: '50%', top,
              }}
            />
            {h.label && (
              <span style={{
                position: 'absolute', left: 12,
                top: `calc(${top} - 5px)`,
                fontSize: 'var(--nfs-sm, 9px)', color: '#2e4460',
                pointerEvents: 'none', lineHeight: 1,
                textTransform: 'lowercase',
              }}>{h.label}</span>
            )}
          </div>
        );
      })}

      {/* Output handles */}
      {outputHandles.map((h, i) => {
        const top = h.top || `${((i + 1) / (outputHandles.length + 1)) * 100}%`;
        return (
          <div key={h.id}>
            <Handle type="source" position={h.position || Position.Right}
              id={`${id}-${h.id}`}
              style={{
                background: accent, border: '1.5px solid #050d18',
                width: 'var(--hdot, 7px)', height: 'var(--hdot, 7px)',
                borderRadius: '50%', top,
              }}
            />
            {h.label && (
              <span style={{
                position: 'absolute', right: 12,
                top: `calc(${top} - 5px)`,
                fontSize: 'var(--nfs-sm, 9px)', color: '#2e4460',
                pointerEvents: 'none', lineHeight: 1, textAlign: 'right',
                textTransform: 'lowercase',
              }}>{h.label}</span>
            )}
          </div>
        );
      })}

      {/* Body */}
      <div style={{ padding: '8px 12px 11px' }}>
        <span style={{
          display: 'inline-block',
          fontSize: 'var(--nfs-badge, 9px)',
          padding: 'var(--npad, 2px 7px)',
          borderRadius: 10,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: 8,
          background: badgeBg,
          color: accent,
          whiteSpace: 'nowrap',
        }}>{label}</span>
        {children}
      </div>
    </div>
  );
};

export const nodeInputStyle = {
  width: '100%',
  fontSize: 'var(--nfs, 11px)',
  padding: 'var(--npad, 5px 8px)',
  borderRadius: 6,
  border: '0.5px solid #1a2840',
  background: '#07101e',
  color: '#5a7a9a',
  fontFamily: "'Inter','Segoe UI',sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
};

export const nodeLabelStyle = {
  display: 'block',
  fontSize: 'var(--nfs-sm, 9px)',
  color: '#2e4460',
  marginBottom: 3,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
};

export const nodeSelectStyle = {
  ...nodeInputStyle,
  cursor: 'pointer',
};
