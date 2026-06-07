import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [], seen = new Set();
  let match;
  const re = new RegExp(VAR_REGEX.source, VAR_REGEX.flags);
  while ((match = re.exec(text)) !== null) {
    if (!seen.has(match[1])) { seen.add(match[1]); vars.push(match[1]); }
  }
  return vars;
};

const ACCENT = '#5a7a9a';
const BG = '#050d18';
const NODE_BG = '#0c1627';

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

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);
  const updateNodeField = useStore(s => s.updateNodeField);
  const variables = extractVariables(currText);

  useNodeScale(nodeRef);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.max(44, el.scrollHeight) + 'px'; }
  }, [currText]);

  const lines = currText.split('\n');
  const maxLen = Math.max(...lines.map(l => l.length), 20);
  const nodeWidth = Math.max(160, Math.min(480, maxLen * 7 + 60));

  return (
    <div ref={nodeRef} style={{
      background: NODE_BG,
      border: '0.5px solid #1e2e42',
      borderRadius: 10,
      width: nodeWidth,
      position: 'relative',
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      {/* Accent bar */}
      <div style={{ height: 2, borderRadius: '10px 10px 0 0', background: ACCENT }} />

      {/* Variable input handles */}
      {variables.map((v, i) => (
        <div key={v}>
          <Handle type="target" position={Position.Left} id={`${id}-var-${v}`}
            style={{
              background: ACCENT, border: `1.5px solid ${BG}`,
              width: 'var(--hdot, 7px)', height: 'var(--hdot, 7px)',
              borderRadius: '50%',
              top: `${((i + 1) / (variables.length + 1)) * 100}%`,
            }}
          />
          <span style={{
            position: 'absolute', left: 12,
            top: `calc(${((i + 1) / (variables.length + 1)) * 100}% - 5px)`,
            fontSize: 'var(--nfs-sm, 9px)', color: '#2e4460',
            pointerEvents: 'none', lineHeight: 1,
          }}>{v}</span>
        </div>
      ))}

      {/* Output handle */}
      <Handle type="source" position={Position.Right} id={`${id}-output`}
        style={{
          background: ACCENT, border: `1.5px solid ${BG}`,
          width: 'var(--hdot, 7px)', height: 'var(--hdot, 7px)',
          borderRadius: '50%',
        }}
      />
      <span style={{
        position: 'absolute', right: 12, top: 'calc(50% - 5px)',
        fontSize: 'var(--nfs-sm, 9px)', color: '#2e4460',
        pointerEvents: 'none', lineHeight: 1, textAlign: 'right',
      }}>output</span>

      <div style={{ padding: '8px 12px 11px' }}>
        <span style={{
          display: 'inline-block',
          fontSize: 'var(--nfs-badge, 9px)',
          padding: 'var(--npad, 2px 7px)',
          borderRadius: 10, letterSpacing: '0.07em',
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 8, background: '#0a1828', color: ACCENT,
          whiteSpace: 'nowrap',
        }}>
          Text{variables.length > 0 && ` · ${variables.length} var${variables.length !== 1 ? 's' : ''}`}
        </span>

        <textarea
          ref={textareaRef}
          value={currText}
          onChange={e => { setCurrText(e.target.value); updateNodeField(id, 'text', e.target.value); }}
          placeholder="Type here… use {{variable}} to add inputs"
          style={{
            width: '100%', fontSize: 'var(--nfs, 11px)',
            padding: 'var(--npad, 5px 8px)',
            borderRadius: 6, border: '0.5px solid #1a2840',
            background: '#07101e', color: '#5a7a9a',
            fontFamily: "'Inter','Segoe UI',sans-serif",
            resize: 'none', overflow: 'hidden',
            minHeight: 44, lineHeight: 1.5, outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  );
};
