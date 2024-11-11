import { v2 as cloudinary } from 'cloudinary';
async  function cloudinaryc () {
    try{
       await cloudinary.config({ 
            cloud_name: 'dn2t2y5er', 
            api_key: '359543739557452', 
            api_secret: 'ziAO4Cl9xPvGSETi67vIcoGUbKA' // Click 'View API Keys' above to copy your API secret
        });
        console.log('cloundnary connection sucessful')
    }catch(err){return err}
    
}
export default cloudinaryc;