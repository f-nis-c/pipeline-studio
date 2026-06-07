import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', width: '100vw', overflow: 'hidden',
    }}>
      <PipelineToolbar />
      <PipelineUI />

      {/* Bottom bar */}
      <div style={{
        background: '#080e1a',
        borderTop: '0.5px solid #1a2538',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexShrink: 0,
        fontFamily: "'Inter','Segoe UI',sans-serif",
      }}>
        {/* Inline result panel */}
        <div style={{
          flex: 1,
          background: '#07101e',
          border: '0.5px solid #1a2840',
          borderRadius: 8,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          minWidth: 0,
          minHeight: 32,
        }}>
          {!result ? (
            <span style={{ fontSize: 10, color: '#1e3050' }}>Run the pipeline to see results here</span>
          ) : result.error ? (
            <span style={{ fontSize: 11, color: '#7a3030' }}>Error: {result.error}</span>
          ) : (
            <>
              <ResultItem label="Nodes" value={result.num_nodes} />
              <Divider />
              <ResultItem label="Edges" value={result.num_edges} />
              <Divider />
              <ResultItem
                label="Is DAG"
                value={result.is_dag ? '✓ Yes' : '✗ No'}
                color={result.is_dag ? '#1D9E75' : '#BA4040'}
              />
            </>
          )}
        </div>

        <SubmitButton onResult={setResult} />
      </div>
    </div>
  );
}

const ResultItem = ({ label, value, color }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <span style={{ fontSize: 9, color: '#2e4460', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
      {label}
    </span>
    <span style={{ fontSize: 13, fontWeight: 500, color: color || '#4a7a9a' }}>
      {value}
    </span>
  </div>
);

const Divider = () => (
  <div style={{ width: '0.5px', height: 28, background: '#1a2840', flexShrink: 0 }} />
);
