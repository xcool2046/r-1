// Skills Loader Module
export class SkillsLoader {
    constructor() {
        this.skills = [];
        this.container = null;
    }

    async loadSkills() {
        this.container = document.querySelector('.skills-content');
        if (!this.container) {
            console.warn('Skills container not found');
            return;
        }

        // Load skills data
        this.skills = this.getSkillsData();
        
        // Render skills
        this.renderSkills();
    }

    getSkillsData() {
        return {
            'Core_Software_Proficiency': [
                { name: 'AutoCAD', level: 100, description: 'Advanced_2D/3D, Custom_Scripts_Interest' },
                { name: 'PKPM_Suite', level: 90, description: 'Structural_Optimization, Code_Compliance_Checks' },
                { name: 'MIDAS_Engine', level: 80, description: 'Complex_FEA_Modeling' },
                { name: 'Rhino/Grasshopper', level: 50, description: 'Parametric_Exploration, Self-Learning' },
                { name: 'Revit (BIM)', level: 40, description: 'Basic_Modeling_&_Documentation_Exposure' },
                { name: 'WPS Office Suite', level: 80, description: 'Data_Analysis, Report_Automation' }
            ],
            'Technical_Knowledge_Base': [
                'CN_Building_Codes_&_Standards',
                'Sustainable_Design_Principles',
                'Construction_Project_Lifecycle',
                'Data_Visualization_For_Reporting'
            ],
            'Cybernetic_Augmentations_(Soft_Skills)': [
                'Algorithmic_Problem_Solving',
                'Systems_Thinking',
                'Rapid_Prototyping_&_Iteration',
                'InfoSec_Awareness_In_Design_Data',
                'Effective_Communication_&_Team_Collaboration'
            ],
            'Certifications_&_Protocols': [
                'CET-6_Language_Module',
                'Professional_Practice_License_Alpha (Building)',
                'Computer_Proficiency_Certificate_Level_2',
                'Mandarin_Fluency_Protocol_1A'
            ]
        };
    }

    renderSkills() {
        if (!this.container) return;

        this.container.innerHTML = '';

        Object.entries(this.skills).forEach(([category, items]) => {
            const categoryElement = this.createSkillCategory(category, items);
            this.container.appendChild(categoryElement);
        });
    }

    createSkillCategory(category, items) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skills-category scroll-reveal';
        
        categoryDiv.innerHTML = `
            <h3>// ${category}:</h3>
            <div class="skills-grid">
                ${this.renderCategoryItems(category, items)}
            </div>
        `;

        return categoryDiv;
    }

    renderCategoryItems(category, items) {
        if (category === 'Core_Software_Proficiency') {
            return items.map(skill => `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: ${skill.level}%"></div>
                    </div>
                    <div class="skill-description">${skill.description}</div>
                </div>
            `).join('');
        } else if (category === 'Certifications_&_Protocols') {
            return `
                <div class="certifications-list">
                    ${items.map(cert => `
                        <div class="certification-item">${cert}</div>
                    `).join('')}
                </div>
            `;
        } else {
            return `
                <div class="skill-tags">
                    ${items.map(item => `
                        <span class="skill-tag">[${item}]</span>
                    `).join('')}
                </div>
            `;
        }
    }
} 