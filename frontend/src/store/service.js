
import {create} from 'zustand';

export const useServiceStore = create((set) => ({
    services: [],
    setServices: (services) => set({services}),
    
    createService: async(newService) => {
        if(!newService.name || !newService.vendor || !newService.distance || !newService.rating || !newService.price) {
            return {success:false, message: 'Please fill all fields'};
        }
        
        const res= await fetch("/api/services", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newService)
        })

        const data = await res.json();
        set((state) => ({services: [...state.services, data.data]}));   
        return {success: true, message: 'Service added successfully'}; 
        
            
    },

    fetchServices: async() => {
        const res = await fetch("/api/services");
        const data = await res.json();
        set({services: data.data});
    },

    deleteService: async (sid)=>{
        const res= await fetch(`/api/services/${sid}`,{
            method:"Delete",
        });
       const data = await res.json();
       if(!data.success){
        return {success: false, message:data.message}
    }

        set(state => ({services: state.services.filter(service=> service._id !==sid)}))
        return {success: true, message:'Deleted Successfully'}
    },

     UpdateService: async (sid,Updatedservice ) => {
         const res= await fetch(`/api/services/${sid}`,{
             method:"PUT",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(Updatedservice)
         });
         const data =await res.json();
         if(!data.success) return {success: false, message: data.message};

         //refresh dashboard after update operation
         set(state => ({
             services: state.services.map(service => service._id === sid ? data.data :service)
         }))


     }
    

}));


