import { useEffect, useState } from 'react';
import dishes from '../dummydata/dishes.json'


export default function Multiform() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [dishList, setDishes] = useState([{}])
  const selectableRest = Array.from(new Set(dishList
    .filter((item:any) => item.availableMeals == inputValues['meal'])
    .map((item:any) => item.restaurant ))
  )

  console.log(inputValues)
  console.log(selectableRest)
  const formPages = [
    {
      name: 'Page 1',
      inputs: [
        { type: 'text', name: 'input1' },
        {
          type: 'dropdown',
          name: 'meal',
          options: ['breakfast', 'lunch', 'dinner'],
          className: "mealDropDown"
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
          options: [...selectableRest],
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
    {
      name: 'Page 4',
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

  function dummyGetAPI(){
    setDishes(dishes.dishes)
  } 

  useEffect(()=>{
    dummyGetAPI()
  }, [])

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

  function pageBuilder(input: any){
    if(input.type === "text"){
      return(
        <input
        type="text"
        name={input.name}
        value={inputValues[input.name] || ''}
        onChange={handleChange}
      />
      )
    }else if(input.type === "dropdown"){
      return(
        <select
        name={input.name}
        value={inputValues[input.name] || ''}
        onChange={handleChange}
      >
        {input.options && input.options.map((option:any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      )
    }
  }

  const currentInputs = formPages[currentPage].inputs;
  
  const inputMap = currentInputs.map((input:any, i) => (
    <div className={input.className} key={i}>
      {pageBuilder(input)}
    </div>
  ))

  return (
    <form>
      <div className="form">
      {inputMap}
      </div>
      {currentPage > 0 && <button onClick={handlePrev}>Previous</button>}
      {currentPage < formPages.length - 1 && (
        <button onClick={handleNext}>Next</button>
      )}
    </form>
  );
}

