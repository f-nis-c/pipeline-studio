import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || '');
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore(s => s.updateNodeField);

  return (
    <BaseNode id={id} type="customOutput" inputHandles={[{ id: 'value', label: 'input' }]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <span style={nodeLabelStyle}>Name</span>
          <input style={nodeInputStyle} value={currName} placeholder="result name"
            onChange={e => { setCurrName(e.target.value); updateNodeField(id, 'outputName', e.target.value); }} />
        </div>
        <div>
          <span style={nodeLabelStyle}>Type</span>
          <select style={nodeSelectStyle} value={outputType}
            onChange={e => { setOutputType(e.target.value); updateNodeField(id, 'outputType', e.target.value); }}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
