import {create} from 'zustand';

export const useBookingStore = create((set) => ({
    bookings: [],
    
    setBooking: (booking) => 
        set((state) => ({ bookings: [...state.bookings, booking] })),

    createBooking: async (newBooking) => {
        if ( !newBooking.customer || !newBooking.contact || !newBooking.time || !newBooking.location) {
            return { success: false, message: 'Please fill all fields' };
        }


        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBooking),
            });

            if (!res.ok) throw new Error('Booking failed');

            const data = await res.json();
            set((state) => ({ bookings: [...state.bookings, data.data] }));

            return { success: true, message: 'Booking successful' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    
    

    deleteBooking: async (sid)=>{
        const res= await fetch(`/api/booking/${sid}`,{
            method:"Delete",
        });
       const data = await res.json();
       if(!data.success){
        return {success: false, message:data.message}
    }

        set(state => ({bookings: state.bookings.filter(booking=> booking._id !==sid)}))
        return {success: true, message:'Deleted Successfully'}
    },
    
    fetchBooking: async () => {
        const email = localStorage.getItem('userEmail');
      
        try {
          const endpoint = email ? `/api/booking?email=${email}` : `/api/booking`;
          const res = await fetch(endpoint);
          const data = await res.json();
      
          if (data.success) {
            set({ bookings: data.data });
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching bookings", error);
        }
      },
      

     UpdateBooking: async (sid,Updatedbooking ) => {
         const res= await fetch(`/api/booking/${sid}`,{
             method:"PUT",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(Updatedbooking)
         });
         const data =await res.json();
         if(!data.success) return {success: false, message: data.message};

       
         set(state => ({
             bookings: state.bookings.map(booking => booking._id === sid ? data.data :booking)
         }))
         return { success: true, message: 'Booking updated successfully' }; 


     }
    

}));


