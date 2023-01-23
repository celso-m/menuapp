import { useState } from 'react';
const formPages = [
  {
    name: 'Page 1',
    inputs: [
      { type: 'text', name: 'input1' },
      {
        type: 'dropdown',
        name: 'dropdown1',
        options: ['Option 1', 'Option 2'],
      },
    ],
  },
  {
    name: 'Page 2',
    inputs: [
      { type: 'text', name: 'input2' },
      {
        type: 'dropdown',
        name: 'dropdown2',
        options: ['Option 3', 'Option 4'],
      },
    ],
  },
  {
    name: 'Page 3',
    inputs: [
      { type: 'text', name: 'input3' },
      {
        type: 'dropdown',
        name: 'dropdown3',
        options: ['Option 5', 'Option 6'],
      },
    ],
  },
];

export default function Multiform() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

  function handleChange(event: any) {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  function handlePrev(event: any) {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
  }

  function handleNext(event: any) {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  const currentInputs = formPages[currentPage].inputs;

  return (
    <form>
      {currentInputs.map((input) => (
        <div key={input.name}>
          {input.type === 'text' && (
            <input
              type="text"
              name={input.name}
              value={inputValues[input.name] || ''}
              onChange={handleChange}
            />
          )}
          {input.type === 'dropdown' && (
            <select
              name={input.name}
              value={inputValues[input.name] || ''}
              onChange={handleChange}
            >
              {input.options && input.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      {currentPage > 0 && <button onClick={handlePrev}>Previous</button>}
      {currentPage < formPages.length - 1 && (
        <button onClick={handleNext}>Next</button>
      )}
    </form>
  );
}

