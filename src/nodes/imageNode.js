import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';
import { useStore } from '../store';

export const ImageNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="image"
      inputHandles={[{ id: 'url', label: 'url' }]}
      outputHandles={[{ id: 'image', label: 'image' }]}
    >
      <div>
        <span style={nodeLabelStyle}>URL</span>
        <input style={nodeInputStyle} placeholder="https://..." value={url}
          onChange={e => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }} />
      </div>
    </BaseNode>
  );
};
