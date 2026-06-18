type Props = {
    category : string,
    amount : number,
    percentage : number,
    color : string,
};

import { IoFastFoodSharp, IoAirplane, IoCart, IoNewspaperSharp  } from "react-icons/io5";  

export default function CategoryCard({category, amount, percentage, color}: Props) {
    const formattedP = Math.round(percentage);
    const formattedAmount = new Intl.NumberFormat("en-IN").format(
        Math.abs(amount)
    );
    const icon = () => {
        switch(category){
            case "Food":
                return <IoFastFoodSharp/>
            case "Travel":
                return <IoAirplane/>
            case "Shopping":
                return <IoCart/>
            case "Bills":
                return <IoNewspaperSharp/>
            default:
                return <></> 
        }
    }
    return (
        <div className="CatcardContainer"> 
            <div className="CatcardRow"> 
                <p>{icon()}  {category}</p>
                <div className="CatcardStats">
                    <p>₹{formattedAmount}</p>
                    <p className="Catcardp">·</p> 
                    <p className="Catcardp">{formattedP}%</p>
                </div>
            </div>
            <div className="progressBar"
                style={{ width: `${formattedP}%`, backgroundColor : color}}>
            </div>
        </div>
    );
}
