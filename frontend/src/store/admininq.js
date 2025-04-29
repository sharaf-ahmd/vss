import { create } from 'zustand';

export const useAdminInquiryStore = create((set) => ({
  inquiries: [],

  fetchAdminInquiries: async () => {
    try {
      const res = await fetch('/api/admininq');

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      set({ inquiries: data.data });
      
    } catch (error) {
      console.error('Error fetching admin inquiries:', error.message);
    }
  },


  deleteAdminInquiry: async (id) => {
    const res = await fetch(`/api/admininq/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      inquiries: state.inquiries.filter((inq) => inq._id !== id),
    }));

    return { success: true, message: 'Inquiry deleted successfully' };
  },


  updateAdminInquiry: async (id, updatedInquiry) => {
    const res = await fetch(`/api/admininq/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInquiry),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      inquiries: state.inquiries.map((inq) =>
        inq._id === id ? data.data : inq
      ),
    }));

    return { success: true, message: 'Inquiry updated successfully' };
  },
}));
