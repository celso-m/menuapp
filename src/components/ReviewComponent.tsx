export default function ReviewComponent(props:any){
    const {
        inputValues,
        inputFields
    } = props

    function onSubmit(event:any){
        event.preventDefault()
        console.log(inputValues, inputFields)
    }

    const dishList = inputFields.map((dish:any, i:number) =>{
        return(
            <div className="row" key={i}>
                <span>{dish.dish}</span>
                <span>{dish.servingNum}</span>
            </div>
        )
    })
    return (
        <div className="review">
            <div className="row">
                <span>Meal</span>
                <span>{inputValues.meal}</span>
            </div>
            <div className="row">
                <span>No. of People</span>
                <span>{inputValues.numOfPeople}</span>
            </div>
            <div className="row">
                <span>Restaurant</span>
                <span>{inputValues.selectedRest}</span>
            </div>
            <div className="row">
                <span>Dishes</span>
                <span>{dishList}</span>
            </div>

            <button onClick={onSubmit}>Submit Order</button>
        </div>
    )
}