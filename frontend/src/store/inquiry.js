import { create } from 'zustand';

export const useInquiryStore = create((set) => ({
  inquiries: [],

  setInquiry: (inquiry) =>
    set((state) => ({ inquiries: [...state.inquiries, inquiry] })),

  createInquiry: async (newInquiry) => {
    const { user, email, message } = newInquiry;
    if (!user || !email || !message) {
      return { success: false, message: 'Please fill all required fields' };
    }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });

      if (!res.ok) throw new Error('Inquiry failed');

      const data = await res.json();
      set((state) => ({ inquiries: [...state.inquiries, data.data] }));
      return { success: true, message: 'Inquiry submitted' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchInquiries: async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const res = await fetch(`/api/inquiry?email=${userEmail}`);

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      set({ inquiries: data.data });
    } catch (error) {
      console.error('Error fetching inquiries:', error.message);
    }
  },

  deleteInquiry: async (id) => {
    const res = await fetch(`/api/inquiry/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      inquiries: state.inquiries.filter((inq) => inq._id !== id),
    }));

    return { success: true, message: 'Deleted Successfully' };
  },

  updateInquiry: async (id, updatedInquiry) => {
    const res = await fetch(`/api/inquiry/${id}`, {
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

    return { success: true, message: 'Inquiry updated' };
  },
}));
