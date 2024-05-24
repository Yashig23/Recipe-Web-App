import React from "react";
import { useState } from "react";

const Addrecipe=()=>{
    const [added, setAdded] = useState(false);
    const [val, setVal] = useState([]);
    const [disable, setDisable] = useState(true);
    console.log(val);

    const[userData, setUserInput] = useState({
        RecipeName: "",
        IngredientsList: [{ingredients: "", Quantity: "1", Measurement: "piece"}],
        Category: "Breakfast",
        Label: "Veg",
        Description: "" ,
        imageUrl: ""
    })

    let name, value, i=0;
    const postUserData=(event)=>{
       name = event.target.name;
       value = event.target.value;

       setUserInput({...userData, [name]: value})
       if(userData.Category.length > 0 && userData.Description.length > 0 && userData.Ingredients.length > 0 && userData.Label.length > 0 && userData.Measurement.length > 0 && userData.Quantity.length > 0 && userData.RecipeName.length > 0 && userData.imageUrl.length > 0 ){
        setDisable(false);
       }
    }

    const addNew=(e)=>{
        e.preventDefault();
        const abc = [...val, []]
        setVal(abc);
    }

    const RecipeName = userData.RecipeName;
    console.log(RecipeName);
    console.log(RecipeName.length);

    const disableBtn=(e)=>{
        if(userData.RecipeName.length != 0 && userData.Ingredients != null && userData.Quantity != null && userData.Measurement != null && userData.Category.length != 0 && userData.Label.length != 0 && userData.Description.length != 0 && userData.imageUrl.length != 0 ){
           disabled = false;
           submitData(e);
        }
            console.log("vonstatnt");
    }
    
    const submitData=async(e)=>{
      e.preventDefault();
      const {RecipeName,
        IngredientsList,
        Quantity,
        Measurement,
      Category,
      Label,
      Description,
      imageUrl
     } = userData;

      const result = await fetch('https://recipe-book2-3494d-default-rtdb.firebaseio.com/userDataRecords.json', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            RecipeName,
      IngredientsList,
      Quantity,
      Measurement,
      imageUrl,
      Category,
      Label,
      Description
        })

      })

      if(!result){
        <h1>Loading....</h1>
      }

      if(result){
        alert("Data stored");
        setUserInput(
            {
                RecipeName: "",
                IngredientsList: [{ingredients: '', Quantity: '', Measurement :''}],
                Quantity: "",
                Category: "",
                Label: "",
                Description: "", 
                Measurement:"",
                imageUrl: ""
            }
        )
        // alert("Data stored");

      }
      else{
        alert("Not stored");
      }
      setDisable(true);
    }

    const handleIngredientsList=(index, event)=>{
        console.log(index, event);
        console.log(event.target.value);
        console.log(event.target.name);
        console.log("changed");
    }

    const handleFileChange=(e)=>{
      const file = e.target.files[0];
      if(file){
        const file1 = URL.createObjectURL(file);
        setUserInput({...userData, imageUrl: file1});
        console.log( file1)
        window.open(file1, '_blank')
      }
    }

    
    return(
        <>
        
    
        <form method="POST" >
        <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add New Recipe</h2>
      <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
                  <input type="text" name ="RecipeName" value={userData.RecipeName} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Recipe name"  onChange={postUserData} required=""/>
              </div>
              <div>
                  <label for="Category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                     <select id="Category" name ="Category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={value} onChange={postUserData} required="">

                    <option value="Breakfast">Breakfast</option>

               <option value="Lunch">Lunch</option>

               <option value="Dinner">Dinner</option>
               <option value="Snack">Snack</option>

                </select>
                  {/* </select> */}
              </div>
              <div>
                  <label for="Label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                  <select id="Label" name="Label" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={value} onChange={postUserData} required="">

<option value="Veg">Veg</option>

<option value="Non-Veg">Non-Veg</option>

</select>
</div>

<div className=" m-2 ">
    <button className="text-red-500 font-semibold bg-slate-200 pr-3 pl-3 pt-2 pb-2 rounded-lg" onClick={(e)=> addNew(e)}>Add Ingredients</button>
    {val.map(()=>{
        // console.log(data);
        console.log(val);
        return(
            <div class="grid gap-4 sm:grid-cols-3 sm:gap-6"> 
            <div class="w-full">
            <label for="Ingredients" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
            <input type="text" name ="Ingredients" value={userData.Ingredients}  id="Ingredients" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingredients lists"    onChange={(e, index)=>handleIngredientsList(e, index)} required=""/>
        </div>
        <div class="w-full">
            <label for="Quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
            <input type="number" name ="Quantity" value={userData.Quantity}  id="Quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" onChange={(e, index)=>handleIngredientsList(e, index)} required=""/>
        </div>
        <div className="w-full">
        <label for="Measurement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Measurement</label>
        <select id="Measurement" name ="Measurement" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={value} onChange={(e, index)=>handleIngredientsList(e, index)} required="">
                    <option value='Kg' >Kg</option>
                    <option value='Liter' >Liter</option>
                    <option value='gms' >gms</option>
                    <option value='tbs' >tbs</option>
                    <option value='piece' >piece</option>
                  </select>
        </div>
        
        </div>
            

        )

    })}

              </div>
                
              {/* {added && (
                <>
                 <div class="w-full">
                  <label for="Ingredients" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
                  <input type="text" name ="Ingredients" value={userData.Ingredients}  id="Ingredients" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingredients lists"  onChange={handleIngredientsList} required=""/>
              </div>
              <div class="w-full">
                  <label for="Quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input type="number" name ="Quantity" value={userData.Quantity}  id="Quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1"  onChange={handleIngredientsList} required=""/>
              </div>

                </>
              )
            
              } */}
            </div> 
              <div className="mt-2">
                  <label for="Description" class="block m-2 text-m font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="Description" name ="Description" value={userData.Description} rows="8" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={postUserData} placeholder="Your description here">{userData.Description}</textarea>
              </div>
              <div className="m-3">
              <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleFileChange}/>
              </div>
          <div>
          <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"    
             onClick={submitData} >
              Add Recipe
          </button>
          </div>
      </form>
  </div>
</section>
</form>


        </>
    )
}

export default Addrecipe;
