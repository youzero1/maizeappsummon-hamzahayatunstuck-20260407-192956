import { create } from 'zustand';
import { Booking, DEMO_BOOKINGS } from './data';

type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBookingsByRestaurant: (restaurantId: string) => Booking[];
  getBookingsByUser: (userId: string) => Booking[];
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: DEMO_BOOKINGS,
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  getBookingsByRestaurant: (restaurantId) =>
    get().bookings.filter((b) => b.restaurantId === restaurantId),
  getBookingsByUser: (userId) =>
    get().bookings.filter((b) => b.userId === userId),
}));
