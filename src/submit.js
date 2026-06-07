import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = ({ onResult }) => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ pipeline: JSON.stringify({ nodes, edges }) });
      const res = await fetch(`http://127.0.0.1:8000/pipelines/parse?${params}`);
      const data = await res.json();
      onResult({ ...data, error: null });
    } catch (err) {
      onResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: '5px 18px',
        borderRadius: 20,
        border: `0.5px solid ${loading ? '#1a2538' : '#1e3a5a'}`,
        background: loading ? '#080e1a' : '#0c1e30',
        color: loading ? '#2a4060' : '#4a8ab0',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        fontFamily: "'Inter','Segoe UI',sans-serif",
        letterSpacing: '0.03em',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0f2540'; }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0c1e30'; }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M3 2l7 4-7 4V2z" fill={loading ? '#2a4060' : '#4a8ab0'}/>
      </svg>
      {loading ? 'Analyzing…' : 'Run pipeline'}
    </button>
  );
};
