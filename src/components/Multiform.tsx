import { useEffect, useState } from 'react';
import dishes from '../dummydata/dishes.json'


export default function Multiform() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [dishList, setDishes] = useState([{
      "id": 0,
      "name": "",
      "restaurant": "",
      "availableMeals": [""]
  }])
  const selectableRest = Array.from(new Set(dishList
    .filter((item:any) =>{
      for(let meal of item.availableMeals){
        if(meal === inputValues['meal']) return true
      }
      return false
    })
    .map((item:any) => item.restaurant ))
  )

  console.log(inputValues)
  
  let selectableDishes: any[] = Array.from(new Set(dishList
      .filter((item:any) =>{
        for(let meal of item.availableMeals){
          if(meal === inputValues['meal'] && inputValues['selectedRest'] === item.restaurant) return true
        }
        return false
      })
      .map((item:any) => item.name ))
    ) 
  
  
  const formPages = [
    {
      name: 'Page 1',
      inputs: [
        {
          type: 'dropdown',
          name: 'meal',
          options: ['breakfast', 'lunch', 'dinner'],
          placeholder: "breakfast",
          // className: "mealDropDown"
        },
        { 
          type: 'number', 
          name: 'numOfPeople',
          min: '1',
          max: '10',
          step: '1'
        },
      ],
    },
    {
      name: 'Page 2',
      inputs: [
        {
          type: 'dropdown',
          name: 'selectedRest',
          options: [...selectableRest],
        },
      ],
    },
    {
      name: 'Page 3',
      inputs: [
        {
          type: 'dropdown',
          name: 'selectedDish',
          options: [...selectableDishes],
        },
      ],
    },
    {
      name: 'Page 4',
      inputs: [
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
    if(input.type === "dropdown"){
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
    }else if(input.type === "number"){
      return(
      <input
        type="number"
        name={input.name}
        value={inputValues[input.name] || '1'}
        onChange={handleChange}
        min= {input.min}
        max= {input.max}
        step= {input.step}
      />
        
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

