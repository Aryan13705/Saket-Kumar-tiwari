export interface Recommendation {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  date: string;
  type: "received" | "given";
  relationship?: string;
  text: string;
  source: "LinkedIn Recommendation";
  isExcerpt?: boolean;
  projectId?: string;
  projectName?: string;
  avatarUrl?: string;
}

export const RECOMMENDATIONS_DATA: Recommendation[] = [
  // =========================================================================
  // RECEIVED RECOMMENDATIONS (Written about Saket Kumar Tiwari)
  // =========================================================================
  {
    id: "rec-anand-gupta",
    name: "Anand Gupta",
    designation: "Founder & CEO — Aamor Inox Limited | Stainless Steel | Mentor | Investor",
    organization: "Aamor Inox Limited",
    date: "July 2, 2026",
    type: "received",
    relationship: "Client / Founder & CEO at Aamor Inox Limited",
    projectId: "luxury-farmhouse-aamor-inox",
    projectName: "Project Vardan / Aamor Inox Luxury Farmhouse",
    source: "LinkedIn Recommendation",
    isExcerpt: true,
    text: "Saket was a valued member of our team at project Vardan, where he served as our Civil Manager. During his time with us, he consistently demonstrated professionalism, dedication, and a strong sense of ownership.\n\nHe is dependable, proactive, and highly committed to delivering quality work. One of the best examples of this was his involvement in the construction of Vardan. Saket played a key role in coordinating the project, managing multiple stakeholders, and ensuring timely ...",
  },
  {
    id: "rec-ujjwal-goel",
    name: "Ujjwal Goel",
    designation:
      "Managing Director — Teraciel Group (LSI | Teraciel Properties | Teraciel Engineering & Contracting) | Leading Design, Construction & Development in UAE, India & Africa | Forbes 30 Under 30",
    organization: "Teraciel Group / La Sorogeeka",
    date: "August 3, 2024",
    type: "received",
    relationship: "Executive Leadership, Teraciel Group",
    source: "LinkedIn Recommendation",
    isExcerpt: false,
    text: "Saket is someone who takes great ownership, and goes the extra mile to deliver results. Wishing him great success.",
  },
  {
    id: "rec-kamal-jeet",
    name: "Kamal Jeet",
    designation:
      "Senior Project & Design Leader with 27+ years' experience in large-scale hospitality projects, luxury fit-outs, design, execution, cost optimization, stakeholder management, and strategic delivery.",
    organization: "Hospitality & Luxury Fit-Outs",
    date: "January 2, 2024",
    type: "received",
    relationship: "Senior Project & Design Leader",
    source: "LinkedIn Recommendation",
    isExcerpt: false,
    text: "I had the pleasure of working closely with Saket Tiwari on a challenging project. His exceptional problem-solving skills and attention to detail was instrumental in its success. I highly recommend Saket for his Hard work, dedication, professionalism, and ability to deliver results.",
  },
  {
    id: "rec-ayush-agarwal",
    name: "Ayush Agarwal",
    designation: "Scaling India’s Rooftop Solar Revolution",
    organization: "OYO Life",
    date: "April 24, 2020",
    type: "received",
    relationship: "Business Head at OYO Life",
    projectId: "oyo-hospitality-projects",
    projectName: "OYO Property Conversions",
    source: "LinkedIn Recommendation",
    isExcerpt: false,
    text: "Saket works as a Transformation Lead for Oyo LIFE, Gurgaon. He is one of the early risers who earned accolades right from his first month of joining. His diligence and detail orientation combined with hard work will take him places. Wishing him the very best!",
  },
  {
    id: "rec-harshal-rastogi",
    name: "Harshal Rastogi",
    designation: "Regional Head Projects",
    organization: "OYO / Project Leadership",
    date: "April 8, 2020",
    type: "received",
    relationship: "Regional Head Projects",
    source: "LinkedIn Recommendation",
    isExcerpt: false,
    text: "Well, was a delight to have in team directly, he has an eye for detail, strong followup with internal and external stakeholders has been his key to succeed in allotted assignments. Hardworking and a team's player, holds a good rapport within team. Wish you success and good health!",
  },

  // =========================================================================
  // GIVEN RECOMMENDATIONS (Written by Saket Kumar Tiwari for Colleagues)
  // =========================================================================
  {
    id: "rec-given-deepak-kumar",
    name: "Deepak Kumar",
    designation: "Dealer Development Project & Fit-Out Expert | 10+ years in Corporate Interiors, Construction & Execution",
    organization: "Corporate Interiors & Construction",
    date: "June 24, 2020",
    type: "given",
    relationship: "Worked with Saket on the same team at OYO",
    source: "LinkedIn Recommendation",
    isExcerpt: false,
    text: "Deepak Kumar is one of the very best among all people I've ever worked with. Wise, clever, excellent and well educated Transformation Lead who can be trusted. Deepak Kumar is extremely enthusiastic about his work which is infectious. Is always capable of adapting to new working environments. Very positive attitude towards work. The success achieved in his job required extensive knowledge and dedication. I thoroughly enjoyed collaborating with him at OYO.",
  },
  {
    id: "rec-given-naman-garg",
    name: "Naman Garg",
    designation:
      "Data Analyst | Consumer Healthcare at Expert Analytics | Power BI, SQL, Excel Expert | Pharma & Consumer Health Domain | Turning Data into Business Growth | Aspiring Big Data Specialist",
    organization: "Expert Analytics",
    date: "April 6, 2019",
    type: "given",
    relationship: "Worked with Saket, but at different companies",
    source: "LinkedIn Recommendation",
    isExcerpt: true,
    text: "A person wid a lot of enthusiasm to learn new things at a rapid pace and tries too implement the same at even a greater pace.... Simplifies even the tougher task into a normal....",
  },
];

export function getRecommendationsByType(type: "received" | "given"): Recommendation[] {
  return RECOMMENDATIONS_DATA.filter((r) => r.type === type);
}

export function getRecommendationsForProject(projectId: string): Recommendation[] {
  return RECOMMENDATIONS_DATA.filter((r) => r.projectId === projectId && r.type === "received");
}
