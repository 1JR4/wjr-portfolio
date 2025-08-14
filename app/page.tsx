"use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Calendar,
  MapPin,
  Phone,
  Download,
  Code,
  Briefcase,
  User,
  FileText,
  Home,
  Sun,
  Moon,
  Coffee,
  Twitter,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [journeyType, setJourneyType] = useState('professional');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'timeline', 'blog'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero' : section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projects = [
    {
      title: "WBD Sports Platform",
      description: "Co-owned strategic vision for sports CMS, video distribution, and analytics across Bleacher Report and MAX. Built GraphQL APIs and microservices architecture.",
      technologies: ["GraphQL", "Microservices", "Kafka", "AWS", "Drupal", "Analytics"],
      github: "#",
      demo: "https://bleacherreport.com",
      image: "/project1.jpg"
    },
    {
      title: "Bitnbolt Consumer Apps",
      description: "AI-powered consumer applications built through orchestrated agentic AI workflow. Fast iterative development using CLI and MCPs for concept to operation.",
      technologies: ["AI/ML", "Claude Code", "CLI", "MCPs", "Cloud Services", "Automation"],
      github: "https://bitnbolt.com",
      demo: "https://bitnbolt.com",
      image: "/project2.jpg"
    },
    {
      title: "Matech B2B Platform",
      description: "Led offline-to-online transition of B2B matchmaking platform, reducing costs by 38% and expanding reach by 45x with 32% boost in user interaction.",
      technologies: ["B2B Platform", "MVP Development", "Analytics", "Automation", "Agile"],
      github: "#",
      demo: "#",
      image: "/project3.jpg"
    }
  ];

  const professionalTimeline = [
    {
      year: "2023-2025",
      title: "Technical Product Manager",
      company: "Warner Bros. Discovery (Sports)",
      description: "Co-owned strategic vision for WBD Sports Platform enabling sports CMS, video distribution, and analytics across Bleacher Report and MAX. Defined backend services using GraphQL and microservices architecture.",
      technologies: ["GraphQL", "Microservices", "Kafka", "AWS", "Drupal", "Analytics"]
    },
    {
      year: "2023-Present",
      title: "Product Creator",
      company: "Bitnbolt.com",
      description: "Design, build, and publish consumer apps through AI-powered tools and cloud services. Use fast, iterative planning via orchestrated agentic AI workflow and MCPs.",
      technologies: ["AI/ML", "Cloud Services", "CLI", "MCPs", "Automation"]
    },
    {
      year: "2020-2022",
      title: "Product Manager",
      company: "Matech - Seoul, South Korea",
      description: "Drove product vision from ideation to MVP launch, secured $2MM in funding. Led offline-to-online transition reducing costs by 38% and expanding reach by 45x.",
      technologies: ["MVP Development", "B2B Platform", "Agile", "Analytics", "Automation"]
    },
    {
      year: "2017-2018",
      title: "Product Manager / Co-Founder",
      company: "Mitgosa - Singapore",
      description: "Developed streamlined order-to-delivery system, reduced operational costs by 25% and delivery times by 70%. Led cross-functional team optimizing user acquisition.",
      technologies: ["E-commerce", "Logistics", "Analytics", "Process Automation", "User Experience"]
    },
    {
      year: "2015-2017",
      title: "Team Captain",
      company: "Republic of Korea Air Force",
      description: "Military service developing leadership and project management skills in high-pressure environments.",
      technologies: ["Leadership", "Project Management", "Team Coordination", "Process Optimization"]
    }
  ];

  const personalTimeline = [
    {
      year: "2024",
      title: "Digital Nomad Adventure",
      company: "Remote Life",
      description: "Embraced the digital nomad lifestyle, working from 12 different countries. Learned to balance productivity with exploring new cultures and cuisines.",
      technologies: ["Travel", "Remote Work", "Cultural Immersion", "Photography"]
    },
    {
      year: "2023",
      title: "Marathon Runner",
      company: "Personal Achievement",
      description: "Completed my first marathon after 6 months of training. Learned discipline, persistence, and the power of setting ambitious goals.",
      technologies: ["Running", "Discipline", "Goal Setting", "Health & Fitness"]
    },
    {
      year: "2022",
      title: "Cooking Enthusiast",
      company: "Kitchen Adventures",
      description: "Started my culinary journey, learning cuisines from around the world. Built a food blog documenting recipes and cooking experiments.",
      technologies: ["Cooking", "Food Photography", "Blogging", "Creativity"]
    },
    {
      year: "2021",
      title: "Meditation & Mindfulness",
      company: "Inner Growth",
      description: "Began daily meditation practice and mindfulness journey. Improved focus, reduced stress, and gained better work-life balance.",
      technologies: ["Meditation", "Mindfulness", "Mental Health", "Self-Improvement"]
    },
    {
      year: "2020",
      title: "Language Learning",
      company: "Global Communication",
      description: "Started learning Spanish and Japanese. Passionate about connecting with people from different cultures and expanding my worldview.",
      technologies: ["Spanish", "Japanese", "Cultural Exchange", "Communication"]
    }
  ];

  const currentTimeline = journeyType === 'professional' ? professionalTimeline : personalTimeline;

  const blogPosts = [
    {
      title: "AI-Powered Product Development: The Future is Now",
      excerpt: "How I'm using Claude Code, MCPs, and orchestrated AI agents to build products 10x faster. A deep dive into modern AI-powered development workflows.",
      date: "2024-12-15",
      readTime: "8 min read",
      tags: ["AI/ML", "Claude Code", "Product Management"],
      content: `
        <h2>The AI Revolution in Product Development</h2>
        <p>After 7 years in product management, I've witnessed many technological shifts, but nothing compares to the current AI revolution. Today, I'm building products faster than ever using AI-powered tools and orchestrated agent workflows.</p>
        
        <h3>My Current Tech Stack</h3>
        <ul>
          <li><strong>Claude Code CLI:</strong> My primary development companion for rapid prototyping</li>
          <li><strong>MCPs (Model Context Protocols):</strong> Enabling seamless AI-to-tool communication</li>
          <li><strong>Orchestrated Agents:</strong> Multiple specialized AI agents working in harmony</li>
        </ul>
        
        <h3>Real Results at Bitnbolt</h3>
        <p>At Bitnbolt.com, we've reduced our concept-to-production timeline by 70%. What used to take weeks now takes days. The key? Leveraging AI not just as a coding assistant, but as a full-stack development partner.</p>
        
        <h3>The Future is Agentic</h3>
        <p>The future of product development isn't just about AI assistance—it's about orchestrated agentic workflows where specialized AI agents handle different aspects of development, from architecture design to testing to deployment.</p>
      `
    },
    {
      title: "From Sports Platform to Streaming: My WBD Journey",
      excerpt: "Lessons learned building GraphQL APIs and microservices at scale for Bleacher Report and MAX sports streaming platform.",
      date: "2024-11-20",
      readTime: "6 min read",
      tags: ["GraphQL", "Microservices", "Streaming"],
      content: `
        <h2>Building at Warner Bros. Discovery Scale</h2>
        <p>Working on the WBD Sports Platform taught me invaluable lessons about building systems that serve millions of users daily. Here's what I learned co-owning the strategic vision for sports streaming infrastructure.</p>
        
        <h3>The Technical Challenge</h3>
        <p>Integrating Bleacher Report with MAX required rebuilding legacy APIs while maintaining zero downtime. We implemented:</p>
        <ul>
          <li>GraphQL federation for unified API layer</li>
          <li>Kafka event streaming for real-time updates</li>
          <li>Microservices architecture for scalability</li>
        </ul>
        
        <h3>Key Achievements</h3>
        <p>Successfully migrated legacy systems to modern architecture, enabling cross-platform content delivery and real-time sports updates across multiple streaming services.</p>
      `
    },
    {
      title: "The B2B Platform Pivot: Matech's Digital Transformation",
      excerpt: "How we transformed an offline B2B matchmaking platform to online, reducing costs by 38% and expanding reach by 45x.",
      date: "2024-10-10",
      readTime: "10 min read",
      tags: ["Product Strategy", "B2B", "Digital Transformation"],
      content: `
        <h2>The Pandemic Pivot That Changed Everything</h2>
        <p>When COVID-19 hit, Matech faced an existential crisis. Our in-person B2B matchmaking events were impossible. We had to pivot—fast.</p>
        
        <h3>The Strategic Shift</h3>
        <p>Leading the product vision from ideation to MVP launch, we transformed our entire business model in just 3 months. The results exceeded all expectations:</p>
        <ul>
          <li>38% reduction in operational costs</li>
          <li>45x expansion in reach</li>
          <li>32% boost in user-to-user interaction</li>
          <li>NPS score improved from 15 to 40</li>
        </ul>
        
        <h3>Lessons in Crisis Management</h3>
        <p>This experience taught me that constraints often drive innovation. By embracing the digital-first approach, we not only survived but thrived, securing $2MM in additional funding.</p>
      `
    }
  ];

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Projects', icon: Briefcase, href: '#projects' },
    { name: 'Timeline', icon: User, href: '#timeline' },
    { name: 'Blog', icon: FileText, href: '#blog' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className={`rounded-full ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white/80 backdrop-blur-md'}`}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Floating Navigation */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.nav 
          className={`flex items-center gap-1 p-1 rounded-full backdrop-blur-lg border shadow-lg ${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? isDark 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </motion.nav>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/kayaking-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img src="/profile.jpg" alt="Wonjae Ra" className="w-full h-full object-cover" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hey, I'm Wonjae
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Technical Product Manager with 7+ years of experience bridging technical and business needs, transforming chaos into clarity.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full"
                asChild
              >
                <a href="#projects">
                  View My Work
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20" asChild>
                <a href="#blog">
                  Read My Blog
                  <FileText className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { icon: Github, href: "https://github.com/1JR4" },
                { icon: Mail, href: "mailto:rawonjae94@gmail.com" },
                { icon: Linkedin, href: "https://linkedin.com/in/wjr" }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className={`py-16 px-4 ${isDark ? 'bg-gray-900' : ''}`}>
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Featured Projects</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              A showcase of my recent work demonstrating various technologies and problem-solving approaches.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`h-full hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <Code className="h-5 w-5 text-blue-600" />
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>My Journey</h2>
            
            {/* Journey Toggle */}
            <div className={`inline-flex items-center p-1 rounded-full mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <button
                onClick={() => setJourneyType('professional')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  journeyType === 'professional'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-900 shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Professional
              </button>
              <button
                onClick={() => setJourneyType('personal')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  journeyType === 'personal'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-900 shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Personal
              </button>
            </div>
            
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {journeyType === 'professional' 
                ? 'My career progression and key milestones in the tech industry.'
                : 'Personal growth, adventures, and life experiences that shaped who I am.'
              }
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {currentTimeline.map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row gap-6 mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="md:w-1/4 flex flex-col items-center md:items-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                    {item.year}
                  </div>
                  <div className="hidden md:block w-px h-full bg-slate-200 mt-4"></div>
                </div>
                <div className="md:w-3/4">
                  <Card className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        {item.title}
                      </CardTitle>
                      <CardDescription className="font-medium text-slate-700">
                        {item.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-16 px-4 ${isDark ? 'bg-gray-900' : ''}`}>
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Latest Articles</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Sharing insights and knowledge about web development, technology trends, and best practices.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card 
                  className={`h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}
                  onClick={() => setSelectedArticle(post)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                      <Separator orientation="vertical" className="h-4" />
                      {post.readTime}
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="link" className="p-0">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 text-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Let's Build Something Cool
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Always excited to chat about technical product management, AI/ML, and innovative solutions. Based in Atlanta, GA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full"
                asChild
              >
                <a href="mailto:rawonjae94@gmail.com">
                  <Mail className="mr-2 w-4 h-4" />
                  Get In Touch
                </a>
              </Button>

              <Button variant="outline" size="lg" className="px-8 py-3 rounded-full">
                <Coffee className="mr-2 w-4 h-4" />
                Grab Coffee
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" }
              ].map(({ icon: Icon, label }, index) => (
                <motion.a
                  key={label}
                  href="#"
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-gray-800/50 hover:bg-gray-700 text-gray-300' : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 p-6 border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {selectedArticle.date}
                    </span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedArticle.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className={`p-6 prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className={`py-8 px-4 text-center ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-slate-900 text-slate-400'}`}>
        <div className="container mx-auto">
          <p>&copy; 2024 Wonjae Ra. Built with AI, Claude Code, and lots of coffee. ☕</p>
        </div>
      </footer>
    </div>
  );
}