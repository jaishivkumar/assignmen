import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ResizableComponent.css';
import axios from 'axios';

const ResizableLayout = () => {
  const [components, setComponents] = useState([
    { id: 'a', content: '' },
    { id: 'b', content: '' },
    { id: 'c', content: '' }
  ]);
  const [count, setCount] = useState({ addCount: 0, updateCount: 0 });

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchAllData();
      await fetchCount();
    };

    fetchInitialData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/data');
      const data = response.data;

      // Update the components state only with the IDs 'a', 'b', and 'c'
      const updatedComponents = components.map(comp => {
        const fetchedComp = data.find(item => item.id === comp.id);
        return fetchedComp ? { ...comp, content: fetchedComp.content } : comp;
      });

      setComponents(updatedComponents);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/count');
      setCount(response.data);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const handleAdd = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/add', { id });
      setComponents(components.map(comp => comp.id === id ? { ...comp, content: '' } : comp));
      await fetchAllData();
      await fetchCount();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdate = async (id, content) => {
    try {
      await axios.post('http://localhost:4000/api/update', { id, content });
      setComponents(components.map(comp => comp.id === id ? { ...comp, content } : comp));
      await fetchAllData();
      await fetchCount();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (id, event) => {
    const newContent = event.target.value;
    setComponents(components.map(comp => comp.id === id ? { ...comp, content: newContent } : comp));
  };

  return (
    <div className="resizable-layout">
      <div className="count-display">
        {/* <p> {count.addCount}</p>
        <p> {count.updateCount}</p> */}
      </div>
      {components.map(comp => (
        <ResizableBox
          key={comp.id}
          className="resizable-box"
          width={300}
          height={200}
          minConstraints={[150, 150]}
          maxConstraints={[500, 500]}
          resizeHandles={['s', 'e', 'w', 'n', 'sw', 'nw', 'se', 'ne']}
        >
          <div className="resizable-item">
            <h2>Component {comp.id.toUpperCase()}</h2>
            <textarea
              value={comp.content}
              onChange={(e) => handleChange(comp.id, e)}
              placeholder="Enter content here..."
            />
            <button onClick={() => handleAdd(comp.id)}>Add</button>
            <button onClick={() => handleUpdate(comp.id, comp.content)}>Update</button>
          </div>
        </ResizableBox>
      ))}
    </div>
  );
};


export default ResizableLayout;
