export default function DishInput(props:any){
    const {
        options,
        addInputField ,
        handleChangeDish,
        removeInputFields,
        inputFields,
    } = props
    
    const inputList =  inputFields.map((data:any, index:any)=>{
        const {dish, servingNum}= data;
        return(
              <div key={index}>
                    <div>
                        <select
                            name="dish"
                            value={dish}
                            onChange={(evnt)=>handleChangeDish(index, evnt)}
                            >
                            <option value="" selected disabled hidden>Select</option>
                            {options && options.map((option:any, i:number) => (
                                <option 
                                    key={i} 
                                    value={option}
                                    >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                  <div>
                    <input 
                        type="number" 
                        onChange={(evnt)=>handleChangeDish(index, evnt)} 
                        value={servingNum ? servingNum : 1 } 
                        name="servingNum" 
                        min= '1'
                        max= '10'
                        step= '1'
                    />
                  </div>
                  <div>
                      {(inputFields.length!==1) 
                        ? <button onClick={removeInputFields}>Remove</button>
                        : ''
                      }
                  </div>
              </div>
          )
      })

    return(
        <div>
            {inputList}
            <div>
                <div>
                    <button onClick={addInputField}>Add New</button>
                </div>
            </div>
        </div>

    )
}