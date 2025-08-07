


import React, { useState, MouseEvent, ReactNode, useEffect } from 'react';
import type { Project, TeamMember, Stat } from './types';
import { PROJECTS, TEAM_MEMBERS, STATS, TRAINING_COURSES } from './constants';

type Page = 'home' | 'projects' | 'research' | 'training' | 'team' | 'contact';

// Reusable Components with new Light/Blue Palette and Apple-like aesthetic

const PageWrapper: React.FC<{title: string, subtitle: string, children: ReactNode}> = ({ title, subtitle, children }) => (
    <div className="container mx-auto px-6 py-16 md:py-24 animate-fade-in-up">
        <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-apple-black leading-tight">
                {title}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                {subtitle}
            </p>
        </div>
        {children}
    </div>
);

const GlassButton: React.FC<{onClick?: (e: MouseEvent<HTMLButtonElement>) => void, children: ReactNode, className?: string, type?: "button" | "submit" | "reset"}> = ({ onClick, children, className = '', type = 'button' }) => (
    <button
      type={type}
      onClick={onClick}
      className={`glass-button bg-light-blue-500 hover:bg-light-blue-700 border-transparent text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </button>
);


const Header: React.FC<{ currentPage: Page, setCurrentPage: (page: Page) => void }> = ({ currentPage, setCurrentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navLinks = [
      { name: 'Inicio', page: 'home' as Page },
      { name: 'Proyectos', page: 'projects' as Page },
      { name: 'Investigación', page: 'research' as Page },
      { name: 'Capacitación', page: 'training' as Page },
      { name: 'Nosotros', page: 'team' as Page },
    ];
    
    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close menu on navigation
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="sticky top-0 left-0 right-0 z-50 glass-card mx-2 md:mx-4 lg:mx-6 mt-2">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-2xl font-bold text-apple-black tracking-wider">
                        INCEITA
                    </a>
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href="#"
                                onClick={(e) => handleNavClick(e, link.page)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${currentPage === link.page ? 'bg-light-blue-500/10 text-light-blue-700 font-semibold' : 'text-gray-500 hover:bg-gray-400/10 hover:text-apple-black'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                     <div className="hidden md:block">
                         <GlassButton onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}>
                            Contacto
                        </GlassButton>
                     </div>
                     <div className="md:hidden">
                        <button 
                          onClick={() => setIsMobileMenuOpen(true)}
                          className="p-2 rounded-md text-gray-600 hover:text-apple-black hover:bg-gray-400/10"
                          aria-label="Abrir menú"
                        >
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                     </div>
                </nav>
            </header>
            
            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
              <div className={`absolute top-0 right-0 bottom-0 flex flex-col w-full max-w-xs p-2 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="glass-card flex-grow flex flex-col p-6 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-apple-black">Menú</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 rounded-md" aria-label="Cerrar menú">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <nav className="flex-grow flex flex-col">
                        <ul className="flex-grow space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleNavClick(e, link.page)}
                                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${currentPage === link.page ? 'bg-light-blue-500/20 text-light-blue-700' : 'text-apple-black hover:bg-gray-400/10'}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                         <div className="border-t border-gray-200/60 pt-6 mt-6">
                            <GlassButton
                                className="w-full text-center"
                                onClick={(e) => {
                                    handleNavClick(e as unknown as MouseEvent<HTMLAnchorElement>, 'contact');
                                }}
                             >
                                Contacto
                            </GlassButton>
                        </div>
                    </nav>
                </div>
              </div>
            </div>
        </>
    );
};

const Footer: React.FC = () => (
    <footer className="glass-card m-2 md:m-4 lg:m-6 mt-auto">
        <div className="container mx-auto px-6 py-6 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} INCEITA. Todos los derechos reservados.</p>
            <p className="text-sm text-gray-500/80 mt-1">Innovación Científica Aplicada</p>
        </div>
    </footer>
);

