import React from "react"
import { db } from "./firebase"
import { ref, remove } from "firebase/database"
import { onValue } from "firebase/database"
import { useState , useEffect} from "react"
import { get } from "firebase/database"
import { Navigate } from "react-router-dom"
// import {delete}


const Recipelists=()=>{

   let index=0;
   const [recipes, setRecipes] = useState([]);
   const [uniqueRecipes, setUniqueRecipes] = useState([]);
   const [delRecipe, setDelRecipe] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
        const userRef = ref(db, 'userDataRecords');
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const recipeArray = Object.entries(snapshot.val()).map(([id, data]) => ({
              id,
              ...data,
            }));
            setDelRecipe(recipeArray);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };
  
      if(!delRecipe){
         <h1>Loading...</h1>
      }
      fetchData();
    }, []);

    useEffect(() => {
      const filterUniqueRecipes = () => {
        const existingNames = new Set(delRecipe.map(recipe => recipe.name));
        const filteredRecipes = recipes.filter(recipe => !existingNames.has(recipe.name));
        setUniqueRecipes(filteredRecipes);
      };
  
      filterUniqueRecipes();
    }, [recipes, delRecipe]);

    const deleteField = (specId) => {
      setDelRecipe((prevDelRecipe) => prevDelRecipe.filter(recipe => recipe.id !== specId));
    };

    const updatedFun=(event)=>{
      console.log("updated")
      window.location.href = `/updated/${event}`
      // window.location.href = `/updated`
      console.log(event);
      
    }

    const navigateFun=(event)=>{
      console.log("navigated")
      window.location.href = `/uniqueRecipe/${event}`
    }
   
  


  return(
    <> 
{/* window.location.href = `/uniqueRecipe/${rec.id}` */}
<div className="font-semibold text-[20px] mb-2 flex justify-center items-center">Recipe Lists</div>


<ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
{delRecipe.map((rec, index) => (
   
   <li key={rec.id} class="pb-3 sm:pb-4 bg-gray-200 m-2">
      <div  class="flex items-center space-x-4 rtl:space-x-reverse p-3 border-spacing-4" >
         <div class="flex-shrink-0">
            <img class="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJQfylwU60wbm1dtbQxiKzKJtEGsGqLXlSQ&s" alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJQfylwU60wbm1dtbQxiKzKJtEGsGqLXlSQ&s"/>
         </div>
         <div   class="flex-1 min-w-0">
            <p onClick={()=> navigateFun(rec.id)} class="text-m font-medium text-gray-900 truncate cursor-pointer dark:text-white">
            {rec.RecipeName}
            </p>
            <p>{rec.Quantity}</p>
         
         </div>
         <div>
         <button onClick={() => updatedFun(rec.id)} className="bg-blue-300 p-3 border-x-lime-100 rounded-xl ">Update</button>
         </div>
         <div>
         <button onClick={()=> deleteField(rec.id)} className="bg-red-200 p-3 border-x-lime-100 rounded-xl">Delete</button>
      </div>
      </div>
       
   </li>
))}
</ul>
</>

  )
}


export default Recipelists