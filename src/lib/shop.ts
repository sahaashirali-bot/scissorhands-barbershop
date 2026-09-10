export const SHOP = {
  name: "Scissorhands Barbershop",
  address: "194 Gulf Fwy S Suite D1, League City, TX 77573",
  phone: "(713) 899-0979",
  phoneHref: "tel:+17138990979",
  email: "scissorhandsbarbershop1355@gmail.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=194+Gulf+Fwy+S+Suite+D1+League+City+TX+77573",
  hours: [
    { day: "Sunday", hours: "1:00 PM – 7:00 PM" },
    { day: "Monday", hours: "11:00 AM – 6:00 PM" },
    { day: "Tuesday", hours: "10:00 AM – 7:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 8:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 7:00 PM" },
    { day: "Friday", hours: "10:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "8:00 AM – 5:00 PM" },
  ],
  cancellationPolicy:
    "Please reschedule or cancel at least 1 hour before your appointment or you may be charged a cancellation fee of 100% of the scheduled service price. Arriving more than 10 minutes late may result in your appointment being cancelled.",
  cardFeeCents: 200,
} as const;
