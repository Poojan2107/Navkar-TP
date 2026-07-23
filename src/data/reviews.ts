export interface Review {
  name: string;
  text: string;
  rating: number;
}

/** Selected reviews published on the previous site — kept short and credible */
export const reviews: Review[] = [
  {
    name: 'Meet Parmar',
    rating: 5,
    text: 'Purchased MSL pipes from Navkar — quality was solid and the team helped me pick the right sizes. Pricing was fair for the volume we needed.',
  },
  {
    name: 'Neel Mehta',
    rating: 5,
    text: 'Good stock of Jindal pipes and a straightforward buying experience. Staff know the range and respond quickly on quotes.',
  },
  {
    name: 'Prachi Doshi',
    rating: 5,
    text: 'Reliable MS pipe dealer in Ahmedabad. Material matched what we ordered and delivery was on time for our site.',
  },
  {
    name: 'Mudit Mehta',
    rating: 5,
    text: 'Trusted suppliers — consistent stock and clear communication.',
  },
];
