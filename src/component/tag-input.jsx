import { useState, useCallback } from "react";
import { Input } from "antd";
import DraggableTag from "./draggable-tag";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './style.css'

export default function TagInput() {
  const [tagList, setList] = useState([
    { name: "tag1", id: "1" },
    { name: "tag2", id: "2" },
    { name: "tag3", id: "3" },
    { name: "tag4", id: "4" }
  ]);
  const [inputValue, setInputVal] = useState('')

  const moveTag = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = tagList[dragIndex];
      setList(
        update(tagList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [tagList]
  );

  function onPressEnter () {
    setList(
      update(tagList, {
        $push: [
          { name: inputValue, id: Math.random().toString(36).slice(2, 8) }
        ]
      })
    )
    setInputVal('')
  }

  const onChange = useCallback((e) => {
    setInputVal(e.target.value)
  })

  const removeTag = (tagId) => {
    setList(tagList.filter((tag) => tag.id !== tagId));
  };

  return (
		<div className='tag-input'>
			<DndProvider backend={HTML5Backend}>
				<div className='tag-container'>
          <Input
            onPressEnter={onPressEnter}
            onChange={onChange}
            value={inputValue}
            style={{ marginBottom: '10px' }}
          />

					{tagList.map((tag, index) => (
						<DraggableTag
							key={tag.id}
							name={tag.name}
							id={tag.id}
							index={index}
							moveTag={moveTag}
							removeTag={removeTag}
						/>
					))}
				</div>
			</DndProvider>
		</div>
	);
}
