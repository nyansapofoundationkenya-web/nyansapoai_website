export interface FeaturedPartner {
  id: string
  title: string
  link: string
  imageUrl: string
  altText?: string
}

export const featuredPartners: FeaturedPartner[] = [
  {
    id: '32cebfa5-4575-4265-857b-ba5d75977677',
    title: 'NTV Kenya',
    link: 'https://ntvkenya.co.ke/education/from-traditional-to-tech-savvy-adapting-ai-in-kenyan-educational-system/',
    imageUrl: '/imgs/featured-partners/ntv.jpeg', 
    altText: 'NTV Kenya Logo'
  },
  {
    id: 'salzburg-global',
    title: 'Salzburg Global Seminar',
    link: 'https://www.salzburgglobal.org/person/mumbe-mwangangi',
    imageUrl: '/imgs/featured-partners/salzburgglobal.png',
    altText: 'Salzburg Global Seminar Logo'
  },
  {
    id: 'wise-qatar',
    title: 'WISE Qatar',
    link: 'https://wise-qatar.org/biography/mumbe-mwangangi/',
    imageUrl: '/imgs/featured-partners/WISE Logo.png',
    altText: 'WISE Qatar Logo'
  },
  {
    id: 'afrilabs',
    title: 'AfriLabs',
    link: 'https://www.afrilabs.com/intel-corporation-announces-winners-of-the-2024-community-reach-program/',
    imageUrl: '/imgs/featured-partners/afrilabs.png',
    altText: 'afrilabs'
  },
  {
    id: 'edtech',
    title: 'Edtech EastAfrica',
    link: 'https://www.youtube.com/watch?v=Wgydi78dV3g',
    imageUrl: '/imgs/featured-partners/edtech.png',
    altText: 'edtech'
  },
  {
    id: 'ai-for-education',
    title: 'AI for Education',
    link: 'https://www.linkedin.com/posts/nyansapo_ai-for-educationorg-evidence-clinics-activity-7301098529379291137-x-4f?utm_source=share&utm_medium=member_desktop&rcm=ACoAACBiaAwBI91cqgSg8PPXKyTzvr5jgjZq3xM',
    imageUrl: '/imgs/featured-partners/aiforeducation.png',
    altText: 'Ai for Education'
  },
  {
    id: 'd4d',
    title: 'D4D Hub',
    link: 'https://www.youtube.com/watch?v=1voe6YmaIqc',
    imageUrl: '/imgs/featured-partners/d4d.png',
    altText: 'D4D Hub'
  },
  // Add more partners here

   {
    id: 'forbes',
    title: 'Forbes',
    link: 'https://www.forbes.com/sites/cognitiveworld/2020/03/23/university-students-are-learning-to-collaborate/?sh=348a4f8e7a8e',
    imageUrl: '/imgs/featured-partners/forbes.png',
    altText: 'D4D Hub'
  },
  {
    id: 'mastercard',
    title: 'Mastercard Foundation',
    link: 'https://www.forbes.com/sites/cognitiveworld/2020/03/23/university-students-are-learning-to-collaborate/?sh=348a4f8e7a8e',
    imageUrl: '/imgs/featured-partners/mastercard.png',
    altText: 'Mastercard Foundation'
  },
]