const StatCard: React.FC<{ stat: Stat, delay: number }> = ({ stat, delay }) => (
  <div style={{ animationDelay: `${delay}ms` }} className="glass-card p-6 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-neon-blue opacity-0 animate-fade-in-up">
    <p className="text-5xl font-bold text-light-blue-500">{stat.value}</p>
    <h3 className="text-xl font-semibold text-apple-black mt-3">{stat.label}</h3>
    <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
  </div>
);

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
  <div onClick={onClick} className="glass-card cursor-pointer overflow-hidden group flex flex-col h-full transition-all duration-500 hover:shadow-neon-blue hover:-translate-y-2 hover:rotate-[-1deg]">
    <div className="relative overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
             <div className="bg-white/50 p-2 rounded-full backdrop-blur-sm border border-black/5">{project.icon}</div>
        </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-apple-black">{project.title}</h3>
        <p className="text-gray-600 mt-2 mb-4 flex-grow">{project.summary}</p>
        <span className="text-light-blue-500 font-semibold self-start group-hover:underline">Ver más &rarr;</span>
    </div>
  </div>
);

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto m-auto animate-scale-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
            <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-t-lg"/>
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-black mb-4">{project.title}</h2>
          <p className="text-lg text-gray-600 mb-8">{project.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-xl font-semibold text-apple-black mb-3">Tecnologías Clave</h4>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => <span key={tech} className="bg-light-blue-500/20 text-light-blue-700 text-sm font-medium px-3 py-1 rounded-full">{tech}</span>)}
                </div>
            </div>
            <div>
                <h4 className="text-xl font-semibold text-apple-black mb-3">Sectores Beneficiados</h4>
                <div className="flex flex-wrap gap-2">
                    {project.sectors.map(sector => <span key={sector} className="bg-gray-500/20 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{sector}</span>)}
                </div>
            </div>
          </div>

          {project.demoUrl && (
            <div className="mt-10 text-center">
              <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button inline-block bg-light-blue-500 hover:bg-light-blue-700 border-transparent text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
              >
                  Ver Demo
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember, delay: number }> = ({ member, delay }) => (
  <div style={{ animationDelay: `${delay}ms` }} className="glass-card text-center transition-all duration-300 hover:scale-105 hover:shadow-neon-blue pt-16 p-6 flex flex-col h-full relative animate-fade-in-up opacity-0">
    <img src={member.imageUrl} alt={member.name} className="w-28 h-28 rounded-full mx-auto absolute -top-14 left-1/2 -translate-x-1/2 border-4 border-white/80 shadow-xl object-cover" />
    <div className="flex-grow flex flex-col justify-center">
        <h3 className="text-xl font-bold text-apple-black mt-4">{member.name}</h3>
        <p className="text-light-blue-500 font-semibold text-sm mt-1">{member.title}</p>
        <p className="text-gray-600 text-sm mt-4 flex-grow">{member.description}</p>
    </div>
  </div>
);


// Page Components

const HomePage: React.FC<{setCurrentPage: (page: Page) => void}> = ({setCurrentPage}) => (
    <>
      <section className="container mx-auto px-6 py-24 text-center flex flex-col items-center justify-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-apple-black leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                  Ciencia y Tecnología
              </span>
              <br/>
              Para un Futuro Sostenible
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Transformamos industrias a través de soluciones a medida en IA, IoT y analítica avanzada. Potenciamos la eficiencia, reducimos costos y abrimos nuevas oportunidades de crecimiento para su negocio.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <GlassButton onClick={() => setCurrentPage('projects')}>
                  Explorar Proyectos
              </GlassButton>
              <button onClick={() => setCurrentPage('contact')} className="glass-button bg-gray-900/5 hover:bg-gray-900/10 border border-gray-900/10 text-apple-black font-semibold px-8 py-3 rounded-lg shadow-lg">
                  Agendar Consulta
              </button>
          </div>
      </section>

      <section className="container mx-auto px-6 py-12">
          <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-apple-black">El Potencial por Desbloquear</h2>
              <p className="mt-2 max-w-2xl mx-auto text-gray-600">Los datos muestran una clara oportunidad para la innovación. Aquí es donde INCEITA marca la diferencia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, index) => <StatCard key={stat.label} stat={stat} delay={index * 100} />)}
          </div>
      </section>
    </>
);

const ProjectsPage: React.FC<{handleProjectClick: (project: Project) => void}> = ({handleProjectClick}) => (
    <PageWrapper
        title="Nuestros Proyectos"
        subtitle="Explora cómo nuestra tecnología está resolviendo problemas complejos y generando un impacto real en la industria y el agro."
    >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PROJECTS.map((project, index) => (
                <div key={project.id} className="animate-fade-in-up opacity-0" style={{animationDelay: `${index * 100}ms`}}>
                    <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
                </div>
            ))}
        </div>
    </PageWrapper>
);

