import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="about">
      <h1>About Me</h1>
      <div class="about-content">
        <div class="about-text">
          <h2>Full Stack Developer</h2>
          <p>
            I'm a passionate Full Stack Developer with expertise in modern web technologies.
            I love creating efficient, scalable, and user-friendly applications that solve real-world problems.
          </p>
          <p>
            With a strong foundation in both frontend and backend development, I strive to build
            applications that not only look great but also perform exceptionally well.
          </p>
          <div class="skills">
            <h3>Skills</h3>
            <div class="skill-tags">
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Angular</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Express</span>
              <span class="skill-tag">MongoDB</span>
              <span class="skill-tag">HTML5</span>
              <span class="skill-tag">CSS3</span>
              <span class="skill-tag">Git</span>
              <span class="skill-tag">Docker</span>
            </div>
          </div>
        </div>
        <div class="about-image">
          <img src="assets/images/profile.jpg" alt="Profile" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 2rem 0;
    }

    h1 {
      text-align: center;
      color: #ccd6f6;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }

    .about-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .about-text {
      color: #8892b0;
    }

    .about-text h2 {
      color: #64ffda;
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    .about-text p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .skills {
      margin-top: 2rem;
    }

    .skills h3 {
      color: #ccd6f6;
      margin-bottom: 1rem;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .skill-tag {
      background-color: #1d3461;
      color: #64ffda;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .about-image {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .about-image img {
      max-width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      .about-content {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 2rem;
      }

      .about-image {
        order: -1;
      }
    }
  `]
})
export class AboutComponent {} 