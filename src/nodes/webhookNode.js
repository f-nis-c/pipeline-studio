import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const WebhookNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'POST');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="webhook"
      inputHandles={[{ id: 'payload', label: 'payload' }]}
      outputHandles={[{ id: 'response', label: 'response' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <span style={nodeLabelStyle}>Method</span>
          <select style={nodeSelectStyle} value={method}
            onChange={e => { setMethod(e.target.value); updateNodeField(id, 'method', e.target.value); }}>
            <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
          </select>
        </div>
        <div>
          <span style={nodeLabelStyle}>URL</span>
          <input style={nodeInputStyle} placeholder="https://api.example.com/…" value={url}
            onChange={e => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }} />
        </div>
      </div>
    </BaseNode>
  );
};