const ResearchPage: React.FC = () => (
    <PageWrapper
        title="Investigación y Desarrollo"
        subtitle="Nuestro núcleo es la investigación científica rigurosa. Aplicamos metodologías avanzadas para estar a la vanguardia de la innovación tecnológica."
    >
        <div className="glass-card p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in-up">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl transform -rotate-3 opacity-30 blur-lg"></div>
                <img src="https://d2cbg94ubxgsnp.cloudfront.net/Pictures/web/f/z/j/molecule_gif_579845.gif" alt="Investigación y Desarrollo" className="relative rounded-2xl shadow-xl w-full"/>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: `150ms`}}>
                <h3 className="text-3xl font-bold text-apple-black">Nuestras Líneas de Investigación</h3>
                <ul className="mt-6 space-y-4 text-gray-700">
                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-light-blue-500 shrink-0"></div><span>Análisis termodinámico y de disolución para la industria de alimentos y farmacéutica.</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-light-blue-500 shrink-0"></div><span>Ciencia de datos aplicada a la optimización de procesos agrícolas y sostenibles.</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-light-blue-500 shrink-0"></div><span>Desarrollo de sensores IoT para monitoreo de alta precisión.</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-light-blue-500 shrink-0"></div><span>Modelado con Inteligencia Artificial para la predicción y prevención en entornos complejos.</span></li>

                </ul>
            </div>
        </div>
    </PageWrapper>
);

const TrainingPage: React.FC = () => (
  <PageWrapper
    title="Capacitación y Formación"
    subtitle="Empoderamos a su equipo con el conocimiento y las habilidades necesarias para liderar la transformación digital en su sector."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {TRAINING_COURSES.map((course, index) => (
        <div key={course.title} className="glass-card p-8 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-neon-blue animate-fade-in-up opacity-0" style={{animationDelay: `${index * 100}ms`}}>
          {course.icon}
          <h3 className="text-xl font-bold text-apple-black mt-4">{course.title}</h3>
          <p className="text-gray-600 text-sm mt-2 flex-grow">{course.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {course.tags.map(tag => (
              <span key={tag} className="bg-light-blue-500/20 text-light-blue-700 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </PageWrapper>
);

const TeamPage: React.FC = () => (
    <PageWrapper
        title="Nuestro Equipo de Expertos"
        subtitle="Conozca a las mentes detrás de INCEITA, un equipo multidisciplinario con una pasión por la ciencia y la innovación."
    >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-20 gap-x-8 mt-16">
           {TEAM_MEMBERS.map((member, index) => <TeamMemberCard key={member.name} member={member} delay={index * 100} />)}
        </div>
    </PageWrapper>
);

const ContactPage: React.FC = () => (
    <PageWrapper
        title="Hablemos de su Próximo Proyecto"
        subtitle="Estamos listos para transformar sus ideas en soluciones tecnológicas de alto impacto. Contáctenos para agendar una reunión."
    >
        <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                <h3 className="text-2xl font-bold text-apple-black">Información de Contacto</h3>
                <div className="mt-6 space-y-4 text-gray-700">
                    <p className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span>contacto@inceita.com</span></p>
                    <p className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg><span>Bogotá, Colombia</span></p>
                </div>
                <div className="mt-8">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://inceita.netlify.app/&bgcolor=247-248-250" alt="QR Code" className="rounded-lg shadow-md p-2 bg-white"/>
                    <p className="text-sm text-gray-500 mt-2">Escanee para agendar una reunión.</p>
                </div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '150ms'}}>
               <form>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nombre completo</label>
                            <input type="text" id="name" placeholder="Su nombre" className="glass-input mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-light-blue-500/50 text-apple-black" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
                            <input type="email" id="email" placeholder="su@email.com" className="glass-input mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-light-blue-500/50 text-apple-black" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Mensaje</label>
                            <textarea id="message" rows={4} placeholder="¿En qué podemos ayudarle?" className="glass-input mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-light-blue-500/50 text-apple-black"></textarea>
                        </div>
                        <GlassButton type="submit" className="w-full">
                            Enviar Mensaje
                        </GlassButton>
                    </div>
               </form>
            </div>
        </div>
    </PageWrapper>
);

// Main App Component

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'projects':
                return <ProjectsPage handleProjectClick={handleProjectClick} />;
            case 'research':
                return <ResearchPage />;
            case 'training':
                return <TrainingPage />;
            case 'team':
                return <TeamPage />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        </div>
    );
};

export default App;