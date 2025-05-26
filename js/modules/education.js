// Education Loader Module
export class EducationLoader {
    constructor() {
        this.education = null;
        this.container = null;
    }

    async loadEducation() {
        this.container = document.querySelector('.education-content');
        if (!this.container) {
            console.warn('Education container not found');
            return;
        }

        // Load education data
        this.education = this.getEducationData();
        
        // Render education
        this.renderEducation();
    }

    getEducationData() {
        return {
            institution: 'Beijing_XXX_University_Of_Architecture',
            program: 'B.Eng_Engineering_Management',
            period: '20XX.09_-_20XX.06',
            coreLibraries: [
                'Engineering_Economics',
                'Urban_Planning',
                'Building_Materials',
                'Construction_Law',
                'Structural_Mechanics',
                '土木工程概论',
                '工程项目管理',
                '国际工程承包',
                'Smart_City_Concepts',
                'Digital_Fabrication_Intro'
            ],
            performanceBadges: [
                {
                    title: 'Valedictorian_Candidate_Stream',
                    description: '连续2年校综合奖学金"励志奖"'
                },
                {
                    title: 'System_Operator_Exemplar',
                    description: '校三好学生'
                }
            ]
        };
    }

    renderEducation() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="education-block scroll-reveal">
                <div class="timeline-indicator"></div>
                <div class="education-info">
                    <div class="info-line">
                        <span class="info-label">Source_Institution:</span>
                        <span class="info-value">${this.education.institution}</span>
                    </div>
                    <div class="info-line">
                        <span class="info-label">Program_Loaded:</span>
                        <span class="info-value">${this.education.program}</span>
                    </div>
                    <div class="info-line">
                        <span class="info-label">Compilation_Cycle:</span>
                        <span class="info-value">${this.education.period}</span>
                    </div>
                    <div class="info-line">
                        <span class="info-label">Core_Libraries_Imported:</span>
                        <div class="info-value">
                            <div class="core-libraries">
                                ${this.education.coreLibraries.map(lib => `
                                    <span class="library-tag">[ ${lib} ]</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="performance-badges">
                    ${this.education.performanceBadges.map(badge => `
                        <div class="badge-item">
                            <div class="badge-title">${badge.title}</div>
                            <div class="badge-description">${badge.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
} 