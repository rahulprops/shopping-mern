import axios from "axios";

// Function to fetch  all data logic
export const fetchdata = async (url) => {
  try {
    const { data } = await axios.get(`http://localhost:8989/${url}`);
    return data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching category:", err.message); // Log the error for debugging
    throw err; // Rethrow the error to be handled by the caller
  }
};

// Function to create data logic
export const createdata = async (url, formData) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8989/${url}`,
        formData , // Ensure correct field name
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // }
      );
      return data;
    } catch (err) {
      // console.error('Error creating category:', err.response?.data || err.message); // Log detailed error from backend
      throw err;
    }
  };
  // function create delete data by id

  
  export const deletedata = async (url, id) => {
  try {
    const { data } = await axios.delete(`http://localhost:8989/${url}/${id}`);
    console.log("Category deleted successfully");
    return data;
  } catch (err) {
    console.error("Error deleting category:", err.response?.data || err.message);
    throw err;
  }
};
// functio create edit data logic 

export const editdata = async (url, id, updatedData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8989/${url}/${id}`,
        updatedData // Pass the updated category data
      );
      console.log("Category updated successfully");
      return data;
    } catch (err) {
      console.error("Error updating category:", err.response?.data || err.message); // Log detailed error message
      throw err;
    }
  };

// fetch subcategory 
export const fetchsubcate= async (url)=>{
    try{
        const {data}= await axios.get(`http://localhost:8989/${url}`)
        return data
    }catch(err){
        console.log("fetch subcate erorr",err)
        throw err
    }
  
}