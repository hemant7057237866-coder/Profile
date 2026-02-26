import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface Course {
  name: string;
  duration: string;
  description: string;
  category: string;
  image: string;
}

export interface BusinessProfile {
  name: string;
  title: string;
  company: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  services: {
    name: string;
    description: string;
  }[];
  courses: Course[];
}

const STATIC_PROFILE: BusinessProfile = {
  name: "Hemant Chikhale",
  title: "Founder & Director",
  company: "Inspire Academy",
  bio: "Expert technical educator and digital solutions architect with over 10 years of experience in empowering students and businesses through technology.",
  location: "Khed, Ratnagiri, Maharashtra",
  email: "Theinspireacademykhed@gmail.com",
  phone: "7057237866",
  website: "https://inspireedutech.in/",
  skills: ["Tally Prime", "Advanced Excel", "Power BI", "Digital Marketing", "Software Development"],
  experience: [
    { role: "Founder & Director", company: "Inspire Academy", period: "2014 - Present", description: "Leading Khed's premier computer training institute." },
    { role: "Fund Accounting", company: "Kotak Mahindra Bank", period: "Previous", description: "Managed fund accounting operations." },
    { role: "Business Development Manager", company: "ICICI Prudential", period: "Previous", description: "Led business growth initiatives." },
    { role: "Accountant", company: "VNS Associates", period: "Previous", description: "Professional accounting services." }
  ],
  education: [],
  socialLinks: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/hemant-chikhale-5a6b58207" },
    { platform: "Instagram", url: "#" },
    { platform: "Facebook", url: "#" }
  ],
  services: [
    { name: "Professional Website Building", description: "Custom, responsive websites for businesses." },
    { name: "Customized Software Development", description: "Tailored software solutions for specific needs." },
    { name: "Social Media Handling", description: "Full-service social media management." },
    { name: "Video Editing", description: "Professional video production and editing." }
  ],
  courses: [
    { name: "Tally Prime", duration: "3 Months", description: "Comprehensive accounting with Tally.", category: "Accounting", image: "accounting" },
    { name: "Advanced Excel", duration: "2 Months", description: "Master data analysis with Excel.", category: "Data", image: "data" }
  ]
};

export async function getProfileData(): Promise<BusinessProfile> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a comprehensive professional business profile for Hemant Chikhale based on https://inspireedutech.in/. He is the founder of Inspire Academy in Khed and also runs 'Business Solution Agency'. Use these EXACT contact details: Email: Theinspireacademykhed@gmail.com, Phone: 7057237866, LinkedIn: https://www.linkedin.com/in/hemant-chikhale-5a6b58207. Include a detailed list of courses (Tally Prime, Advanced Excel, Share Market, Power BI, Power Query, Typing (English, Marathi), etc.). ALSO include a section for 'Business Solution Agency' services: Professional Website Building, Customized Software Development, Social Media Handling, Video Editing, Business Profile Making, and Business Poster Making. IMPORTANT: Include these EXACT professional experiences: 1. Accountant at VNS Associates, 2. Business Development Manager at ICICI Prudential, 3. Fund Accounting at Kotak Mahindra Bank. Do NOT include 'Graphic Design', 'Taxation', 'Instructional Design', or 'MSCIT'. Add social media links (LinkedIn, Instagram, Facebook). For course and service images, use descriptive keywords that I can map to icons. Return as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            title: { type: Type.STRING },
            company: { type: Type.STRING },
            bio: { type: Type.STRING },
            location: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            website: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  period: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  year: { type: Type.STRING }
                }
              }
            },
            socialLinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  url: { type: Type.STRING }
                }
              }
            },
            services: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            courses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING },
                  image: { type: Type.STRING, description: "A single keyword for the image (e.g., 'accounting', 'design', 'trading')" }
                }
              }
            }
          },
          required: ["name", "title", "company", "bio", "location", "skills", "experience", "services", "courses", "socialLinks"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching profile from AI, using fallback:", error);
    return STATIC_PROFILE;
  }
}
