import React from "react";
import { useState, useEffect} from "react";
import { db } from "./firebase";
import { get } from "firebase/database";
import { set } from "firebase/database";
import { useParams } from "react-router-dom";
import { ref } from "firebase/database";


const Update=()=>{

    const [userData, setUserList] =  useState({
        RecipeName: '',
        Ingredients: '',
        Quantity: '',
        Category: '',
        Label: '',
        Description: ''
      });

    const {id} = useParams();

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
          const specificRecipe = recipeArray.find(item => item.id === id); // Find the recipe with the specific ID
          setUserList(specificRecipe);
          console.log(id);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);




    const postUpdatedData = (e) => {
        const { name, value } = e.target;
        setUserList((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const userRef = ref(db, 'userDataRecords/' + id); // Adjusted to save specific record
        try {
          await set(userRef, userData);
          console.log("Updated successfully");
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };

      const submitData=async(e)=>{
        e.preventDefault();
        const {RecipeName,
        Ingredients,
        Quantity,
        Category,
        Label,
        Description } = userData;
  
        const result = await fetch('https://recipe-book2-3494d-default-rtdb.firebaseio.com/userDataRecords.json', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              RecipeName,
        Ingredients,
        Quantity,
        Category,
        Label,
        Description
          })
        })
  
        if(result){
          setUserList(
              {
                  RecipeName: "",
                  Ingredients: "",
                  Quantity: "",
                  Category: "",
                  Label: "",
                  Description: "" 
              }
          )
          alert("Data stored");
         
  
        }
        else{
          alert("Not stored");
        }
      }


    return(
        <>
        <form method="POST">
        <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Recipe</h2>
      <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
                  <input type="text" name ="RecipeName" value={userData.RecipeName} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Recipe name"  onChange={postUpdatedData} required=""/>
              </div>
              <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
                  <input type="text" name ="Ingredients" value={userData.Ingredients}  id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingreinets lists"  onChange={postUpdatedData} required=""/>
              </div>
              <div class="w-full">
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input type="number" name ="Quantity" value={userData.Quantity}  id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1"  onChange={postUpdatedData} required=""/>
              </div>
              <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  {/* <input type="text" name ="Category" value={userData.Category}  id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="BreakFast"  onChange={postUpdatedData} required=""/> */}
                  <select id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={userData.Category} onChange={postUpdatedData} required="">

                    <option value="Breakfast">Breakfast</option>

               <option value="Lunch">Lunch</option>

               <option value="Dinner">Dinner</option>
               <option value="Snack">Snack</option>

                </select>
              </div>
              <div>
              <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
              <select id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={userData.Label} onChange={postUpdatedData} required="">

<option value="1">Veg</option>

<option value="2">Non-Veg</option>

</select>

              </div>
              
              <div>
              </div> 
              <div class="w-full">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="description" name ="Description" value={userData.Description} rows="8" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={postUpdatedData} placeholder="Your description here">{userData.Description}</textarea>
              </div>
          </div>
          <button type="submit" onClick={submitData} class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" >
              Update Recipe
          </button>
          </div>
      </form>
  </div>
</section>
</form>
        </>
    )
}

export default Update;