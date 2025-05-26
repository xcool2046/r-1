// Projects Loader Module
export class ProjectsLoader {
    constructor() {
        this.projects = [];
        this.container = null;
    }

    async loadProjects() {
        this.container = document.querySelector('.projects-grid');
        if (!this.container) {
            console.warn('Projects container not found');
            return;
        }

        // Load project data
        this.projects = this.getProjectData();
        
        // Render projects
        this.renderProjects();
    }

    getProjectData() {
        return [
            {
                id: 'CXO-001',
                title: 'Campus_Xenonet_Outreach',
                meta: '学生会推广项目 | 2023.03 - 2023.06',
                objective: '为校园新平台设计并实施多渠道病毒式营销策略，通过游戏化引导实现用户基数快速扩张。',
                tasks: [
                    'Deployed_Multi-Channel_Viral_Marketing_Strategy',
                    'Implemented_Gamified_Onboarding_Experience',
                    'Conducted_A/B_Testing_For_Messaging_Optimization',
                    'Achieved_5000+_User_Acquisitions_Q3_Target_Exceeded_25%'
                ],
                learnings: 'Key_Insight: 数据驱动的迭代优化在用户获取中的关键作用',
                status: 'COMPLETED',
                techStack: ['Social_Media_Analytics', 'A/B_Testing', 'User_Engagement_Metrics'],
                links: []
            },
            {
                id: 'ARC-INT-77B',
                title: 'Urban_Development_Internship_Module',
                meta: '建筑实习项目 | 2023.10 - 2024.06',
                objective: '在城市发展项目中担任初级系统分析师，负责数字化工作流程优化和BIM模型协调。',
                tasks: [
                    'Processed_Digital_Submissions_Via_Internal_Portal',
                    'Proposed_Workflow_Automation_Script_Concepts',
                    'Assisted_BIM_Model_Coordination_Reviews_Navisworks',
                    'Identified_Clash_Detection_Anomalies_&_Solutions',
                    'Cross-Referenced_Design_Specs_With_Material_Databases',
                    'Monitored_Real-Time_Site_Progress_Data_Input'
                ],
                learnings: 'Key_Insight: BIM技术在现代建筑项目管理中的核心价值',
                status: 'COMPLETED',
                techStack: ['Navisworks', 'BIM_Coordination', 'AutoCAD', 'Project_Management'],
                links: []
            },
            {
                id: 'PERS-GEN-003',
                title: 'Personal_Generative_Facade_Study',
                meta: '个人研究项目 | 2024.01 - 2024.04',
                objective: '探索参数化算法在住宅立面太阳能遮阳优化中的应用，开发概念验证脚本。',
                tasks: [
                    'Researched_Parametric_Design_Algorithms',
                    'Developed_Solar_Analysis_Scripts_Rhino_Grasshopper',
                    'Created_Proof-of-Concept_Facade_Optimization_Tool',
                    'Simulated_Energy_Reduction_Scenarios',
                    'Documented_Design_Process_&_Results'
                ],
                learnings: 'Key_Insight: 计算设计在可持续建筑中的巨大潜力',
                status: 'ONGOING',
                techStack: ['Rhino', 'Grasshopper', 'Python_Scripting', 'Solar_Analysis'],
                links: [
                    { text: 'View_Concept_GitHub', url: '#' }
                ]
            }
        ];
    }

    renderProjects() {
        if (!this.container) return;

        // Clear existing content
        this.container.innerHTML = '';

        // Add loading indicator
        this.container.innerHTML = '<div class="projects-loading">Loading project data<span class="loading-dots"></span></div>';

        // Simulate loading delay for effect
        setTimeout(() => {
            this.container.innerHTML = '';
            
            this.projects.forEach((project, index) => {
                const projectCard = this.createProjectCard(project, index);
                this.container.appendChild(projectCard);
            });

            // Trigger scroll reveal animations
            this.triggerScrollReveal();
        }, 1000);
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'log-entry-card scroll-reveal';
        card.style.animationDelay = `${index * 0.2}s`;

        card.innerHTML = `
            <div class="log-header">
                <h4 class="log-id">Log_ID: ${project.id}</h4>
                <h3 class="log-title">${project.title}</h3>
                <p class="log-meta">${project.meta}</p>
            </div>
            
            <div class="log-content">
                <p class="log-objective">${project.objective}</p>
                
                <ul class="log-tasks">
                    ${project.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
                
                <div class="log-learnings">${project.learnings}</div>
                
                ${project.techStack.length > 0 ? `
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="log-footer">
                <span class="log-status">${project.status}</span>
                ${project.links.length > 0 ? `
                    <div class="log-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="log-link" target="_blank">${link.text}</a>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        // Add hover effects
        this.addCardInteractions(card);

        return card;
    }

    addCardInteractions(card) {
        // Hover effect for the entire card
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Click effect for tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.showTechInfo(tag.textContent);
            });
        });

        // Click effect for project links
        const projectLinks = card.querySelectorAll('.log-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                    this.showComingSoon();
                }
            });
        });
    }

    showTechInfo(techName) {
        // Create a simple tooltip or modal showing tech info
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${techName}</h4>
                <p>Technology used in this project</p>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = `${rect.top - 60}px`;
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.zIndex = '10000';
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 2000);
    }

    showComingSoon() {
        // Show a coming soon notification
        const notification = document.createElement('div');
        notification.className = 'notification notification-info';
        notification.innerHTML = `
            <span class="notification-message">🚧 Project details coming soon...</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.parentNode.removeChild(notification);
                }, 300);
            }
        }, 3000);
    }

    triggerScrollReveal() {
        // Add intersection observer for scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const cards = this.container.querySelectorAll('.log-entry-card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Public methods
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }

    filterProjects(criteria) {
        return this.projects.filter(project => {
            if (criteria.status && project.status !== criteria.status) return false;
            if (criteria.techStack && !project.techStack.some(tech => 
                criteria.techStack.includes(tech))) return false;
            return true;
        });
    }

    searchProjects(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.projects.filter(project => 
            project.title.toLowerCase().includes(lowercaseQuery) ||
            project.objective.toLowerCase().includes(lowercaseQuery) ||
            project.tasks.some(task => task.toLowerCase().includes(lowercaseQuery))
        );
    }
} 