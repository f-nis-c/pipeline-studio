import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || '');
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore(s => s.updateNodeField);

  return (
    <BaseNode id={id} type="customInput" outputHandles={[{ id: 'value', label: 'output' }]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <span style={nodeLabelStyle}>Name</span>
          <input style={nodeInputStyle} value={currName} placeholder="variable name"
            onChange={e => { setCurrName(e.target.value); updateNodeField(id, 'inputName', e.target.value); }} />
        </div>
        <div>
          <span style={nodeLabelStyle}>Type</span>
          <select style={nodeSelectStyle} value={inputType}
            onChange={e => { setInputType(e.target.value); updateNodeField(id, 'inputType', e.target.value); }}>
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
