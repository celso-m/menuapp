import { useEffect, useState } from 'react';
import dishes from '../dummydata/dishes.json'
import DishInput from './DishInput'
import ReviewComponent from './ReviewComponent';

export default function Multiform() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValues, setInputValues] = useState<{[key: string]: any}>({
    numOfPeople: '1'
  });
  const [inputFields, setInputFields] = useState([{
    dish:'',
    servingNum:'1'
  } ]);
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
  const formPages = [
    {
      name: 'Page 1',
      inputs: [
        {
          type: 'dropdown',
          name: 'meal',
          options: ['breakfast', 'lunch', 'dinner'],
          default: "breakfast",
          className: "mealDropDown"
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
          type: "inputComponent",
        }
      ],
    },
    {
      name: 'Page 4',
      inputs: [
        {
          type: 'reviewComponent',
        },
      ],
    },
  ];
  
  let selectableDishes: any[] = Array.from(new Set(dishList
      .filter((item:any) =>{
        for(let meal of item.availableMeals){
          if(meal === inputValues['meal'] && inputValues['selectedRest'] === item.restaurant) return true
        }
        return false
      })
      .map((item:any) => item.name ))
    ) 

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

  const addInputField = (event:any)=>{
      event.preventDefault();
      setInputFields([...inputFields, {
          dish:'',
          servingNum:''
      } ])
    
  }

  const removeInputFields = (index:any)=>{
      const rows = [...inputFields];
      rows.splice(index, 1);
      setInputFields(rows);
  }

  const handleChangeDish = (index:any, evnt:any)=>{
      evnt.preventDefault();
      const { name, value } = evnt.target;
      const list:any = [...inputFields];
      list[index][name] = value;
      setInputFields(list);
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
        value={inputValues[input.name] || ""}
        onChange={handleChange}
        >
        <option value="" selected disabled hidden>Select</option>
        {input.options && input.options.map((option:any, i:number) => (
          
          <option 
            key={i}
            value={option}>
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
    }else if(input.type === "inputComponent"){
      return(
        <DishInput 
        addInputField = {addInputField}
        options={selectableDishes} 
        handleChangeDish = {handleChangeDish}
        removeInputFields = {removeInputFields}
        inputFields= {inputFields}
        />
      )
    }else if(input.type === "reviewComponent"){
      return(
        <ReviewComponent 
          inputValues = {inputValues}
          inputFields= {inputFields}
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
    <div>
    <nav id="mainMenu">
      <ul>
        <li onClick={()=>setCurrentPage(0)}>Step 1</li>
        <li onClick={()=>setCurrentPage(1)}>Step 2</li>
        <li onClick={()=>setCurrentPage(2)}>Step 3</li>
        <li onClick={()=>setCurrentPage(3)}>Review</li>
      </ul>
    </nav>
      <form>
        <div className="form">
        {inputMap}
        </div>
        {currentPage > 0 && <button onClick={handlePrev}>Previous</button>}
        {currentPage < formPages.length - 1 && (
          <button onClick={handleNext}>Next</button>
          )}
      </form>
    </div>
  );
}

