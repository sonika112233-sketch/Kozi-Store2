// NOTE: Images below use placeholder URLs (placehold.co) so the app runs
// immediately without any shoe photos on hand. To use your real product
// photos instead:
//   1. Drop your shoe images into src/assets/Shoe_photo/Woman|Man|Kid/
//   2. Import them at the top of this file, e.g.:
//        import women1 from "../assets/Shoe_photo/Woman/women1_sneaker.png";
//   3. Replace the matching `img: "https://placehold.co/..."` value below
//      with `img: women1` (the imported variable, no quotes).

import woman1 from "../assets/Shoe_photo/Woman/woman_sneaker1.jpg";
import woman2 from "../assets/Shoe_photo/Woman/woman_sneaker2.jpg";
import woman3 from "../assets/Shoe_photo/Woman/woman_sneaker3.jpg";
import woman4 from "../assets/Shoe_photo/Woman/woman_sneaker4.jpg";
import woman5 from "../assets/Shoe_photo/Woman/woman_sneaker5.jpg";

import man1 from "../assets/Shoe_photo/Man/men_sneaker1.JPG";
import man2 from "../assets/Shoe_photo/Man/men_sneaker2.jpg";
import man3 from "../assets/Shoe_photo/Man/men_sneaker3.jpg";
import man4 from "../assets/Shoe_photo/Man/men_sneaker4.jpg";
import man5 from "../assets/Shoe_photo/Man/men_sneaker5.jpg";

import kid1 from "../assets/Shoe_photo/Kid/kid_sneaker1.JPG";
import kid2 from "../assets/Shoe_photo/Kid/kid_sneaker2.JPG";
import kid3 from "../assets/Shoe_photo/Kid/kid_sneaker3.JPG";
import kid4 from "../assets/Shoe_photo/Kid/kid_sneaker4.JPG";
import kid5 from "../assets/Shoe_photo/Kid/kid_sneaker5.JPG";

const productData = [
  // ---------- WOMAN ----------
  {
    id: 1,
    img: woman1,
    product: "WOMAN SNEAKER",
    price: "129$",
    text: "Lightweight everyday sneaker with breathable mesh upper and cushioned sole.",
    category: "Woman",
    type: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
  },
  {
    id: 2,
    img: woman2,
    product: "WOMAN SNEAKER",
    price: "139$",
    text: "Low-top classic sneaker, versatile enough for casual or sport wear.",
    category: "Woman",
    type: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
  },
  {
    id: 3,
    img: woman3,
    product: "WOMAN SNEAKER",
    price: "149$",
    text: "Running-inspired sneaker with responsive foam midsole for all-day comfort.",
    category: "Woman",
    type: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
  },
  {
    id: 4,
    img: woman4,
    product: "WOMAN SNEAKER",
    price: "119$",
    text: "Minimalist canvas sneaker that pairs with almost any outfit.",
    category: "Woman",
    type: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
  },
  {
    id: 5,
    img: woman5,
    product: "WOMAN SNEAKER",
    price: "159$",
    text: "Platform sneaker with extra grip sole, built for city walking.",
    category: "Woman",
    type: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
  },

  // ---------- MAN ----------
  {
    id: 6,
    img: man1,
    product: "MAN SNEAKER",
    price: "139$",
    text: "Everyday low-top sneaker with durable rubber outsole.",
    category: "Man",
    type: "Sneaker",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: 7,
    img: man2,
    product: "MAN SNEAKER",
    price: "149$",
    text: "High-top sneaker with padded collar for extra ankle support.",
    category: "Man",
    type: "Sneaker",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: 8,
    img: man3,
    product: "MAN SNEAKER",
    price: "159$",
    text: "Performance running shoe with breathable knit upper.",
    category: "Man",
    type: "Sneaker",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: 9,
    img: man4,
    product: "MAN SNEAKER",
    price: "129$",
    text: "Classic court sneaker, clean design for everyday wear.",
    category: "Man",
    type: "Sneaker",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: 10,
    img: man5,
    product: "MAN SNEAKER",
    price: "169$",
    text: "Rugged trail sneaker with reinforced toe and deep tread.",
    category: "Man",
    type: "Sneaker",
    sizes: [40, 41, 42, 43, 44, 45],
  },

  // ---------- KID ----------
  {
    id: 11,
    img: kid1,
    product: "KID SNEAKER",
    price: "59$",
    text: "Easy velcro-strap sneaker made for active kids.",
    category: "Kid",
    type: "Sneaker",
    sizes: [28, 29, 30, 31, 32],
  },
  {
    id: 12,
    img: kid2,
    product: "KID SNEAKER",
    price: "65$",
    text: "Lightweight kids sneaker with extra cushioned sole.",
    category: "Kid",
    type: "Sneaker",
    sizes: [28, 29, 30, 31, 32],
  },
  {
    id: 13,
    img: kid3,
    product: "KID SNEAKER",
    price: "55$",
    text: "Durable everyday sneaker built for the playground.",
    category: "Kid",
    type: "Sneaker",
    sizes: [28, 29, 30, 31, 32],
  },
  {
    id: 14,
    img: kid4,
    product: "KID SNEAKER",
    price: "69$",
    text: "Slip-on kids sneaker, quick and easy to put on.",
    category: "Kid",
    type: "Sneaker",
    sizes: [28, 29, 30, 31, 32],
  },
  {
    id: 15,
    img: kid5,
    product: "KID SNEAKER",
    price: "62$",
    text: "Breathable mesh sneaker in bright colors kids love.",
    category: "Kid",
    type: "Sneaker",
    sizes: [28, 29, 30, 31, 32],
  },
];

export { productData };
