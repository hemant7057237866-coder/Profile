/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  ExternalLink, 
  Award, 
  BookOpen, 
  Briefcase, 
  ChevronRight,
  User,
  Cpu,
  TrendingUp,
  Palette,
  Database,
  Clock,
  CheckCircle2,
  BarChart3,
  PieChart,
  Table,
  FileSpreadsheet,
  Keyboard,
  Zap,
  LineChart,
  Calculator,
  Code,
  Share2,
  Video,
  Layout,
  Settings,
  Rocket,
  FileText,
  Image
} from 'lucide-react';
import { getProfileData, BusinessProfile, Course } from './services/profileService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfileData();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-sans text-sm uppercase tracking-widest text-indigo-600/60 font-bold">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-12 rounded-[40px] border border-red-100 bg-red-50/30">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Settings size={40} />
          </div>
          <h1 className="text-3xl font-serif italic mb-4 text-slate-900">Configuration Required</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {error || 'Profile data could not be loaded.'}
            <br /><br />
            <span className="text-sm font-bold text-red-600 bg-white px-4 py-2 rounded-xl border border-red-100 inline-block">
              Tip: Check if GEMINI_API_KEY is set in Netlify Environment Variables.
            </span>
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
            >
              Try Again
            </button>
            <a 
              href="https://app.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Open Netlify Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex">
      {/* Vertical Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-20 md:w-24 bg-white border-r border-indigo-50 z-50 flex flex-col items-center py-8 gap-12 hidden md:flex">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          H
        </div>
        
        <div className="flex-1 flex flex-col gap-8 items-center justify-center">
          <RailLink href="#about" icon={<User size={20} />} label="About" />
          <RailLink href="#services" icon={<Rocket size={20} />} label="Agency" />
          <RailLink href="#courses" icon={<BookOpen size={20} />} label="Courses" />
          <RailLink href="#experience" icon={<Briefcase size={20} />} label="Journey" />
          <RailLink href="#contact" icon={<Mail size={20} />} label="Contact" />
        </div>

        <div className="flex flex-col gap-4 no-print">
          <button 
            onClick={() => window.print()}
            className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            title="Download PDF"
          >
            <Award size={20} />
          </button>
          {profile.socialLinks.slice(0, 3).map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-full z-50 px-8 flex items-center justify-between md:hidden shadow-2xl shadow-indigo-200/50 no-print">
        <a href="#about" className="text-indigo-600"><User size={20} /></a>
        <a href="#services" className="text-slate-400"><Rocket size={20} /></a>
        <a href="#courses" className="text-slate-400"><BookOpen size={20} /></a>
        <a href="#experience" className="text-slate-400"><Briefcase size={20} /></a>
        <button onClick={() => window.print()} className="text-slate-400"><Award size={20} /></button>
      </nav>

      <main className="flex-1 md:pl-24 w-full">
        {/* Hero Section */}
        <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-white hero-section">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/30 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 text-left"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-indigo-600"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-600">
                  Founder & Director
                </span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-serif italic mb-8 tracking-tighter leading-[0.85] text-slate-900">
                {profile.name.split(' ')[0]}<br/>
                <span className="text-indigo-600">{profile.name.split(' ')[1]}</span>
              </h1>
              
              <p className="text-2xl text-slate-500 leading-relaxed font-light mb-12 max-w-xl">
                {profile.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-3"
                >
                  Get in Touch <ChevronRight size={18} />
                </a>
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white border border-indigo-100 text-slate-900 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3"
                >
                  Visit Academy <ExternalLink size={18} />
                </a>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Expertise</p>
                <div className="flex gap-2">
                  {profile.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <img 
                  src="https://i.postimg.cc/mDpBwkNY/hemant-image.png" 
                  alt={profile.name}
                  className="w-full h-full object-cover relative z-0 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/hemant/800/1000';
                  }}
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-indigo-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">100%</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Practical Training</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white border-y border-indigo-50 py-16">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem value="10+" label="Years Experience" color="text-indigo-600" />
            <StatItem value="1000+" label="Students Trained" color="text-emerald-600" />
            <StatItem value="DITRP" label="Certified Partner" color="text-orange-600" />
            <StatItem value="Agency" label="Business Solutions" color="text-violet-600" />
          </div>
        </section>

        {/* Business Solution Agency Section */}
        <section id="services" className="py-24 px-6 max-w-[1600px] mx-auto bg-indigo-50/20 rounded-[60px] my-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-600 mb-4 block">Our Agency Services</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-none text-slate-900">Business Solution Agency</h2>
            </div>
            <p className="max-w-md text-slate-500 text-sm leading-relaxed">
              We provide end-to-end digital solutions to help businesses scale and establish a strong online presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {profile.services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-24 px-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-4 block">Our Curriculum</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-none">Professional Courses</h2>
            </div>
            <p className="max-w-md text-black/50 text-sm leading-relaxed">
              Master industry-ready skills with our DITRP certified training programs designed for modern career paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {profile.courses.map((course, i) => (
              <CourseCard key={i} course={course} index={i} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 bg-slate-900 text-white">
          <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
              <h2 className="text-4xl font-serif italic mb-6 sticky top-32">Professional Journey</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                A decade of leadership in technical education, building Inspire Academy into Khed's premier computer training institute.
              </p>
            </div>
            <div className="md:col-span-2 space-y-12">
              {profile.experience.map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative pl-8 border-l border-indigo-500/30 pb-12 last:pb-0"
                >
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-indigo-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 mb-2 block">{exp.period}</span>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-indigo-300/70 font-medium mb-4">{exp.company}</p>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-[1600px] mx-auto">
          <div className="bg-white rounded-[40px] p-12 md:p-20 shadow-2xl shadow-indigo-100 overflow-hidden relative border border-indigo-50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl font-serif italic mb-8 text-slate-900">Let's Connect</h2>
                <p className="text-slate-500 mb-12 leading-relaxed">
                  Ready to start your professional journey? Contact us for admissions or business inquiries.
                </p>
                
                <div className="space-y-6">
                  <ContactItem icon={<Mail size={18} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                  <ContactItem icon={<Phone size={18} />} label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
                  <ContactItem icon={<MapPin size={18} />} label="Location" value={profile.location} />
                  <ContactItem icon={<Globe size={18} />} label="Website" value={profile.website} href={profile.website} />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                  {profile.socialLinks.map((link, i) => (
                    <a 
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-6 bg-slate-50 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all group shadow-sm"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{link.platform}</span>
                    </a>
                  ))}
                </div>
                
                <div className="mt-12 p-8 border border-indigo-50 rounded-3xl bg-white/50 backdrop-blur-sm shadow-sm">
                  <p className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-4">Academy Address</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">
                    Inspire Academy, Near Khed Railway Station, Khed, Ratnagiri, Maharashtra 415709
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-black/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">
          © {new Date().getFullYear()} Hemant Chikhale. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function RailLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 transition-all group no-print"
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-all">
        {icon}
      </div>
      <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </a>
  );
}

function CourseCard({ course, index }: { course: Course, index: number }) {
  const { icon: Icon, color, bg } = getCourseIcon(course.name);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-indigo-50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col"
    >
      <div className={cn("aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-colors duration-500", bg)}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn("p-8 rounded-3xl bg-white/90 shadow-xl shadow-black/5 flex items-center justify-center", color)}
        >
          <Icon size={64} strokeWidth={1.5} />
        </motion.div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest font-bold shadow-sm text-slate-600">
            {course.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 mb-3">
          <Clock size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{course.duration}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {course.description}
        </p>
        
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-widest pt-4 border-t border-indigo-50">
          <CheckCircle2 size={14} />
          DITRP Certified
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: { name: string, description: string }, index: number }) {
  const { icon: Icon, color, bg } = getServiceIcon(service.name);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white p-8 rounded-[32px] border border-indigo-50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col gap-6"
    >
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500", bg, color)}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

function getServiceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('website') || n.includes('web')) {
    return { icon: Layout, color: 'text-indigo-600', bg: 'bg-indigo-50 group-hover:bg-indigo-100' };
  }
  if (n.includes('software') || n.includes('development')) {
    return { icon: Code, color: 'text-blue-600', bg: 'bg-blue-50 group-hover:bg-blue-100' };
  }
  if (n.includes('social') || n.includes('media')) {
    return { icon: Share2, color: 'text-rose-600', bg: 'bg-rose-50 group-hover:bg-rose-100' };
  }
  if (n.includes('video') || n.includes('editing')) {
    return { icon: Video, color: 'text-emerald-600', bg: 'bg-emerald-50 group-hover:bg-emerald-100' };
  }
  if (n.includes('profile') || n.includes('business profile')) {
    return { icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 group-hover:bg-amber-100' };
  }
  if (n.includes('poster') || n.includes('design')) {
    return { icon: Image, color: 'text-purple-600', bg: 'bg-purple-50 group-hover:bg-purple-100' };
  }
  return { icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50 group-hover:bg-slate-100' };
}

function getCourseIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('accounting') || n.includes('tally')) {
    return { icon: Calculator, color: 'text-blue-600', bg: 'bg-blue-50 group-hover:bg-blue-100' };
  }
  if (n.includes('power bi')) {
    return { icon: BarChart3, color: 'text-yellow-600', bg: 'bg-yellow-50 group-hover:bg-yellow-100' };
  }
  if (n.includes('power query')) {
    return { icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50 group-hover:bg-indigo-100' };
  }
  if (n.includes('excel')) {
    return { icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-50 group-hover:bg-emerald-100' };
  }
  if (n.includes('data')) {
    return { icon: Table, color: 'text-cyan-600', bg: 'bg-cyan-50 group-hover:bg-cyan-100' };
  }
  if (n.includes('design') || n.includes('graphic')) {
    return { icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50 group-hover:bg-rose-100' };
  }
  if (n.includes('market') || n.includes('trading') || n.includes('share')) {
    return { icon: LineChart, color: 'text-amber-600', bg: 'bg-amber-50 group-hover:bg-amber-100' };
  }
  if (n.includes('typing')) {
    return { icon: Keyboard, color: 'text-slate-600', bg: 'bg-slate-100 group-hover:bg-slate-200' };
  }
  if (n.includes('web')) {
    return { icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50 group-hover:bg-indigo-100' };
  }
  return { icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50 group-hover:bg-violet-100' };
}

function StatItem({ value, label, color }: { value: string, label: string, color?: string }) {
  return (
    <div className="text-center">
      <p className={cn("text-4xl font-serif italic mb-2", color || "text-slate-900")}>{value}</p>
      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{label}</p>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a>;
  }
  return content;
}

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes('linkedin')) return <Linkedin size={18} />;
  if (p.includes('twitter')) return <Twitter size={18} />;
  if (p.includes('facebook')) return <Facebook size={18} />;
  if (p.includes('instagram')) return <Instagram size={18} />;
  return <ExternalLink size={18} />;
}
