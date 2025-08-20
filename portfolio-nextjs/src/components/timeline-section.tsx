"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, User, GraduationCap, Rocket, Camera, Activity, Code, Zap, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: "Work" | "Personal";
  icon: string;
  status: "completed" | "in-progress" | "pending";
  energy: number;
  company?: string;
  location?: string;
  details?: string;
  images?: string[];
  facts?: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Travel the World!",
    date: "2027 (Future)",
    content: "Planning to explore the world and experience diverse cultures with family.",
    category: "Personal",
    icon: "camera",
    status: "pending",
    energy: 100,
    details: "Future adventure:\n• Family travel plans\n• Cultural exploration\n• Creating lasting memories\n• Work-life balance achievement",
    facts: ["Planning to visit 30+ countries", "Focus on sustainable travel", "Document journey through photography"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"]
  },
  {
    id: 2,
    title: "Product Creator",
    date: "Feb 2023 – Present",
    content: "Design, build, publish consumer apps through AI powered tools and cloud services to deliver high-impact solutions.",
    category: "Work",
    icon: "code",
    status: "in-progress",
    energy: 95,
    company: "Bitnbolt.com",
    location: "Atlanta, GA",
    details: "Key achievements:\n• Design and build consumer apps using AI-powered tools\n• Use fast, iterative planning via orchestrated agentic AI workflow\n• Integrated AI-driven automation and third-party solutions\n• Accelerated concept to operation processes",
    facts: ["Launched 3 AI-powered applications", "Reduced development time by 60%", "Active user base of 10K+"],
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"]
  },
  {
    id: 3,
    title: "Son Birth",
    date: "2023",
    content: "Welcomed our son to the world - the most rewarding journey begins.",
    category: "Personal",
    icon: "user",
    status: "completed",
    energy: 100,
    details: "Life milestone:\n• Became a father\n• New perspectives on life and work balance\n• Motivation for building a better future\n• Family growth",
    facts: ["Most life-changing experience", "New motivation for success", "Balance family and career"],
    images: ["https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80"]
  },
  {
    id: 4,
    title: "Technical Product Manager",
    date: "May 2023 – Feb 2025",
    content: "Co-owned strategic vision and product execution for WBD Sports Platform, enabling sports CMS, video distribution, and analytics.",
    category: "Work",
    icon: "briefcase",
    status: "completed",
    energy: 90,
    company: "Warner Bros. Discovery (Sports)",
    location: "Atlanta, GA",
    details: "Key achievements:\n• Co-owned WBD Sports Platform strategic vision across Bleacher Report and MAX\n• Defined self-hosted backend services using GraphQL, microservices, and Kafka\n• Redesigned Bleacher Report's backend and migrated legacy APIs\n• Led Drupal CMS enhancements reducing maintenance costs",
    facts: ["Managed $5M+ budget", "Led team of 12 engineers", "Reduced system latency by 40%"],
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"]
  },
  {
    id: 5,
    title: "US Permanent Residence",
    date: "2022",
    content: "Achieved US Permanent Residence status, opening new opportunities in America.",
    category: "Personal",
    icon: "zap",
    status: "completed",
    energy: 90,
    details: "Immigration milestone:\n• Secured permanent residence in the US\n• Settled in Atlanta, GA\n• New chapter in America\n• Career opportunities expanded",
    facts: ["Green card holder", "Settled in Atlanta", "New opportunities unlocked"],
    images: ["https://images.unsplash.com/photo-1422464804701-7d8356b3a42f?w=800&q=80"]
  },
  {
    id: 6,
    title: "Product Manager",
    date: "Jan 2020 – May 2022",
    content: "Drove product vision from ideation to MVP launch, secured $2MM in investor funding, and built a high-performing team of 7.",
    category: "Work",
    icon: "rocket",
    status: "completed",
    energy: 85,
    company: "Matech",
    location: "Seoul, South Korea",
    details: "Key achievements:\n• Secured $2MM in investor funding\n• Led offline-to-online transition reducing costs by 38%\n• Expanded reach by 45x and boosted interaction by 32%\n• Improved NPS from 15 to 40 through automation",
    facts: ["$2MM funding secured", "45x growth achieved", "NPS improved by 167%"],
    images: ["https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80"]
  },
  {
    id: 7,
    title: "Marriage",
    date: "2020",
    content: "Married the love of my life, beginning our journey together.",
    category: "Personal",
    icon: "user",
    status: "completed",
    energy: 95,
    details: "Life partnership:\n• Wedding during pandemic\n• Building life together\n• Shared dreams and goals\n• Foundation for family",
    facts: ["Pandemic wedding", "Life partnership began", "Foundation for future"],
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"]
  },
  {
    id: 8,
    title: "Product Manager / Co-Founder",
    date: "Jul 2017 – Jan 2018",
    content: "Developed streamlined order-to-delivery system, reduced operational costs by 25% and cut delivery times by 70%.",
    category: "Work",
    icon: "zap",
    status: "completed",
    energy: 80,
    company: "Mitgosa",
    location: "Singapore",
    details: "Key achievements:\n• Built order-to-delivery automation reducing costs by 25%\n• Cut delivery times by 70% through process optimization\n• Increased conversions by 32% and reduced acquisition costs by 63%\n• Launched and operated two e-commerce platforms",
    facts: ["70% faster delivery", "25% cost reduction", "2 platforms launched"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"]
  },
  {
    id: 9,
    title: "Military Service - SWAT & Sniper",
    date: "Jun 2015 – Feb 2017",
    content: "Served as Team Captain in the Republic of Korea Air Force, Military SWAT Team and Sniper unit.",
    category: "Personal",
    icon: "activity",
    status: "completed",
    energy: 85,
    company: "Republic of Korea Air Force",
    location: "Gwangju, South Korea",
    details: "Military service:\n• Military SWAT Team member\n• Served as Sniper\n• Led and managed military teams\n• Developed leadership and operational skills",
    facts: ["SWAT Team member", "Sniper qualified", "Team Captain role"],
    images: ["https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80"]
  },
  {
    id: 10,
    title: "Bachelor of Engineering",
    date: "2014 - 2019",
    content: "Electronic Engineering degree focused on technical foundations for product management career.",
    category: "Personal",
    icon: "graduation-cap",
    status: "completed",
    energy: 80,
    company: "Northumbria University",
    location: "UK/Singapore",
    details: "Education highlights:\n• Electronic Engineering specialization\n• Technical foundation for PM career\n• International exposure between UK and Singapore\n• Strong analytical and problem-solving skills",
    facts: ["Dual campus experience", "Engineering degree", "International education"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"]
  },
  {
    id: 11,
    title: "Marketing Project Manager",
    date: "Feb 2014 – Apr 2015",
    content: "Early career experience in marketing and project management, building foundational skills.",
    category: "Work",
    icon: "briefcase",
    status: "completed",
    energy: 75,
    company: "Commas PR",
    location: "Kuala Lumpur, Malaysia",
    details: "Early career:\n• Marketing project management experience\n• Cross-cultural business exposure\n• Foundation for product management transition\n• Client relationship management",
    facts: ["First professional role", "International experience", "Client management"],
    images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"]
  },
  {
    id: 12,
    title: "Should Have Bought Bitcoin",
    date: "2011",
    content: "Missed the opportunity to buy Bitcoin when it was just getting started. A valuable lesson in recognizing innovation early.",
    category: "Personal",
    icon: "zap",
    status: "completed",
    energy: 70,
    details: "Life lesson:\n• Bitcoin was ~$1\n• Learned about cryptocurrency early\n• Valuable lesson in timing\n• Now actively involved in Web3",
    facts: ["Bitcoin was $1", "Valuable lesson learned", "Now in Web3"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"]
  },
  {
    id: 13,
    title: "Lived Abroad",
    date: "2006 - 2015",
    content: "Spent formative years living internationally - Philippines, Red Hook NY, Singapore, and UK.",
    category: "Personal",
    icon: "camera",
    status: "completed",
    energy: 85,
    details: "International experience:\n• Middle school in Philippines\n• High school in Red Hook, NY\n• University in Singapore/UK\n• Cultural diversity exposure\n• Global perspective development",
    facts: ["4 countries lived in", "9 years abroad", "Global perspective gained"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"]
  },
  {
    id: 14,
    title: "Born in Seoul",
    date: "1994",
    content: "Started my journey in Seoul, South Korea.",
    category: "Personal",
    icon: "user",
    status: "completed",
    energy: 100,
    details: "The beginning:\n• Born in Seoul, Korea\n• Korean heritage\n• Foundation of identity\n• Start of the adventure",
    facts: ["Seoul native", "Korean heritage", "Journey begins"],
    images: ["https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80"]
  }
];

const iconMap = {
  briefcase: Briefcase,
  rocket: Rocket,
  "graduation-cap": GraduationCap,
  camera: Camera,
  activity: Activity,
  code: Code,
  user: User,
  zap: Zap
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Work":
      return "bg-blue-500/20 border-blue-400/30 text-blue-400";
    case "Personal":
      return "bg-green-500/20 border-green-400/30 text-green-400";
    default:
      return "bg-gray-500/20 border-gray-400/30 text-gray-400";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-400";
    case "in-progress":
      return "bg-yellow-500/20 text-yellow-400";
    case "pending":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

interface TimelineSectionProps {
  className?: string;
}

export function TimelineSection({ className }: TimelineSectionProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState<"Work" | "Personal">("Work");

  const filteredData = timelineData.filter(item => item.category === filter);

  return (
    <div className={cn("relative", className)}>
      {/* Filter Buttons - Only Work and Personal */}
      <div className="flex justify-center gap-4 mb-12">
        {["Work", "Personal"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category as "Work" | "Personal")}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
              filter === category
                ? "bg-white/20 dark:bg-white/20 text-gray-900 dark:text-white border border-gray-400 dark:border-white/30 shadow-sm"
                : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Timeline - Left-aligned */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line on the left */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 dark:from-white/20 via-gray-400 dark:via-white/40 to-gray-300 dark:to-white/20" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {filteredData.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Briefcase;
            const isExpanded = expandedItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 transform -translate-x-1/2">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-12 h-12 bg-black/5 dark:bg-white/10 backdrop-blur-xl border-2 border-gray-300 dark:border-white/30 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-700 dark:text-white" />
                    </div>
                    {item.status === "in-progress" && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400/20" />
                    )}
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="ml-20">
                  <motion.div
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    className="cursor-pointer"
                    layout
                  >
                    <div className={cn(
                      "bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20",
                      isExpanded ? "p-8" : "p-6"
                    )}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {/* Category & Status */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border",
                              getCategoryColor(item.category)
                            )}>
                              {item.category}
                            </span>
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              getStatusColor(item.status)
                            )}>
                              {item.status === "in-progress" ? "Ongoing" : item.status === "pending" ? "Future" : "Completed"}
                            </span>
                          </div>

                          {/* Title & Date */}
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-white/60 mb-2">{item.date}</p>
                          
                          {/* Company/Location */}
                          {(item.company || item.location) && (
                            <p className="text-xs text-gray-500 dark:text-white/50 mb-3 flex items-center gap-1">
                              {item.company && <span>{item.company}</span>}
                              {item.company && item.location && <span>•</span>}
                              {item.location && (
                                <>
                                  <MapPin className="w-3 h-3" />
                                  <span>{item.location}</span>
                                </>
                              )}
                            </p>
                          )}

                          {/* Content */}
                          <p className="text-gray-700 dark:text-white/80 text-sm">
                            {item.content}
                          </p>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-white/50" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-white/50" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 space-y-6"
                          >
                            {/* Images */}
                            {item.images && item.images.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.images.map((image, idx) => (
                                  <img
                                    key={idx}
                                    src={image}
                                    alt={`${item.title} ${idx + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            )}

                            {/* Details */}
                            {item.details && (
                              <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-white/80 font-sans">
                                  {item.details}
                                </pre>
                              </div>
                            )}

                            {/* Facts */}
                            {item.facts && item.facts.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {item.facts.map((fact, idx) => (
                                  <div key={idx} className="bg-gray-100 dark:bg-white/10 rounded-lg p-3 text-center">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{fact}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Energy Bar */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600 dark:text-white/60">Energy Level</span>
                                <span className="text-gray-700 dark:text-white/80">{item.energy}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.energy}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}