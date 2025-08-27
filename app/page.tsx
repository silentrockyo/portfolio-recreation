"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Phone } from "lucide-react"
import * as THREE from "three"
import { motion } from "framer-motion"


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const particlesRef = useRef(null)

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 2000
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: "#00d4ff",
      transparent: true,
      opacity: 0.8,
    })

    const particleMesh = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleMesh)
    particlesRef.current = particleMesh

    // Create floating cubes
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: "#915eff",
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    })

    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.x = (Math.random() - 0.5) * 20
      cube.position.y = (Math.random() - 0.5) * 20
      cube.position.z = (Math.random() - 0.5) * 20
      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI
      scene.add(cube)
    }

    camera.position.z = 5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005
        particlesRef.current.rotation.y += 0.0005
      }

      // Rotate cubes
      scene.children.forEach((child) => {
        if (child.geometry && child.geometry.type === "BoxGeometry") {
          child.rotation.x += 0.005
          child.rotation.y += 0.005
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  // Handle scroll for active section and parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Update camera position for parallax effect
      if (cameraRef.current) {
        cameraRef.current.position.y = scrollY * -0.0005
      }

      const sections = ["home", "about", "tech", "works", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "tech", label: "Tech" },
    { id: "works", label: "Works" },
    { id: "contact", label: "Contact" },
  ]

  const technologies = [
  { name: "HTML 5", image: "/tech/html.png" },
  { name: "CSS 3", image: "/tech/css.png" },
  { name: "JavaScript", image: "/tech/javascript.png" },
  { name: "React JS", image: "/tech/React.png" },
  { name: "Node JS", image: "/tech/Node.png" },
  { name: "MongoDB", image: "/tech/Mongodb.png" },
  { name: "Express", image: "/tech/Express.png" },
  { name: "MySQL", image: "/tech/MYSQL.png" },
  { name: "PostgreSQL", image: "/tech/PostgreSQL.png" },
  { name: "Tailwind CSS", image: "/tech/tailwind.png" },
  { name: "Bootstrap",image: "/tech/Bootstrap.png" },
  { name: "Python", image: "/tech/python.png" },
  { name: "C++", image: "/tech/c++.png" },
  { name: "PHP", image: "/tech/PHP.png" },
  { name: "Git", image: "/tech/Git.png" },
  { name: "VS Code", image: "/tech/vscode.png" },
  { name: "XAMPP", image: "/tech/xammp.png" },
  ]

  const projects = [
    {
      name: "Doorstep Delight Home Service",
      description:
        "Developed a responsive home service platform with service listings, booking forms, dashboards, and real-time updates. Full-stack implementation with React.js, TypeScript, Tailwind CSS front-end and Node.js/Express with database integration back-end.",
      tags: [
        { name: "react", color: "text-blue-500" },
        { name: "typescript", color: "text-blue-400" },
        { name: "nodejs", color: "text-green-500" },
        { name: "tailwind", color: "text-cyan-500" },
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      source_code_link: "https://github.com/ayushrathore",
    },
    {
      name: "Hostel Management System",
      description:
        "Automated hostel operations including student registration, room allocation, and fee management. Implemented role-based access for admin, warden, and students with responsive UI using JavaScript and CSS.",
      tags: [
        { name: "php", color: "text-purple-500" },
        { name: "mysql", color: "text-blue-500" },
        { name: "javascript", color: "text-yellow-500" },
        { name: "css", color: "text-blue-400" },
      ],
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop",
      source_code_link: "https://github.com/ayushrathore",
    },
    {
      name: "Speech Speed Analyzer",
      description:
        "Analyzes speech speed from recorded or uploaded audio with automated calculation of speech rate (words per minute / syllables per second). Built with Python Flask backend and audio analysis using Librosa and NumPy.",
      tags: [
        { name: "python", color: "text-green-500" },
        { name: "flask", color: "text-red-500" },
        { name: "librosa", color: "text-purple-500" },
        { name: "numpy", color: "text-blue-500" },
      ],
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&h=300&fit=crop",
      source_code_link: "https://github.com/ayushrathore",
    },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div
              className="absolute inset-2 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
          <p className="text-white text-xl font-semibold">Loading Amazing Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      {/* Three.js Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("home")}>
              <span className="text-white">Ayush</span>
              <span className="text-purple-500"> | </span>
              <span className="text-gray-400 text-lg">Full Stack Developer</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-medium transition-all duration-300 hover:text-purple-400 relative ${
                    activeSection === item.id ? "text-purple-400" : "text-gray-300"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-lg border-t border-gray-700">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-gray-400">Hi, my name is</p>
              <motion.h1
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
>
  {Array.from("Ayush Rathore").map((letter, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      className="inline-block"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  ))}
</motion.h1>

             <motion.h2
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 1 }}
  className="text-2xl md:text-4xl font-semibold text-gray-300"
>
  I develop full-stack web applications and database-driven solutions.
</motion.h2>

            </div>

            <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
              Dedicated MCA student with practical experience in full-stack web development using React, Node.js, and
              databases. Strong problem-solving abilities with a passion for writing clean, efficient code and exploring
              modern development frameworks.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <button
    onClick={() => scrollToSection("works")}
    className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
  >
    See My Work
    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
  </button>

  {/* Resume Download */}
  <a
    href="/NEww_resme.pdf" 
    download="Ayush_Rathore_Resume.pdf"
    className="px-8 py-4 border border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300"
  >
    Download Resume
  </a>
</div>


            <div className="flex justify-center space-x-6 pt-8">
              {[
                { Icon: Github, href: "https://github.com/silentrockyo", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/rathore-frontend", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:ayushrathoredabra@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center hover:bg-purple-500 hover:border-purple-400 transform hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-lg font-semibold mb-2">INTRODUCTION</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Overview.</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                I'm a dedicated MCA student with practical experience in full-stack web development using React,
                Node.js, and various databases. I have successfully completed multiple projects including web
                applications and database-driven solutions. I'm a quick learner with strong problem-solving abilities
                and a passion for writing clean, efficient code. Always eager to learn new technologies and contribute
                to meaningful projects that solve real-world problems.
              </p>

              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-purple-400 font-semibold">Master of Computer Applications</p>
                    <p className="text-gray-300">Madhav Institute of Technology and Science (2024-2026)</p>
                    <p className="text-gray-400 text-sm">CGPA: 6.98 | Gwalior, MP</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold">Bachelor of Computer Applications</p>
                    <p className="text-gray-300">Jiwaji University (2021-2024)</p>
                    <p className="text-gray-400 text-sm">CGPA: 7.26 | Gwalior, MP</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { title: "Full Stack Developer", icon: "🌐" },
                  { title: "Database Developer", icon: "🗄️" },
                  { title: "Problem Solver", icon: "⚙️" },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center border-2 border-purple-500">
                 <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center border-2 border-purple-500 overflow-hidden">
  <img 
    src="/profilepic.png" 
    alt="Ayush Rathore" 
    className="w-full h-full object-cover"
  />
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-lg font-semibold mb-2">TECHNOLOGIES</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Tech Stack.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
            <div
  key={index}
  className="group flex flex-col items-center bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:bg-purple-900/20"
>
  <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border border-purple-500 group-hover:scale-110 transition-transform duration-300 shadow-lg">
    <img 
      src={tech.image} 
      alt={tech.name} 
      className="w-12 h-12 object-contain"
    />
  </div>
  <p className="text-gray-300 text-sm font-medium text-center mt-3">{tech.name}</p>
</div>

            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-lg font-semibold mb-2">MY WORK</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Projects.</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Following projects showcases my skills and experience through real-world examples of my work. Each project
              is briefly described with links to code repositories and live demos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <a
                      href={project.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/80 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`text-xs px-3 py-1 bg-gray-700 rounded-full ${tag.color} font-medium`}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-lg font-semibold mb-2">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Me.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Feel free to reach out to me through any of these platforms. I'm always open to discussing new
              opportunities and interesting projects.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rathore-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:bg-blue-900/20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30 mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Linkedin size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-gray-400 text-sm">Connect with me professionally</p>
                  <p className="text-blue-400 font-medium mt-2">www.linkedin.com/in/rathore-frontend</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/silentrockyo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:bg-gray-700/20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center text-gray-400 border border-gray-500/30 mx-auto mb-4 group-hover:bg-gray-600 group-hover:text-white transition-all duration-300">
                    <Github size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-400 transition-colors">
                    GitHub
                  </h3>
                  <p className="text-gray-400 text-sm">Check out my code</p>
                  <p className="text-gray-400 font-medium mt-2">github.com/silentrockyo</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919340753738"
                className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:bg-green-900/20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 border border-green-500/30 mx-auto mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <Phone size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    Phone
                  </h3>
                  <p className="text-gray-400 text-sm">Call me directly</p>
                  <p className="text-green-400 font-medium mt-2">+91-9340753738</p>
                </div>
              </a>
            </div>

            {/* Email Section */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 border border-purple-500/30">
                    <Mail size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
                <p className="text-gray-400 mb-4">For detailed discussions and project inquiries</p>
                <a
                  href="mailto:ayushrathoredabra@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Mail size={20} />
                  ayushrathoredabra@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 bg-gray-800/30 border-t border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">&copy; 2025 Ayush Rathore. All rights reserved.</p>
              <p className="text-sm text-gray-500">Built with React, Three.js & Tailwind CSS</p>
            </div>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: "https://github.com/ayushrathore", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com/in/ayushrathore", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:ayushrathoredabra@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio
