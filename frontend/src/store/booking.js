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

    fetchBooking: async () => {
        const userEmail = localStorage.getItem('userEmail'); 
        if (!userEmail) return;
    
        try {
            const res = await fetch(`/api/booking?email=${userEmail}`);
    
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
    
            const data = await res.json();
    
            if (!data.success) {
                throw new Error(data.message);
            }
    
            set({ bookings: data.data });
        } catch (error) {
            console.error("Error fetching user bookings:", error.message);
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

        set(state => ({booking: state.booking.filter(service=> service._id !==sid)}))
        return {success: true, message:'Deleted Successfully'}
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
             booking: state.bookings.map(booking => booking._id === sid ? data.data :booking)
         }))


     }
    

}));


