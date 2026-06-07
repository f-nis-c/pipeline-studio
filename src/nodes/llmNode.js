import { useState } from 'react';
import { BaseNode, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const updateNodeField = useStore(s => s.updateNodeField);

  return (
    <BaseNode id={id} type="llm"
      inputHandles={[
        { id: 'system', label: 'system', top: '40%' },
        { id: 'prompt', label: 'prompt', top: '70%' },
      ]}
      outputHandles={[{ id: 'response', label: 'response' }]}
    >
      <div>
        <span style={nodeLabelStyle}>Model</span>
        <select style={nodeSelectStyle} value={model}
          onChange={e => { setModel(e.target.value); updateNodeField(id, 'model', e.target.value); }}>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-4-turbo">gpt-4-turbo</option>
          <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
          <option value="gemini-1.5-pro">gemini-1.5-pro</option>
        </select>
      </div>
    </BaseNode>
  );
};
