import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Download } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('skills');

  // Sample data - replace with your own
  const profile = {
    name: "Brian Kimani",
    title: "Software Developer",
    tagline: "Building elegant solutions to complex problems",
    email: "kimanibrian030gmail.com",
    github: "https://github.com/kimani-brian",
    linkedin: "https://linkedin.com/in/brian-kimani-344934373",
    about: "Passionate software developer with expertise in building scalable web applications. I focus on writing clean, maintainable code and creating intuitive user experiences. With a strong foundation in modern development practices, I'm committed to continuous learning and delivering high-quality solutions."
  };

  const skills = {
    "Languages": ["Go", "Python", "HTML/CSS", "Django","TailWind"],
    "Databases": ["PostgreSQL", "SQL"],
    "DevOps & Tools": ["Docker", "Git", "GitHub", "Linux", "Postman"]
  };

  const education = {
    university: "Kenyatta University",
    location: "Nairobi, Kenya",
    degree: "BSC in Mathematics and Computer Science",
    graduation: "Expected Graduation: 2026",
    coursework: ["Object Oriented Programming", "Data Structures and Algorithms", "Database Systems", "Computer Networks", "Web Development", "Artificial Intelligence"]
  };

  const projects = [
    {
      title: "Crave & Glaze | Bakery Platform ",
      description: "Full-stack bakery e-commerce platform featuring dynamic product variants, M-Pesa payment integration, admin management, Dockerized deployment, and asynchronous email notifications.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://crave-and-glaze-final.onrender.com",
      codeUrl: "https://github.com/kimani-brian/shikagari",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop"
    },
    {
      title: "InstaMart - E-Commerce Platform",
      description: "Full-stack e-commerce platform with M-Pesa payment integration, session-based cart management, secure authentication, and Dockerized deployment.",
      tech: ["Go", "Postgres", "Tailwind", "Javascript"],
      liveUrl: "https://instamart-3vmc.onrender.com",
      codeUrl: "https://github.com/kimani-brian/myshop-continua",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop"
    },
    
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118]" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a0f2e]/90 backdrop-blur-sm border-b border-purple-900/30 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0a0118] border-2 border-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-purple-500 font-bold text-lg">BK</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('skills')} 
                    className={`text-sm transition-colors ${activeSection === 'skills' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              Skills
            </button>
            <button onClick={() => scrollToSection('education')} 
                    className={`text-sm transition-colors ${activeSection === 'education' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              Education
            </button>
            <button onClick={() => scrollToSection('projects')} 
                    className={`text-sm transition-colors ${activeSection === 'projects' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} 
                    className={`text-sm transition-colors ${activeSection === 'contact' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              Contact
            </button>
            
            <div className="flex items-center gap-3 ml-4 border-l border-purple-900/30 pl-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with About */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-2xl text-purple-300 mb-6 font-medium">
              {profile.title}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {profile.about}
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => scrollToSection('projects')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all font-medium shadow-lg shadow-purple-500/50">
                View My Work
              </button>
              <button className="px-6 py-3 border border-purple-500/30 text-white rounded-lg hover:bg-purple-900/30 transition-colors font-medium flex items-center gap-2">
                <Download size={18} />
                Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-[#13082b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Skills & Technologies</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-[#1a0f2e] p-6 rounded-lg border border-purple-900/30 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {items.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-purple-900/30 text-purple-200 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Education & Certifications</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1a0f2e] p-8 rounded-lg border border-purple-900/30">
              <h3 className="text-2xl font-semibold text-white mb-2">{education.university}</h3>
              <p className="text-purple-300 mb-1">{education.location}</p>
              <p className="text-lg text-white mb-1">{education.degree}</p>
              <p className="text-gray-400 mb-4">{education.graduation}</p>
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-900/30 text-purple-200 rounded text-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-[#13082b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-[#1a0f2e] border border-purple-900/30 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="aspect-video bg-gray-900 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                       className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-500 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                       className="flex-1 px-4 py-2 border border-purple-500/30 text-white text-sm rounded hover:bg-purple-900/30 transition-colors flex items-center justify-center gap-2">
                      <Code2 size={14} />
                      Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex gap-8 items-center justify-center">
              <a href={`mailto:${profile.email}`} 
                 className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                <Mail size={20} />
                <span className="text-lg">Email</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
                <span className="text-lg">LinkedIn</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                <Github size={20} />
                <span className="text-lg">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-900/30 bg-[#13082b]">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          © 2026 {profile.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}