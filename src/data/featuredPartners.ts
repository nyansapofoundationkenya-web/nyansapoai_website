// data/featuredPartners.ts
export interface FeaturedPartner {
  id: string
  title: string
  link: string
  imageUrl: string
  backgroundImageUrl: string  // New field for card background
  featuredText: string        // New field for the text/sentence
  altText?: string
}

export const featuredPartners: FeaturedPartner[] = [
  {
    id: '32cebfa5-4575-4265-857b-ba5d75977677',
    title: 'NTV Kenya',
    link: 'https://ntvkenya.co.ke/education/from-traditional-to-tech-savvy-adapting-ai-in-kenyan-educational-system/',
    imageUrl: '/imgs/featured-partners/ntv.jpeg',
    backgroundImageUrl: '/imgs/gallery/1.jpg', 
    featuredText: 'From traditional to tech-savvy: Adapting AI in Kenyan educational system',
    altText: 'NTV Kenya Logo'
  },
  {
    id: 'salzburg-global',
    title: 'Salzburg Global Seminar',
    link: 'https://www.salzburgglobal.org/person/mumbe-mwangangi',
    imageUrl: '/imgs/featured-partners/salzburgglobal.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/1.jpg',
    featuredText: 'What We Can Learn About the Future of Teaching',
    altText: 'Salzburg Global Seminar Logo'
  },
  {
    id: 'wise-qatar',
    title: 'WISE Qatar',
    link: 'https://wise-qatar.org/biography/mumbe-mwangangi/',
    imageUrl: '/imgs/featured-partners/WISE Logo.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/1.png',
    featuredText: 'Portfolio',
    altText: 'WISE Qatar Logo'
  },
  {
    id: 'afrilabs',
    title: 'AfriLabs',
    link: 'https://www.afrilabs.com/intel-corporation-announces-winners-of-the-2024-community-reach-program/',
    imageUrl: '/imgs/featured-partners/afrilabs.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/1.jpg',
    featuredText: 'Intel Corporation Announces Winners of the 2024 Community Reach Program',
    altText: 'AfriLabs'
  },
  {
    id: 'edtech',
    title: 'Edtech EastAfrica',
    link: 'https://www.youtube.com/watch?v=Wgydi78dV3g',
    imageUrl: '/imgs/featured-partners/edtech.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/3.jpg',
    featuredText: 'EdTech: Impact of Artificial Intelligence on delivery and outcome of learning',
    altText: 'Edtech EastAfrica'
  },
  {
    id: 'ai-for-education',
    title: 'AI for Education',
    link: 'https://www.linkedin.com/posts/nyansapo_ai-for-educationorg-evidence-clinics-activity-7301098529379291137-x-4f?utm_source=share&utm_medium=member_desktop&rcm=ACoAACBiaAwBI91cqgSg8PPXKyTzvr5jgjZq3xM',
    imageUrl: '/imgs/featured-partners/aiforeducation.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/7.jpg',
    featuredText: 'AI for Education',
    altText: 'AI for Education'
  },
  {
    id: 'd4d',
    title: 'D4D Hub',
    link: 'https://www.youtube.com/watch?v=1voe6YmaIqc',
    imageUrl: '/imgs/featured-partners/d4d.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/11.jpg',
    featuredText: '#GirlsinD4D in conversation with Thierry Barbé (European Commission DG INTPA) at #EDD22',
    altText: 'D4D Hub'
  },
  {
    id: 'forbes',
    title: 'Forbes',
    link: 'https://www.forbes.com/sites/cognitiveworld/2020/03/23/university-students-are-learning-to-collaborate/?sh=348a4f8e7a8e',
    imageUrl: '/imgs/featured-partners/forbes.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/12.JPG',
    featuredText: 'University Students Are Learning To Collaborate on AI Projects',
    altText: 'Forbes'
  },
  {
    id: 'mastercard',
    title: 'Mastercard Foundation',
    link: 'https://www.forbes.com/sites/cognitiveworld/2020/03/23/university-students-are-learning-to-collaborate/?sh=348a4f8e7a8e',
    imageUrl: '/imgs/featured-partners/mastercard.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/2.jpg',
    featuredText: 'Empowering education across Africa',
    altText: 'Mastercard Foundation'
  },
  {
    id: 'africanstartup',
    title: 'African Start Up Conference',
    link: 'https://www.linkedin.com/posts/nyansapo_nyansapoai-ai4good-africanstartupconference-activity-7138791019046756353-ggkb/',
    imageUrl: '/imgs/featured-partners/africanstartup.jpeg',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/6.jpg',
    featuredText: 'Showcasing innovation at African Start Up Conference',
    altText: 'African Start Up Conference'
  },
  {
    id: 'weare',
    title: 'We Are The Family Foundation',
    link: 'https://www.wearefamilyfoundation.org/yttf-the-creatives-2024/nyansapo-ai',
    imageUrl: '/imgs/featured-partners/weare.png',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/4.jpg',
    featuredText: 'YTTF Creatives',
    altText: 'We Are The Family Foundation'
  },
  {
    id: 'global',
    title: 'Global Solutions Summit',
    link: 'https://www.youtube.com/watch?v=LS8PvY4_F5o',
    imageUrl: '/imgs/featured-partners/globalsolutions.jpeg',
    backgroundImageUrl: '/imgs/featured-partners/backgrounds/1.jpg',
    featuredText: 'Global Solutions Summit 2024',
    altText: 'Global Solutions Summit'
  },
]